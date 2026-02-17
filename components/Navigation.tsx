'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { NAV_SECTIONS } from '@/lib/constants';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function Navigation() {
  const { activeSection } = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-amber/80 origin-left z-[200] lg:hidden"
        style={{ scaleX: smoothProgress }}
      />

      {/* Desktop vertical scroll progress */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex items-center gap-3">
        {/* Progress line */}
        <div className="relative h-[200px] w-px bg-offwhite/5 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-amber origin-top"
            style={{ height: '100%', scaleY: smoothProgress, boxShadow: '0 0 8px rgba(255,149,0,0.4)' }}
          />
        </div>

        {/* Dot nav */}
        <nav className="flex flex-col gap-3">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center justify-end"
              aria-label={`Navigate to ${section.label}`}
            >
              <span className="absolute right-6 font-mono text-caption uppercase tracking-widest text-offwhite/0 group-hover:text-offwhite/60 transition-all duration-300 whitespace-nowrap">
                {section.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? 'w-3 h-3 bg-amber'
                    : 'w-2 h-2 bg-offwhite/20 group-hover:bg-offwhite/50'
                }`}
              />
            </button>
          ))}
        </nav>
      </div>

      {/* Hamburger button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-6 right-6 z-[200] w-12 h-12 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle menu"
      >
        <motion.span
          className="block w-6 h-[1.5px] bg-offwhite origin-center"
          animate={menuOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block w-6 h-[1.5px] bg-offwhite"
          animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-6 h-[1.5px] bg-offwhite origin-center"
          animate={menuOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[150] bg-charcoal flex items-center justify-center"
            initial={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          >
            <nav className="flex flex-col items-center gap-6 md:gap-8">
              {NAV_SECTIONS.map((section, i) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="text-heading font-serif text-offwhite hover:text-amber transition-colors duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                >
                  {section.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
