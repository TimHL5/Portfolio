'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '@/lib/constants';
import { useInView } from '@/hooks/useInView';
import { useParallax } from '@/hooks/useParallax';
import { useIsMobile } from '@/hooks/useIsMobile';

const categories = [
  { key: 'programming' as const, label: 'Programming', color: '#FF9500', cx: 200, cy: 140 },
  { key: 'tools' as const, label: 'Tools', color: '#00C9A7', cx: 620, cy: 140 },
  { key: 'business' as const, label: 'Business', color: '#6366F1', cx: 200, cy: 380 },
  { key: 'languages' as const, label: 'Languages', color: '#F5F0EB', cx: 620, cy: 380 },
];

type CategoryKey = (typeof categories)[number]['key'];

interface SkillNode {
  name: string;
  category: CategoryKey;
  color: string;
  x: number;
  y: number;
  size: number;
}

// Deterministic spread: place nodes in a circular pattern around cluster center
function buildNodes(): SkillNode[] {
  const nodes: SkillNode[] = [];

  const addCategory = (key: CategoryKey, items: string[], color: string, cx: number, cy: number) => {
    const count = items.length;
    items.forEach((name, i) => {
      const angle = (2 * Math.PI * i) / count - Math.PI / 2;
      const radius = 55 + (i % 2) * 30;
      nodes.push({
        name,
        category: key,
        color,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        size: 5 + (count - i) * 0.4,
      });
    });
  };

  addCategory('programming', SKILLS.programming, '#FF9500', 200, 140);
  addCategory('tools', SKILLS.tools, '#00C9A7', 620, 140);
  addCategory('business', SKILLS.business, '#6366F1', 200, 380);
  addCategory('languages', SKILLS.languages.map((l) => `${l.name} (${l.level})`), '#F5F0EB', 620, 380);

  return nodes;
}

