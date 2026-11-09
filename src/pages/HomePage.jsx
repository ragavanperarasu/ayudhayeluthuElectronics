import { Box, Container, Stack, Typography } from '@mui/material';
import Hero from '../components/Hero';
import ServicesMarquee from '../components/ServicesMarquee';
import { Reveal, StaggerGrid, StaggerItem } from '../components/motion/Reveal';
import CategoryCard from '../components/CategoryCard';
import HowToOrder from '../components/HowToOrder';
import categories from '../data/categories';
import usePageMeta from '../seo/usePageMeta';

export default function HomePage() {
  usePageMeta({});
  return (
    <>
      <Hero />
      <ServicesMarquee />
      <Box component="section" id="categories" sx={{ py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Reveal>
          <Stack spacing={1} sx={{ mb: 5, textAlign: { xs: 'left', md: 'center' }, alignItems: { md: 'center' } }}>
            <Typography variant="overline" color="primary">
              What we offer
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontSize: { xs: 30, md: 40 } }}>
              Choose a category
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 560 }}>
              Pick an area below to see its sub-categories and everything we offer in it.
            </Typography>
          </Stack>
          </Reveal>
          {/* 6-column grid: 3 cards on the first row, the rest share the next row */}
          <StaggerGrid sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' } }}>
            {categories.map((c, i) => (
              <StaggerItem
                key={c.id}
                sx={{
                  gridColumn: {
                    sm: categories.length % 2 && i === categories.length - 1 ? 'span 2' : 'auto',
                    md: i < 3 ? 'span 2' : `span ${6 / Math.min(categories.length - 3, 3)}`,
                  },
                }}
              >
              <CategoryCard
                key={c.id}
                to={`/category/${c.id}`}
                title={c.name}
                description={c.tagline}
                image={c.image}
                imageAlt={c.imageAlt}
                icon={c.icon}
                chips={c.subcategories.map((s) => s.name)}
                cta={`Explore ${c.shortName}`}
              />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </Box>
      <HowToOrder />
    </>
  );
}
