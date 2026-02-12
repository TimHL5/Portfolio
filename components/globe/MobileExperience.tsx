'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCE } from '@/lib/constants';

const statusConfig = {
  active: { label: 'Active', className: 'status-active', color: '#00C9A7' },
  completed: { label: 'Completed', className: 'status-completed', color: '#888888' },
};

function ExperienceCard({
  entry,
  index,
  isExpanded,
  onToggle,
}: {
  entry: (typeof EXPERIENCE)[number];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const config = statusConfig[entry.status as keyof typeof statusConfig];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Timeline connector */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-offwhite/5" />

      {/* Timeline dot */}
      <div
        className="absolute left-[11px] top-5 w-[10px] h-[10px] rounded-full border-2 z-10"
        style={{
          borderColor: config.color,
          backgroundColor: entry.status === 'active' ? config.color : 'transparent',
        }}
      />

      {/* Card */}
      <div className="pl-10" onClick={onToggle}>
        <div
          className={`p-4 rounded-sm border transition-all duration-300 ${
            isExpanded
              ? 'bg-[#111111] border-offwhite/15'
              : 'bg-transparent border-offwhite/5 active:bg-[#111111]/50'
          }`}
        >
          {/* Header - always visible */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className={`status-dot ${config.className}`} />
              <span className="font-mono text-[10px] text-offwhite/30 uppercase tracking-widest">
                {config.label}
              </span>
            </div>
            <span className="font-mono text-[10px] text-offwhite/20">
              {entry.period}
            </span>
          </div>

          <h4 className="font-serif text-body-lg text-offwhite/90 mb-0.5">
            {entry.company}
          </h4>
          <div className="font-sans text-body text-offwhite/50 mb-1">
            {entry.role}
          </div>

          {/* Location tag */}
          <div className="flex items-center gap-1 mb-2">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-amber/60">
              <path d="M5 0C3.07 0 1.5 1.57 1.5 3.5C1.5 6.125 5 10 5 10S8.5 6.125 8.5 3.5C8.5 1.57 6.93 0 5 0ZM5 4.75C4.31 4.75 3.75 4.19 3.75 3.5C3.75 2.81 4.31 2.25 5 2.25C5.69 2.25 6.25 2.81 6.25 3.5C6.25 4.19 5.69 4.75 5 4.75Z" fill="currentColor" />
            </svg>
            <span className="font-mono text-[10px] text-amber/60 uppercase tracking-wider">
              {entry.location}
            </span>
          </div>

          {/* Expandable description */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <p className="text-body text-offwhite/40 font-sans pt-2 border-t border-offwhite/5">
                  {entry.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand hint */}
          {!isExpanded && (
            <div className="font-mono text-[9px] text-offwhite/15 uppercase tracking-widest">
              Tap for details
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function MobileExperience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {EXPERIENCE.map((entry, i) => (
        <ExperienceCard
          key={entry.company}
          entry={entry}
          index={i}
          isExpanded={expandedIndex === i}
          onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
