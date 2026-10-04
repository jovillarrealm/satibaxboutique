import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import type { Product } from '../src/db/catalog';
import {
  createEmptySelection,
  addItem,
  updateQuantity,
  removeItem,
  formatCurrency,
  ItemSelection,
} from '../src/domain/itemSelection';
import {
  compileWhatsAppOrder,
  compileWhatsAppMessage,
  DEFAULT_WHATSAPP_PHONE,
} from '../src/domain/whatsappCompiler';
import {
  ItemSelectionDrawer,
  ItemSelectionDrawerProps,
} from '../src/components/ItemSelectionDrawer';
import {
  FloatingWhatsAppButton,
  FloatingWhatsAppButtonProps,
} from '../src/components/FloatingWhatsAppButton';
import App from '../src/App';

const MOCK_PRODUCT_1: Product = {
  id: 'prod-1',
  name: 'Serum Facial Retinol Night Repair',
  slug: 'serum-facial-retinol-night-repair',
  description: 'Serum con retinol botánico y ácido hialurónico.',
  brand: 'Laima',
  price: 35000,
  category_id: 'cat-4',
  image_url: 'https://example.com/serum.webp',
  images: ['https://example.com/serum.webp'],
  tags: ['natural', 'facial'],
  is_new: true,
  bestseller: false,
  active: true,
  created_at: '2026-01-19T14:40:03Z',
};

const MOCK_PRODUCT_2: Product = {
  id: 'prod-2',
  name: 'Jabón Vegetal de Caléndula',
  slug: 'jabon-vegetal-calendula',
  description: 'Jabón artesanal hidratante.',
  brand: 'Satibax',
  price: 6000,
  category_id: 'cat-3',
  image_url: null, // Test fallback image
  images: [],
  tags: ['natural', 'vegano'],
  is_new: false,
  bestseller: true,
  active: true,
  created_at: '2026-02-10T12:00:00Z',
};

