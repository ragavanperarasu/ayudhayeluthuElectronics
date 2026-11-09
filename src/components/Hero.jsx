import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { SITE } from '../config';
import categories from '../data/categories';
import { resolveImage } from '../utils/format';
import CircuitLines from './motion/CircuitLines';
import { EASE, MotionBox } from './motion/Reveal';

const sub = (catId, subId) => categories.find((c) => c.id === catId).subcategories.find((s) => s.id === subId);
const hacking = categories.find((c) => c.id === 'ethical-hacking');
const showcase = [
  { image: hacking.image, alt: hacking.imageAlt, label: 'Ethical hacking' },
  { ...sub('device-service', 'laptop-service'), label: 'Laptop service' },
  { ...sub('device-service', 'mobile-service'), label: 'Mobile service' },
  { ...sub('custom-projects', 'prototype-building'), label: 'Prototypes' },
].map((s) => ({ image: s.image, alt: s.alt || s.imageAlt, label: s.label }));

// Phrases that rotate in the headline
const PHRASES = ['ethical hacking tools', 'laptop & mobile repair', 'custom-built projects', 'custom PCB design', 'websites & mobile apps'];

// entrance animation for the left column, one element after another
const column = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const rise = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

function RotatingPhrase() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % PHRASES.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <Box component="span" sx={{ display: 'block', position: 'relative', minHeight: { xs: '2.3em', sm: '1.2em' } }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={PHRASES[i]}
          aria-hidden
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -26, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            display: 'inline-block',
            background: 'linear-gradient(90deg,#38BDF8,#22D3EE,#7DD3FC,#38BDF8)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: 'shimmer 4s linear infinite',
          }}
        >
          {PHRASES[i]}
        </motion.span>
      </AnimatePresence>
    </Box>
  );
}

// The four category photos, shown as a simple 2×2 grid (no animation).
function Showcase() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, maxWidth: 500, mx: 'auto', width: '100%' }}>
      {showcase.map((s, i) => (
        <Box
          key={s.image}
          sx={{
            position: 'relative', aspectRatio: '1', borderRadius: 4, overflow: 'hidden', mt: i % 2 ? '28px' : 0,
            border: '1px solid rgba(255,255,255,.18)', boxShadow: '0 24px 50px rgba(0,0,0,.35)',
          }}
        >
          <Box component="img" src={resolveImage(s.image)} alt={s.alt} width={400} height={400} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(11,27,63,.88))' }} />
          <Typography sx={{ position: 'absolute', left: 14, bottom: 12, fontWeight: 700, fontSize: 14 }}>{s.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default function Hero() {
  const scrollToCategories = () => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        background: 'linear-gradient(135deg, #0B1B3F 0%, #102A63 55%, #0E4A7A 100%)',
      }}
    >
      {/* animated background: circuit pulses + drifting glows */}
      {/* fades out towards the left so the lines never sit behind the text */}
      <CircuitLines
        style={{
          opacity: 0.9,
          maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,.08) 40%, #000 72%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,.08) 40%, #000 72%)',
        }}
      />
      <MotionBox
        aria-hidden
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 80, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute', width: 560, height: 560, right: -140, top: -180, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,.45), transparent 65%)', pointerEvents: 'none',
        }}
      />
      <MotionBox
        aria-hidden
        animate={{ x: [0, -40, 30, 0], y: [0, -30, 20, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute', width: 480, height: 480, left: -160, bottom: -220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,.5), transparent 65%)', pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 7, md: 11 } }}>
        <Box sx={{ display: 'grid', gap: { xs: 6, md: 8 }, gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' }, alignItems: 'center' }}>
          <MotionBox variants={column} initial="hidden" animate="show">
            <MotionBox variants={rise}>
              <Chip
                label={categories.map((c) => c.shortName).join(' • ')}
                sx={{
                  bgcolor: 'rgba(255,255,255,.1)', color: '#BFE9F5', border: '1px solid rgba(255,255,255,.18)', mb: 3, maxWidth: '100%',
                  backdropFilter: 'blur(6px)', height: 'auto', py: 0.5, '& .MuiChip-label': { whiteSpace: 'normal' },
                }}
              />
            </MotionBox>
            <MotionBox variants={rise}>
              <Typography variant="h2" component="h1" sx={{ fontSize: { xs: 34, sm: 46, md: 54 }, lineHeight: 1.12 }}>
                One-stop shop for
                <RotatingPhrase />
                {/* full text for search engines and screen readers */}
                <Box component="span" sx={visuallyHidden}>
                  {PHRASES.join(', ')}
                </Box>
              </Typography>
            </MotionBox>
            <MotionBox variants={rise}>
              <Typography sx={{ mt: 2.5, fontSize: { xs: 16, md: 18 }, color: 'rgba(255,255,255,.75)', maxWidth: 520 }}>
                {SITE.tagline} Choose a category to get started.
              </Typography>
            </MotionBox>

            <MotionBox variants={rise}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  size="large"
                  variant="contained"
                  endIcon={
                    <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ display: 'flex' }}>
                      <ArrowDownwardRoundedIcon />
                    </motion.span>
                  }
                  onClick={scrollToCategories}
                  sx={{ bgcolor: '#fff', color: '#0B1B3F', '&:hover': { bgcolor: '#E6EEFF' }, py: 1.5, boxShadow: '0 10px 30px rgba(34,211,238,.25)' }}
                >
                  Explore categories
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  component={RouterLink}
                  to="/about"
                  sx={{
                    color: '#fff', borderColor: 'rgba(255,255,255,.4)', py: 1.5, transition: 'all .25s ease',
                    '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,.08)', transform: 'translateY(-2px)' },
                  }}
                >
                  About us
                </Button>
              </Stack>
            </MotionBox>

            <MotionBox variants={rise}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }} sx={{ mt: 4, flexWrap: 'wrap', rowGap: 1 }}>
                {SITE.highlights.map((h) => (
                  <Stack key={h} direction="row" spacing={1} sx={{ alignItems: 'center', color: 'rgba(255,255,255,.85)' }}>
                    <CheckCircleRoundedIcon sx={{ fontSize: 18, color: '#22D3EE' }} />
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {h}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </MotionBox>
          </MotionBox>

          {/* the four category photos */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Showcase />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

const visuallyHidden = {
  position: 'absolute', width: 1, height: 1, p: 0, m: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
};