function Constellation({
  sectionInView,
  activeCategory,
  setActiveCategory,
  hoveredNode,
  setHoveredNode,
}: {
  sectionInView: boolean;
  activeCategory: CategoryKey | null;
  setActiveCategory: (key: CategoryKey | null) => void;
  hoveredNode: string | null;
  setHoveredNode: (name: string | null) => void;
}) {
  const nodes = useMemo(() => buildNodes(), []);

  // Build edges: connect nodes within the same category
  const edges = useMemo(() => {
    const result: { from: SkillNode; to: SkillNode }[] = [];
    for (const cat of categories) {
      const catNodes = nodes.filter((n) => n.category === cat.key);
      for (let i = 0; i < catNodes.length; i++) {
        // Connect to next node (ring)
        const next = catNodes[(i + 1) % catNodes.length];
        result.push({ from: catNodes[i], to: next });
        // Connect to center for star pattern
        if (i % 2 === 0 && catNodes.length > 3) {
          const opposite = catNodes[(i + Math.floor(catNodes.length / 2)) % catNodes.length];
          result.push({ from: catNodes[i], to: opposite });
        }
      }
    }
    return result;
  }, [nodes]);

  const isNodeHighlighted = useCallback((node: SkillNode) => {
    if (hoveredNode) return node.name === hoveredNode;
    if (activeCategory) return node.category === activeCategory;
    return true;
  }, [hoveredNode, activeCategory]);

  const isEdgeHighlighted = useCallback((edge: { from: SkillNode; to: SkillNode }) => {
    if (hoveredNode) return edge.from.name === hoveredNode || edge.to.name === hoveredNode;
    if (activeCategory) return edge.from.category === activeCategory;
    return true;
  }, [hoveredNode, activeCategory]);

  return (
    <motion.svg
      viewBox="0 0 820 520"
      className="w-full h-auto max-h-[500px]"
      initial={{ opacity: 0 }}
      animate={sectionInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.4, duration: 1 }}
    >
      {/* Edges */}
      {edges.map((edge, i) => (
        <motion.line
          key={`e-${i}`}
          x1={edge.from.x}
          y1={edge.from.y}
          x2={edge.to.x}
          y2={edge.to.y}
          stroke={edge.from.color}
          strokeWidth={0.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={sectionInView ? {
            pathLength: 1,
            opacity: isEdgeHighlighted(edge) ? 0.15 : 0.03,
          } : {}}
          transition={{ delay: 0.8 + i * 0.02, duration: 0.6 }}
        />
      ))}

      {/* Category labels */}
      {categories.map((cat) => (
        <g key={cat.key}>
          <text
            x={cat.cx}
            y={cat.cy - 100}
            textAnchor="middle"
            className="cursor-pointer select-none"
            fill={activeCategory === cat.key ? cat.color : 'rgba(245,240,235,0.25)'}
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="0.15em"
            style={{ textTransform: 'uppercase', transition: 'fill 0.3s' }}
            onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
          >
            {cat.label}
          </text>
        </g>
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const highlighted = isNodeHighlighted(node);
        return (
          <g
            key={node.name}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode(node.name)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Glow ring on highlight */}
            {highlighted && (hoveredNode === node.name || activeCategory === node.category) && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size + 8}
                fill="none"
                stroke={node.color}
                strokeWidth={0.5}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            {/* Main dot */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              initial={{ cx: 410, cy: 260, r: 0, opacity: 0 }}
              animate={sectionInView ? {
                cx: node.x,
                cy: node.y,
                r: node.size,
                opacity: highlighted ? 0.9 : 0.15,
              } : {}}
              transition={{
                delay: 0.5 + i * 0.04,
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
                opacity: { duration: 0.3 },
              }}
            />
            {/* Label on hover */}
            {hoveredNode === node.name && (
              <motion.g
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <rect
                  x={node.x - 50}
                  y={node.y - node.size - 24}
                  width={100}
                  height={18}
                  rx={3}
                  fill="rgba(10,10,10,0.9)"
                  stroke={node.color}
                  strokeWidth={0.5}
                />
                <text
                  x={node.x}
                  y={node.y - node.size - 12}
                  textAnchor="middle"
                  fill={node.color}
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {node.name}
                </text>
              </motion.g>
            )}
          </g>
        );
      })}
    </motion.svg>
  );
}

function MobileSkills({ sectionInView }: { sectionInView: boolean }) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('programming');
  const activeConfig = categories.find((c) => c.key === activeCategory)!;

  const getItems = (key: CategoryKey): string[] => {
    if (key === 'languages') return SKILLS.languages.map((l) => `${l.name} (${l.level})`);
    return SKILLS[key] as string[];
  };

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
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

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
      <motion.h2
        className="text-heading font-serif mb-10 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        Toolkit
      </motion.h2>

      {isMobile ? (
        <MobileSkills sectionInView={sectionInView} />
      ) : (
        <div className="max-w-5xl">
          {/* Category filter buttons */}
          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
                className={`font-mono text-caption uppercase tracking-widest px-3 py-1.5 rounded-sm border transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'border-current bg-offwhite/5'
                    : 'border-offwhite/10 text-offwhite/30 hover:text-offwhite/50 hover:border-offwhite/20'
                }`}
                style={activeCategory === cat.key ? { borderColor: cat.color, color: cat.color } : undefined}
              >
                {cat.label}
              </button>
            ))}
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="font-mono text-caption uppercase tracking-widest px-3 py-1.5 text-offwhite/30 hover:text-offwhite/50 transition-colors duration-300"
              >
                Clear
              </button>
            )}
          </motion.div>

          {/* Constellation SVG */}
          <Constellation
            sectionInView={sectionInView}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
          />

          {/* Legend */}
          <motion.div
            className="mt-6 flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {categories.map((cat) => (
              <div key={cat.key} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="font-mono text-caption text-offwhite/40">{cat.label}</span>
              </div>
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
