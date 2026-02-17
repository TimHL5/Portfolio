'use client';

import { motion } from 'framer-motion';
import { LEADERSHIP } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';
import { useParallax } from '@/hooks/useParallax';

const icons = ['\u25C8', '\u2302', '\u2605', '\u25CE', '\u2691', '\u2726'];

export default function Leadership() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const { ref: parallaxRef, labelX, decorY } = useParallax();

  return (
    <section
      id="leadership"
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (parallaxRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="relative py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24"
    >
      {/* Section header */}
      <motion.div
        className="font-mono text-caption text-offwhite/30 uppercase tracking-[0.3em] mb-6"
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        style={{ x: labelX }}
      >
        S.06 &mdash; Leadership
      </motion.div>
      <motion.h2
        className="text-heading font-serif mb-10 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Recognition
      </motion.h2>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-3xl">
        {LEADERSHIP.map((item, i) => (
          <motion.div
            key={item.org}
            className="group flex items-start gap-3 md:gap-4 p-3 md:p-5 bg-charcoal-mid/50 border border-offwhite/5 rounded-sm hover:border-offwhite/10 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
          >
            <span className="text-amber/60 text-lg mt-0.5 group-hover:text-amber transition-colors duration-300">
              {icons[i] || '\u25C8'}
            </span>
            <div>
              <div className="font-sans text-body text-offwhite/80 group-hover:text-offwhite transition-colors duration-300">
                {item.title}
              </div>
              <div className="font-mono text-caption text-offwhite/30 mt-0.5">
                {item.org}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative */}
      <motion.div className="absolute bottom-6 right-6 md:right-12 lg:right-24 font-mono text-caption text-offwhite/15" style={{ y: decorY }}>
        <div>S.06</div>
      </motion.div>
    </section>
  );
}
