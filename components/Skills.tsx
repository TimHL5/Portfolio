'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { SKILLS } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';
import { useParallax } from '@/hooks/useParallax';
import { useIsMobile } from '@/hooks/useIsMobile';
import MagneticHeading from './MagneticHeading';

const categories = [
  { key: 'programming' as const, label: 'Programming', color: '#FF9500' },
  { key: 'tools' as const, label: 'Tools', color: '#00C9A7' },
  { key: 'business' as const, label: 'Business', color: '#6366F1' },
  { key: 'languages' as const, label: 'Languages', color: '#F5F0EB' },
];

type CategoryKey = (typeof categories)[number]['key'];

function getItems(key: CategoryKey): string[] {
  if (key === 'languages') return SKILLS.languages.map((l) => `${l.name} (${l.level})`);
  return SKILLS[key] as string[];
}

const proficiency: Record<CategoryKey, number> = {
  programming: 0.8,
  tools: 0.85,
  business: 0.75,
  languages: 0.7,
};

function RadarChart({
  sectionInView,
  activeCategory,
  setActiveCategory,
  hoveredAxis,
  setHoveredAxis,
}: {
  sectionInView: boolean;
  activeCategory: CategoryKey | null;
  setActiveCategory: (key: CategoryKey | null) => void;
  hoveredAxis: CategoryKey | null;
  setHoveredAxis: (key: CategoryKey | null) => void;
}) {
  const cx = 250;
  const cy = 240;
  const maxR = 140;
  const levels = 4;
  const numAxes = categories.length;
  const angleStep = (Math.PI * 2) / numAxes;
  const startAngle = -Math.PI / 2;

  const progress = useMotionValue(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (sectionInView && !hasAnimated.current) {
      hasAnimated.current = true;
      animate(progress, 1, { duration: 1.2, ease: [0.23, 1, 0.32, 1] });
    }
  }, [sectionInView, progress]);

  const axes = useMemo(() => {
    const labelOffset = 24;
    return categories.map((cat, i) => {
      const angle = startAngle + i * angleStep;
      const endX = cx + Math.cos(angle) * maxR;
      const endY = cy + Math.sin(angle) * maxR;

      // Position labels further out with per-axis adjustments
      let lx = cx + Math.cos(angle) * (maxR + labelOffset);
      let ly = cy + Math.sin(angle) * (maxR + labelOffset);
      let anchor: 'middle' | 'start' | 'end' = 'middle';

      // Top axis
      if (i === 0) {
        ly -= 6;
        anchor = 'middle';
      }
      // Right axis
      else if (i === 1) {
        lx += 4;
        anchor = 'start';
      }
      // Bottom axis
      else if (i === 2) {
        ly += 14;
        anchor = 'middle';
      }
      // Left axis
      else if (i === 3) {
        lx -= 4;
        anchor = 'end';
      }

      return {
        ...cat,
        angle,
        x: endX,
        y: endY,
        labelX: lx,
        labelY: ly,
        anchor,
      };
    });
  }, [startAngle, angleStep]);

  const polygonPoints = useMemo(
    () =>
      axes
        .map((ax) => {
          const r = maxR * proficiency[ax.key];
          return `${cx + Math.cos(ax.angle) * r},${cy + Math.sin(ax.angle) * r}`;
        })
        .join(' '),
    [axes]
  );

  const animatedPolygon = useTransform(progress, (p) =>
    axes
      .map((ax) => {
        const r = maxR * proficiency[ax.key] * p;
        return `${cx + Math.cos(ax.angle) * r},${cy + Math.sin(ax.angle) * r}`;
      })
      .join(' ')
  );

  const current = activeCategory ?? hoveredAxis;

  return (
    <motion.svg
      viewBox="0 0 500 480"
      className="w-full h-auto"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <defs>
        <radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF9500" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FF9500" stopOpacity="0.02" />
        </radialGradient>
      </defs>

      {/* Concentric diamond rings */}
      {Array.from({ length: levels }, (_, i) => {
        const r = (maxR / levels) * (i + 1);
        return (
          <motion.polygon
            key={`ring-${i}`}
            points={axes
              .map((ax) => `${cx + Math.cos(ax.angle) * r},${cy + Math.sin(ax.angle) * r}`)
              .join(' ')}
            fill="none"
            stroke="rgba(245,240,235,0.06)"
            strokeWidth={0.5}
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
          />
        );
      })}

      {/* Axis lines */}
      {axes.map((ax) => {
        const isHighlighted = current === ax.key;
        return (
          <motion.line
            key={ax.key}
            x1={cx}
            y1={cy}
            x2={ax.x}
            y2={ax.y}
            stroke={isHighlighted ? ax.color : 'rgba(245,240,235,0.08)'}
            strokeWidth={isHighlighted ? 1.5 : 0.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={sectionInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
          />
        );
      })}

      {/* Filled proficiency polygon */}
      <motion.polygon
        points={animatedPolygon}
        fill="url(#radar-fill)"
        stroke="#FF9500"
        strokeWidth={1}
        strokeOpacity={0.4}
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.8 }}
      />

      {/* Data point dots */}
      {axes.map((ax) => {
        const r = maxR * proficiency[ax.key];
        const px = cx + Math.cos(ax.angle) * r;
        const py = cy + Math.sin(ax.angle) * r;
        const isHighlighted = current === ax.key;
        return (
          <motion.circle
            key={`dot-${ax.key}`}
            cx={px}
            cy={py}
            r={isHighlighted ? 5 : 3.5}
            fill={isHighlighted ? ax.color : '#FF9500'}
            stroke={isHighlighted ? ax.color : 'transparent'}
            strokeWidth={isHighlighted ? 8 : 0}
            strokeOpacity={0.15}
            initial={{ r: 0, opacity: 0 }}
            animate={sectionInView ? { r: isHighlighted ? 5 : 3.5, opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.4 }}
            style={{ transition: 'fill 0.3s, stroke 0.3s, stroke-width 0.3s' }}
          />
        );
      })}

      {/* Axis labels + hit zones */}
      {axes.map((ax) => {
        const isHighlighted = current === ax.key;
        return (
          <g key={`label-${ax.key}`}>
            <circle
              cx={ax.labelX}
              cy={ax.labelY}
              r={35}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredAxis(ax.key)}
              onMouseLeave={() => setHoveredAxis(null)}
              onClick={() => setActiveCategory(activeCategory === ax.key ? null : ax.key)}
            />
            <text
              x={ax.labelX}
              y={ax.labelY}
              textAnchor={ax.anchor}
              dominantBaseline="middle"
              fill={isHighlighted ? ax.color : 'rgba(245,240,235,0.35)'}
              fontSize="11"
              fontFamily="monospace"
              letterSpacing="0.12em"
              className="cursor-pointer select-none uppercase"
              style={{ transition: 'fill 0.3s' }}
              onMouseEnter={() => setHoveredAxis(ax.key)}
              onMouseLeave={() => setHoveredAxis(null)}
              onClick={() => setActiveCategory(activeCategory === ax.key ? null : ax.key)}
            >
              {ax.label}
            </text>
          </g>
        );
      })}

      {/* Subtle pulse */}
      <motion.polygon
        points={polygonPoints}
        fill="none"
        stroke="#FF9500"
        strokeWidth={0.5}
        strokeOpacity={0}
        animate={
          sectionInView
            ? { strokeOpacity: [0, 0.3, 0], scale: [1, 1.02, 1] }
            : {}
        }
        transition={{ repeat: Infinity, duration: 3, delay: 2, ease: 'easeInOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
    </motion.svg>
  );
}

