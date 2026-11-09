// ─────────────────────────────────────────────────────────────
//  CATEGORIES — main categories and their sub-categories.
//
//  Home page        → shows the main categories
//  Category page    → shows that category's sub-categories
//  Sub-category page→ shows the products whose `category` and
//                     `subcategory` match (see products.js)
//
//  "id" values are used in the page address and in products.js,
//  so use lowercase words with dashes and don't change them later.
//
//  imageAlt = short description of the photo (helps Google Images and
//  screen readers). Name image files with descriptive words, e.g.
//  'laptop-screen-replacement.jpg', not 'image.png'.
// ─────────────────────────────────────────────────────────────

const categories = [
  {
    id: 'ethical-hacking',
    name: 'Ethical Hacking Products',
    shortName: 'Ethical Hacking',
    icon: 'security',
    image: 'images/categories/ethical-hacking-cybersecurity-tools.jpg',
    imageAlt: 'Hooded ethical hacker working on a laptop with code in the background',
    tagline: 'Tools for learning cybersecurity and authorised security testing.',
    description:
      'Hardware and kits for students, security enthusiasts and professionals who want to learn and practise ethical hacking in a lab environment.',
    notice:
      'Ethical hacking products are sold for education and authorised security testing only. Use them only on devices and networks you own or have written permission to test.',
    subcategories: [
      {
        id: 'wifi-network',
        name: 'Wi-Fi & Network Testing',
        image: 'images/categories/wifi-network.jpg',
        imageAlt: 'Network switch with Ethernet cables for Wi-Fi and network security testing',
        description: 'Wireless adapters and network tools for testing networks you own or are authorised to test.',
      },
      {
        id: 'usb-hid',
        name: 'USB & HID Tools',
        image: 'images/categories/usb-hid.jpg',
        imageAlt: 'USB network adapter used for security testing',
        description: 'Programmable USB devices for automation and security demonstrations.',
      },
      {
        id: 'rfid-nfc',
        name: 'RFID & NFC Tools',
        image: 'images/categories/rfid-nfc.jpg',
        imageAlt: 'Hand holding a contactless NFC card reader',
        description: 'Readers, writers and cards for learning how access and contactless cards work.',
      },
      {
        id: 'learning-kits',
        name: 'Cybersecurity Learning Kits',
        image: 'images/categories/learning-kits.jpg',
        imageAlt: 'Raspberry Pi single-board computer for a cybersecurity lab',
        description: 'Single-board computers and starter kits to build your own security lab.',
      },
    ],
  },
  {
    id: 'device-service',
    name: 'Electronic Device Service',
    shortName: 'Device Service',
    icon: 'service',
    image: 'images/categories/electronic-device-repair-service.jpg',
    imageAlt: 'Technician repairing an electronic circuit board with probes',
    tagline: 'Repair and servicing for laptops, mobiles and tech gadgets.',
    description:
      'Hardware repairs, part replacements and software fixes for your everyday devices, handled with care.',
    subcategories: [
      {
        id: 'laptop-service',
        name: 'Laptop Service',
        image: 'images/categories/laptop-service.jpg',
        imageAlt: 'Laptop opened for motherboard repair and servicing',
        description: 'Screen, keyboard, battery, charging and software issues.',
      },
      {
        id: 'mobile-service',
        name: 'Mobile Service',
        image: 'images/categories/mobile-service.jpg',
        imageAlt: 'Hand holding a smartphone with a cracked screen for repair',
        description: 'Display, battery, charging port and software problems on smartphones.',
      },
      {
        id: 'gadget-service',
        name: 'Tech Gadget Service',
        image: 'images/categories/gadget-service.jpg',
        imageAlt: 'Smartwatch and charger for gadget repair and service',
        description: 'Smartwatches, earbuds, headphones, speakers and other gadgets.',
      },
    ],
  },
  {
    id: 'custom-projects',
    name: 'Custom Product Creation',
    shortName: 'Custom Projects',
    icon: 'custom',
    image: 'images/categories/custom-electronics-projects.jpg',
    imageAlt: 'Custom-built robot car projects with circuit boards and breadboards',
    tagline: 'School projects, college projects and prototypes built to your requirement.',
    description:
      'Tell us your idea and we design and build a working project or prototype for you, from a school exhibition model to a product prototype.',
    subcategories: [
      {
        id: 'school-projects',
        name: 'School Projects',
        image: 'images/categories/school-projects.jpg',
        imageAlt: 'Students building an electronics project for a school exhibition',
        description: 'Working science and electronics models for school exhibitions.',
      },
      {
        id: 'college-projects',
        name: 'College Projects',
        image: 'images/categories/college-projects.jpg',
        imageAlt: 'College students presenting a robot car project',
        description: 'Mini and final-year projects for diploma and engineering students.',
      },
      {
        id: 'prototype-building',
        name: 'Prototype Building',
        image: 'images/categories/prototype-building.jpg',
        imageAlt: '3D printer and printed parts for prototype building',
        description: 'Turn your idea into a working prototype.',
      },
    ],
  },
  {
    id: 'pcb-design',
    name: 'Custom PCB Design',
    shortName: 'PCB Design',
    icon: 'pcb',
    image: 'images/categories/custom-pcb-design.jpg',
    imageAlt: 'PCB layout design with copper traces on both layers',
    tagline: 'Single-sided, double-sided and multilayer PCBs designed to your circuit.',
    description:
      'Send us your circuit or idea and we design the schematic and PCB layout, prepare Gerber files and help you get boards made and assembled.',
    subcategories: [
      {
        id: 'single-sided-pcb',
        name: 'Single-Sided PCB',
        image: 'images/categories/single-sided-pcb.jpg',
        imageAlt: 'Single-sided PCB with through-hole components',
        description: 'Copper on one side: low-cost boards for simple circuits and student projects.',
      },
      {
        id: 'double-sided-pcb',
        name: 'Double-Sided PCB',
        image: 'images/categories/double-sided-pcb.jpg',
        imageAlt: 'Green double-sided PCB with traces and plated vias',
        description: 'Copper on both sides with plated vias for compact, more complex circuits.',
      },
      {
        id: 'multilayer-pcb',
        name: 'Multilayer PCB',
        image: 'images/categories/multilayer-pcb.jpg',
        imageAlt: 'High-density multilayer PCB with a microcontroller chip',
        description: '4 or more layers for high-density, high-speed and microcontroller designs.',
      },
      {
        id: 'pcb-assembly',
        name: 'PCB Assembly',
        image: 'images/categories/pcb-assembly.jpg',
        imageAlt: 'Assembled PCB populated with electronic components',
        description: 'Soldering of SMD and through-hole components on your boards, tested and ready to use.',
      },
    ],
  },
  {
    id: 'website-development',
    name: 'Website Development',
    shortName: 'Websites',
    icon: 'web',
    image: 'images/categories/website-development-services.jpg',
    imageAlt: 'Web development illustration of a developer building a website on a laptop',
    tagline: 'Fast, mobile-friendly websites for businesses, shops and individuals.',
    description:
      'We design and build websites that look professional on every screen, from a simple business page to a complete online store.',
    subcategories: [
      {
        id: 'business-websites',
        name: 'Business Websites',
        image: 'images/categories/business-websites.jpg',
        imageAlt: 'Tablet displaying a business website',
        description: 'Professional websites for shops, services and companies, with contact and WhatsApp enquiry.',
      },
      {
        id: 'ecommerce-websites',
        name: 'E-commerce Websites',
        image: 'images/categories/ecommerce-websites.jpg',
        imageAlt: 'Shopping online with a smartphone and payment card',
        description: 'Online stores with product catalogues, cart and order management.',
      },
      {
        id: 'portfolio-websites',
        name: 'Portfolio & Personal Websites',
        image: 'images/categories/portfolio-websites.jpg',
        imageAlt: 'Creative designer desk with a laptop for portfolio websites',
        description: 'Personal, portfolio and resume websites for students and professionals.',
      },
    ],
  },
  {
    id: 'mobile-app-development',
    name: 'Mobile App Development',
    shortName: 'Mobile Apps',
    icon: 'app',
    image: 'images/categories/mobile-app-development-services.jpg',
    imageAlt: 'Smartphone home screen full of mobile apps',
    tagline: 'Android, iOS and cross-platform apps built to your requirement.',
    description:
      'From idea to app store: we plan, design and develop mobile apps for businesses, startups and student projects.',
    subcategories: [
      {
        id: 'android-apps',
        name: 'Android Apps',
        image: 'images/categories/android-app-development.jpg',
        imageAlt: 'Android smartphone screen close-up',
        description: 'Native Android apps for phones and tablets, ready for the Google Play Store.',
      },
      {
        id: 'ios-apps',
        name: 'iOS Apps',
        image: 'images/categories/ios-app-development.jpg',
        imageAlt: 'White iPhone on a desk for iOS app development',
        description: 'iPhone and iPad apps, ready for the Apple App Store.',
      },
      {
        id: 'cross-platform-apps',
        name: 'Cross-Platform Apps',
        image: 'images/categories/cross-platform-app-development.jpg',
        imageAlt: 'Smartphone and smartwatch on a desk for cross-platform apps',
        description: 'One app for both Android and iOS, built with React Native or Flutter.',
      },
    ],
  },
];

export default categories;

export const findCategory = (id) => categories.find((c) => c.id === id);
export const findSubcategory = (category, subId) => category?.subcategories.find((s) => s.id === subId);
