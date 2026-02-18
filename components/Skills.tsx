'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';
import { useParallax } from '@/hooks/useParallax';
import MagneticHeading from './MagneticHeading';

const categories = [
  { key: 'programming' as const, label: 'Programming', color: '#FF9500' },
  { key: 'tools' as const, label: 'Tools', color: '#00C9A7' },
  { key: 'business' as const, label: 'Business', color: '#6366F1' },
  { key: 'languages' as const, label: 'Languages', color: '#F5F0EB' },
];

type CategoryKey = (typeof categories)[number]['key'];

function getItems(key: CategoryKey): string[] {
  if (key === 'languages') return SKILLS.languages.map((l) => `${l.name} (${l.level})`);
  return SKILLS[key] as string[];
}

function SkillCards({ categoryKey }: { categoryKey: CategoryKey }) {
  const items = getItems(categoryKey);
  const cat = categories.find((c) => c.key === categoryKey)!;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={categoryKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Category header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
          <span className="font-mono text-caption uppercase tracking-widest" style={{ color: cat.color }}>
            {cat.label}
          </span>
          <div className="flex-1 h-px bg-offwhite/5" />
          <span className="font-mono text-caption text-offwhite/20">{items.length} skills</span>
        </div>

        {/* Skill items grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {items.map((item, i) => (
            <motion.div
              key={item}
              className="group relative bg-charcoal-mid/60 border border-offwhite/5 rounded-sm px-4 py-3 hover:border-offwhite/15 hover:-translate-y-0.5 transition-all duration-300"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 + i * 0.04, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <div
                className="absolute top-0 left-0 w-full h-[2px] rounded-t-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: cat.color }}
              />
              <div
                className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 20px ${cat.color}08, 0 0 15px ${cat.color}05` }}
              />
              <span className="relative font-sans text-body text-offwhite/60 group-hover:text-offwhite/90 transition-colors duration-300">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Skills() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const { ref: parallaxRef, labelX, decorY } = useParallax();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('programming');

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
            className="text-heading font-serif mb-10 md:mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Toolkit
          </motion.h2>
        </MagneticHeading>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 10 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`relative font-mono text-caption uppercase tracking-widest px-4 py-2.5 rounded-sm border transition-all duration-300 ${
                  isActive
                    ? 'bg-offwhite/5'
                    : 'border-offwhite/10 text-offwhite/30 hover:text-offwhite/50 hover:bg-offwhite/[0.02]'
                }`}
                style={isActive ? { borderColor: cat.color, color: cat.color } : undefined}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full transition-transform duration-300"
                    style={{
                      backgroundColor: cat.color,
                      transform: isActive ? 'scale(1.3)' : 'scale(1)',
                      opacity: isActive ? 1 : 0.5,
                    }}
                  />
                  {cat.label}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-3/4 rounded-full"
                    style={{ backgroundColor: cat.color }}
                    layoutId="skills-tab-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Skill cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <SkillCards categoryKey={activeCategory} />
        </motion.div>
      </div>

      {/* Decorative */}
      <motion.div className="absolute bottom-6 right-8 md:right-16 lg:right-32 font-mono text-caption text-offwhite/15" style={{ y: decorY }}>
        <div>S.05</div>
      </motion.div>
    </section>
  );
}
