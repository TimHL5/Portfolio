'use client';

import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

interface Metric {
  label: string;
  value: string;
}

interface Program {
  name: string;
  description: string;
}

interface VentureCardProps {
  name: string;
  fullName?: string;
  tagline: string;
  role: string;
  description: string;
  metrics: Metric[];
  programs?: Program[];
  markets?: string[];
  link?: string;
  press?: string;
  status: 'active' | 'building';
  accentColor: string;
  index: number;
  isActive: boolean;
  onOpenCaseStudy?: () => void;
}

export default function VentureCard({
  name,
  fullName,
  tagline,
  role,
  description,
  metrics,
  programs,
  markets,
  link,
  press,
  status,
  accentColor,
  index,
  isActive,
  onOpenCaseStudy,
}: VentureCardProps) {
  return (
    <motion.div
      className="min-w-[85vw] md:min-w-[600px] lg:min-w-[700px] snap-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="relative rounded-sm overflow-hidden p-5 md:p-8 lg:p-12 h-full border border-offwhite/5"
        style={{
          background: `linear-gradient(135deg, rgba(${hexToRgb(accentColor)}, 0.05) 0%, rgba(20,20,20,1) 60%)`,
        }}
      >
        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-4 md:mb-8">
          <span
            className={`status-dot ${
              status === 'active' ? 'status-active' : 'status-upcoming'
            }`}
          />
          <span className="font-mono text-caption uppercase tracking-widest" style={{ color: accentColor }}>
            {status === 'active' ? 'Active' : 'Building'}
          </span>
          <span className="font-mono text-caption text-offwhite/20 ml-auto">
            0{index + 1}
          </span>
        </div>

        {/* Venture name */}
        <h3
          className="text-heading font-serif mb-2"
          style={{ color: accentColor }}
        >
          {name}
        </h3>
        {fullName && fullName !== name && (
          <div className="font-sans text-body text-offwhite/40 mb-1">
            {fullName}
          </div>
        )}
        <div className="font-sans text-body-lg text-offwhite/60 mb-2">
          {tagline}
        </div>
        <div className="font-mono text-caption text-offwhite/30 uppercase tracking-widest mb-4 md:mb-8">
          {role}
        </div>

        {/* Description */}
        <p className="text-body text-offwhite/50 font-sans max-w-lg mb-4 md:mb-8 leading-relaxed">
          {description}
        </p>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-8">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-offwhite/[0.03] rounded-sm p-3"
            >
              <div className="font-serif text-subheading text-offwhite/90">
                {metric.value}
              </div>
              <div className="font-mono text-caption text-offwhite/30 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Programs */}
        {programs && programs.length > 0 && (
          <div className="mb-4 md:mb-8">
            <div className="font-mono text-caption text-offwhite/20 uppercase tracking-widest mb-3">
              Programs
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {programs.map((program) => (
                <div
                  key={program.name}
                  className="bg-offwhite/[0.03] border border-offwhite/5 rounded-sm px-3 py-1.5 md:px-4 md:py-2"
                >
                  <div className="font-sans text-body text-offwhite/70">
                    {program.name}
                  </div>
                  <div className="font-mono text-caption text-offwhite/30">
                    {program.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Markets */}
        {markets && markets.length > 0 && (
          <div className="flex items-center gap-2 mb-8">
            <span className="font-mono text-caption text-offwhite/20 uppercase tracking-widest">
              Markets:
            </span>
            {markets.map((market) => (
              <span
                key={market}
                className="font-mono text-caption px-2 py-0.5 rounded-sm border border-offwhite/10 text-offwhite/40"
              >
                {market}
              </span>
            ))}
          </div>
        )}

        {/* Press */}
        {press && (
          <div className="font-mono text-caption text-offwhite/25 italic mb-6">
            {press}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          {onOpenCaseStudy && (
            <button
              onClick={(e) => { e.stopPropagation(); onOpenCaseStudy(); }}
              className="inline-flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-sm text-body font-mono uppercase tracking-widest transition-all duration-300 border"
              style={{ color: accentColor, borderColor: `${accentColor}40`, backgroundColor: `${accentColor}10` }}
            >
              Case Study
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
          {link && (
            <MagneticButton
              href={link}
              className="inline-flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 border rounded-sm text-body font-mono uppercase tracking-widest transition-colors duration-300"
              strength={0.2}
            >
              <span style={{ color: accentColor, borderColor: `${accentColor}33` }}>
                Learn More
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={{ color: accentColor }}
              >
                <path
                  d="M1 13L13 1M13 1H5M13 1V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </MagneticButton>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 149, 0';
}
