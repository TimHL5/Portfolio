'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL } from '@/lib/constants';
import { useMousePosition } from '@/hooks/useMousePosition';

function BostonClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-caption text-offwhite/40 tracking-widest">
      <span className="text-offwhite/20">BOS </span>
      <span>{time}</span>
      <span className="text-offwhite/20"> EST</span>
    </div>
  );
}

function RoleRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const roles = PERSONAL.roles;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="h-[1.3em] overflow-hidden relative">
      {roles.map((role, i) => (
        <motion.div
          key={role}
          className="absolute inset-0 flex items-center"
          initial={false}
          animate={{
            y: i === currentIndex ? 0 : i < currentIndex ? '-100%' : '100%',
            opacity: i === currentIndex ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="text-gradient-amber font-serif italic">{role}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const mouse = useMousePosition();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const nameChars = PERSONAL.name.toUpperCase().split('');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Ambient background */}
      <ParticleField />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at ${50 + mouse.normalizedX * 10}% ${50 + mouse.normalizedY * 10}%, rgba(255,149,0,0.06) 0%, transparent 60%)`,
        }}
      />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-[20%] w-px h-full bg-offwhite" />
        <div className="absolute top-0 left-[40%] w-px h-full bg-offwhite" />
        <div className="absolute top-0 left-[60%] w-px h-full bg-offwhite" />
        <div className="absolute top-0 left-[80%] w-px h-full bg-offwhite" />
      </div>

      {/* Top bar - coordinates and clock */}
      <div className="absolute top-6 left-8 md:left-16 lg:left-32 flex items-center gap-6">
        <BostonClock />
        <span className="hidden sm:inline font-mono text-caption text-offwhite/20 tracking-widest">
          42.3601°N 71.0589°W
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 mt-20 md:mt-0 max-w-[1440px] mx-auto w-full px-8 md:px-16 lg:px-32">
        {/* Small label above name */}
        <motion.div
          className="font-mono text-caption text-offwhite/40 uppercase tracking-[0.15em] md:tracking-[0.3em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Portfolio &mdash; 2026
        </motion.div>

        {/* Animated name */}
        <h1
          className="text-display font-serif leading-none mb-6"
          style={{
            transform: `translate(${mouse.normalizedX * 3}px, ${mouse.normalizedY * 3}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <span className="sr-only">{PERSONAL.name}</span>
          <span aria-hidden="true" className="flex flex-wrap">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                className={char === ' ' ? 'w-[0.3em]' : ''}
                initial={{ opacity: 0, y: 60, rotateX: -80 }}
                animate={loaded ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  delay: 0.8 + i * 0.04,
                  duration: 0.8,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Role rotator */}
        <motion.div
          className="text-subheading font-sans mb-6 md:mb-12"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <RoleRotator />
        </motion.div>

        {/* Brief tagline */}
        <motion.p
          className="max-w-md text-body-lg text-offwhite/50 font-sans mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          Senior at Boston College. Co-founder of MLV.
          Building things that matter.
        </motion.p>

        {/* Social links + contact */}
        <motion.div
          className="flex items-center gap-3 flex-wrap"
          initial={{ opacity: 0, y: 15 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          {/* LinkedIn */}
          <a
            href={PERSONAL.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 border border-offwhite/10 rounded-sm text-offwhite/40 hover:text-offwhite hover:border-offwhite/30 transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a
            href={PERSONAL.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2.5 border border-offwhite/10 rounded-sm text-offwhite/40 hover:text-offwhite hover:border-offwhite/30 transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          {/* TikTok */}
          <a
            href={PERSONAL.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="p-2.5 border border-offwhite/10 rounded-sm text-offwhite/40 hover:text-offwhite hover:border-offwhite/30 transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.41a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.84z"/>
            </svg>
          </a>
          {/* Email */}
          <a
            href={`mailto:${PERSONAL.email}`}
            aria-label="Email"
            className="p-2.5 border border-offwhite/10 rounded-sm text-offwhite/40 hover:text-amber hover:border-amber/30 transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
          {/* Book a Call */}
          <a
            href={PERSONAL.socials.bookCall}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-amber/10 border border-amber/30 rounded-sm font-mono text-caption uppercase tracking-widest text-amber hover:bg-amber/20 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Book a Call
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <span className="font-mono text-caption text-offwhite/30 uppercase tracking-[0.2em]">
          Scroll to explore
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-offwhite/40 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Decorative corner element */}
      <div className="absolute bottom-6 right-8 md:right-16 lg:right-32 font-mono text-caption text-offwhite/15">
        <div>S.01</div>
      </div>
    </section>
  );
}
