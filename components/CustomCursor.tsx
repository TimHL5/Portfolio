'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide custom cursor on touch devices
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive =
        el.closest('a') ||
        el.closest('button') ||
        el.closest('[role="button"]') ||
        el.closest('.magnetic-btn');
      setIsHovering(!!isInteractive);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Smooth follow animation
    let raf: number;
    const animate = () => {
      position.current.x += (target.current.x - position.current.x) * 0.15;
      position.current.y += (target.current.y - position.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px) translate(-50%, -50%)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10001] hidden md:block"
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: '#FF9500',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
        style={{
          width: isHovering ? '48px' : '24px',
          height: isHovering ? '48px' : '24px',
          borderRadius: '50%',
          border: `1px solid ${isHovering ? 'rgba(255,149,0,0.6)' : 'rgba(245,240,235,0.3)'}`,
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.3s cubic-bezier(0.23,1,0.32,1), height 0.3s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, opacity 0.3s ease',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
