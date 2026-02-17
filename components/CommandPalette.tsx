'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_SECTIONS, PERSONAL } from '@/lib/constants';

interface Command {
  id: string;
  label: string;
  category: 'navigate' | 'action';
  icon: string;
  action: () => void;
}

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands = useMemo<Command[]>(() => [
    // Navigation
    ...NAV_SECTIONS.map((section) => ({
      id: `nav-${section.id}`,
      label: `Go to ${section.label}`,
      category: 'navigate' as const,
      icon: '\u2192',
      action: () => {
        const el = document.getElementById(section.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    })),
    // Actions
    {
      id: 'copy-email',
      label: 'Copy email address',
      category: 'action',
      icon: '\u2709',
      action: () => {
        navigator.clipboard.writeText(PERSONAL.email);
      },
    },
    {
      id: 'open-linkedin',
      label: 'Open LinkedIn',
      category: 'action',
      icon: '\uD83D\uDD17',
      action: () => window.open(PERSONAL.socials.linkedin, '_blank'),
    },
    {
      id: 'open-instagram',
      label: 'Open Instagram',
      category: 'action',
      icon: '\uD83D\uDCF7',
      action: () => window.open(PERSONAL.socials.instagram, '_blank'),
    },
    {
      id: 'open-tiktok',
      label: 'Open TikTok',
      category: 'action',
      icon: '\uD83C\uDFB5',
      action: () => window.open(PERSONAL.socials.tiktok, '_blank'),
    },
    {
      id: 'book-call',
      label: 'Book a call',
      category: 'action',
      icon: '\uD83D\uDCC5',
      action: () => window.open(PERSONAL.socials.bookCall, '_blank'),
    },
  ], []);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    return commands.filter((cmd) => fuzzyMatch(query, cmd.label));
  }, [query, commands]);

  // Reset selection when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.children[selectedIndex] as HTMLElement;
      if (selected) selected.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const executeCommand = useCallback((cmd: Command) => {
    setIsOpen(false);
    setQuery('');
    // Slight delay for exit animation
    setTimeout(() => cmd.action(), 150);
  }, []);

  // Global keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation within palette
  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault();
      executeCommand(filteredCommands[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  }, [filteredCommands, selectedIndex, executeCommand]);

  return (
    <>
      {/* Hint badge */}
      <div className="fixed bottom-6 left-6 z-[100] hidden lg:block">
        <button
          onClick={() => { setIsOpen(true); setQuery(''); setSelectedIndex(0); }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-charcoal-mid/50 border border-offwhite/10 rounded-sm font-mono text-[10px] text-offwhite/25 hover:text-offwhite/40 hover:border-offwhite/20 transition-all duration-300"
        >
          <kbd className="px-1 py-0.5 bg-offwhite/5 rounded text-[9px]">{'\u2318'}K</kbd>
        </button>
      </div>

      {/* Palette overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[500] flex items-start justify-center pt-[20vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
              onClick={() => { setIsOpen(false); setQuery(''); }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Palette */}
            <motion.div
              className="relative z-10 w-full max-w-lg mx-4 bg-charcoal-mid border border-offwhite/10 rounded-sm shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -10, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-offwhite/5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-offwhite/30 flex-shrink-0">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-body font-sans text-offwhite/80 placeholder:text-offwhite/20 outline-none"
                />
                <kbd className="px-1.5 py-0.5 bg-offwhite/5 rounded text-[10px] font-mono text-offwhite/20">ESC</kbd>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-[300px] overflow-y-auto py-2">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-6 text-center font-mono text-caption text-offwhite/20">
                    No results found
                  </div>
                ) : (
                  filteredCommands.map((cmd, i) => (
                    <button
                      key={cmd.id}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 ${
                        i === selectedIndex
                          ? 'bg-amber/10 text-offwhite'
                          : 'text-offwhite/50 hover:bg-offwhite/[0.03]'
                      }`}
                    >
                      <span className="text-sm w-5 text-center flex-shrink-0">{cmd.icon}</span>
                      <span className="font-sans text-body flex-1">{cmd.label}</span>
                      <span className="font-mono text-[10px] text-offwhite/20 uppercase">
                        {cmd.category === 'navigate' ? 'Nav' : 'Action'}
                      </span>
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-offwhite/5 flex items-center gap-4">
                <span className="font-mono text-[10px] text-offwhite/15 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-offwhite/5 rounded">{'\u2191'}{'\u2193'}</kbd> Navigate
                </span>
                <span className="font-mono text-[10px] text-offwhite/15 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-offwhite/5 rounded">{'\u23CE'}</kbd> Select
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
