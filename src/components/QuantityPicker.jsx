import { IconButton, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

export default function QuantityPicker({ value, onChange, min = 1, size = 'medium' }) {
  return (
    <Stack
      direction="row"
      sx={{ alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 3, width: 'fit-content', bgcolor: 'background.paper' }}
    >
      <IconButton size={size} aria-label="Decrease quantity" onClick={() => onChange(value - 1)} disabled={value <= min}>
        <RemoveRoundedIcon fontSize="small" />
      </IconButton>
      <Typography sx={{ minWidth: 32, textAlign: 'center', fontWeight: 700 }}>{value}</Typography>
      <IconButton size={size} aria-label="Increase quantity" onClick={() => onChange(value + 1)}>
        <AddRoundedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
