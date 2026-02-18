'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { SKILLS } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';
import { useParallax } from '@/hooks/useParallax';
import MagneticHeading from './MagneticHeading';

/* ── Category metadata ── */
const categories = [
  {
    key: 'programming' as const,
    label: 'Programming',
    color: '#FF9500',
    gradient: 'from-[#FF9500]/8 to-transparent',
    description: 'Languages & frameworks',
  },
  {
    key: 'tools' as const,
    label: 'Tools',
    color: '#00C9A7',
    gradient: 'from-[#00C9A7]/8 to-transparent',
    description: 'Software & platforms',
  },
  {
    key: 'business' as const,
    label: 'Business',
    color: '#6366F1',
    gradient: 'from-[#6366F1]/8 to-transparent',
    description: 'Strategy & analysis',
  },
  {
    key: 'languages' as const,
    label: 'Languages',
    color: '#F5F0EB',
    gradient: 'from-[#F5F0EB]/5 to-transparent',
    description: 'Spoken fluency',
  },
];

type CategoryKey = (typeof categories)[number]['key'];

/* ── Animated counter ── */
function AnimatedCount({ to, inView }: { to: number; inView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      animate(count, to, { duration: 1.5, ease: [0.23, 1, 0.32, 1] });
    }
  }, [inView, count, to]);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  return <>{display}</>;
}

