import { describe, it, expect } from 'vitest';
import {
  compileWhatsAppOrder,
  compileWhatsAppMessage,
  DEFAULT_WHATSAPP_PHONE,
  WHATSAPP_GREETING_HEADER,
  WHATSAPP_CONFIRMATION_FOOTER,
} from '../src/domain/whatsappCompiler';
import {
  createEmptySelection,
  addItem,
  Product,
} from '../src/domain/itemSelection';

describe('whatsappCompiler', () => {
  const productA: Product = {
    id: 'prod-1',
    name: 'Serum Facial Retinol Night Repair',
    price: 35000,
  };

  const productB: Product = {
    id: 'prod-2',
    name: 'Jabón Vegetal de Caléndula',
    price: 6000,
  };

  const productKit: Product = {
    id: 'prod-kit',
    name: 'Kit Pausa Bonita',
    price: 28500,
  };

  describe('constants', () => {
    it('defines the canonical boutique phone number', () => {
      expect(DEFAULT_WHATSAPP_PHONE).toBe('5492252515155');
    });

    it('defines the canonical greeting header', () => {
      expect(WHATSAPP_GREETING_HEADER).toBe(
        '¡Hola! Me gustaría hacer el siguiente pedido:'
      );
    });

    it('defines the canonical confirmation question footer', () => {
      expect(WHATSAPP_CONFIRMATION_FOOTER).toBe(
        '¿Pueden confirmarme disponibilidad y coordinar el envío? ¡Gracias!'
      );
    });
  });

  describe('compileWhatsAppMessage', () => {
    it('returns empty string for empty selection', () => {
      const selection = createEmptySelection();
      expect(compileWhatsAppMessage(selection)).toBe('');
    });

    it('compiles message for a single item with exact canonical formatting', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, productA, 1);

      const message = compileWhatsAppMessage(selection);

      const expected = [
        '¡Hola! Me gustaría hacer el siguiente pedido:',
        '',
        '1x Serum Facial Retinol Night Repair - $ 35.000',
        '',
        '*Total: $ 35.000*',
        '',
        '¿Pueden confirmarme disponibilidad y coordinar el envío? ¡Gracias!',
      ].join('\n');

      expect(message).toBe(expected);
    });

    it('compiles message for multiple items and kits with subtotals and grand total', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, productA, 2); // 70000
      selection = addItem(selection, productB, 3); // 18000
      selection = addItem(selection, productKit, 1); // 28500
      // Total: 116500

      const message = compileWhatsAppMessage(selection);

      const expected = [
        '¡Hola! Me gustaría hacer el siguiente pedido:',
        '',
        '2x Serum Facial Retinol Night Repair - $ 70.000',
        '3x Jabón Vegetal de Caléndula - $ 18.000',
        '1x Kit Pausa Bonita - $ 28.500',
        '',
        '*Total: $ 116.500*',
        '',
        '¿Pueden confirmarme disponibilidad y coordinar el envío? ¡Gracias!',
      ].join('\n');

      expect(message).toBe(expected);
    });
  });

  describe('compileWhatsAppOrder', () => {
    it('returns base wa.me link without text query parameter when selection is empty', () => {
      const selection = createEmptySelection();
      const url = compileWhatsAppOrder(selection);
      expect(url).toBe('https://wa.me/5492252515155');
    });

    it('generates fully valid WhatsApp dispatch URL with correct phone and encoded message', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, productA, 1);

      const url = compileWhatsAppOrder(selection);

      expect(url.startsWith('https://wa.me/5492252515155?text=')).toBe(true);

      const encodedParam = url.replace('https://wa.me/5492252515155?text=', '');
      const decodedMessage = decodeURIComponent(encodedParam);

      expect(decodedMessage).toBe(compileWhatsAppMessage(selection));
      expect(decodedMessage).toContain('¡Hola! Me gustaría hacer el siguiente pedido:');
      expect(decodedMessage).toContain('1x Serum Facial Retinol Night Repair - $ 35.000');
      expect(decodedMessage).toContain('*Total: $ 35.000*');
      expect(decodedMessage).toContain('¿Pueden confirmarme disponibilidad y coordinar el envío? ¡Gracias!');
    });

    it('correctly encodes special characters, accents, inverted marks, and line breaks in URL', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, productB, 1); // Jabón Vegetal de Caléndula

      const url = compileWhatsAppOrder(selection);

      // Verify no unencoded raw spaces or newlines remain in URL
      expect(url).not.toMatch(/\s/);
      expect(url).not.toMatch(/\n/);
      // Inverted exclamation mark ¡ (%C2%A1), ó (%C3%B3), é (%C3%A9)
      expect(url).toContain('%C2%A1');
      expect(url).toContain('%C3%B3');
      expect(url).toContain('%C3%A9');
    });

    it('allows overriding destination phone number and sanitizes non-numeric characters', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, productA, 1);

      const urlWithCustomPhone = compileWhatsAppOrder(selection, {
        phone: '+54 9 11 1234-5678',
      });

      expect(urlWithCustomPhone.startsWith('https://wa.me/5491112345678?text=')).toBe(true);
    });

    it('falls back to default phone if custom phone is blank or contains no digits', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, productA, 1);

      const url = compileWhatsAppOrder(selection, { phone: '   ' });
      expect(url.startsWith('https://wa.me/5492252515155?text=')).toBe(true);
    });
  });
});
