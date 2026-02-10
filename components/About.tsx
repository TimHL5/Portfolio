'use client';

import { motion } from 'framer-motion';
import { PERSONAL, EDUCATION } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';
import CountUp from './CountUp';

export default function About() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [quoteRef, quoteInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [statsRef, statsInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
    >
      {/* Section label */}
      <motion.div
        className="font-mono text-caption text-offwhite/30 uppercase tracking-[0.3em] mb-20"
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        S.02 &mdash; About
      </motion.div>

      {/* Editorial layout - asymmetric grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Pull quote - spans left side */}
        <div className="lg:col-span-5 lg:col-start-1" ref={quoteRef}>
          <motion.blockquote
            className="text-heading font-serif italic text-offwhite/90 leading-tight"
            initial={{ opacity: 0, x: -40 }}
            animate={quoteInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            &ldquo;{PERSONAL.pullQuote}&rdquo;
          </motion.blockquote>

          {/* Photo placeholder */}
          <motion.div
            className="mt-12 relative aspect-[4/5] max-w-sm bg-charcoal-mid rounded-sm overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="absolute inset-0 flex items-center justify-center border border-offwhite/10">
              <div className="text-center">
                <div className="font-mono text-caption text-offwhite/30 uppercase tracking-widest">
                  Profile Photo
                </div>
                <div className="font-mono text-caption text-offwhite/20 mt-1">
                  4:5 Portrait
                </div>
              </div>
            </div>
            {/* Ken Burns effect container - slow zoom */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-amber/5 to-transparent"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Bio text - right side, offset down */}
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-body-lg text-offwhite/70 font-sans leading-relaxed">
              {PERSONAL.bio}
            </p>

            <div className="pt-4">
              <div className="font-mono text-caption text-offwhite/30 uppercase tracking-widest mb-2">
                Education
              </div>
              <p className="text-body text-offwhite/50 font-sans">
                {EDUCATION.school}
              </p>
              <p className="text-body text-offwhite/40 font-sans">
                {EDUCATION.degree} &mdash; Class of {EDUCATION.graduation}
              </p>
            </div>
          </motion.div>

          {/* Stats dashboard */}
          <div ref={statsRef} className="mt-16">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-5 gap-px bg-offwhite/5 rounded-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {PERSONAL.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-charcoal p-5 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                >
                  <div className="text-subheading font-serif text-amber mb-1">
                    <CountUp
                      end={stat.value}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="font-mono text-caption text-offwhite/30 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative corner element */}
      <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 font-mono text-caption text-offwhite/15">
        <div>S.02</div>
      </div>
    </section>
  );
}