/* ── Language proficiency bar ── */
function LanguageBar({
  name,
  level,
  percent,
  color,
  index,
  inView,
}: {
  name: string;
  level: string;
  percent: number;
  color: string;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.6 + index * 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-sans text-body text-offwhite/80 group-hover:text-offwhite transition-colors duration-300">
          {name}
        </span>
        <span className="font-mono text-caption text-offwhite/30 uppercase tracking-wider">
          {level}
        </span>
      </div>
      <div className="relative h-1.5 bg-offwhite/5 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : {}}
          transition={{ delay: 0.8 + index * 0.15, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        />
        {/* Glow on the bar tip */}
        <motion.div
          className="absolute inset-y-0 w-8 rounded-full blur-sm"
          style={{ backgroundColor: color, opacity: 0.4 }}
          initial={{ left: 0 }}
          animate={inView ? { left: `calc(${percent}% - 16px)` } : {}}
          transition={{ delay: 0.8 + index * 0.15, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </motion.div>
  );
}

/* ── Skill chip ── */
function SkillChip({
  label,
  color,
  index,
  inView,
}: {
  label: string;
  color: string;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="group/chip relative"
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: 0.5 + index * 0.06,
        duration: 0.45,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <div
        className="relative px-3.5 py-2 rounded-md border border-offwhite/[0.06] bg-offwhite/[0.02] hover:bg-offwhite/[0.05] hover:border-offwhite/[0.12] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3/5 rounded-full opacity-30 group-hover/chip:opacity-80 group-hover/chip:h-4/5 transition-all duration-300"
          style={{ backgroundColor: color }}
        />
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-md opacity-0 group-hover/chip:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: `inset 0 0 24px ${color}0A, 0 0 12px ${color}06` }}
        />
        <span className="relative font-sans text-body text-offwhite/55 group-hover/chip:text-offwhite/90 transition-colors duration-300">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Bento card wrapper ── */
function BentoCard({
  cat,
  index,
  inView,
  children,
  className = '',
}: {
  cat: (typeof categories)[number];
  index: number;
  inView: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative rounded-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.25 + index * 0.12,
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Border — animated glow on hover */}
      <div
        className="absolute inset-0 rounded-lg transition-opacity duration-500 pointer-events-none"
        style={{
          border: `1px solid ${isHovered ? cat.color + '30' : 'rgba(245,240,235,0.06)'}`,
          boxShadow: isHovered
            ? `inset 0 1px 0 ${cat.color}15, 0 0 30px ${cat.color}08`
            : 'none',
        }}
      />

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} pointer-events-none`} />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(${cat.color} 0.5px, transparent 0.5px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Content */}
      <div className="relative p-5 md:p-6 h-full flex flex-col">
        {/* Card header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div
                className="w-2 h-2 rounded-full transition-transform duration-500"
                style={{
                  backgroundColor: cat.color,
                  transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                  boxShadow: isHovered ? `0 0 8px ${cat.color}60` : 'none',
                }}
              />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-300"
                style={{ color: isHovered ? cat.color : `${cat.color}99` }}
              >
                {cat.label}
              </span>
            </div>
            <span className="font-mono text-[10px] text-offwhite/20 tracking-wider uppercase">
              {cat.description}
            </span>
          </div>
          <span
            className="font-mono text-[28px] leading-none font-light transition-colors duration-300"
            style={{ color: isHovered ? cat.color + '50' : cat.color + '20' }}
          >
            <AnimatedCount
              to={
                cat.key === 'languages'
                  ? SKILLS.languages.length
                  : (SKILLS[cat.key] as string[]).length
              }
              inView={inView}
            />
          </span>
        </div>

        {/* Accent line */}
        <div className="mb-5 relative">
          <div className="h-px bg-offwhite/[0.04]" />
          <motion.div
            className="absolute top-0 left-0 h-px"
            style={{ backgroundColor: cat.color }}
            initial={{ width: 0 }}
            animate={inView ? { width: isHovered ? '100%' : '30%' } : {}}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>

        {/* Card body */}
        <div className="flex-1">{children}</div>
      </div>
    </motion.div>
  );
}

/* ── Main component ── */
export default function Skills() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const { ref: parallaxRef, labelX, decorY } = useParallax();

  const langData = useMemo(
    () =>
      SKILLS.languages.map((l) => ({
        name: l.name,
        level: l.level,
        percent: l.level === 'Native' ? 100 : l.level === 'Fluent' ? 82 : 60,
      })),
    []
  );

  return (
    <section
      id="skills"
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (parallaxRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="relative py-20 md:py-32 lg:py-48"
    >
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-32">
        {/* Section header */}
        <motion.div
          className="font-mono text-caption text-offwhite/30 uppercase tracking-[0.3em] mb-6"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{ x: labelX }}
        >
          S.05 &mdash; Skills
        </motion.div>
        <MagneticHeading>
          <motion.h2
            className="text-heading font-serif mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Toolkit
          </motion.h2>
        </MagneticHeading>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* ── Programming — large, top-left ── */}
          <BentoCard
            cat={categories[0]}
            index={0}
            inView={sectionInView}
            className="md:col-span-7"
          >
            <div className="flex flex-wrap gap-2">
              {(SKILLS.programming as string[]).map((skill, i) => (
                <SkillChip
                  key={skill}
                  label={skill}
                  color={categories[0].color}
                  index={i}
                  inView={sectionInView}
                />
              ))}
            </div>
          </BentoCard>

          {/* ── Tools — top-right ── */}
          <BentoCard
            cat={categories[1]}
            index={1}
            inView={sectionInView}
            className="md:col-span-5"
          >
            <div className="flex flex-wrap gap-2">
              {(SKILLS.tools as string[]).map((skill, i) => (
                <SkillChip
                  key={skill}
                  label={skill}
                  color={categories[1].color}
                  index={i}
                  inView={sectionInView}
                />
              ))}
            </div>
          </BentoCard>

          {/* ── Business — bottom-left ── */}
          <BentoCard
            cat={categories[2]}
            index={2}
            inView={sectionInView}
            className="md:col-span-5"
          >
            <div className="flex flex-wrap gap-2">
              {(SKILLS.business as string[]).map((skill, i) => (
                <SkillChip
                  key={skill}
                  label={skill}
                  color={categories[2].color}
                  index={i}
                  inView={sectionInView}
                />
              ))}
            </div>
          </BentoCard>

          {/* ── Languages — bottom-right, special treatment ── */}
          <BentoCard
            cat={categories[3]}
            index={3}
            inView={sectionInView}
            className="md:col-span-7"
          >
            <div className="space-y-5">
              {langData.map((lang, i) => (
                <LanguageBar
                  key={lang.name}
                  name={lang.name}
                  level={lang.level}
                  percent={lang.percent}
                  color={categories[3].color}
                  index={i}
                  inView={sectionInView}
                />
              ))}
            </div>
          </BentoCard>
        </div>
      </div>

      {/* Decorative */}
      <motion.div
        className="absolute bottom-6 right-8 md:right-16 lg:right-32 font-mono text-caption text-offwhite/15"
        style={{ y: decorY }}
      >
        <div>S.05</div>
      </motion.div>
    </section>
  );
}
