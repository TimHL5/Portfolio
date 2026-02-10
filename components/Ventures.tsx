'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VENTURES } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';
import VentureCard from './VentureCard';

export default function Ventures() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.scrollWidth / VENTURES.length;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, VENTURES.length - 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setIsDragging(true);
    dragStart.current = { x: e.pageX, scrollLeft: container.scrollLeft };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const dx = e.pageX - dragStart.current.x;
    scrollContainerRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const handleMouseUp = () => setIsDragging(false);

  const scrollTo = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / VENTURES.length;
    container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
  };

  return (
    <section
      id="ventures"
      ref={sectionRef}
      className="relative py-32 md:py-48"
    >
      {/* Section header */}
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <motion.div
          className="font-mono text-caption text-offwhite/30 uppercase tracking-[0.3em] mb-6"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          S.03 &mdash; Ventures
        </motion.div>
        <motion.h2
          className="text-heading font-serif"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          What I&rsquo;m Building
        </motion.h2>
        <motion.p
          className="text-body-lg text-offwhite/40 font-sans mt-4 max-w-lg"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Each venture is a bet on a problem worth solving. Drag to explore.
        </motion.p>
      </div>

      {/* Horizontal scroll container */}
      <motion.div
        ref={scrollContainerRef}
        className="flex gap-6 px-6 md:px-12 lg:px-24 overflow-x-auto horizontal-scroll snap-x snap-mandatory pb-8"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {VENTURES.map((venture, i) => (
          <VentureCard
            key={venture.name}
            {...venture}
            fullName={venture.fullName}
            programs={venture.programs}
            markets={venture.markets}
            link={venture.link}
            press={venture.press}
            index={i}
            isActive={i === activeIndex}
          />
        ))}
        {/* Spacer for scroll padding */}
        <div className="min-w-[1px] flex-shrink-0" />
      </motion.div>

      {/* Progress dots */}
      <div className="flex justify-center gap-3 mt-8">
        {VENTURES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-amber w-8'
                : 'bg-offwhite/20 hover:bg-offwhite/40'
            }`}
            aria-label={`Go to venture ${i + 1}`}
          />
        ))}
      </div>

      {/* Decorative */}
      <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 font-mono text-caption text-offwhite/15">
        <div>S.03</div>
      </div>
    </section>
  );
}
