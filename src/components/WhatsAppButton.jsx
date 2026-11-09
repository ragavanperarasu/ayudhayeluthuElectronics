import { Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WA = '#25D366';

export default function WhatsAppButton({ children = 'Order on WhatsApp', sx, ...props }) {
  return (
    <Button
      variant="contained"
      startIcon={<WhatsAppIcon />}
      sx={{
        bgcolor: WA,
        color: '#fff',
        '&:hover': { bgcolor: '#1DA851' },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
