import { useMemo, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Button, Container, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import PageBanner from '../components/PageBanner';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import { Reveal, StaggerGrid, StaggerItem } from '../components/motion/Reveal';
import NotFoundPage from './NotFoundPage';
import { findCategory, findSubcategory } from '../data/categories';
import { productsIn } from '../data/products';
import usePageMeta, { absUrl, breadcrumbLd } from '../seo/usePageMeta';
import { canonicalPath, subcategoryMeta } from '../seo/pageMeta';
import WhatsAppButton from '../components/WhatsAppButton';
import { openWhatsApp, subcategoryRequestMessage } from '../utils/whatsapp';

const price = (p) => (typeof p.price === 'number' ? p.price : Infinity);
const SORTS = {
  featured: { label: 'Featured', fn: () => 0 },
  low: { label: 'Price: Low to High', fn: (a, b) => price(a) - price(b) },
  high: { label: 'Price: High to Low', fn: (a, b) => (price(b) === Infinity ? -1 : price(b)) - (price(a) === Infinity ? -1 : price(a)) },
  name: { label: 'Name: A–Z', fn: (a, b) => a.name.localeCompare(b.name) },
};

export default function SubcategoryPage() {
  const { categoryId, subId } = useParams();
  const category = findCategory(categoryId);
  const sub = findSubcategory(category, subId);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');

  const items = useMemo(() => (sub ? productsIn(category.id, sub.id) : []), [category, sub]);
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((p) => !q || [p.name, p.shortDescription, p.id].some((f) => f?.toLowerCase().includes(q)))
      .sort(SORTS[sort].fn);
  }, [items, query, sort]);

  const crumbs = sub
    ? [{ label: 'Home', to: '/' }, { label: category.name, to: `/category/${category.id}` }, { label: sub.name }]
    : [];
  usePageMeta(
    sub
      ? {
          ...subcategoryMeta(category, sub),
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              breadcrumbLd(crumbs),
              ...(items.length
                ? [{
                    '@type': 'ItemList',
                    name: sub.name,
                    itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absUrl(canonicalPath(`/product/${encodeURIComponent(p.id)}`)), name: p.name })),
                  }]
                : []),
            ],
          },
        }
      : { title: 'Page not found', noindex: true },
  );

  if (!sub) return <NotFoundPage />;

  return (
    <>
      <PageBanner
        crumbs={crumbs}
        title={sub.name}
        description={sub.description}
        image={sub.image}
      />
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        {items.length === 0 ? (
          <Reveal>
          <EmptyState
            icon={HourglassEmptyRoundedIcon}
            title={`Request ${sub.name}`}
            text={`Tell us what you need and we'll reply on WhatsApp with details and pricing.`}
            action={
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'center' }}>
                <WhatsAppButton size="large" onClick={() => openWhatsApp(subcategoryRequestMessage(category, sub))}>
                  Request on WhatsApp
                </WhatsAppButton>
                <Button size="large" component={RouterLink} to={`/category/${category.id}`} variant="outlined">
                  Back to {category.shortName}
                </Button>
              </Stack>
            }
          />
          </Reveal>
        ) : (
          <>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 4, alignItems: { sm: 'center' } }}>
              <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
                {visible.length} of {items.length} item{items.length > 1 ? 's' : ''}
              </Typography>
              <TextField
                size="small"
                placeholder="Search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ bgcolor: 'background.paper', minWidth: { sm: 260 } }}
              />
              <TextField select size="small" value={sort} onChange={(e) => setSort(e.target.value)} sx={{ minWidth: 200, bgcolor: 'background.paper' }}>
                {Object.entries(SORTS).map(([k, v]) => (
                  <MenuItem key={k} value={k}>
                    {v.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            {visible.length ? (
              <StaggerGrid key={`${query}|${sort}`} sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
                {visible.map((p) => (
                  <StaggerItem key={p.id}>
                    <ProductCard product={p} />
                  </StaggerItem>
                ))}
              </StaggerGrid>
            ) : (
              <EmptyState icon={SearchRoundedIcon} title="No matching items" text="Try another word." />
            )}
          </>
        )}
      </Container>
    </>
  );
}
