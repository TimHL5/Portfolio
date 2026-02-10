'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';

const categories = [
  { key: 'programming', label: 'Programming', color: '#FF9500' },
  { key: 'tools', label: 'Tools', color: '#00C9A7' },
  { key: 'business', label: 'Business', color: '#6366F1' },
  { key: 'languages', label: 'Languages', color: '#F5F0EB' },
] as const;

type CategoryKey = (typeof categories)[number]['key'];

export default function Skills() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('programming');
  const activeConfig = categories.find((c) => c.key === activeCategory)!;

  const getItems = (key: CategoryKey): string[] => {
    if (key === 'languages') {
      return SKILLS.languages.map((l) => `${l.name} (${l.level})`);
    }
    return SKILLS[key] as string[];
  };

  const items = getItems(activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
    >
      {/* Section header */}
      <motion.div
        className="font-mono text-caption text-offwhite/30 uppercase tracking-[0.3em] mb-6"
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        S.05 &mdash; Skills
      </motion.div>
      <motion.h2
        className="text-heading font-serif mb-10 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Toolkit
      </motion.h2>

      <div className="max-w-4xl">
        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`font-mono text-caption uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-2 rounded-sm border transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'border-current text-offwhite bg-offwhite/5'
                  : 'border-offwhite/10 text-offwhite/30 hover:text-offwhite/50 hover:border-offwhite/20'
              }`}
              style={
                activeCategory === cat.key
                  ? { borderColor: cat.color, color: cat.color }
                  : undefined
              }
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            {items.map((item, i) => (
              <motion.div
                key={item}
                className="group relative bg-charcoal-mid border border-offwhite/5 rounded-sm p-3 md:p-4 hover:border-offwhite/15 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: activeConfig.color }}
                />
                <span className="font-sans text-body text-offwhite/70 group-hover:text-offwhite/90 transition-colors duration-300">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All skills dense view */}
        <motion.div
          className="mt-10 md:mt-16 pt-8 border-t border-offwhite/5"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="font-mono text-caption text-offwhite/20 uppercase tracking-widest mb-4">
            All Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ...SKILLS.programming,
              ...SKILLS.tools,
              ...SKILLS.business,
              ...SKILLS.languages.map((l) => l.name),
            ].map((skill) => (
              <span
                key={skill}
                className="font-mono text-caption text-offwhite/25 px-2 py-1 border border-offwhite/5 rounded-sm hover:text-offwhite/50 hover:border-offwhite/15 transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative */}
      <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 font-mono text-caption text-offwhite/15">
        <div>S.05</div>
      </div>
    </section>
  );
}
