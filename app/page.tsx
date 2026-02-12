'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Ventures from '@/components/Ventures';
import Globe from '@/components/globe/Globe';
import Skills from '@/components/Skills';
import Leadership from '@/components/Leadership';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import GrainOverlay from '@/components/GrainOverlay';

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-charcoal flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="relative">
        <motion.span
          className="text-display font-serif text-offwhite/90 block"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        >
          TL
        </motion.span>
        <motion.div
          className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-amber to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          style={{ transformOrigin: 'left' }}
        />
        <motion.div
          className="absolute -bottom-10 left-0 font-mono text-caption text-offwhite/20 tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          LOADING
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <GrainOverlay />

      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <Navigation />
          <main>
            <Hero />
            <div className="section-divider" />
            <About />
            <div className="section-divider" />
            <Ventures />
            <div className="section-divider" />
            <Globe />
            <div className="section-divider" />
            <Skills />
            <div className="section-divider" />
            <Leadership />
            <div className="section-divider" />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