describe('ItemSelectionDrawer Component', () => {
  describe('Visibility and Modal State', () => {
    it('does not display slide-over panel content when isOpen is false', () => {
      const selection = createEmptySelection();
      const html = renderToString(
        React.createElement(ItemSelectionDrawer, {
          isOpen: false,
          onClose: () => {},
          selection,
          onUpdateQuantity: () => {},
          onRemoveItem: () => {},
        })
      );

      // When closed, it should return null
      expect(html).not.toContain('role="dialog"');
    });

    it('renders modal dialog with accessible attributes when isOpen is true', () => {
      const selection = createEmptySelection();
      const html = renderToString(
        React.createElement(ItemSelectionDrawer, {
          isOpen: true,
          onClose: () => {},
          selection,
          onUpdateQuantity: () => {},
          onRemoveItem: () => {},
        })
      );

      expect(html).toContain('role="dialog"');
      expect(html).toContain('aria-modal="true"');
      expect(html).toContain('Mi Selección');
    });
  });

  describe('Empty State', () => {
    it('renders empty selection message and catalog browse action when items array is empty', () => {
      const selection = createEmptySelection();
      const html = renderToString(
        React.createElement(ItemSelectionDrawer, {
          isOpen: true,
          onClose: () => {},
          selection,
          onUpdateQuantity: () => {},
          onRemoveItem: () => {},
        })
      );

      expect(html).toContain('Tu selección está vacía');
      expect(html).toContain('Explorar catálogo');
      // When empty, the Pedir por WhatsApp button should be absent
      expect(html).not.toContain('wa.me/5492252515155?text=');
    });
  });

  describe('Selected Items, Thumbnails and Subtotals', () => {
    it('renders selected items with brand, name, unit price, quantity and line subtotals', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, MOCK_PRODUCT_1, 1);
      selection = addItem(selection, MOCK_PRODUCT_2, 2);

      const html = renderToString(
        React.createElement(ItemSelectionDrawer, {
          isOpen: true,
          onClose: () => {},
          selection,
          onUpdateQuantity: () => {},
          onRemoveItem: () => {},
        })
      );

      // Product 1
      expect(html).toContain('Serum Facial Retinol Night Repair');
      expect(html).toContain('Laima');
      expect(html).toContain(formatCurrency(35000));
      expect(html).toContain('https://example.com/serum.webp');

      // Product 2 (unit 6000, qty 2 -> subtotal 12000)
      expect(html).toContain('Jabón Vegetal de Caléndula');
      expect(html).toContain('Satibax');
      expect(html).toContain(formatCurrency(12000));

      // Grand Total: 35000 + 12000 = 47000
      expect(html).toContain(formatCurrency(47000));
    });

    it('renders fallback icon when item has no image_url', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, MOCK_PRODUCT_2, 1);

      const html = renderToString(
        React.createElement(ItemSelectionDrawer, {
          isOpen: true,
          onClose: () => {},
          selection,
          onUpdateQuantity: () => {},
          onRemoveItem: () => {},
        })
      );

      expect(html).toContain('lucide-leaf');
      expect(html).not.toContain('src=');
    });

    it('renders item count badge in the drawer header', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, MOCK_PRODUCT_1, 3);

      const html = renderToString(
        React.createElement(ItemSelectionDrawer, {
          isOpen: true,
          onClose: () => {},
          selection,
          onUpdateQuantity: () => {},
          onRemoveItem: () => {},
        })
      );

      expect(html).toContain('3 productos seleccionados');
    });

    it('renders "Vaciar" button when onClearSelection is provided and selection has items', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, MOCK_PRODUCT_1, 1);

      const html = renderToString(
        React.createElement(ItemSelectionDrawer, {
          isOpen: true,
          onClose: () => {},
          selection,
          onUpdateQuantity: () => {},
          onRemoveItem: () => {},
          onClearSelection: () => {},
        })
      );

      expect(html).toContain('Vaciar');
    });
  });

  describe('WhatsApp Order CTA Dispatch', () => {
    it('generates prominent WhatsApp dispatch CTA button with compiled order link', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, MOCK_PRODUCT_1, 1);
      selection = addItem(selection, MOCK_PRODUCT_2, 2);

      const expectedWhatsAppUrl = compileWhatsAppOrder(selection);

      const html = renderToString(
        React.createElement(ItemSelectionDrawer, {
          isOpen: true,
          onClose: () => {},
          selection,
          onUpdateQuantity: () => {},
          onRemoveItem: () => {},
        })
      );

      expect(html).toContain('Pedir por WhatsApp');
      // Verify WhatsApp link matches the compiled URL
      const escapedUrl = expectedWhatsAppUrl.replace(/&/g, '&amp;');
      expect(html).toContain(escapedUrl);
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
    });

    it('supports custom WhatsApp phone number in compiler options', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, MOCK_PRODUCT_1, 1);

      const customPhone = '5491112345678';
      const expectedWhatsAppUrl = compileWhatsAppOrder(selection, { phone: customPhone });

      const html = renderToString(
        React.createElement(ItemSelectionDrawer, {
          isOpen: true,
          onClose: () => {},
          selection,
          whatsappPhone: customPhone,
          onUpdateQuantity: () => {},
          onRemoveItem: () => {},
        })
      );

      const escapedUrl = expectedWhatsAppUrl.replace(/&/g, '&amp;');
      expect(html).toContain(escapedUrl);
      expect(html).toContain(customPhone);
    });

    it('compiles message structure with greeting, items, total and confirmation footer', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, MOCK_PRODUCT_1, 1);
      selection = addItem(selection, MOCK_PRODUCT_2, 3);

      const rawMsg = compileWhatsAppMessage(selection);
      expect(rawMsg).toContain('¡Hola! Me gustaría hacer el siguiente pedido:');
      expect(rawMsg).toContain('1x Serum Facial Retinol Night Repair - $ 35.000');
      expect(rawMsg).toContain('3x Jabón Vegetal de Caléndula - $ 18.000');
      expect(rawMsg).toContain('*Total: $ 53.000*');
      expect(rawMsg).toContain('¿Pueden confirmarme disponibilidad y coordinar el envío? ¡Gracias!');
    });
  });

  describe('Interactive Prop Handlers and State Transitions', () => {
    it('supports quantity increment, decrement, and item removal', () => {
      let selection = createEmptySelection();
      selection = addItem(selection, MOCK_PRODUCT_1, 2);
      selection = addItem(selection, MOCK_PRODUCT_2, 1);

      // Increment
      let updated = updateQuantity(selection, MOCK_PRODUCT_1.id, 3);
      expect(updated.items[0].quantity).toBe(3);
      expect(updated.totalPrice).toBe(35000 * 3 + 6000);

      // Decrement
      updated = updateQuantity(updated, MOCK_PRODUCT_1.id, 1);
      expect(updated.items[0].quantity).toBe(1);
      expect(updated.totalPrice).toBe(35000 + 6000);

      // Remove
      updated = removeItem(updated, MOCK_PRODUCT_2.id);
      expect(updated.items).toHaveLength(1);
      expect(updated.totalPrice).toBe(35000);
    });
  });
});

describe('FloatingWhatsAppButton Component', () => {
  it('renders persistent floating WhatsApp button targeting the default boutique number', () => {
    const html = renderToString(
      React.createElement(FloatingWhatsAppButton, {})
    );

    expect(html).toContain(`wa.me/${DEFAULT_WHATSAPP_PHONE}`);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('Consultar por WhatsApp');
  });

  it('allows custom phone and custom general inquiry message', () => {
    const customPhone = '5492252515155';
    const customMsg = 'Hola, quisiera consultar stock';
    const html = renderToString(
      React.createElement(FloatingWhatsAppButton, {
        phone: customPhone,
        defaultMessage: customMsg,
      })
    );

    expect(html).toContain(`wa.me/${customPhone}?text=${encodeURIComponent(customMsg)}`);
  });

  it('sanitizes phone number formatting characters', () => {
    const rawPhone = '+54 9 2252 51-51-55';
    const html = renderToString(
      React.createElement(FloatingWhatsAppButton, {
        phone: rawPhone,
      })
    );

    expect(html).toContain(`wa.me/5492252515155`);
  });
});

describe('App Integration with Drawer & WhatsApp', () => {
  it('renders Header with selection counter, Drawer and Floating WhatsApp button', () => {
    const html = renderToString(
      React.createElement(App, {
        initialProducts: [MOCK_PRODUCT_1, MOCK_PRODUCT_2],
      })
    );

    // Header bag trigger
    expect(html).toContain('Ver mi selección');
    // Floating WhatsApp button
    expect(html).toContain(`wa.me/${DEFAULT_WHATSAPP_PHONE}`);
    expect(html).toContain('Consultar por WhatsApp');
  });
});
