import { Box, Container, Stack, Typography } from '@mui/material';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import { MotionBox, Reveal, StaggerGrid, StaggerItem } from './motion/Reveal';

const steps = [
  { icon: TouchAppRoundedIcon, title: 'Choose a product or service', text: 'Open a category, pick a sub-category and check the details of the item you need.' },
  { icon: WhatsAppIcon, title: 'Send it on WhatsApp', text: 'Tap “Order on WhatsApp”. Your order details are filled in automatically — just press send.' },
  { icon: LocalShippingRoundedIcon, title: 'Confirm & receive', text: 'We confirm availability, payment and delivery with you directly in the chat.' },
];

export default function HowToOrder() {
  return (
    <Box component="section" id="how-to-order" sx={{ py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <Reveal>
        <Stack spacing={1} sx={{ mb: 5, textAlign: { xs: 'left', md: 'center' }, alignItems: { md: 'center' } }}>
          <Typography variant="overline" color="primary">
            Simple ordering
          </Typography>
          <Typography variant="h3" component="h2" sx={{ fontSize: { xs: 30, md: 40 } }}>
            How to order
          </Typography>
        </Stack>
        </Reveal>
        <StaggerGrid sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          {steps.map(({ icon: Icon, title, text }, i) => (
            <StaggerItem key={title}>
            <MotionBox
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              sx={{
                p: 3.5, height: '100%', borderRadius: 4, border: 1, borderColor: 'divider', bgcolor: 'background.paper', position: 'relative',
                transition: 'box-shadow .3s ease, border-color .3s ease',
                '&:hover': { boxShadow: '0 18px 40px rgba(11,27,63,.12)', borderColor: 'primary.light' },
                '&:hover .step-icon': { transform: 'rotate(-8deg) scale(1.1)' },
              }}
            >
              <Typography sx={{ position: 'absolute', top: 18, right: 24, fontSize: 44, fontWeight: 800, color: 'divider', lineHeight: 1 }}>
                0{i + 1}
              </Typography>
              <Box
                className="step-icon"
                sx={{
                  transition: 'transform .3s ease',
                  width: 52, height: 52, borderRadius: 3, display: 'grid', placeItems: 'center', mb: 2.5, color: '#fff',
                  background: i === 1 ? '#25D366' : 'linear-gradient(135deg,#2563EB,#06B6D4)',
                }}
              >
                <Icon />
              </Box>
              <Typography variant="h6">{title}</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {text}
              </Typography>
            </MotionBox>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </Container>
    </Box>
  );
}
