'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MagneticHeadingProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticHeading({
  children,
  className = '',
  strength = 0.12,
}: MagneticHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);
      if (dist < 300) {
        setOffset({ x: distX * strength, y: distY * strength });
      }
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
