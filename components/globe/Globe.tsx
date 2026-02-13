'use client';

import { useState, useMemo, useRef, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
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
      className="flex-1 overflow-y-auto pr-1"
    >
      {/* Location header */}
      <div className="mb-5">
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
  const [activeLocation, setActiveLocation] = useState<LocationGroup | null>(null);
  const [targetLocationName, setTargetLocationName] = useState<string | undefined>(undefined);
  const isMobile = useIsMobile(1024);
  const locations = useMemo(() => groupExperiencesByLocation(), []);

  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCityClick = useCallback((loc: LocationGroup) => {
    setActiveLocation(loc);
    setTargetLocationName(loc.name);
    // Clear any existing timer so re-clicks reset the 30s countdown
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    // Resume idle spin after 30s of inactivity
    resumeTimerRef.current = setTimeout(() => setTargetLocationName(undefined), 30000);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
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

      {/* Desktop: Globe + Right Panel (city tabs + details) */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 lg:gap-6"
            style={{ height: 'clamp(400px, 60vh, 700px)' }}
          >
            {/* Globe */}
            <div className="relative w-full h-full min-h-[400px]">
              <Suspense fallback={<GlobeLoading />}>
                <GlobeCanvas
                  onActiveLocationChange={setActiveLocation}
                  activeLocationName={activeLocation?.name ?? ''}
                  targetLocationName={targetLocationName}
                />
              </Suspense>
            </div>

            {/* Right panel: city tabs + detail content */}
            <div className="relative bg-charcoal-mid/30 border border-offwhite/5 rounded-sm p-5 md:p-6 flex flex-col overflow-hidden">
              {/* City tabs */}
              <div className="flex gap-1 mb-5 pb-4 border-b border-offwhite/5 flex-shrink-0">
                {locations.map((loc) => {
                  const isActive = activeLocation?.name === loc.name;
                  return (
                    <button
                      key={loc.name}
                      onClick={() => handleCityClick(loc)}
                      className={`relative px-3 py-2 rounded-sm font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                        isActive
                          ? 'bg-[#FF9500]/10 text-[#FF9500]'
                          : 'text-offwhite/30 hover:text-offwhite/50 hover:bg-offwhite/[0.03]'
                      }`}
                    >
                      <span className="mr-1">{loc.flag}</span>
                      {loc.name}
                      {/* Active underline */}
                      <div
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[#FF9500] transition-all duration-300 ${
                          isActive ? 'w-4/5' : 'w-0'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Detail content */}
              <AnimatePresence mode="wait">
                {activeLocation ? (
                  <DetailPanel
                    key={activeLocation.name}
                    location={activeLocation}
                  />
                ) : (
                  <motion.div
                    key="placeholder"
                    className="flex-1 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <div className="font-mono text-caption text-offwhite/20 tracking-widest">
                        SELECT A CITY TO EXPLORE
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
