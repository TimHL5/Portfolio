'use client';

import { motion } from 'framer-motion';
import { LocationGroup } from './utils';

interface LocationPopupProps {
  location: LocationGroup;
  onClose: () => void;
}

const statusConfig = {
  active: { label: 'Active', className: 'status-active' },
  completed: { label: 'Completed', className: 'status-completed' },
};

export default function LocationPopup({ location, onClose }: LocationPopupProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="absolute z-20 right-3 top-3 md:right-8 md:top-8 w-[calc(100%-1.5rem)] max-w-sm bg-[#111111]/95 backdrop-blur-sm border border-offwhite/10 rounded-sm p-4 md:p-6 overflow-y-auto max-h-[80%]"
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif text-subheading text-amber">
              {location.name}
            </h3>
            <div className="font-mono text-caption text-offwhite/30">
              {location.lat.toFixed(2)}&deg;{location.lat >= 0 ? 'N' : 'S'},{' '}
              {Math.abs(location.lng).toFixed(2)}&deg;{location.lng >= 0 ? 'E' : 'W'}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-offwhite/40 hover:text-offwhite transition-colors w-8 h-8 flex items-center justify-center"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Experience entries */}
        <div className="space-y-4">
          {location.experiences.map((exp) => {
            const config = statusConfig[exp.status as keyof typeof statusConfig];
            return (
              <div
                key={exp.company}
                className="border-t border-offwhite/5 pt-4 first:border-0 first:pt-0"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`status-dot ${config.className}`} />
                  <span className="font-mono text-caption text-offwhite/30 uppercase tracking-widest">
                    {config.label}
                  </span>
                </div>
                <h4 className="font-serif text-body-lg text-offwhite/90">{exp.company}</h4>
                <div className="font-sans text-body text-offwhite/60">{exp.role}</div>
                <div className="font-mono text-caption text-offwhite/30 mb-2">{exp.period}</div>
                <p className="text-body text-offwhite/40 font-sans">{exp.description}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
