// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS — change shop details here.
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'Ayudhayeluthu Electronics',

  // ── SEO ───────────────────────────────────────────────────
  // Your live website address, e.g. 'https://www.yourdomain.com' (no "/" at the end).
  // Needed for the Google sitemap, canonical links and WhatsApp/Facebook share previews.
  // Leave '' until you have a domain — everything else still works.
  siteUrl: '',
  seo: {
    // Title and description Google shows for the home page
    title: 'Ayudhayeluthu Electronics | Ethical Hacking, Device Repair, Projects, Websites & Apps',
    description:
      'Ethical hacking tools, laptop & mobile repair, school and college projects, website and mobile app development. Order easily on WhatsApp.',
    keywords: [
      'ethical hacking products', 'cybersecurity tools', 'Wi-Fi testing tools', 'RFID NFC tools',
      'laptop service', 'mobile service', 'gadget repair', 'school projects', 'college projects',
      'final year projects', 'prototype building', 'website development', 'e-commerce website',
      'mobile app development', 'Android app development', 'iOS app development', 'Ayudhayeluthu Electronics',
    ],
    // Picture shown when the site is shared on WhatsApp, Facebook, LinkedIn… (1200×630, in public/)
    image: 'og-image.jpg',
    locale: 'en_IN',
  },
  tagline: 'Ethical hacking products, device service, custom projects, websites and mobile apps.',

  // WhatsApp number with country code, digits only (no +, spaces or dashes)
  whatsappNumber: '916385646698',

  currency: '₹',

  // Short points shown in the hero section
  highlights: ['Ethical hacking tools', 'Laptop, mobile & gadget service', 'School, college & prototype projects', 'Websites & mobile apps'],

  // ── ABOUT ME section ──────────────────────────────────────
  owner: {
    name: 'Perarasu M',
    role: 'Founder, Ayudhayeluthu Electronics',
    // Profile photo: image file:  public/images/perarasu.png
    // (if the file is missing, the initials "PM" are shown instead)
    photo: 'images/perarasu-400.jpg', // small copy of perarasu.png
    linkedin: 'https://www.linkedin.com/in/perarasu-m-766376362',
    // Each line below is one paragraph — edit freely
    about: [
      "Hi, I'm Perarasu, the founder of Ayudhayeluthu Electronics. I work across ethical hacking products, electronic device service, custom-built projects, websites and mobile apps.",
      'I supply tools and kits for learning cybersecurity, service laptops, mobiles and tech gadgets, build custom school projects, college projects and prototypes, and develop websites and mobile apps made to your requirement.',
      'Every order and enquiry is handled personally, so you always talk directly to me.',
    ],
  },

  // "What I offer" cards in the About section
  services: [
    {
      icon: 'security',
      title: 'Ethical hacking products',
      text: 'Tools and learning kits for cybersecurity education and authorised testing.',
    },
    {
      icon: 'service',
      title: 'Device service',
      text: 'Repairs and servicing for laptops, mobiles and tech gadgets.',
    },
    {
      icon: 'custom',
      title: 'Custom products',
      text: 'School projects, college projects and prototypes built to your requirement.',
    },
    {
      icon: 'web',
      title: 'Website development',
      text: 'Business, e-commerce and portfolio websites that work on every screen.',
    },
    {
      icon: 'app',
      title: 'Mobile app development',
      text: 'Android, iOS and cross-platform apps for businesses and students.',
    },
  ],
};
