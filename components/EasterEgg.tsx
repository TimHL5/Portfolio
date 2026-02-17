'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function Confetti() {
  const particles = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.3,
      size: Math.random() * 8 + 4,
      color: ['#FF9500', '#FFB84D', '#FFD699', '#F5F0EB', '#00C9A7'][Math.floor(Math.random() * 5)],
      rotation: Math.random() * 360,
      drift: (Math.random() - 0.5) * 200,
    })),
  []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: '-2%',
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: '2px',
          }}
          initial={{ y: 0, x: 0, rotate: p.rotation, opacity: 1 }}
          animate={{
            y: window.innerHeight + 100,
            x: p.drift,
            rotate: p.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: p.delay,
            ease: [0.23, 1, 0.32, 1],
          }}
        />
      ))}
    </motion.div>
  );
}

export default function EasterEgg() {
  const [triggered, setTriggered] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      setSequence((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.length === KONAMI.length && next.every((k, i) => k === KONAMI[i])) {
          setTriggered(true);
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (triggered) {
      const timer = setTimeout(() => {
        setTriggered(false);
        setSequence([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [triggered]);

  return (
    <AnimatePresence>
      {triggered && <Confetti />}
    </AnimatePresence>
  );
}
