'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BookOpen, X } from 'lucide-react';
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
  const [coverThumbs, setCoverThumbs] = useState<Record<string, string>>({});
  const closeHelpersRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (mode !== 'detail') return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof Node && !document.contains(target)) return;
      if (target instanceof Element && target.closest('[data-handbook-keep-open="true"]')) return;
      closeHelpersRef.current?.();
    };
    const id = setTimeout(() => {
      document.addEventListener('click', onDocClick);
    }, 60);
    return () => {
      clearTimeout(id);
      document.removeEventListener('click', onDocClick);
    };
  }, [mode]);

  // Render miniature cover previews only on desktop hover pointers (saves main-thread canvas work on mobile)
  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px) and (hover: hover)').matches) return;
    const thumbs: Record<string, string> = {};
    const w = 160;
    const h = 240;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    handbookBooks.forEach((book) => {
      if (!book.front) return;
      ctx.save();
      ctx.clearRect(0, 0, w, h);
      ctx.scale(w / 1024, h / 1536);
      book.front(ctx, 1024, 1536);
      ctx.restore();
      thumbs[book.id] = c.toDataURL('image/jpeg', 0.85);
    });
    setCoverThumbs(thumbs);
  }, []);

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
    closeHelpersRef.current = helpers.close;
    const deck = handbookBookDecks[book.id] ?? handbookBookDecks.schedule;

    return (
      <div className="flex w-full max-w-[1040px] flex-col items-center justify-center">
        {/* Clean Back to Shelf control */}
        <div className="mb-2 sm:mb-3 flex w-full max-w-[830px] items-center justify-end px-1">
          <button
            type="button"
            onClick={() => helpers.close()}
            aria-label="Back to Shelf"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.14] bg-[#160f0a]/85 px-3 py-1 font-mono text-[11px] text-[#e8dfd3] md:backdrop-blur-md transition-colors hover:border-[#e0b885]/60 hover:text-white touch-manipulation"
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

      {/* Balanced Header + Right-Aligned Volume Navigation */}
      <div className="container-site pt-10 sm:pt-16 pb-0">
        <div className="flex flex-col justify-between gap-4 sm:gap-6 lg:flex-row lg:items-end">
          <div className="min-w-0">
            <h2 className="font-serif text-[2.65rem] sm:text-6xl lg:text-[4.5rem] font-normal leading-[1] tracking-tight text-white sm:whitespace-nowrap">
              Event <span className="font-serif italic text-[#e0b885]">Guide</span>
            </h2>
            <p className="mt-2.5 sm:mt-3 max-w-lg text-[13.5px] sm:text-[15px] leading-relaxed text-[#cfc5b7]">
              Explore the schedule, flow, scoring, rules, and GitHub protocol.
            </p>
          </div>

          <div className="w-full lg:w-auto lg:shrink-0">
            <p className="mb-1.5 flex items-center gap-2 lg:justify-end font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#f0c78c]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e0b885]" />
              <span>Select Volume to Open</span>
            </p>
            <div className="w-full overflow-x-auto lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-b border-[#e0b885]/35">
              <nav
                data-handbook-keep-open="true"
                aria-label="Handbook Volumes"
                className="flex flex-nowrap items-center gap-x-1 sm:gap-x-3 w-max lg:w-auto"
              >
                {BOOK_TABS.map((tab) => {
                  const active = selectedId === tab.id;
                  const thumb = coverThumbs[tab.id];
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={(e) => {
                        setSelectedId(tab.id);
                        e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                      }}
                      className={`group relative flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-t-md border-b-2 px-2 sm:px-2.5 py-2 sm:py-1.5 transition-all duration-200 hover:bg-[#e0b885]/[0.09] touch-manipulation ${
                        active
                          ? 'border-[#ffd89b] bg-[#e0b885]/[0.12] text-[#ffd89b]'
                          : 'border-transparent text-[#fff7eb] hover:border-[#e0b885] hover:text-[#ffd89b]'
                      }`}
                    >
                      {thumb && (
                        <img
                          src={thumb}
                          alt={`${tab.label} cover`}
                          className="hidden lg:block pointer-events-none absolute bottom-full left-1/2 mb-3 h-[110px] w-[76px] -translate-x-1/2 translate-y-2 scale-90 rounded-md border border-[#e0b885]/40 object-cover opacity-0 shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[100] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
                        />
                      )}
                      <span
                        className={`font-serif italic text-[13.5px] sm:text-base font-medium ${
                          active ? 'text-[#ffd89b]' : 'text-[#e0b885]'
                        }`}
                      >
                        {tab.numeral}.
                      </span>
                      <span className="font-serif text-[15px] sm:text-[18px] font-semibold tracking-tight">
                        {tab.label}
                      </span>
                      <ArrowUpRight
                        size={13}
                        strokeWidth={2.2}
                        className={`transition-transform duration-200 ${
                          active
                            ? 'text-[#ffd89b]'
                            : 'text-[#e0b885]/75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ffd89b]'
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Books Showcase */}
      <div className="relative h-[600px] sm:h-[660px] lg:h-[700px] w-full">
        <BooksShowcase
          books={handbookBooks}
          heroTitle="PROTOCOL"
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

        {/* Desktop bottom prompt (mobile dock shows active volume + prompt cleanly inside BooksShowcase) */}
        <div
          className={`pointer-events-none hidden md:flex absolute bottom-4 left-1/2 z-20 -translate-x-1/2 items-center gap-2 font-mono text-[11px] tracking-wide text-[#b8ada0] transition-opacity duration-300 ${
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
