import { motion } from 'motion/react';

// Decorative circuit traces with "electric pulses" running along them.
const TRACES = [
  'M0 120 H180 L220 160 H420 L460 120 H700',
  'M0 260 H120 L160 300 H360 L400 340 H620',
  'M60 0 V80 L100 120 V260 L140 300 V520',
  'M520 0 V60 L560 100 V220 L600 260 H760',
  'M0 420 H220 L260 380 H480 L520 420 H780',
  'M300 520 V440 L340 400 V300',
];
const NODES = [[180, 120], [420, 160], [360, 300], [100, 120], [560, 100], [260, 380], [480, 380], [340, 400]];

export default function CircuitLines({ style }) {
  return (
    <svg viewBox="0 0 780 520" preserveAspectRatio="xMidYMid slice" aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }}>
      <defs>
        <linearGradient id="pulse" x1="0" x2="1">
          <stop offset="0" stopColor="#22D3EE" stopOpacity="0" />
          <stop offset="0.5" stopColor="#7DD3FC" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
        </linearGradient>
      </defs>
      {TRACES.map((d, i) => (
        <g key={d}>
          <motion.path
            d={d}
            fill="none"
            stroke="rgba(125,211,252,.16)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.2 + i * 0.15, ease: 'easeInOut' }}
          />
          <motion.path
            d={d}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="28 900"
            initial={{ strokeDashoffset: 0, opacity: 0 }}
            animate={{ strokeDashoffset: -928, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4 + (i % 3), delay: 1.5 + i * 0.7, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
            style={{ filter: 'drop-shadow(0 0 6px #22D3EE)' }}
          />
        </g>
      ))}
      {NODES.map(([cx, cy], i) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="#0B1B3F"
          stroke="#38BDF8"
          strokeWidth="1.5"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, delay: 1 + i * 0.3, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}
