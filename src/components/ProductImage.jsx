import { useState } from 'react';
import { Box } from '@mui/material';
import MemoryIcon from '@mui/icons-material/Memory';
import { resolveImage } from '../utils/format';

// Shows the product photo, or a neat placeholder if the image is missing.
export default function ProductImage({ product, height = 220, sx }) {
  const [failed, setFailed] = useState(false);
  const src = resolveImage(product.image);

  return (
    <Box
      sx={{
        height,
        display: 'grid',
        placeItems: 'center',
        background: 'radial-gradient(circle at 30% 20%, #FFFFFF 0%, #EEF3FB 60%, #E3EBF8 100%)',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {src && !failed ? (
        <Box
          component="img"
          src={src}
          alt={product.name}
          loading="lazy"
          onError={() => setFailed(true)}
          sx={{ width: '86%', height: '86%', objectFit: 'contain', transition: 'transform .35s ease' }}
          className="product-img"
        />
      ) : (
        <MemoryIcon sx={{ fontSize: 72, color: 'primary.light', opacity: 0.6 }} />
      )}
    </Box>
  );
}
