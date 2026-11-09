// ─────────────────────────────────────────────────────────────
//  PRODUCTS & SERVICES — empty for now, add your items here.
//
//  Each item appears on its sub-category page, and gets its own
//  details page with an "Order on WhatsApp" button.
//
//  To add an item, copy the example below (remove the // marks),
//  paste it inside the [ ] list and change the values:
//
//  {
//    id: 'AYE-001',                       // unique code (shown in WhatsApp orders)
//    name: 'Dual-Band Wi-Fi Adapter',
//    category: 'ethical-hacking',         // main category id   (see categories.js)
//    subcategory: 'wifi-network',         // sub-category id    (see categories.js)
//    price: 1499,                         // optional — leave out to show "Price on request"
//    mrp: 1999,                           // optional — shows strike-through price and % OFF
//    image: 'images/products/wifi-adapter.jpg',  // file in public/images/products/ or a full https:// URL
//    tag: 'New',                          // optional badge
//    inStock: true,                       // false shows "Out of stock"
//    shortDescription: 'One line shown on the product card.',
//    description: 'Longer text shown on the product page.',
//    features: ['Point one', 'Point two'],
//    specs: { Chipset: 'Example', Interface: 'USB 3.0' },
//  },
//
//  Category ids:      ethical-hacking, device-service, custom-projects, pcb-design,
//                     website-development, mobile-app-development
//  Sub-category ids:  wifi-network, usb-hid, rfid-nfc, learning-kits,
//                     laptop-service, mobile-service, gadget-service,
//                     school-projects, college-projects, prototype-building,
//                     single-sided-pcb, double-sided-pcb, multilayer-pcb, pcb-assembly,
//                     business-websites, ecommerce-websites, portfolio-websites,
//                     android-apps, ios-apps, cross-platform-apps
// ─────────────────────────────────────────────────────────────

const products = [];

export default products;

export const productsIn = (categoryId, subcategoryId) =>
  products.filter((p) => p.category === categoryId && (!subcategoryId || p.subcategory === subcategoryId));

export const findProduct = (id) => products.find((p) => p.id === id);
