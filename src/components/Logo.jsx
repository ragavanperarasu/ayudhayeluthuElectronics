import { Link as RouterLink } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';

// Gugi is used only for the shop name
const brandFont = '"Gugi", "PT Serif", sans-serif';

export default function Logo({ light = false }) {
  return (
    <Stack
      direction="row"
      spacing={1.25}
      component={RouterLink}
      to="/"
      sx={{ alignItems: 'center', textDecoration: 'none', color: 'inherit', minWidth: 0 }}
    >
      {/* Shop logo — small copies of public/logo-color.png (two-colour version of logo.jpeg).
          Header: transparent PNG, no border.  Footer (light): white tile so the dark letters show on navy. */}
      <Box
        component="img"
        src={`${import.meta.env.BASE_URL}${light ? 'logo-192.jpg' : 'logo-192.png'}`}
        alt="Ayudhayeluthu Electronics logo"
        sx={{
          width: 46,
          height: 46,
          flexShrink: 0,
          objectFit: 'contain',
          ...(light && { borderRadius: 2.5, bgcolor: '#fff' }),
        }}
      />
      <Box sx={{ lineHeight: 1, minWidth: 0 }}>
        <Typography
          sx={{ fontFamily: brandFont, fontWeight: 400, fontSize: { xs: 17, sm: 19 }, letterSpacing: '0.01em', color: light ? '#fff' : 'text.primary', whiteSpace: 'nowrap' }}
        >
          Ayudhayeluthu
        </Typography>
        <Typography
          sx={{ fontFamily: brandFont, fontWeight: 400, fontSize: 11, letterSpacing: '0.24em', mt: 0.25, textTransform: 'uppercase', color: light ? 'secondary.light' : 'primary.main' }}
        >
          Electronics
        </Typography>
      </Box>
    </Stack>
  );
}
