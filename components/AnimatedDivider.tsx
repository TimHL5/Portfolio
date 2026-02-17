'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

export default function AnimatedDivider() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });

  return (
    <div ref={ref} className="w-full py-1">
      <motion.div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 149, 0, 0.2) 30%, rgba(245, 240, 235, 0.1) 50%, rgba(255, 149, 0, 0.2) 70%, transparent)',
          transformOrigin: 'center',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      />
    </div>
  );
}
