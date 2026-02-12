'use client';

import { useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useSectionScroll } from '@/hooks/useSectionScroll';
import { useIsMobile } from '@/hooks/useIsMobile';
import LocationPopup from './LocationPopup';
import MobileExperience from './MobileExperience';
import { LocationGroup } from './utils';

const GlobeCanvas = dynamic(() => import('./GlobeCanvas'), { ssr: false });

function GlobeLoading() {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: 'clamp(400px, 70vh, 800px)' }}
    >
      <div className="font-mono text-caption text-offwhite/20 tracking-widest animate-pulse">
        LOADING GLOBE...
      </div>
    </div>
  );
}

export default function Globe() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const scrollRef = useRef<HTMLElement>(null);
  const scrollProgress = useSectionScroll(scrollRef);
  const [selectedLocation, setSelectedLocation] = useState<LocationGroup | null>(null);
  const isMobile = useIsMobile();

  // Share ref between useInView and useSectionScroll
  const setRefs = (el: HTMLElement | null) => {
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    (scrollRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  return (
    <section
      id="experience"
      ref={setRefs}
      className="relative py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24"
    >
      {/* Section header */}
      <motion.div
        className="font-mono text-caption text-offwhite/30 uppercase tracking-[0.3em] mb-6"
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        S.04 &mdash; Experience
      </motion.div>
      <motion.h2
        className="text-heading font-serif mb-6 md:mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Flight Log
      </motion.h2>
      <motion.p
        className="text-body-lg text-offwhite/40 font-sans mb-8 md:mb-12 max-w-lg"
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {isMobile
          ? 'Tap a card to explore my experience around the world.'
          : 'Click a pin to explore my experience across the globe.'}
      </motion.p>

      {/* Mobile: interactive timeline cards */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <MobileExperience />
        </motion.div>
      )}

      {/* Desktop: 3D globe */}
      {!isMobile && (
        <motion.div
          className="relative w-full"
          style={{ height: 'clamp(400px, 70vh, 800px)' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <Suspense fallback={<GlobeLoading />}>
            <GlobeCanvas
              scrollProgress={scrollProgress}
              onPinClick={(loc) => setSelectedLocation(loc)}
            />
          </Suspense>

          {/* Popup overlay */}
          <AnimatePresence>
            {selectedLocation && (
              <LocationPopup
                location={selectedLocation}
                onClose={() => setSelectedLocation(null)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Decorative */}
      <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 font-mono text-caption text-offwhite/15">
        <div>S.04</div>
      </div>
    </section>
  );
}
