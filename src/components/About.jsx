import { Avatar, Box, Button, Container, Stack, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CategoryIcon from './CategoryIcon';
import { MotionBox, Reveal, StaggerGrid, StaggerItem } from './motion/Reveal';
import WhatsAppButton from './WhatsAppButton';
import { SITE } from '../config';
import { resolveImage } from '../utils/format';
import { customOrderMessage, openWhatsApp } from '../utils/whatsapp';


const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function About() {
  const { owner, services } = SITE;

  return (
    <Box component="section" id="about" sx={{ py: { xs: 7, md: 10 }, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gap: { xs: 5, md: 8 }, gridTemplateColumns: { xs: '1fr', md: '360px 1fr' }, alignItems: 'start' }}>
          {/* Profile card */}
          <MotionBox
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            sx={{
              position: { md: 'sticky' },
              top: { md: 100 },
              borderRadius: 5,
              overflow: 'hidden',
              border: 1,
              borderColor: 'divider',
              bgcolor: 'background.default',
            }}
          >
            <Box sx={{ height: 110, background: 'linear-gradient(135deg, #0B1B3F 0%, #102A63 55%, #0E4A7A 100%)', position: 'relative' }}>
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.2,
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                }}
              />
            </Box>
            <Stack sx={{ alignItems: 'center', textAlign: 'center', px: 3, pb: 3.5, mt: '-80px', position: 'relative' }}>
              {/* gradient ring around the photo (slowly rotating colours) */}
              <Box
                sx={{
                  p: '5px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from var(--ring-angle, 0deg), #2563EB, #06B6D4, #22D3EE, #2563EB)',
                  animation: 'ring-spin 6s linear infinite',
                  boxShadow: '0 12px 32px rgba(11,27,63,.25)',
                }}
              >
                <Avatar
                  src={owner.photo ? resolveImage(owner.photo) : undefined}
                  alt={owner.name}
                  sx={{
                    width: 140,
                    height: 140,
                    fontSize: 44,
                    fontWeight: 800,
                    border: '5px solid #fff',
                    background: 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
                    // slight zoom toward the face
                    '& img': { transform: 'scale(1.12)', transformOrigin: '50% 25%' },
                  }}
                >
                  {initials(owner.name)}
                </Avatar>
              </Box>
              <Typography variant="h5" component="p" sx={{ mt: 2 }}>
                {owner.name}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {owner.role}
              </Typography>

              <Stack spacing={1.25} sx={{ width: '100%', mt: 3 }}>
                <WhatsAppButton fullWidth onClick={() => openWhatsApp(customOrderMessage())}>
                  Request a custom product
                </WhatsAppButton>
                {owner.linkedin && (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LinkedInIcon />}
                    href={owner.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: '#0A66C2', borderColor: '#0A66C2', '&:hover': { borderColor: '#0A66C2', bgcolor: 'rgba(10,102,194,.06)' } }}
                  >
                    Connect on LinkedIn
                  </Button>
                )}
              </Stack>
            </Stack>
          </MotionBox>

          {/* About text + services */}
          <Reveal x={40} y={0} duration={0.8}>
            <Typography variant="overline" color="primary">
              About me
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontSize: { xs: 30, md: 40 }, mb: 3 }}>
              Security tools, device service & custom builds
            </Typography>
            <Stack spacing={2}>
              {owner.about.map((para) => (
                <Typography key={para} color="text.secondary" sx={{ fontSize: { md: 17 }, lineHeight: 1.75 }}>
                  {para}
                </Typography>
              ))}
            </Stack>

            <StaggerGrid sx={{ display: 'grid', gap: 2, mt: 5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' } }}>
              {services.map(({ icon, title, text }) => {
                return (
                  <StaggerItem key={title}>
                  <Box sx={{ p: 2.5, height: '100%', borderRadius: 4, border: 1, borderColor: 'divider', bgcolor: 'background.default', transition: 'transform .3s ease, box-shadow .3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 14px 30px rgba(11,27,63,.1)' } }}>
                    <Box
                      sx={{
                        width: 44, height: 44, borderRadius: 2.5, display: 'grid', placeItems: 'center', mb: 2,
                        color: 'primary.main', bgcolor: 'rgba(37,99,235,.1)',
                      }}
                    >
                      <CategoryIcon name={icon} />
                    </Box>
                    <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                      {text}
                    </Typography>
                  </Box>
                  </StaggerItem>
                );
              })}
            </StaggerGrid>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
