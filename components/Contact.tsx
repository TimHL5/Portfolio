'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';
import { useParallax } from '@/hooks/useParallax';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const { ref: parallaxRef, labelX } = useParallax();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="contact"
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (parallaxRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 md:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal to-transparent" />

      <div className="relative z-10">
        {/* Section label */}
        <motion.div
          className="font-mono text-caption text-offwhite/30 uppercase tracking-[0.15em] md:tracking-[0.3em] mb-8 md:mb-12"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{ x: labelX }}
        >
          S.07 &mdash; Contact
        </motion.div>

        {/* Large CTA text */}
        <motion.h2
          className="text-display font-serif mb-6 md:mb-8 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          Let&rsquo;s build<br />
          <span className="text-gradient-amber">something.</span>
        </motion.h2>

        {/* Email */}
        <motion.div
          className="mb-8 md:mb-12 flex items-baseline gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <a
            href={`mailto:${PERSONAL.email}`}
            className="font-sans text-subheading text-offwhite/60 hover:text-amber transition-colors duration-300"
          >
            {PERSONAL.email}
          </a>
          <button
            onClick={copyEmail}
            className="font-mono text-caption text-offwhite/20 hover:text-amber cursor-pointer transition-colors uppercase tracking-widest"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </motion.div>

        {/* Book a call CTA */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <MagneticButton
            href={PERSONAL.socials.bookCall}
            className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-amber text-charcoal font-mono text-body uppercase tracking-widest rounded-sm hover:bg-amber/90 transition-colors"
          >
            <span>Book a Call</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center gap-3 md:gap-6 mb-12 md:mb-20"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {[
            { name: 'LinkedIn', url: PERSONAL.socials.linkedin },
            { name: 'Instagram', url: PERSONAL.socials.instagram },
            { name: 'TikTok', url: PERSONAL.socials.tiktok },
          ].map((social) => (
            <MagneticButton
              key={social.name}
              href={social.url}
              className="px-3 py-2 md:px-4 border border-offwhite/10 rounded-sm font-mono text-caption uppercase tracking-widest text-offwhite/40 hover:text-offwhite hover:border-offwhite/30 transition-all duration-300"
              strength={0.4}
            >
              <span>{social.name}</span>
            </MagneticButton>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="pt-8 border-t border-offwhite/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          initial={{ opacity: 0 }}
          animate={sectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <div className="font-mono text-caption text-offwhite/20">
            &copy; {new Date().getFullYear()} Timothy Liu. Built with intention.
          </div>
          <div className="font-mono text-caption text-offwhite/15">
            {PERSONAL.location}
          </div>
        </motion.div>
      </div>

      {/* Toast notification */}
      {copied && (
        <motion.div
          className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-offwhite text-charcoal font-mono text-caption px-4 py-2 rounded-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          Email copied to clipboard
        </motion.div>
      )}
    </section>
  );
}
