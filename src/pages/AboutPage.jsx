import PageBanner from '../components/PageBanner';
import About from '../components/About';
import HowToOrder from '../components/HowToOrder';
import usePageMeta from '../seo/usePageMeta';
import { aboutMeta } from '../seo/pageMeta';

export default function AboutPage() {
  usePageMeta(aboutMeta());
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
