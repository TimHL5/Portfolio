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
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden"
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
      <div className="absolute top-6 left-6 md:left-12 lg:left-24 flex items-center gap-6">
        <BostonClock />
        <span className="hidden sm:inline font-mono text-caption text-offwhite/20 tracking-widest">
          42.3601°N 71.0589°W
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 mt-20 md:mt-0">
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
          {[
            { name: 'LinkedIn', url: PERSONAL.socials.linkedin },
            { name: 'Instagram', url: PERSONAL.socials.instagram },
            { name: 'TikTok', url: PERSONAL.socials.tiktok },
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-offwhite/10 rounded-sm font-mono text-caption uppercase tracking-widest text-offwhite/40 hover:text-offwhite hover:border-offwhite/30 transition-all duration-300"
            >
              {social.name}
            </a>
          ))}
          <a
            href={`mailto:${PERSONAL.email}`}
            className="px-3 py-1.5 border border-offwhite/10 rounded-sm font-mono text-caption uppercase tracking-widest text-offwhite/40 hover:text-amber hover:border-amber/30 transition-all duration-300"
          >
            Email
          </a>
          <a
            href={PERSONAL.socials.bookCall}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-amber/10 border border-amber/30 rounded-sm font-mono text-caption uppercase tracking-widest text-amber hover:bg-amber/20 transition-all duration-300"
          >
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
      <div className="absolute bottom-6 right-6 md:right-12 lg:right-24 font-mono text-caption text-offwhite/15">
        <div>S.01</div>
      </div>
    </section>
  );
}
