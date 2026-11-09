import { Box, Typography } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { MotionBox } from './motion/Reveal';

export default function EmptyState({ title, text, action, icon: Icon = Inventory2OutlinedIcon }) {
  return (
    <Box
      sx={{
        textAlign: 'center', py: { xs: 7, md: 9 }, px: 3, borderRadius: 5,
        border: '2px dashed', borderColor: 'divider', bgcolor: 'background.paper',
      }}
    >
      <MotionBox
        animate={{ y: [0, -8, 0], rotate: [0, -6, 6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          width: 72, height: 72, mx: 'auto', mb: 2.5, borderRadius: '50%', display: 'grid', placeItems: 'center',
          bgcolor: 'rgba(37,99,235,.08)', color: 'primary.main',
        }}
      >
        <Icon sx={{ fontSize: 36 }} />
      </MotionBox>
      <Typography variant="h5">{title}</Typography>
      {text && (
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 460, mx: 'auto' }}>
          {text}
        </Typography>
      )}
      {action && <Box sx={{ mt: 3 }}>{action}</Box>}
    </Box>
  );
}
