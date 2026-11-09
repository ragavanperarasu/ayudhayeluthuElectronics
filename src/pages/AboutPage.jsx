import PageBanner from '../components/PageBanner';
import About from '../components/About';
import HowToOrder from '../components/HowToOrder';
import usePageMeta from '../seo/usePageMeta';
import { SITE } from '../config';

export default function AboutPage() {
  usePageMeta({
    title: `About ${SITE.owner.name} – Founder`,
    description: `Meet ${SITE.owner.name}, founder of ${SITE.name}: ethical hacking products, device service, custom projects, websites and mobile apps.`,
    image: SITE.owner.photo,
  });
  return (
    <>
      <PageBanner
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        title="About Ayudhayeluthu Electronics"
        description="Ethical hacking products, device service, custom projects, websites and mobile apps, handled personally."
      />
      <About />
      <HowToOrder />
    </>
  );
}
