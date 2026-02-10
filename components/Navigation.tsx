'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_SECTIONS } from '@/lib/constants';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function Navigation() {
  const { activeSection } = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Dot navigation - right side */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-3">
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

      {/* Hamburger button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`fixed top-6 right-6 z-[200] w-12 h-12 flex flex-col items-center justify-center gap-1.5 transition-opacity duration-300 ${
          scrolled || menuOpen ? 'opacity-100' : 'opacity-100'
        }`}
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
            <nav className="flex flex-col items-center gap-8">
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
