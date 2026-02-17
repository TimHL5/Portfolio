'use client';

import { useRef } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxValues {
  ref: React.RefObject<HTMLElement | null>;
  labelX: MotionValue<number>;
  headingY: MotionValue<number>;
  contentY: MotionValue<number>;
  decorY: MotionValue<number>;
  opacity: MotionValue<number>;
}

export function useParallax(): ParallaxValues {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Section label slides in from left
  const labelX = useTransform(scrollYProgress, [0, 0.3], [-30, 0]);
  // Heading has slight upward parallax
  const headingY = useTransform(scrollYProgress, [0, 0.5], [40, -10]);
  // Content moves slightly
  const contentY = useTransform(scrollYProgress, [0.1, 0.6], [20, -5]);
  // Decorative elements at different speed
  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  // Fade based on position
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.3]);

  return { ref, labelX, headingY, contentY, decorY, opacity };
}
