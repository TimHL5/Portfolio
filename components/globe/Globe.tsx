'use client';

import { useRef, useState, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useSectionScroll } from '@/hooks/useSectionScroll';
import { useIsMobile } from '@/hooks/useIsMobile';
import MobileExperience from './MobileExperience';
import { LocationGroup, groupExperiencesByLocation } from './utils';

const GlobeCanvas = dynamic(() => import('./GlobeCanvas'), { ssr: false });

const statusConfig = {
  active: { label: 'Active', className: 'status-active' },
  completed: { label: 'Completed', className: 'status-completed' },
};

function GlobeLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="font-mono text-caption text-offwhite/20 tracking-widest animate-pulse">
        LOADING GLOBE...
      </div>
    </div>
  );
}

function DetailPanel({ location }: { location: LocationGroup }) {
  return (
    <motion.div
      key={location.name}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="h-full overflow-y-auto pr-1"
    >
      {/* Location header */}
      <div className="mb-6">
        <h3 className="font-serif text-subheading text-amber">
          {location.name}
        </h3>
        <div className="font-mono text-caption text-offwhite/30 mt-1">
          {location.lat.toFixed(2)}&deg;{location.lat >= 0 ? 'N' : 'S'},{' '}
          {Math.abs(location.lng).toFixed(2)}&deg;
          {location.lng >= 0 ? 'E' : 'W'}
        </div>
      </div>

      {/* Experience entries */}
      <div className="space-y-5">
        {location.experiences.map((exp) => {
          const config =
            statusConfig[exp.status as keyof typeof statusConfig];
          return (
            <div
              key={exp.company}
              className="border-t border-offwhite/5 pt-5 first:border-0 first:pt-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`status-dot ${config.className}`} />
                <span className="font-mono text-caption text-offwhite/30 uppercase tracking-widest">
                  {config.label}
                </span>
              </div>
              <h4 className="font-serif text-body-lg text-offwhite/90">
                {exp.company}
              </h4>
              <div className="font-sans text-body text-offwhite/60">
                {exp.role}
              </div>
              <div className="font-mono text-caption text-offwhite/30 mb-2">
                {exp.period}
              </div>
              <p className="text-body text-offwhite/40 font-sans leading-relaxed">
                {exp.description}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Globe() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const scrollRef = useRef<HTMLElement>(null);
  const scrollProgress = useSectionScroll(scrollRef);
  const [activeLocation, setActiveLocation] = useState<LocationGroup | null>(null);
  const [targetLocationName, setTargetLocationName] = useState<string | undefined>(undefined);
  const isMobile = useIsMobile();
  const locations = useMemo(() => groupExperiencesByLocation(), []);

  // Share ref between useInView and useSectionScroll
  const setRefs = (el: HTMLElement | null) => {
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    (scrollRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  const handleCityClick = (loc: LocationGroup) => {
    setActiveLocation(loc);
    setTargetLocationName(loc.name);
    // Clear target after globe has had time to rotate, so auto-rotate resumes
    setTimeout(() => setTargetLocationName(undefined), 2500);
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
          : 'Select a city or drag the globe to explore my experience across the world.'}
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

      {/* Desktop: City Menu + Globe + Detail Panel */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-[160px_1fr_360px] gap-4 lg:gap-6"
            style={{ height: 'clamp(400px, 60vh, 700px)' }}
          >
            {/* City selection menu */}
            <div className="flex flex-col justify-center gap-1">
              {locations.map((loc) => {
                const isActive = activeLocation?.name === loc.name;
                return (
                  <button
                    key={loc.name}
                    onClick={() => handleCityClick(loc)}
                    className={`group relative text-left px-4 py-3 rounded-sm transition-all duration-400 ${
                      isActive
                        ? 'bg-[#FF9500]/10 border border-[#FF9500]/30'
                        : 'border border-transparent hover:bg-offwhite/[0.03] hover:border-offwhite/5'
                    }`}
                  >
                    <div
                      className={`font-mono text-[11px] uppercase tracking-widest transition-colors duration-400 ${
                        isActive ? 'text-[#FF9500]' : 'text-offwhite/30 group-hover:text-offwhite/50'
                      }`}
                    >
                      {loc.name}
                    </div>
                    <div
                      className={`font-mono text-[10px] mt-0.5 transition-colors duration-400 ${
                        isActive ? 'text-[#FF9500]/50' : 'text-offwhite/15'
                      }`}
                    >
                      {loc.experiences.length} {loc.experiences.length === 1 ? 'role' : 'roles'}
                    </div>
                    {/* Active indicator bar */}
                    <div
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full transition-all duration-400 ${
                        isActive ? 'h-6 bg-[#FF9500]' : 'h-0 bg-transparent'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Globe */}
            <div className="relative w-full h-full min-h-[400px]">
              <Suspense fallback={<GlobeLoading />}>
                <GlobeCanvas
                  scrollProgress={scrollProgress}
                  onActiveLocationChange={setActiveLocation}
                  activeLocationName={activeLocation?.name ?? ''}
                  targetLocationName={targetLocationName}
                />
              </Suspense>
            </div>

            {/* Detail panel */}
            <div className="relative bg-charcoal-mid/30 border border-offwhite/5 rounded-sm p-5 md:p-6 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeLocation ? (
                  <DetailPanel
                    key={activeLocation.name}
                    location={activeLocation}
                  />
                ) : (
                  <motion.div
                    key="placeholder"
                    className="h-full flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <div className="font-mono text-caption text-offwhite/20 tracking-widest">
                        ROTATING TO FIRST LOCATION...
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Location indicator dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {locations.map((loc) => (
              <div
                key={loc.name}
                className={`rounded-full transition-all duration-500 ${
                  activeLocation?.name === loc.name
                    ? 'bg-amber w-6 h-2.5'
                    : 'bg-offwhite/20 w-2.5 h-2.5'
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Decorative */}
      <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 font-mono text-caption text-offwhite/15">
        <div>S.04</div>
      </div>
    </section>
  );
}
