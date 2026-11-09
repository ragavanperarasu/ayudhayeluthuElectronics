import { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Box, Button, Chip, Container, Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Table, TableBody,
  TableCell, TableRow, Typography,
} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import PageBanner from '../components/PageBanner';
import ProductImage from '../components/ProductImage';
import QuantityPicker from '../components/QuantityPicker';
import WhatsAppButton from '../components/WhatsAppButton';
import NotFoundPage from './NotFoundPage';
import { findProduct } from '../data/products';
import { findCategory, findSubcategory } from '../data/categories';
import { discountPercent, formatPrice, hasPrice } from '../utils/format';
import { openWhatsApp, productOrderMessage } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';
import usePageMeta, { absUrl, breadcrumbLd } from '../seo/usePageMeta';
import { canonicalPath, productMeta } from '../seo/pageMeta';

export default function ProductPage() {
  const { productId } = useParams();
  const p = findProduct(productId);
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const category = p && findCategory(p.category);
  const sub = p && findSubcategory(category, p.subcategory);
  const inStock = p?.inStock !== false;
  const crumbs = [{ label: 'Home', to: '/' }];
  if (category) crumbs.push({ label: category.name, to: `/category/${category.id}` });
  if (sub) crumbs.push({ label: sub.name, to: `/category/${category.id}/${sub.id}` });
  if (p) crumbs.push({ label: p.name });

  usePageMeta(
    p
      ? {
          ...productMeta(p, sub),
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              breadcrumbLd(crumbs),
              {
                '@type': 'Product',
                name: p.name,
                sku: p.id,
                ...(p.image ? { image: /^https?:/.test(p.image) ? p.image : absUrl(p.image) } : {}),
                ...(p.description || p.shortDescription ? { description: p.description || p.shortDescription } : {}),
                ...(sub ? { category: `${category.name} > ${sub.name}` } : {}),
                ...(hasPrice(p.price)
                  ? {
                      offers: {
                        '@type': 'Offer',
                        price: p.price,
                        priceCurrency: 'INR',
                        availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                        url: absUrl(canonicalPath(`/product/${encodeURIComponent(p.id)}`)),
                      },
                    }
                  : {}),
              },
            ],
          },
        }
      : { title: 'Product not found', noindex: true },
  );

  if (!p) return <NotFoundPage />;
  const off = discountPercent(p.price, p.mrp);

  return (
    <>
      <PageBanner crumbs={crumbs} title={p.name} />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
        <Box
          sx={{
            display: 'grid', gap: { xs: 3, md: 5 }, gridTemplateColumns: { xs: '1fr', md: '1fr 1.1fr' },
            bgcolor: 'background.paper', borderRadius: 5, border: 1, borderColor: 'divider', overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <ProductImage product={p} height="100%" sx={{ minHeight: { xs: 280, md: 480 } }} />
            {off > 0 && <Chip label={`Save ${off}%`} sx={{ position: 'absolute', top: 16, left: 16, bgcolor: '#FEF3C7', color: '#92400E' }} />}
          </Box>

          <Box sx={{ p: { xs: 3, md: 4 } }}>
            {sub && (
              <Typography variant="overline" color="primary">
                {sub.name}
              </Typography>
            )}
            <Typography variant="h4" component="h2" sx={{ fontSize: { xs: 24, md: 30 } }}>
              {p.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Product code: {p.id}
            </Typography>

            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'baseline', mt: 2, flexWrap: 'wrap' }}>
              <Typography sx={{ fontSize: hasPrice(p.price) ? 30 : 20, fontWeight: 700 }}>{formatPrice(p.price)}</Typography>
              {off > 0 && (
                <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  {formatPrice(p.mrp)}
                </Typography>
              )}
              <Chip
                size="small"
                label={inStock ? 'Available' : 'Out of stock'}
                sx={inStock ? { bgcolor: '#DCFCE7', color: '#166534' } : { bgcolor: '#FEE2E2', color: '#991B1B' }}
              />
            </Stack>

            {p.description && (
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                {p.description}
              </Typography>
            )}

            {p.features?.length > 0 && (
              <List dense disablePadding sx={{ mt: 2 }}>
                {p.features.map((f) => (
                  <ListItem key={f} disableGutters sx={{ alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 30, mt: 0.5 }}>
                      <CheckRoundedIcon fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText primary={f} />
                  </ListItem>
                ))}
              </List>
            )}

            {p.specs && Object.keys(p.specs).length > 0 && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                  Specifications
                </Typography>
                <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
                  <Table size="small">
                    <TableBody>
                      {Object.entries(p.specs).map(([k, v]) => (
                        <TableRow key={k} sx={{ '&:nth-of-type(odd)': { bgcolor: '#F8FAFD' }, '&:last-child td': { border: 0 } }}>
                          <TableCell sx={{ color: 'text.secondary', width: '45%' }}>{k}</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>{v}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </>
            )}

            <Divider sx={{ my: 3 }} />

            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 2 }}>
              <Typography sx={{ fontWeight: 700 }}>Quantity</Typography>
              <QuantityPicker value={qty} onChange={setQty} />
              {hasPrice(p.price) && (
                <Typography color="text.secondary" sx={{ ml: 'auto !important' }}>
                  Total <b>{formatPrice(p.price * qty)}</b>
                </Typography>
              )}
            </Stack>

            <Stack spacing={1.25}>
              <WhatsAppButton size="large" fullWidth disabled={!inStock} onClick={() => openWhatsApp(productOrderMessage(p, qty))}>
                Order on WhatsApp
              </WhatsAppButton>
              <Button size="large" fullWidth variant="outlined" disabled={!inStock} startIcon={<AddShoppingCartRoundedIcon />} onClick={() => add(p, qty)}>
                Add to list
              </Button>
            </Stack>
          </Box>
        </Box>

        {sub && (
          <Box sx={{ mt: 4 }}>
            <Button component={RouterLink} to={`/category/${category.id}/${sub.id}`} variant="outlined">
              ← More in {sub.name}
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}
