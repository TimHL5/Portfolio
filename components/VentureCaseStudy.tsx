'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Milestone {
  date: string;
  event: string;
}

interface CaseStudy {
  problem: string;
  solution: string;
  milestones: Milestone[];
}

interface Metric {
  label: string;
  value: string;
}

interface VentureCaseStudyProps {
  name: string;
  fullName?: string;
  tagline: string;
  role: string;
  description: string;
  metrics: Metric[];
  accentColor: string;
  caseStudy: CaseStudy;
  onClose: () => void;
}

export default function VentureCaseStudy({
  name,
  fullName,
  tagline,
  role,
  metrics,
  accentColor,
  caseStudy,
  onClose,
}: VentureCaseStudyProps) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-charcoal/90 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-3xl max-h-[85vh] mx-4 bg-charcoal-mid border border-offwhite/10 rounded-sm overflow-y-auto"
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 40, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        layoutId={`venture-card-${name}`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-sm border border-offwhite/10 text-offwhite/40 hover:text-offwhite hover:border-offwhite/30 transition-all duration-300"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        {/* Hero banner */}
        <div
          className="p-8 md:p-12 pb-6 md:pb-8 border-b border-offwhite/5"
          style={{ background: `linear-gradient(135deg, rgba(${hexToRgb(accentColor)}, 0.1) 0%, transparent 60%)` }}
        >
          <div className="font-mono text-caption uppercase tracking-widest mb-3" style={{ color: accentColor }}>
            Case Study
          </div>
          <h2 className="text-heading font-serif mb-2" style={{ color: accentColor }}>
            {name}
          </h2>
          {fullName && fullName !== name && (
            <div className="font-sans text-body text-offwhite/40 mb-1">{fullName}</div>
          )}
          <div className="font-sans text-body-lg text-offwhite/60 mb-2">{tagline}</div>
          <div className="font-mono text-caption text-offwhite/30 uppercase tracking-widest">{role}</div>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          {/* Metrics grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {metrics.map((m) => (
              <div key={m.label} className="bg-offwhite/[0.03] rounded-sm p-4">
                <div className="font-serif text-subheading text-offwhite/90">{m.value}</div>
                <div className="font-mono text-caption text-offwhite/30 uppercase tracking-wider">{m.label}</div>
              </div>
            ))}
          </div>

          {/* The Problem */}
          <div>
            <h3 className="font-mono text-caption uppercase tracking-widest mb-3" style={{ color: accentColor }}>
              The Problem
            </h3>
            <p className="text-body-lg text-offwhite/60 font-sans leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>

          {/* The Solution */}
          <div>
            <h3 className="font-mono text-caption uppercase tracking-widest mb-3" style={{ color: accentColor }}>
              The Solution
            </h3>
            <p className="text-body-lg text-offwhite/60 font-sans leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="font-mono text-caption uppercase tracking-widest mb-4" style={{ color: accentColor }}>
              Key Milestones
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ backgroundColor: `${accentColor}20` }} />

              <div className="space-y-4">
                {caseStudy.milestones.map((ms, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 pl-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  >
                    <div
                      className="w-[15px] h-[15px] rounded-full border-2 flex-shrink-0 mt-1"
                      style={{ borderColor: accentColor, backgroundColor: i === 0 ? accentColor : 'transparent' }}
                    />
                    <div>
                      <div className="font-mono text-caption text-offwhite/40 mb-0.5">{ms.date}</div>
                      <div className="font-sans text-body text-offwhite/70">{ms.event}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 149, 0';
}
