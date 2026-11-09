import { motion, useScroll, useSpring } from 'motion/react';

// Thin gradient bar at the very top that fills as the page is scrolled.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: '0% 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 2000,
        background: 'linear-gradient(90deg, #2563EB, #06B6D4, #22D3EE)',
      }}
    />
  );
}
