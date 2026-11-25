'use client';

import { useCallback, useEffect, useState } from 'react';
import { BookOpen, X } from 'lucide-react';
import BooksShowcase, { type BookCfg, type BooksShowcaseHelpers } from '@/components/core/books-showcase';
import InteractiveBook from '@/components/core/interactive-book';
import { handbookBooks } from '@/data/handbook-books';
import { handbookBookDecks } from '@/data/handbook-book-pages';

const BOOK_TABS = [
  { id: 'schedule', numeral: 'I', label: 'Schedule' },
  { id: 'how-it-works', numeral: 'II', label: 'How It Works' },
  { id: 'judging', numeral: 'III', label: 'Judging' },
  { id: 'rules', numeral: 'IV', label: 'Rules' },
  { id: 'github-submission', numeral: 'V', label: 'GitHub' },
] as const;

const VALID_BOOK_IDS = new Set<string>(BOOK_TABS.map((p) => p.id));

const THEME_COLORS = {
  bgDark: 'transparent',
  bgLight: 'transparent',
  navy: '#120b07',
  pink: '#e0b885',
  cream: '#f5efe5',
  lav: '#d6cec2',
  peri: '#c89f6d',
  foregroundDark: '#f5efe5',
  foregroundLight: '#f5efe5',
};

const LEAF_COLORS = [0xe0b885, 0xc89f6d, 0x9c7648, 0xf3dec0];

export default function HandbookBooksSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<'hero' | 'opening' | 'detail' | 'closing'>('hero');

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (VALID_BOOK_IDS.has(hash)) {
        setSelectedId(hash);
      }
    };

    const onOpenBook = (e: Event) => {
      const detail = (e as CustomEvent<{ id?: string }>).detail;
      if (detail?.id && VALID_BOOK_IDS.has(detail.id)) {
        setSelectedId(detail.id);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('open-handbook-book', onOpenBook);
    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('open-handbook-book', onOpenBook);
    };
  }, []);

  const handleBookSelect = useCallback((b: BookCfg | null) => {
    const nextId = b ? b.id : null;
    setSelectedId(nextId);
    window.dispatchEvent(new CustomEvent('handbook-book-selected', { detail: { id: nextId } }));
  }, []);

  const renderDetailOverlay = useCallback((book: BookCfg, helpers: BooksShowcaseHelpers) => {
    const deck = handbookBookDecks[book.id] ?? handbookBookDecks.schedule;

    return (
      <div className="flex w-full max-w-[1040px] flex-col items-center justify-center">
        {/* Clean Back to Shelf control */}
        <div className="mb-3 flex w-full max-w-[830px] items-center justify-end px-1">
          <button
            type="button"
            onClick={() => helpers.close()}
            aria-label="Back to Shelf"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.14] bg-[#160f0a]/75 px-3 py-1 font-mono text-[11px] text-[#e8dfd3] backdrop-blur-md transition-colors hover:border-[#e0b885]/60 hover:text-white"
          >
            <span>Back to Shelf</span>
            <X size={12} />
          </button>
        </div>

        {/* Interactive Page-Flipping Book */}
        <InteractiveBook
          key={book.id}
          defaultOpen={true}
          width={415}
          height={565}
          bookTitle={deck.title}
          bookAuthor={deck.author}
          coverNode={deck.coverNode}
          innerCoverContent={deck.innerCoverContent}
          backCoverContent={deck.backCoverContent}
          pages={deck.pages}
          onClose={helpers.close}
        />
      </div>
    );
  }, []);

  return (
    <section id="handbook" className="relative border-b border-white/[0.08] bg-cream-alt">
      {/* Anchor targets for deep links (#schedule, #how-it-works, #judging, #rules, #github-submission) */}
      <span id="schedule" className="pointer-events-none absolute top-0 left-0 h-px w-px opacity-0" aria-hidden="true" />
      <span id="how-it-works" className="pointer-events-none absolute top-0 left-0 h-px w-px opacity-0" aria-hidden="true" />
      <span id="judging" className="pointer-events-none absolute top-0 left-0 h-px w-px opacity-0" aria-hidden="true" />
      <span id="rules" className="pointer-events-none absolute top-0 left-0 h-px w-px opacity-0" aria-hidden="true" />
      <span id="github-submission" className="pointer-events-none absolute top-0 left-0 h-px w-px opacity-0" aria-hidden="true" />

      {/* Minimal, Balanced Header + Single Unified Editorial Volume Switcher */}
      <div className="container-site pt-14 sm:pt-20 pb-2">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Event Guide · IST (UTC+5:30)</p>
            <h2 className="section-title sm:whitespace-nowrap">
              Hackathon <span className="font-serif italic text-[#e0b885]">Handbook</span>
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#cfc5b7]">
              Click any book below to read the schedule, flow, scoring, rules, and GitHub protocol.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 self-start lg:self-auto border-b border-white/[0.18]">
            {BOOK_TABS.map((tab) => {
              const active = selectedId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedId(tab.id)}
                  className={`relative -mb-px flex items-center gap-2 whitespace-nowrap border-b-2 pb-2.5 pt-1.5 px-1 text-sm sm:text-[15px] tracking-wide transition-all ${
                    active
                      ? 'border-[#e0b885] bg-gradient-to-t from-[#e0b885]/[0.12] to-transparent font-semibold text-[#ffd89b]'
                      : 'border-transparent font-medium text-[#ede5da] hover:border-[#e0b885]/50 hover:text-white'
                  }`}
                >
                  <span
                    className={`font-serif italic text-sm sm:text-base ${
                      active ? 'text-[#ffd89b]' : 'text-[#e0b885]'
                    }`}
                  >
                    {tab.numeral}.
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3D Books Showcase */}
      <div className="relative h-[650px] sm:h-[720px] lg:h-[760px] w-full">
        <BooksShowcase
          books={handbookBooks}
          heroTitle="Volumes"
          showNav={false}
          showDetailPanel={true}
          showCarousel={true}
          selectedBookId={selectedId}
          onBookSelect={handleBookSelect}
          onModeChange={setMode}
          themeColors={THEME_COLORS}
          leafColors={LEAF_COLORS}
          renderDetailOverlay={renderDetailOverlay}
        />

        {/* Minimal bottom prompt */}
        <div
          className={`pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2 font-mono text-[11px] tracking-wide text-[#b8ada0] transition-opacity duration-300 ${
            mode === 'hero' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <BookOpen size={12} className="text-[#e0b885]" />
          <span>Click any book to open</span>
        </div>
      </div>
    </section>
  );
}
