import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { resolveImage } from '../utils/format';
import { EASE, MotionBox } from './motion/Reveal';
import CircuitLines from './motion/CircuitLines';

const bannerRise = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };

// Dark banner at the top of inner pages: breadcrumbs, title, description, optional photo.
// crumbs: [{ label, to }] — the last one is the current page (no link)
export default function PageBanner({ crumbs = [], title, description, image, children }) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        bgcolor: '#0B1B3F',
      }}
    >
      {image && (
        <MotionBox
          aria-hidden
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: 'easeOut' }}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${resolveImage(image)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.35,
          }}
        />
      )}
      <CircuitLines style={{ opacity: 0.35, maskImage: 'linear-gradient(90deg, transparent 30%, #000 75%)', WebkitMaskImage: 'linear-gradient(90deg, transparent 30%, #000 75%)' }} />
      <Box
        aria-hidden
        sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(11,27,63,.97) 0%, rgba(11,27,63,.85) 45%, rgba(14,74,122,.55) 100%)' }}
      />
      <MotionBox
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        sx={{ position: 'relative' }}
      >
      <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 5, md: 7 } }}>
        {crumbs.length > 0 && (
          <MotionBox variants={bannerRise}>
          <Breadcrumbs
            separator={<NavigateNextRoundedIcon fontSize="small" sx={{ color: 'rgba(255,255,255,.5)' }} />}
            sx={{ mb: 2, '& .MuiBreadcrumbs-ol': { flexWrap: 'wrap' } }}
          >
            {crumbs.map((c, i) =>
              i < crumbs.length - 1 ? (
                <Link key={c.label} component={RouterLink} to={c.to} underline="hover" sx={{ color: 'rgba(255,255,255,.75)', fontSize: 14 }}>
                  {c.label}
                </Link>
              ) : (
                <Typography key={c.label} sx={{ color: '#7DD3FC', fontSize: 14, fontWeight: 700 }}>
                  {c.label}
                </Typography>
              ),
            )}
          </Breadcrumbs>
          </MotionBox>
        )}
        <MotionBox variants={bannerRise}>
          <Typography variant="h2" component="h1" sx={{ fontSize: { xs: 30, sm: 38, md: 46 }, lineHeight: 1.15, maxWidth: 760 }}>
            {title}
          </Typography>
        </MotionBox>
        <MotionBox
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } } }}
          sx={{ width: 72, height: 4, mt: 2, borderRadius: 2, transformOrigin: 'left', background: 'linear-gradient(90deg,#38BDF8,#22D3EE)' }}
        />
        {description && (
          <MotionBox variants={bannerRise}>
            <Typography sx={{ mt: 2, fontSize: { xs: 16, md: 18 }, color: 'rgba(255,255,255,.8)', maxWidth: 680 }}>
              {description}
            </Typography>
          </MotionBox>
        )}
        {children}
      </Container>
      </MotionBox>
    </Box>
  );
}
