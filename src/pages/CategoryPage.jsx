import { Link as RouterLink, useParams } from 'react-router-dom';
import { Alert, Box, Button, Container } from '@mui/material';
import PageBanner from '../components/PageBanner';
import CategoryCard from '../components/CategoryCard';
import { Reveal, StaggerGrid, StaggerItem } from '../components/motion/Reveal';
import NotFoundPage from './NotFoundPage';
import { findCategory } from '../data/categories';
import { productsIn } from '../data/products';
import usePageMeta, { breadcrumbLd } from '../seo/usePageMeta';
import { openWhatsApp, subcategoryRequestMessage } from '../utils/whatsapp';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = findCategory(categoryId);
  const crumbs = category ? [{ label: 'Home', to: '/' }, { label: category.name }] : [];
  usePageMeta(
    category
      ? {
          title: category.name,
          description: `${category.tagline} ${category.subcategories.map((s) => s.name).join(', ')}.`,
          image: category.image,
          jsonLd: { '@context': 'https://schema.org', ...breadcrumbLd(crumbs) },
        }
      : { title: 'Page not found', noindex: true },
  );
  if (!category) return <NotFoundPage />;

  return (
    <>
      <PageBanner
        crumbs={crumbs}
        title={category.name}
        description={category.description}
        image={category.image}
      />
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        {category.notice && (
          <Reveal y={16}>
            <Alert severity="info" variant="outlined" sx={{ mb: 4, borderRadius: 3, bgcolor: 'background.paper' }}>
              {category.notice}
            </Alert>
          </Reveal>
        )}
        <StaggerGrid
          sx={{
            display: 'grid',
            gap: 3,
            // 4 sub-categories → one row of 4 on wide screens (2×2 on medium); otherwise rows of 3
            gridTemplateColumns:
              category.subcategories.length === 4
                ? { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }
                : { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {category.subcategories.map((s) => {
            const count = productsIn(category.id, s.id).length;
            return (
              <StaggerItem key={s.id}>
                <CategoryCard
                  // no products yet → clicking sends a WhatsApp request; once products are added it opens the list
                  {...(count
                    ? { to: `/category/${category.id}/${s.id}`, cta: 'View items' }
                    : { onWhatsApp: () => openWhatsApp(subcategoryRequestMessage(category, s)), cta: 'Request on WhatsApp' })}
                  title={s.name}
                  description={s.description}
                  image={s.image}
                  imageAlt={s.imageAlt}
                  count={count}
                />
              </StaggerItem>
            );
          })}
        </StaggerGrid>
        <Box sx={{ mt: 5 }}>
          <Button component={RouterLink} to="/" variant="outlined">
            ← All categories
          </Button>
        </Box>
      </Container>
    </>
  );
}
