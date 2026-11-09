import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CategoryIcon from './CategoryIcon';
import { resolveImage } from '../utils/format';

// Used for both main categories (home page) and sub-categories (category page).
// `to` opens a page; `onWhatsApp` (instead of `to`) sends a WhatsApp request when clicked.
// `chips` (optional) lists sub-category names; `count` (optional) shows how many items it has.
export default function CategoryCard({ to, onWhatsApp, title, description, image, imageAlt, icon, chips, count, cta = 'Explore' }) {
  const action = onWhatsApp ? { onClick: onWhatsApp } : { component: RouterLink, to };
  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 18px 40px rgba(11,27,63,.14)',
          borderColor: 'primary.light',
          '& .cat-img': { transform: 'scale(1.06)' },
          '& .cat-cta': { gap: 1.25 },
        },
      }}
    >
      <CardActionArea {...action} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <Box sx={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', bgcolor: '#0B1B3F' }}>
          <Box
            component="img"
            className="cat-img"
            src={resolveImage(image)}
            alt={imageAlt || title}
            width={800}
            height={600}
            loading="lazy"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .45s ease' }}
          />
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 45%, rgba(11,27,63,.75) 100%)' }} />
          {icon && (
            <Box
              sx={{
                position: 'absolute', left: 16, bottom: 16, width: 44, height: 44, borderRadius: 2.5,
                display: 'grid', placeItems: 'center', color: '#fff', bgcolor: 'primary.main', boxShadow: '0 6px 16px rgba(0,0,0,.3)',
              }}
            >
              <CategoryIcon name={icon} />
            </Box>
          )}
          {typeof count === 'number' && count > 0 && (
            <Chip
              size="small"
              label={`${count} item${count > 1 ? 's' : ''}`}
              sx={{ position: 'absolute', top: 12, right: 12, bgcolor: 'rgba(255,255,255,.95)', color: 'text.primary', boxShadow: '0 2px 10px rgba(11,27,63,.25)' }}
            />
          )}
        </Box>
        <Box sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ fontSize: 19, lineHeight: 1.3 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
          {chips?.length > 0 && (
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75, mt: 2 }}>
              {chips.map((c) => (
                <Chip key={c} size="small" label={c} variant="outlined" />
              ))}
            </Stack>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {onWhatsApp ? (
            <Stack
              direction="row"
              className="cat-cta"
              sx={{
                alignSelf: 'flex-start', alignItems: 'center', gap: 1, mt: 2.5, px: 2, py: 1, borderRadius: 2.5,
                typography: 'body2', fontWeight: 700, // use the site font (the clickable card is a <button>)
                bgcolor: '#25D366', color: '#fff', transition: 'gap .2s ease, background-color .2s ease',
                '.MuiCardActionArea-root:hover &': { bgcolor: '#1DA851' },
              }}
            >
              <WhatsAppIcon fontSize="small" /> {cta}
            </Stack>
          ) : (
            <Stack
              direction="row"
              className="cat-cta"
              sx={{ alignItems: 'center', gap: 0.75, mt: 2.5, color: 'primary.main', fontWeight: 700, transition: 'gap .2s ease' }}
            >
              {cta} <ArrowForwardRoundedIcon fontSize="small" />
            </Stack>
          )}
        </Box>
      </CardActionArea>
    </Card>
  );
}
