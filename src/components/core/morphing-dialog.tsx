'use client';

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface MorphingDialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const MorphingDialogContext = React.createContext<MorphingDialogContextType | null>(null);

function useMorphingDialog() {
  const context = useContext(MorphingDialogContext);
  if (!context) {
    throw new Error('useMorphingDialog must be used within a MorphingDialog');
  }
  return context;
}

export interface MorphingDialogProps {
  children: React.ReactNode;
  transition?: Transition;
}

export function MorphingDialog({ children, transition }: MorphingDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <MorphingDialogContext.Provider
      value={{ isOpen, setIsOpen, uniqueId, triggerRef }}
    >
      {children}
    </MorphingDialogContext.Provider>
  );
}

export interface MorphingDialogTriggerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MorphingDialogTrigger({
  children,
  className,
  style,
}: MorphingDialogTriggerProps) {
  const { setIsOpen, uniqueId, triggerRef } = useMorphingDialog();

  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      className={className}
      style={style}
      onClick={() => setIsOpen(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen(true);
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export interface MorphingDialogContainerProps {
  children: React.ReactNode;
}

export function MorphingDialogContainer({
  children,
}: MorphingDialogContainerProps) {
  const { isOpen, uniqueId } = useMorphingDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            key={`backdrop-${uniqueId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />
          <div className="relative z-10 w-full flex justify-center items-center max-h-full">
            {children}
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export interface MorphingDialogContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MorphingDialogContent({
  children,
  className,
  style,
}: MorphingDialogContentProps) {
  const { setIsOpen, uniqueId } = useMorphingDialog();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  return (
    <motion.div
      ref={contentRef}
      layoutId={`dialog-${uniqueId}`}
      className={className}
      style={style}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 28,
      }}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogTitle({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.h3
      layoutId={`dialog-title-${uniqueId}`}
      className={className}
      style={style}
    >
      {children}
    </motion.h3>
  );
}

export function MorphingDialogSubtitle({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.p
      layoutId={`dialog-subtitle-${uniqueId}`}
      className={className}
      style={style}
    >
      {children}
    </motion.p>
  );
}

export function MorphingDialogImage({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { uniqueId } = useMorphingDialog();
  return (
    <motion.img
      layoutId={`dialog-img-${uniqueId}`}
      src={src}
      alt={alt}
      className={className}
      style={style}
    />
  );
}

export function MorphingDialogClose({
  className,
}: {
  className?: string;
}) {
  const { setIsOpen } = useMorphingDialog();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
      className={`absolute top-5 right-5 z-20 rounded-lg p-1.5 text-[#a69b8d] transition-colors hover:bg-white/[0.07] hover:text-white ${className || ''}`}
      aria-label="Close dialog"
    >
      <X size={18} />
    </button>
  );
}
