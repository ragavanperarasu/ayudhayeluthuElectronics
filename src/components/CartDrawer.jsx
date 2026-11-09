import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ProductImage from './ProductImage';
import QuantityPicker from './QuantityPicker';
import WhatsAppButton from './WhatsAppButton';
import { useCart } from '../context/CartContext';
import { formatPrice, hasPrice } from '../utils/format';
import { cartOrderMessage, openWhatsApp } from '../utils/whatsapp';

export default function CartDrawer({ open, onClose }) {
  const { lines, total, count, hasUnpriced, setQty, remove, clear } = useCart();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: '100vw', sm: 420 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" sx={{ alignItems: 'center', px: 3, py: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Your order list {count > 0 && <Typography component="span" color="text.secondary">({count})</Typography>}
          </Typography>
          <IconButton onClick={onClose} aria-label="Close order list">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Divider />

        {lines.length === 0 ? (
          <Stack spacing={1.5} sx={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', p: 4, textAlign: 'center' }}>
            <ShoppingBagOutlinedIcon sx={{ fontSize: 56, color: 'text.disabled' }} />
            <Typography sx={{ fontWeight: 700 }}>Your list is empty</Typography>
            <Typography variant="body2" color="text.secondary">
              Add products to your list, then send the whole order to us in one WhatsApp message.
            </Typography>
            <Button variant="outlined" component={RouterLink} to="/" onClick={onClose}>
              Browse products
            </Button>
          </Stack>
        ) : (
          <>
            <Stack divider={<Divider flexItem />} sx={{ flexGrow: 1, overflowY: 'auto', px: 3 }}>
              {lines.map(({ id, qty, product }) => (
                <Stack key={id} direction="row" spacing={2} sx={{ py: 2, alignItems: 'center' }}>
                  <ProductImage product={product} height={72} sx={{ width: 72, borderRadius: 2, flexShrink: 0 }} />
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {hasPrice(product.price) ? `${formatPrice(product.price)} each` : 'Price on request'}
                    </Typography>
                    <Stack direction="row" sx={{ alignItems: 'center', mt: 1, justifyContent: 'space-between' }}>
                      <QuantityPicker size="small" value={qty} onChange={(q) => setQty(id, q)} />
                      {hasPrice(product.price) && <Typography sx={{ fontWeight: 700 }}>{formatPrice(product.price * qty)}</Typography>}
                    </Stack>
                  </Box>
                  <IconButton aria-label={`Remove ${product.name}`} onClick={() => remove(id)} size="small">
                    <DeleteOutlineRoundedIcon fontSize="small" />
                  </IconButton>
                </Stack>
              ))}
            </Stack>

            <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider', bgcolor: '#F8FAFD' }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 2 }}>
                <Typography color="text.secondary">Total</Typography>
                <Typography sx={{ fontWeight: 800, fontSize: 20 }}>{formatPrice(total)}</Typography>
              </Stack>
              {hasUnpriced && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: -1.5, mb: 2 }}>
                  + items with price on request
                </Typography>
              )}
              <WhatsAppButton size="large" fullWidth onClick={() => openWhatsApp(cartOrderMessage(lines))}>
                Send order on WhatsApp
              </WhatsAppButton>
              <Button fullWidth size="small" onClick={clear} sx={{ mt: 1, color: 'text.secondary' }}>
                Clear list
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}
