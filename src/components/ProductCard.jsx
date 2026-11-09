import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import ProductImage from './ProductImage';
import { discountPercent, formatPrice, hasPrice } from '../utils/format';
import { openWhatsApp, productOrderMessage } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const off = discountPercent(product.price, product.mrp);
  const inStock = product.inStock !== false;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 18px 40px rgba(11,27,63,.12)',
          borderColor: 'primary.light',
          '& .product-img': { transform: 'scale(1.06)' },
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to={`/product/${encodeURIComponent(product.id)}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box sx={{ position: 'relative' }}>
          <ProductImage product={product} />
          <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 12, left: 12 }}>
            {product.tag && <Chip size="small" label={product.tag} color="primary" />}
            {off > 0 && <Chip size="small" label={`${off}% OFF`} sx={{ bgcolor: '#FEF3C7', color: '#92400E' }} />}
          </Stack>
          {!inStock && (
            <Chip size="small" label="Out of stock" sx={{ position: 'absolute', top: 12, right: 12, bgcolor: '#FEE2E2', color: '#991B1B' }} />
          )}
        </Box>
        <Box sx={{ p: 2.5, flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontSize: 17, lineHeight: 1.3 }}>
            {product.name}
          </Typography>
          {product.shortDescription && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {product.shortDescription}
            </Typography>
          )}
        </Box>
      </CardActionArea>

      <Box sx={{ px: 2.5, pb: 2.5 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline', mb: 2 }}>
          <Typography sx={{ fontSize: hasPrice(product.price) ? 22 : 16, fontWeight: 700 }}>{formatPrice(product.price)}</Typography>
          {off > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              {formatPrice(product.mrp)}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            fullWidth
            variant="contained"
            disabled={!inStock}
            startIcon={<WhatsAppIcon />}
            onClick={() => openWhatsApp(productOrderMessage(product, 1))}
            sx={{ bgcolor: '#25D366', '&:hover': { bgcolor: '#1DA851' } }}
          >
            Order now
          </Button>
          <Tooltip title="Add to order list">
            <span>
              <IconButton
                aria-label={`Add ${product.name} to order list`}
                disabled={!inStock}
                onClick={() => add(product, 1)}
                sx={{ border: 1, borderColor: 'divider', borderRadius: 3, height: '100%' }}
              >
                <AddShoppingCartRoundedIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Box>
    </Card>
  );
}