function SkillCards({
  categoryKey,
}: {
  categoryKey: CategoryKey | null;
}) {
  const displayKey = categoryKey ?? 'programming';
  const items = getItems(displayKey);
  const cat = categories.find((c) => c.key === displayKey)!;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={displayKey}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Category header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
          <span className="font-mono text-caption uppercase tracking-widest" style={{ color: cat.color }}>
            {cat.label}
          </span>
          <div className="flex-1 h-px bg-offwhite/5" />
          <span className="font-mono text-caption text-offwhite/20">{items.length}</span>
        </div>

        {/* Skill items */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
          {items.map((item, i) => (
            <motion.div
              key={item}
              className="group relative bg-charcoal-mid/60 border border-offwhite/5 rounded-sm px-3 py-2.5 hover:border-offwhite/15 hover:-translate-y-px transition-all duration-300"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.03, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <div
                className="absolute top-0 left-0 w-full h-[2px] rounded-t-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: cat.color }}
              />
              <span className="relative font-sans text-body text-offwhite/60 group-hover:text-offwhite/85 transition-colors duration-300">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function MobileSkills({ sectionInView }: { sectionInView: boolean }) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('programming');
  const activeConfig = categories.find((c) => c.key === activeCategory)!;

  return (
    <div>
      <motion.div
        className="flex flex-wrap gap-2 mb-8"
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`font-mono text-caption uppercase tracking-widest px-3 py-1.5 rounded-sm border transition-all duration-300 ${
              activeCategory === cat.key
                ? 'border-current text-offwhite bg-offwhite/5'
                : 'border-offwhite/10 text-offwhite/30 hover:text-offwhite/50'
            }`}
            style={activeCategory === cat.key ? { borderColor: cat.color, color: cat.color } : undefined}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
        >
          {getItems(activeCategory).map((item, i) => (
            <motion.div
              key={item}
              className="group relative bg-charcoal-mid border border-offwhite/5 rounded-sm p-3 hover:border-offwhite/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <div
                className="absolute top-0 left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: activeConfig.color }}
              />
              <span className="font-sans text-body text-offwhite/70">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Skills() {
  const [sectionRef, sectionInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const { ref: parallaxRef, labelX, decorY } = useParallax();
  const isMobile = useIsMobile(768);
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const [hoveredAxis, setHoveredAxis] = useState<CategoryKey | null>(null);

  const displayCategory = activeCategory ?? hoveredAxis;

  return (
    <section
      id="skills"
      ref={(el) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (parallaxRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="relative py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24"
    >
      {/* Section header */}
      <motion.div
        className="font-mono text-caption text-offwhite/30 uppercase tracking-[0.3em] mb-6"
        initial={{ opacity: 0 }}
        animate={sectionInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        style={{ x: labelX }}
      >
        S.05 &mdash; Skills
      </motion.div>
      <MagneticHeading>
        <motion.h2
          className="text-heading font-serif mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Toolkit
        </motion.h2>
      </MagneticHeading>

      {isMobile ? (
        <MobileSkills sectionInView={sectionInView} />
      ) : (
        <div className="max-w-5xl">
          <div className="grid grid-cols-[minmax(280px,360px)_1fr] gap-6 lg:gap-10 items-start">
            {/* Left: Radar Chart */}
            <div>
              <RadarChart
                sectionInView={sectionInView}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                hoveredAxis={hoveredAxis}
                setHoveredAxis={setHoveredAxis}
              />
              <motion.p
                className="font-mono text-caption text-offwhite/20 text-center -mt-2"
                initial={{ opacity: 0 }}
                animate={sectionInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                Hover or click an axis to explore
              </motion.p>
            </div>

            {/* Right: Skill Cards */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <SkillCards categoryKey={displayCategory} />
            </motion.div>
          </div>

          {/* Legend */}
          <motion.div
            className="mt-8 flex flex-wrap gap-6"
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div
                  className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150"
                  style={{ backgroundColor: cat.color }}
                />
                <span
                  className={`font-mono text-caption transition-colors duration-300 ${
                    displayCategory === cat.key ? '' : 'text-offwhite/40 group-hover:text-offwhite/60'
                  }`}
                  style={displayCategory === cat.key ? { color: cat.color } : undefined}
                >
                  {cat.label}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      )}

      {/* Decorative */}
      <motion.div className="absolute bottom-6 right-6 md:right-12 lg:right-24 font-mono text-caption text-offwhite/15" style={{ y: decorY }}>
        <div>S.05</div>
      </motion.div>
    </section>
  );
}
