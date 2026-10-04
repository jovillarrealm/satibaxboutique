/**
 * WhatsApp Order Compiler Domain Module
 *
 * Compiles the customer's Item Selection into a canonical, politely formatted
 * WhatsApp message targeting the boutique's phone number (+54 9 2252 515155).
 * Adheres strictly to the WhatsApp Message Contract in the specification.
 */

import { ItemSelection, formatCurrency } from './itemSelection';

/**
 * The official phone number for Satibax Boutique customer orders.
 * Country code 54 (Argentina), mobile prefix 9, area code 2252, local number 515155.
 */
export const DEFAULT_WHATSAPP_PHONE = '5492252515155';

export const WHATSAPP_GREETING_HEADER = '¡Hola! Me gustaría hacer el siguiente pedido:';

export const WHATSAPP_CONFIRMATION_FOOTER =
  '¿Pueden confirmarme disponibilidad y coordinar el envío? ¡Gracias!';

export interface WhatsAppCompilerOptions {
  /**
   * Destination phone number in international format or digits.
   * Defaults to DEFAULT_WHATSAPP_PHONE ('5492252515155').
   */
  phone?: string;
}

/**
 * Compiles an ItemSelection into the plain text canonical WhatsApp order message.
 *
 * Format:
 * Header: "¡Hola! Me gustaría hacer el siguiente pedido:"
 * Lines:  "{quantity}x {product_name} - ${item_subtotal}"
 * Footer: "*Total: ${grand_total}*" followed by "¿Pueden confirmarme disponibilidad y coordinar el envío? ¡Gracias!"
 *
 * Returns an empty string if selection contains no items.
 */
export function compileWhatsAppMessage(selection: ItemSelection): string {
  if (!selection || !selection.items || selection.items.length === 0) {
    return '';
  }

  const lines = selection.items.map((item) => {
    const qty = item.quantity;
    const name = item.product.name;
    const subtotalFormatted = formatCurrency(item.subtotal);
    return `${qty}x ${name} - ${subtotalFormatted}`;
  });

  const totalFormatted = formatCurrency(selection.totalPrice);

  return [
    WHATSAPP_GREETING_HEADER,
    '',
    ...lines,
    '',
    `*Total: ${totalFormatted}*`,
    '',
    WHATSAPP_CONFIRMATION_FOOTER,
  ].join('\n');
}

/**
 * Compiles an ItemSelection into the dispatch URL for WhatsApp.
 * Target URL format:
 * `https://wa.me/{phone}?text={encoded_message}`
 *
 * If the selection is empty, returns `https://wa.me/{phone}`.
 */
export function compileWhatsAppOrder(
  selection: ItemSelection,
  options?: WhatsAppCompilerOptions
): string {
  const rawPhone = options?.phone?.trim();
  const sanitizedPhone = rawPhone ? rawPhone.replace(/\D/g, '') : '';
  const phone = sanitizedPhone.length > 0 ? sanitizedPhone : DEFAULT_WHATSAPP_PHONE;

  const message = compileWhatsAppMessage(selection);

  if (!message) {
    return `https://wa.me/${phone}`;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
