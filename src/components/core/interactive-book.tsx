'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, RefreshCcw, X } from 'lucide-react';

export interface BookPage {
  title?: string;
  subtitle?: string;
  content: React.ReactNode;
  backTitle?: string;
  backSubtitle?: string;
  backContent?: React.ReactNode;
  pageNumber: number;
}

export interface InteractiveBookProps {
  coverImage?: string;
  coverNode?: React.ReactNode;
  /** Callback receives (spreadIdx, printedPageNumber) so both desktop 2-page spread and mobile 1-page reader jump accurately */
  innerCoverContent?: (jumpToPage: (spreadIdx: number, printedPage?: number) => void) => React.ReactNode;
  backCoverContent?: React.ReactNode;
  bookTitle?: string;
  bookAuthor?: string;
  pages: BookPage[];
  className?: string;
  width?: number;
  height?: number;
  defaultOpen?: boolean;
  onClose?: () => void;
}

export default function InteractiveBook({
  coverImage,
  coverNode,
  innerCoverContent,
  backCoverContent,
  bookTitle = 'Book Title',
  bookAuthor = 'Author Name',
  pages,
  className,
  width = 415,
  height = 565,
  defaultOpen = false,
  onClose,
}: InteractiveBookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(-1);
  const [isHovering, setIsHovering] = useState(false);
  const [viewportWidth, setViewportWidth] = useState<number>(1280);
  // Mobile single-page index: 0 = Contents, 1..2N = Pages, 2N+1 = Back Cover
  const [mobilePageIdx, setMobilePageIdx] = useState(1);
  const mobileSwipeRef = useRef<{ x: number; y: number } | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollTop = 0;
    }
  }, [mobilePageIdx]);

  useEffect(() => {
    const updateSize = () => setViewportWidth(window.innerWidth);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Open cover smoothly right after mount when defaultOpen is enabled
  useEffect(() => {
    if (!defaultOpen) return;
    setCurrentPageIndex(-1);
    setMobilePageIdx(1);
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 120);
    return () => clearTimeout(timer);
  }, [defaultOpen, bookTitle]);

  const BOOK_OPEN_DURATION = 0.72;
  const PAGE_FLIP_DURATION = 0.46;
  const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const handleOpenBook = () => setIsOpen(true);

  const handleCloseBook = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsOpen(false);
    setCurrentPageIndex(-1);
    onClose?.();
  };

  const hasTextSelection = () => {
    if (typeof window === 'undefined') return false;
    const sel = window.getSelection();
    return Boolean(sel && sel.toString().trim().length > 0);
  };

  const nextPage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (hasTextSelection()) return;
    setCurrentPageIndex((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
  };

  const prevPage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (hasTextSelection()) return;
    setCurrentPageIndex((prev) => (prev >= 0 ? prev - 1 : prev));
  };

  const restartBook = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentPageIndex(-1);
    setMobilePageIdx(0);
  };

  const jumpToPage = (sheetIndex: number, printedPage?: number) => {
    const clamped = Math.max(-1, Math.min(pages.length - 1, sheetIndex));
    setCurrentPageIndex(clamped);
    if (typeof printedPage === 'number') {
      setMobilePageIdx(Math.max(0, Math.min(pages.length * 2 + 1, printedPage)));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPageIndex(parseInt(e.target.value, 10));
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentPageIndex((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentPageIndex((prev) => (prev >= 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setCurrentPageIndex(-1);
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pages.length, onClose]);

  const isMobile = viewportWidth < 720;
  const spreadTotalWidth = width * 2 + 32;
  const scale = isMobile ? 1 : Math.min(1, Math.max(0.62, (viewportWidth - 40) / spreadTotalWidth));

  // Flat page sequence for mobile single-page reader
  const mobilePages: { label: string; title?: string; subtitle?: string; node: React.ReactNode }[] = [
    {
      label: 'Contents',
      node: innerCoverContent ? (
        innerCoverContent((spreadIdx, printedPage) => {
          const fallbackIdx = spreadIdx < 0 ? 1 : spreadIdx * 2 + 2;
          setMobilePageIdx(Math.max(0, Math.min(pages.length * 2 + 1, printedPage ?? fallbackIdx)));
        })
      ) : (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <h2 className="font-serif text-2xl text-neutral-800">{bookTitle}</h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-neutral-500">{bookAuthor}</p>
        </div>
      ),
    },
    ...pages.flatMap((p) => {
      const pair = [
        {
          label: `Page ${p.pageNumber * 2 - 1}`,
          title: p.title,
          subtitle: p.subtitle,
          node: p.content,
        },
      ];
      if (p.backContent || p.backTitle) {
        pair.push({
          label: `Page ${p.pageNumber * 2}`,
          title: p.backTitle,
          subtitle: p.backSubtitle,
          node: p.backContent ?? <div />,
        });
      }
      return pair;
    }),
    ...(backCoverContent
      ? [
          {
            label: 'End',
            node: <div className="flex h-full items-center justify-center">{backCoverContent}</div>,
          },
        ]
      : []),
  ];

  const totalPrintedPages = pages.length * 2;
  const spreadLabel =
    currentPageIndex === -1
      ? `Contents · Page 1 of ${totalPrintedPages}`
      : currentPageIndex === pages.length - 1
      ? `Page ${totalPrintedPages} · End`
      : `Pages ${currentPageIndex * 2 + 2} – ${Math.min(currentPageIndex * 2 + 3, totalPrintedPages)} of ${totalPrintedPages}`;

  // Mobile single-page reader
  if (isMobile) {
    const safeIdx = Math.max(0, Math.min(mobilePages.length - 1, mobilePageIdx));
    const currentMobile = mobilePages[safeIdx];
    const progressPct = Math.round(((safeIdx + 1) / Math.max(1, mobilePages.length)) * 100);

    const onMobileTouchStart = (e: React.TouchEvent) => {
      if (e.touches.length !== 1) return;
      mobileSwipeRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onMobileTouchEnd = (e: React.TouchEvent) => {
      if (!mobileSwipeRef.current || e.changedTouches.length !== 1) return;
      const dx = e.changedTouches[0].clientX - mobileSwipeRef.current.x;
      const dy = e.changedTouches[0].clientY - mobileSwipeRef.current.y;
      mobileSwipeRef.current = null;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.35) {
        if (dx < 0) setMobilePageIdx((i) => Math.min(mobilePages.length - 1, i + 1));
        else setMobilePageIdx((i) => Math.max(0, i - 1));
      }
    };

    return (
      <div className={cn('relative mx-auto flex w-full max-w-[440px] flex-col items-center px-1', className)}>
        <div
          data-handbook-keep-open="true"
          onTouchStart={onMobileTouchStart}
          onTouchEnd={onMobileTouchEnd}
          className="relative w-full overflow-hidden rounded-xl border border-[#decfae] bg-[#fdfaf3] text-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
        >
          {/* Thin top progress rule */}
          <div className="h-[2px] w-full bg-[#ebe1cf]">
            <div
              className="h-full bg-[#b48448] transition-[width] duration-300 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between border-b border-[#e8decb] bg-[#f7f1e4] px-4 py-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7c5c38] truncate pr-2">
              {bookTitle}
            </span>
            <span className="font-mono text-[10px] text-[#6f5d49] shrink-0">
              {currentMobile.label} · {safeIdx + 1}/{mobilePages.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              ref={mobileScrollRef}
              key={safeIdx}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="book-page-mobile h-[435px] overflow-y-auto touch-pan-y px-5 py-4 font-sans text-[13.5px] leading-relaxed text-[#2c2117]"
            >
              {currentMobile.subtitle && (
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6539]">
                  {currentMobile.subtitle}
                </p>
              )}
              {currentMobile.title && (
                <h3 className="mt-1 mb-3.5 font-serif text-[23px] font-semibold leading-snug text-[#1e150e]">
                  {currentMobile.title}
                </h3>
              )}
              <div className="space-y-3">{currentMobile.node}</div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between border-t border-[#e8decb] bg-[#f7f1e4] px-3 py-2">
            <button
              type="button"
              onClick={() => setMobilePageIdx((i) => Math.max(0, i - 1))}
              disabled={safeIdx === 0}
              className="inline-flex items-center gap-1 rounded-full border border-[#d6c6ad] bg-white px-3 py-1.5 font-mono text-[11px] font-medium text-[#241911] disabled:opacity-35 touch-manipulation active:scale-95 transition-transform"
            >
              <ChevronLeft size={13} /> Prev
            </button>
            <button
              type="button"
              onClick={() => setMobilePageIdx(0)}
              className={`font-mono text-[10px] uppercase tracking-wider underline-offset-2 touch-manipulation px-2 py-1 ${
                safeIdx === 0 ? 'font-semibold text-[#1e150e] underline' : 'text-[#7c5c38] hover:underline'
              }`}
            >
              Contents
            </button>
            <button
              type="button"
              onClick={() => setMobilePageIdx((i) => Math.min(mobilePages.length - 1, i + 1))}
              disabled={safeIdx === mobilePages.length - 1}
              className="inline-flex items-center gap-1 rounded-full bg-[#1d140e] px-3 py-1.5 font-mono text-[11px] font-medium text-[#f5efe5] disabled:opacity-35 touch-manipulation active:scale-95 transition-transform"
            >
              Next <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Strictly separated Z coordinates (px) eliminate CSS preserve-3d Z-fighting completely:
  // Right unflipped stack: Back Cover (0) < Sheet N-1 (2) < ... < Sheet 0 (2N) < Closed Front Cover (2N+4)
  // Left flipped stack: Open Inner Cover (1) < Sheet 0 (3) < Sheet 1 (5) < ... < Sheet N-1 (2N+1)
  const frontCoverZ = isOpen ? 1 : (pages.length + 2) * 2;

  return (
    <div className={cn('relative flex flex-col items-center justify-center', className)}>
      <div
        data-handbook-keep-open="true"
        className="relative flex items-center justify-center"
        style={{
          width: width * 2 * scale,
          height: height * scale,
          perspective: '2400px',
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            width: width * 2,
            height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '2400px',
          }}
        >
          <motion.div
            className="relative"
            style={{ width, height, transformStyle: 'preserve-3d' }}
            initial={{ x: 0 }}
            animate={{ x: isOpen ? width / 2 : 0 }}
            transition={{ duration: BOOK_OPEN_DURATION, ease: EASING }}
          >
            {/* Front Cover */}
            <motion.div
              className="absolute inset-0 h-full w-full origin-left"
              initial={{ rotateY: 0, z: (pages.length + 2) * 2 }}
              animate={{
                rotateY: isOpen ? -180 : isHovering ? -14 : 0,
                z: frontCoverZ,
              }}
              transition={{
                rotateY: { duration: BOOK_OPEN_DURATION, ease: EASING },
                z: { duration: 0.01, delay: isOpen ? BOOK_OPEN_DURATION * 0.45 : BOOK_OPEN_DURATION * 0.45 },
              }}
              style={{
                transformStyle: 'preserve-3d',
                pointerEvents: !isOpen || currentPageIndex === -1 ? 'auto' : 'none',
              }}
              onClick={!isOpen ? handleOpenBook : undefined}
              onHoverStart={() => !isOpen && setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              {/* Outer Front Cover Face */}
              <div
                className="group absolute inset-0 h-full w-full cursor-pointer overflow-hidden rounded-l-sm rounded-r-md shadow-2xl"
                style={{
                  transform: 'translateZ(0.4px)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {coverNode ? (
                  coverNode
                ) : (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: coverImage ? `url(${coverImage})` : undefined }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <div className="absolute bottom-6 left-5 right-5 text-left text-white">
                      <h2 className="font-serif text-2xl font-bold leading-tight tracking-wide drop-shadow-md">
                        {bookTitle}
                      </h2>
                      <p className="mt-1.5 inline-block border-t border-white/30 pt-1 font-mono text-[10px] uppercase tracking-widest opacity-90">
                        {bookAuthor}
                      </p>
                    </div>
                  </>
                )}
                <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-4 bg-gradient-to-r from-white/25 to-transparent opacity-40" />
                <div className="pointer-events-none absolute bottom-0 left-[12px] top-0 w-[1px] bg-black/30" />
              </div>

              {/* Inner Front Cover (Left Page when currentPageIndex === -1) */}
              <div
                className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-l-md rounded-r-sm border-r border-[#dfd2bc] bg-[#fbf7ee] p-6 shadow-xl"
                style={{
                  transform: 'rotateY(180deg) translateZ(0.4px)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  pointerEvents: isOpen && currentPageIndex === -1 ? 'auto' : 'none',
                }}
              >
                <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-9 bg-gradient-to-l from-black/[0.08] to-transparent" />
                {innerCoverContent ? (
                  <div className="relative z-10 flex h-full flex-col">{innerCoverContent(jumpToPage)}</div>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center text-center opacity-85">
                    <h2 className="mb-2 font-serif text-2xl tracking-wide text-neutral-800">{bookTitle}</h2>
                    <div className="mb-3 h-[1px] w-10 bg-neutral-300" />
                    <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                      Interactive Edition
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Pages Stack */}
            <div className="absolute inset-0 h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
              {pages.map((page, index) => {
                const isFlipped = index <= currentPageIndex;
                const isVisibleRightTop = isOpen && !isFlipped && index === currentPageIndex + 1;
                const isVisibleLeftTop = isOpen && isFlipped && index === currentPageIndex;
                const sheetZ = isFlipped ? (index + 1) * 2 + 1 : (pages.length - index) * 2;

                return (
                  <motion.div
                    key={index}
                    className="absolute inset-0 h-full w-full origin-left rounded-l-sm rounded-r-md border border-[#e3d7c3] bg-[#fdfbf7] shadow-md"
                    style={{
                      transformStyle: 'preserve-3d',
                      pointerEvents: isVisibleRightTop || isVisibleLeftTop ? 'auto' : 'none',
                    }}
                    initial={{ rotateY: 0, z: (pages.length - index) * 2 }}
                    animate={{
                      rotateY: isFlipped ? -180 : 0,
                      z: sheetZ,
                    }}
                    transition={{
                      rotateY: { duration: PAGE_FLIP_DURATION, ease: EASING },
                      z: { duration: 0.01, delay: PAGE_FLIP_DURATION * 0.45 },
                    }}
                  >
                    {/* Front Face (Right Side - Odd Page) */}
                    <div
                      className="absolute inset-0 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-r-md bg-[#fdfbf7] p-6 transition-colors hover:bg-[#fcf9f1]"
                      style={{
                        transform: 'translateZ(0.4px)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        pointerEvents: isVisibleRightTop ? 'auto' : 'none',
                      }}
                      onClick={nextPage}
                    >
                      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-9 bg-gradient-to-r from-black/[0.08] to-transparent" />
                      <div className="relative z-10 flex h-full flex-col">
                        <div className="mb-2.5 flex items-center justify-between border-b border-[#e8decb] pb-2">
                          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a6539]">
                            {page.subtitle ?? bookTitle}
                          </span>
                          <span className="font-mono text-[11px] text-neutral-400">
                            {String(page.pageNumber * 2 - 1).padStart(2, '0')}
                          </span>
                        </div>

                        {page.title && (
                          <h3 className="mb-3 font-serif text-[22px] font-semibold leading-snug tracking-tight text-[#1e150e]">
                            {page.title}
                          </h3>
                        )}

                        <div className="book-page-scroll flex-1 overflow-y-auto pr-1 text-[13px] leading-relaxed text-[#3b2e23]">
                          {page.content}
                        </div>

                        <div className="mt-2 flex items-center justify-between border-t border-[#eee4d3] pt-1.5 font-mono text-[9.5px] uppercase tracking-wider text-neutral-400">
                          <span>Winter Hackathon &rsquo;26</span>
                          <span className="text-[#8a6539]">Click page to turn →</span>
                        </div>
                      </div>
                    </div>

                    {/* Back Face (Left Side - Even Page) */}
                    <div
                      className="absolute inset-0 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-l-md border-r border-[#dfd2bc] bg-[#fdfbf7] p-6 transition-colors hover:bg-[#fcf9f1]"
                      style={{
                        transform: 'rotateY(180deg) translateZ(0.4px)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        pointerEvents: isVisibleLeftTop ? 'auto' : 'none',
                      }}
                      onClick={prevPage}
                    >
                      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-9 bg-gradient-to-l from-black/[0.08] to-transparent" />
                      <div className="relative z-10 flex h-full flex-col">
                        <div className="mb-2.5 flex items-center justify-between border-b border-[#e8decb] pb-2">
                          <span className="font-mono text-[11px] text-neutral-400">
                            {String(page.pageNumber * 2).padStart(2, '0')}
                          </span>
                          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a6539]">
                            {page.backSubtitle ?? bookTitle}
                          </span>
                        </div>

                        {page.backTitle && (
                          <h3 className="mb-3 font-serif text-[22px] font-semibold leading-snug tracking-tight text-[#1e150e]">
                            {page.backTitle}
                          </h3>
                        )}

                        <div className="book-page-scroll flex-1 overflow-y-auto pr-1 text-[13px] leading-relaxed text-[#3b2e23]">
                          {page.backContent ? (
                            page.backContent
                          ) : (
                            <div className="flex h-full w-full items-center justify-center opacity-[0.04]">
                              <span className="font-serif text-8xl font-bold italic text-black">
                                {page.pageNumber * 2}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="mt-2 flex items-center justify-between border-t border-[#eee4d3] pt-1.5 font-mono text-[9.5px] uppercase tracking-wider text-neutral-400">
                          <span className="text-[#8a6539]">← Click page to go back</span>
                          <span>{bookAuthor}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Back Cover (Static at bottom Z = 0) */}
              <div
                className="absolute inset-0 h-full w-full rounded-l-sm rounded-r-md border border-[#dfd2bc] bg-[#f7f1e3] shadow-xl"
                style={{
                  transform: 'translateZ(0px)',
                  pointerEvents: isOpen && currentPageIndex === pages.length - 1 ? 'auto' : 'none',
                }}
              >
                <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-9 bg-gradient-to-r from-black/[0.08] to-transparent" />
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  {backCoverContent ?? (
                    <>
                      <p className="font-serif text-lg italic text-[#5b4732]">End of Volume</p>
                      <button
                        type="button"
                        onClick={restartBook}
                        className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#d6c5ab] bg-white px-4 py-2 font-mono text-xs text-[#2b1e14] shadow-sm transition-colors hover:bg-[#fdfbf7]"
                      >
                        <RefreshCcw size={13} /> Read Again
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Page Navigation Bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-handbook-keep-open="true"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t border-white/[0.1] pt-3"
          >
            <button
              type="button"
              onClick={prevPage}
              disabled={currentPageIndex < 0}
              className="inline-flex items-center gap-1 rounded-md border border-white/[0.12] px-3 py-1 font-mono text-[11px] text-[#e8dfd3] transition-colors hover:border-[#e0b885]/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={13} /> Prev
            </button>

            <div className="flex items-center gap-3 px-1">
              <input
                type="range"
                aria-label="Turn book pages"
                min={-1}
                max={pages.length - 1}
                value={currentPageIndex}
                onChange={handleSliderChange}
                className="h-1 w-24 cursor-pointer accent-[#e0b885]"
              />
              <span className="min-w-[130px] text-center font-mono text-[11px] text-[#b8ada0]">
                {spreadLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={nextPage}
              disabled={currentPageIndex >= pages.length - 1}
              className="inline-flex items-center gap-1 rounded-md border border-[#e0b885]/50 bg-[#e0b885]/15 px-3 py-1 font-mono text-[11px] font-medium text-[#e0b885] transition-colors hover:bg-[#e0b885] hover:text-[#160e0a] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next <ChevronRight size={13} />
            </button>

            <div className="flex items-center gap-1.5 border-l border-white/[0.1] pl-3">
              <button
                type="button"
                onClick={restartBook}
                title="Back to Contents"
                aria-label="Restart book"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#b8ada0] transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <RefreshCcw size={12} />
              </button>

              {onClose && (
                <button
                  type="button"
                  onClick={handleCloseBook}
                  title="Close Book"
                  aria-label="Close Book"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#b8ada0] transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && !defaultOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          onClick={handleOpenBook}
          className="mt-4 cursor-pointer font-mono text-xs uppercase tracking-[0.25em] text-[#d6cec2] transition-colors hover:text-[#e0b885]"
        >
          Click Cover to Open
        </motion.div>
      )}
    </div>
  );
}
