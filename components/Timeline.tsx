'use client';

import { motion } from 'framer-motion';
import { EXPERIENCE } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';

const statusConfig = {
  upcoming: { label: 'Upcoming', className: 'status-upcoming' },
  active: { label: 'Active', className: 'status-active' },
  completed: { label: 'Completed', className: 'status-completed' },
};

function EntryCard({
  entry,
  align,
  className = '',
}: {
  entry: (typeof EXPERIENCE)[number];
  align: 'left' | 'right';
  className?: string;
}) {
  const config = statusConfig[entry.status];
  return (
    <div className={`bg-charcoal-mid border border-offwhite/5 rounded-sm p-4 md:p-6 max-w-md w-full ${className}`}>
      <div className={`flex items-center gap-2 mb-3 ${align === 'right' ? 'md:justify-end' : ''}`}>
        <span className={`status-dot ${config.className}`} />
        <span className="font-mono text-caption text-offwhite/30 uppercase tracking-widest">
          {config.label}
        </span>
      </div>
      <h4 className="text-subheading font-serif text-offwhite/90 mb-1">
        {entry.company}
      </h4>
      <div className="font-sans text-body text-offwhite/60 mb-1">
        {entry.role}
      </div>
      <div className="font-mono text-caption text-offwhite/30 mb-3">
        {entry.period}
      </div>
      <p className="text-body text-offwhite/40 font-sans">
        {entry.description}
      </p>
    </div>
  );
}

function TimelineEntry({
  entry,
  index,
}: {
  entry: (typeof EXPERIENCE)[number];
  index: number;
}) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="mb-8 md:mb-16 last:mb-0">
      {/* Mobile layout - simple stack */}
      <div className="md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <EntryCard entry={entry} align="left" />
        </motion.div>
      </div>

      {/* Desktop layout - alternating sides */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8">
        {/* Left column */}
        <div className={isEven ? 'text-right' : 'order-3'}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            {isEven && <EntryCard entry={entry} align="right" />}
          </motion.div>
        </div>

        {/* Center line */}
        <div className="flex flex-col items-center relative">
          <motion.div
            className="w-3 h-3 rounded-full border-2 z-10"
            style={{
              borderColor:
                entry.status === 'upcoming'
                  ? '#FF9500'
                  : entry.status === 'active'
                  ? '#00C9A7'
                  : '#888888',
              backgroundColor:
                entry.status === 'active' ? '#00C9A7' : 'transparent',
            }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.4, type: 'spring' }}
          />
          {index < EXPERIENCE.length - 1 && (
            <motion.div
              className="w-px flex-1 bg-offwhite/10 mt-2"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ transformOrigin: 'top' }}
            />
          )}
        </div>

        {/* Right column */}
        <div className={isEven ? 'order-3' : ''}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            {!isEven && <EntryCard entry={entry} align="left" />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
    >
      <motion.div
        className="font-mono text-caption text-offwhite/30 uppercase tracking-[0.3em] mb-6"
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        S.04 &mdash; Experience
      </motion.div>
      <motion.h2
        className="text-heading font-serif mb-12 md:mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Flight Log
      </motion.h2>

      <div className="max-w-4xl mx-auto">
        {EXPERIENCE.map((entry, i) => (
          <TimelineEntry key={entry.company} entry={entry} index={i} />
        ))}
      </div>

      <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 font-mono text-caption text-offwhite/15">
        <div>S.04</div>
      </div>
    </section>
  );
}
