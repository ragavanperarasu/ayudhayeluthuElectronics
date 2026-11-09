import { Box } from '@mui/material';
import { motion } from 'motion/react';

// MUI Box that also accepts Motion animation props (initial, animate, whileInView…)
export const MotionBox = motion.create(Box);

export const EASE = [0.22, 1, 0.36, 1];

// Fades + slides its content in the first time it scrolls into view.
export function Reveal({ children, delay = 0, y = 28, x = 0, duration = 0.7, amount = 0.2, ...props }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE, delay }}
      {...props}
    >
      {children}
    </MotionBox>
  );
}

const gridVariants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
};

// Grid whose children animate in one after another. Wrap each child in <StaggerItem>.
export function StaggerGrid({ children, sx, amount = 0.15 }) {
  return (
    <MotionBox variants={gridVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount }} sx={sx}>
      {children}
    </MotionBox>
  );
}

export function StaggerItem({ children, sx }) {
  return (
    <MotionBox variants={itemVariants} sx={{ height: '100%', ...sx }}>
      {children}
    </MotionBox>
  );
}
