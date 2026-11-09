import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Divider, Link, Stack, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Logo from './Logo';
import { SITE } from '../config';
import categories from '../data/categories';

const linkSx = { color: 'inherit' };

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#0B1B3F', color: 'rgba(255,255,255,.75)' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1.3fr 1fr 1fr' } }}>
          <Box>
            <Logo light />
            <Typography variant="body2" sx={{ mt: 2, maxWidth: 360 }}>
              {SITE.tagline}
            </Typography>
          </Box>
          <Stack spacing={1}>
            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>Categories</Typography>
            {categories.map((c) => (
              <Link key={c.id} component={RouterLink} to={`/category/${c.id}`} underline="hover" variant="body2" sx={linkSx}>
                {c.name}
              </Link>
            ))}
          </Stack>
          <Stack spacing={1}>
            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>Quick links</Typography>
            <Link component={RouterLink} to="/" underline="hover" variant="body2" sx={linkSx}>Home</Link>
            <Link component={RouterLink} to="/about" underline="hover" variant="body2" sx={linkSx}>About</Link>
          </Stack>
          {SITE.owner.linkedin && (
            <Stack spacing={1}>
              <Typography sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>Connect</Typography>
              <Link
                href={SITE.owner.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                variant="body2"
                sx={{ ...linkSx, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <LinkedInIcon fontSize="small" sx={{ color: '#4A9EDB' }} /> LinkedIn
              </Link>
            </Stack>
          )}
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,.12)', my: 4 }} />
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
