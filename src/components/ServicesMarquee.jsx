import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'motion/react';
import CategoryIcon from './CategoryIcon';
import categories from '../data/categories';

// Endless scrolling strip of every sub-category, shown under the hero.
const items = categories.flatMap((c) => c.subcategories.map((s) => ({ name: s.name, icon: c.icon })));

export default function ServicesMarquee() {
  const row = [...items, ...items]; // duplicated so the loop is seamless
  return (
    <Box
      aria-hidden
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        py: 2,
        maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <motion.div
        style={{ display: 'flex', width: 'max-content' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
      >
        {row.map((it, i) => (
          <Stack key={i} direction="row" spacing={1.25} sx={{ alignItems: 'center', px: 3.5, color: 'text.secondary', whiteSpace: 'nowrap' }}>
            <CategoryIcon name={it.icon} sx={{ fontSize: 20, color: 'primary.main' }} />
            <Typography sx={{ fontWeight: 700, fontSize: 15 }}>{it.name}</Typography>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'secondary.main', ml: 3.5, opacity: 0.6 }} />
          </Stack>
        ))}
      </motion.div>
    </Box>
  );
}
