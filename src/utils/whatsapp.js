import { SITE } from '../config';
import { formatPrice, hasPrice } from './format';

// WhatsApp is opened only from order / request buttons (products, order list, custom order, sub-category request).
const whatsappLink = (message = '') =>
  `https://wa.me/${SITE.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const openWhatsApp = (message) => {
  window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
};

export const productOrderMessage = (product, qty = 1) =>
  [
    `Hello ${SITE.name}! 👋`,
    `I would like to order:`,
    ``,
    `🛒 *${product.name}*`,
    `Product code: ${product.id}`,
    `Price: ${formatPrice(product.price)}`,
    `Quantity: ${qty}`,
    ...(hasPrice(product.price) ? [`Total: *${formatPrice(product.price * qty)}*`] : []),
    ``,
    `Please confirm availability and delivery details.`,
  ].join('\n');

export const cartOrderMessage = (lines) => {
  const priced = lines.filter((l) => hasPrice(l.product.price));
  const total = priced.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  return [
    `Hello ${SITE.name}! 👋`,
    `I would like to order the following items:`,
    ``,
    ...lines.map((l, i) =>
      hasPrice(l.product.price)
        ? `${i + 1}. *${l.product.name}* (${l.product.id})\n    ${l.qty} × ${formatPrice(l.product.price)} = ${formatPrice(l.product.price * l.qty)}`
        : `${i + 1}. *${l.product.name}* (${l.product.id})\n    Qty ${l.qty} — price on request`,
    ),
    ``,
    ...(priced.length ? [`*Order total: ${formatPrice(total)}*${priced.length < lines.length ? ' (+ items priced on request)' : ''}`, ``] : []),
    `Please confirm availability and delivery details.`,
  ].join('\n');
};

export const customOrderMessage = () =>
  [
    `Hello ${SITE.name}! 👋`,
    `I'm interested in a *custom product*.`,
    ``,
    `What I need: `,
    `Quantity: `,
    `Required by (date): `,
  ].join('\n');

// Sent when a sub-category card is clicked (while it has no products listed yet)
export const subcategoryRequestMessage = (category, sub) =>
  [
    `Hello ${SITE.name}! 👋`,
    `I'm interested in *${sub.name}* (${category.name}).`,
    `Please share the details and pricing.`,
    ``,
    `My requirement: `,
  ].join('\n');
