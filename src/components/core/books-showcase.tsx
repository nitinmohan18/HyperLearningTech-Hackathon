'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

export interface BookCfg {
  id: string;
  title: string;
  author: string;
  year: string;
  stars: number;
  desc: string;

  // Optional rich metadata for custom showcases
  subtitle?: string;
  badgeLabel?: string;
  ratingLabel?: string;

  // Procedural cover painters. All optional — omit and supply `images` instead, or omit both for a generated placeholder.
  front?: (x: CanvasRenderingContext2D, w: number, h: number) => void;
  back?: (x: CanvasRenderingContext2D, w: number, h: number) => void;
  spine?: (x: CanvasRenderingContext2D, w: number, h: number) => void;

  // Image-based covers (png/webp/jpg/...). Takes priority over painters when present. Hosts without CORS headers fall back to the procedural/generated cover.
  images?: {
    front?: string;
    back?: string;
    spine?: string;
  };
  /** @deprecated use images.front */
  coverURL?: string | null;

  // Page-edge trim color.
  edge?: string;
  backBg?: string;
  backInk?: string;
  spineBg?: string;
  spineInk?: string;
  spineFont?: string;
  chapters?: string[];
}

export interface BooksShowcaseHelpers {
  close: () => void;
  openBookById: (id: string) => void;
  shiftCarousel: (dir: 1 | -1) => void;
}

export interface BooksShowcaseProps {
  books: BookCfg[];
  heroTitle?: string;
  /** Small heading shown above the books. */
  navTitle?: string;
  showNav?: boolean;
  showDetailPanel?: boolean;
  /** Show prev/next arrows when there are more books than fit on screen (3). Defaults to true. */
  showCarousel?: boolean;
  themeColors?: {
    navy?: string;
    pink?: string;
    cream?: string;
    lav?: string;
    peri?: string;
    /** Backwards-compatible background applied to both color schemes. */
    bg?: string;
    bgLight?: string;
    bgDark?: string;
    foregroundLight?: string;
    foregroundDark?: string;
  };
  leafColors?: number[];
  selectedBookId?: string | null;
  className?: string;
  onBookSelect?: (book: BookCfg | null) => void;
  onModeChange?: (mode: 'hero' | 'opening' | 'detail' | 'closing') => void;
  renderHeroControls?: (helpers: BooksShowcaseHelpers) => React.ReactNode;
  renderDetailContent?: (book: BookCfg, helpers: BooksShowcaseHelpers) => React.ReactNode;
  renderDetailOverlay?: (book: BookCfg, helpers: BooksShowcaseHelpers) => React.ReactNode;
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

const OPEN_BTN_OFF = ['opacity-0', 'scale-[0.94]'];
const OPEN_BTN_ON = ['opacity-100', 'scale-100'];

export function BooksShowcase({
  books = [],
  heroTitle = 'Books',
  navTitle = 'Bestsellers',
  showNav = true,
  showDetailPanel = true,
  showCarousel = true,
  themeColors,
  leafColors,
  selectedBookId,
  className,
  onBookSelect,
  onModeChange,
  renderHeroControls,
  renderDetailContent,
  renderDetailOverlay,
}: BooksShowcaseProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const openBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const dpRef = useRef<HTMLDivElement | null>(null);
  const shiftCarouselRef = useRef<(dir: 1 | -1) => void>(() => {});
  const openBookByIdRef = useRef<(id: string) => void>(() => {});
  const closeRef = useRef<() => void>(() => {});

  const onBookSelectRef = useRef(onBookSelect);
  useEffect(() => {
    onBookSelectRef.current = onBookSelect;
  }, [onBookSelect]);

  const onModeChangeRef = useRef(onModeChange);
  useEffect(() => {
    onModeChangeRef.current = onModeChange;
  }, [onModeChange]);

  const [uiMode, setUiMode] = useState<'hero' | 'opening' | 'detail' | 'closing'>('hero');
  const [selectedCfg, setSelectedCfg] = useState<BookCfg | null>(null);
  const [mounted, setMounted] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [bpKey, setBpKey] = useState(0);

  // Rebuild hero layout smoothly only if crossing the 768px mobile/desktop threshold
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => {
      setIsMobileView(mq.matches);
      setBpKey((k) => k + 1);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const updateUiMode = (mode: 'hero' | 'opening' | 'detail' | 'closing') => {
    setUiMode(mode);
    onModeChangeRef.current?.(mode);
  };

  // hero-word entrance: flip to `mounted` one frame after first paint so the
  // opacity/translate transition below actually has something to animate from.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Allow external trigger via `selectedBookId` prop
  const hasOverlay = Boolean(renderDetailOverlay);
  const hasOverlayRef = useRef(hasOverlay);
  useEffect(() => {
    hasOverlayRef.current = hasOverlay;
  }, [hasOverlay]);

  useEffect(() => {
    if (selectedBookId) {
      openBookByIdRef.current(selectedBookId);
    }
  }, [selectedBookId]);

  const leafColorsKey = leafColors?.join(',') ?? '';

  useEffect(() => {
    const root = rootRef.current;
    const canvasEl = canvasRef.current;
    if (!root || !canvasEl || books.length === 0) return;

    let cancelled = false;
    let transitionToken = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const setT = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(id);
      return id;
    };

    // Small utilities
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileScreen = window.matchMedia('(max-width: 767px)').matches;
    setIsMobileView(isMobileScreen);
    const lowPowerDevice =
      RM ||
      isMobileScreen ||
      window.matchMedia('(max-width: 900px)').matches ||
      (navigator.hardwareConcurrency ?? 8) <= 4;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    class Spring {
      v: number;
      t: number;
      vel: number;
      k: number;
      d: number;
      constructor(v: number, k?: number, d?: number) {
        this.v = v;
        this.t = v;
        this.vel = 0;
        this.k = k || 120;
        this.d = d || 14;
      }
      set(v: number) {
        this.v = v;
        this.t = v;
        this.vel = 0;
        return this;
      }
      update(dt: number) {
        const a = this.k * (this.t - this.v) - this.d * this.vel;
        this.vel += a * dt;
        this.v += this.vel * dt;
        return this.v;
      }
    }

    function mkCanvas(w: number, h: number) {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      return c;
    }

    function drawSpaced(x: CanvasRenderingContext2D, text: string, cx: number, y: number, ls: number) {
      const prev = x.textAlign;
      x.textAlign = 'left';
      const chars = [...text];
      let tot = 0;
      const ws = chars.map((ch) => {
        const w = x.measureText(ch).width;
        tot += w;
        return w;
      });
      tot += ls * (chars.length - 1);
      let px = cx - tot / 2;
      chars.forEach((ch, i) => {
        x.fillText(ch, px, y);
        px += ws[i] + ls;
      });
      x.textAlign = prev;
    }

    function rr(x: CanvasRenderingContext2D, px: number, py: number, w: number, h: number, r: number) {
      x.beginPath();
      x.moveTo(px + r, py);
      x.arcTo(px + w, py, px + w, py + h, r);
      x.arcTo(px + w, py + h, px, py + h, r);
      x.arcTo(px, py + h, px, py, r);
      x.arcTo(px, py, px + w, py, r);
      x.closePath();
    }

    // Renderer, scene, camera, lights
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasEl,
        antialias: !lowPowerDevice,
        alpha: true,
        powerPreference: lowPowerDevice ? 'default' : 'high-performance',
      });
    } catch (err) {
      console.warn('BooksShowcase: WebGL renderer creation failed', err);
      const fail = document.createElement('div');
      fail.className =
        'absolute inset-0 z-50 flex items-center justify-center p-10 text-center text-lg leading-relaxed text-[var(--bs-lav)]';
      fail.textContent = 'This experience needs WebGL, which your browser blocked or does not support.';
      root.appendChild(fail);
      return () => {
        fail.remove();
      };
    }

    const dims = { w: 0, h: 0 };

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPowerDevice ? 1.15 : 1.3));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.03;
    renderer.shadowMap.enabled = !lowPowerDevice;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const ANISO = lowPowerDevice ? Math.min(2, maxAniso) : Math.min(8, maxAniso);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
    camera.position.set(0, 0.1, 9.6);

    function envBlob(x: CanvasRenderingContext2D, cx: number, cy: number, r: number, rgb: string, a: number) {
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, 'rgba(' + rgb + ',' + a + ')');
      g.addColorStop(1, 'rgba(' + rgb + ',0)');
      x.fillStyle = g;
      x.beginPath();
      x.arc(cx, cy, r, 0, 6.2832);
      x.fill();
    }
    (function buildEnv() {
      const c = mkCanvas(512, 256),
        x = c.getContext('2d')!;
      const g = x.createLinearGradient(0, 0, 0, 256);
      g.addColorStop(0, '#735f46');
      g.addColorStop(0.55, '#2f2319');
      g.addColorStop(1, '#0e0a07');
      x.fillStyle = g;
      x.fillRect(0, 0, 512, 256);
      envBlob(x, 140, 66, 98, '255,244,225', 0.95);
      envBlob(x, 405, 84, 60, '255,214,168', 0.68);
      envBlob(x, 256, 150, 120, '224,184,133', 0.36);
      const tx = new THREE.CanvasTexture(c);
      tx.mapping = THREE.EquirectangularReflectionMapping;
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromEquirectangular(tx).texture;
      tx.dispose();
      pmrem.dispose();
    })();

    const hemi = new THREE.HemisphereLight(0xe5cfa9, 0x140d09, 0.52);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xfff7ec, 0.98);
    key.position.set(3.5, 5, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 20;
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.02;
    scene.add(key);
    const fillLight = new THREE.DirectionalLight(0xe0b885, 0.36);
    fillLight.position.set(-4, 1.2, 4.5);
    scene.add(fillLight);
    const rim = new THREE.DirectionalLight(0xffd89b, 0.62);
    rim.position.set(-2, 3.2, -5);
    scene.add(rim);

    const bookRoot = new THREE.Group();
    scene.add(bookRoot);

    function tex(c: HTMLCanvasElement) {
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = ANISO;
      return t;
    }

    function loadOrPaint(
      material: THREE.MeshStandardMaterial,
      imageURL: string | null | undefined,
      paintFallback: () => HTMLCanvasElement,
    ) {
      material.map = tex(paintFallback());
      material.needsUpdate = true;
      if (!imageURL) return;
      new THREE.TextureLoader().setCrossOrigin('anonymous').load(
        imageURL,
        (t) => {
          if (cancelled) return;
          t.colorSpace = THREE.SRGBColorSpace;
          t.anisotropy = ANISO;
          material.map = t;
          material.needsUpdate = true;
        },
        undefined,
        () => console.warn('Cover image failed to load, kept fallback cover:', imageURL),
      );
    }

    function noiseTexture(base: number, amp: number, scratches: boolean) {
      const s = 256,
        c = mkCanvas(s, s),
        x = c.getContext('2d')!;
      const img = x.createImageData(s, s),
        d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = base + (Math.random() - 0.5) * 2 * amp;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
      }
      x.putImageData(img, 0, 0);
      if (scratches) {
        x.strokeStyle = 'rgba(200,200,200,.25)';
        x.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          x.beginPath();
          const y = Math.random() * s;
          x.moveTo(0, y);
          x.lineTo(s, y + (Math.random() - 0.5) * 22);
          x.stroke();
        }
      }
      return new THREE.CanvasTexture(c);
    }
    const laminateBump = lowPowerDevice ? null : noiseTexture(128, 10, true);
    const clothBump = lowPowerDevice
      ? null
      : (function () {
          const s = 128,
            c = mkCanvas(s, s),
            x = c.getContext('2d')!;
          x.fillStyle = '#808080';
          x.fillRect(0, 0, s, s);
          for (let i = 0; i < s; i += 2) {
            x.fillStyle = i % 4 === 0 ? 'rgba(255,255,255,.22)' : 'rgba(0,0,0,.22)';
            x.fillRect(i, 0, 1, s);
            x.fillRect(0, i, s, 1);
          }
          return new THREE.CanvasTexture(c);
        })();

    function striationTexture(vertical: boolean) {
      const s = lowPowerDevice ? 256 : 512,
        c = mkCanvas(s, s),
        x = c.getContext('2d')!;
      x.fillStyle = '#ece4d2';
      x.fillRect(0, 0, s, s);
      let p = 0;
      while (p < s) {
        const w = 1 + Math.random() * 2.4,
          tone = Math.random();
        x.fillStyle =
          tone < 0.12 ? 'rgba(140,125,95,.5)' : tone < 0.5 ? 'rgba(255,255,252,.55)' : 'rgba(190,178,150,.45)';
        if (vertical) x.fillRect(p, 0, w, s);
        else x.fillRect(0, p, s, w);
        p += w + 0.6 + Math.random() * 1.6;
      }
      const dots = lowPowerDevice ? 450 : 2600;
      for (let i = 0; i < dots; i++) {
        x.fillStyle = 'rgba(120,108,84,' + (Math.random() * 0.1).toFixed(3) + ')';
        x.fillRect(Math.random() * s, Math.random() * s, 1.2, 1.2);
      }
      return tex(c);
    }
    const striV = striationTexture(true);
    const striH = striationTexture(false);

    const endpaperTex = (function () {
      const s = lowPowerDevice ? 256 : 512,
        c = mkCanvas(s, s),
        x = c.getContext('2d')!;
      x.fillStyle = '#f3edde';
      x.fillRect(0, 0, s, s);
      const dots = lowPowerDevice ? 300 : 1400;
      for (let i = 0; i < dots; i++) {
        x.fillStyle = 'rgba(120,105,70,' + (0.04 + Math.random() * 0.08).toFixed(3) + ')';
        x.fillRect(Math.random() * s, Math.random() * s, 1.4, 1.4);
      }
      const g = x.createLinearGradient(0, 0, s, 0);
      g.addColorStop(0, 'rgba(0,0,0,.07)');
      g.addColorStop(0.12, 'rgba(0,0,0,0)');
      g.addColorStop(0.88, 'rgba(0,0,0,0)');
      g.addColorStop(1, 'rgba(0,0,0,.07)');
      x.fillStyle = g;
      x.fillRect(0, 0, s, s);
      return tex(c);
    })();

    const blobTex = (function () {
      const s = 256,
        c = mkCanvas(s, s),
        x = c.getContext('2d')!;
      const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, 'rgba(0,0,0,.85)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = g;
      x.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(c);
    })();

    function paintDefaultFront(x: CanvasRenderingContext2D, w: number, h: number, o: { title: string; author: string; bg: string }) {
      x.fillStyle = o.bg;
      x.fillRect(0, 0, w, h);
      x.fillStyle = 'rgba(255,255,255,0.06)';
      for (let i = 0; i < 40; i++) x.fillRect(Math.random() * w, Math.random() * h, 2, 2);
      x.fillStyle = '#ffffff';
      x.textAlign = 'center';
      x.font = '700 76px Georgia';
      const words = o.title.split(' ');
      let line = '';
      const lines: string[] = [];
      words.forEach((word) => {
        const test = line ? line + ' ' + word : word;
        if (x.measureText(test).width > w * 0.8 && line) {
          lines.push(line);
          line = word;
        } else line = test;
      });
      if (line) lines.push(line);
      const startY = h * 0.42 - ((lines.length - 1) * 88) / 2;
      lines.forEach((l, i) => x.fillText(l, w / 2, startY + i * 88));
      x.globalAlpha = 0.85;
      x.font = 'italic 40px Georgia';
      x.fillText(o.author, w / 2, startY + lines.length * 88 + 60);
      x.globalAlpha = 1;
      x.strokeStyle = 'rgba(255,255,255,0.4)';
      x.lineWidth = 3;
      x.strokeRect(60, 60, w - 120, h - 120);
    }

    function paintBack(x: CanvasRenderingContext2D, w: number, h: number, o: { backBg: string; backInk: string }) {
      x.fillStyle = o.backBg;
      x.fillRect(0, 0, w, h);
      const ink = o.backInk;
      x.fillStyle = 'rgba(' + ink + ',.5)';
      rr(x, 150, 190, w - 460, 28, 14);
      x.fill();
      for (let i = 0; i < 9; i++) {
        const lw = i === 8 ? w - 560 : w - 300 - Math.random() * 180;
        x.fillStyle = 'rgba(' + ink + ',.2)';
        rr(x, 150, 300 + i * 56, lw, 15, 7);
        x.fill();
      }
      x.fillStyle = 'rgba(' + ink + ',.45)';
      x.beginPath();
      x.arc(178, h - 186, 26, 0, 6.2832);
      x.fill();
      x.fillStyle = '#fff';
      rr(x, w - 330, h - 262, 236, 152, 8);
      x.fill();
      x.fillStyle = '#111';
      let bx = w - 310;
      while (bx < w - 118) {
        const bw = 2 + Math.random() * 6;
        if (Math.random() > 0.42) x.fillRect(bx, h - 242, bw, 96);
        bx += bw + 2 + Math.random() * 4;
      }
      x.font = '500 21px Arial';
      x.textAlign = 'center';
      x.fillText('9 782026 122627', w - 212, h - 124);
      x.textAlign = 'left';
    }

    function paintSpine(
      x: CanvasRenderingContext2D,
      w: number,
      h: number,
      o: { spineBg: string; spineInk: string; spineFont: string; title: string; author: string },
    ) {
      x.fillStyle = o.spineBg;
      x.fillRect(0, 0, w, h);
      x.save();
      x.translate(w / 2, h / 2);
      x.rotate(Math.PI / 2);
      x.fillStyle = o.spineInk;
      x.font = o.spineFont;
      drawSpaced(x, o.title.toUpperCase(), -h * 0.1, 15, 6);
      x.globalAlpha = 0.85;
      x.font = '600 25px Arial';
      drawSpaced(x, o.author.toUpperCase(), h * 0.325, 9, 4);
      x.globalAlpha = 1;
      x.restore();
      x.fillStyle = o.spineInk;
      x.globalAlpha = 0.6;
      x.fillRect(w / 2 - 26, 92, 52, 3);
      x.fillRect(w / 2 - 26, h - 95, 52, 3);
      x.globalAlpha = 1;
    }

    function trimToWidth(x: CanvasRenderingContext2D, text: string, maxW: number) {
      if (x.measureText(text).width <= maxW) return text;
      let t = text;
      while (t.length > 1 && x.measureText(t + '...').width > maxW) t = t.slice(0, -1);
      return t + '...';
    }

    function makeIndexPageTex(chapters?: string[]) {
      const w = 1024,
        h = 1536,
        c = mkCanvas(w, h),
        x = c.getContext('2d')!;
      x.fillStyle = '#f4efdf';
      x.fillRect(0, 0, w, h);
      x.fillStyle = 'rgba(130,110,80,0.07)';
      for (let i = 0; i < 1600; i++) x.fillRect(Math.random() * w, Math.random() * h, 1.1, 1.1);
      x.fillStyle = '#2f2a23';
      x.textAlign = 'center';
      x.font = '700 84px Georgia';
      x.fillText('INDEX', w / 2, 190);
      x.globalAlpha = 0.26;
      x.fillRect(220, 225, w - 440, 3);
      x.globalAlpha = 1;

      const list =
        chapters && chapters.length
          ? chapters
          : ['Introduction', 'Main Ideas', 'Practical Lessons', 'Case Studies', 'Takeaways', 'Final Notes'];
      x.textAlign = 'left';
      x.font = '500 44px Georgia';
      let y = 318;
      for (let i = 0; i < Math.min(list.length, 9); i++) {
        const n = String(i + 1).padStart(2, '0');
        const pageNo = String(7 + i * 14).padStart(3, ' ');
        const left = n + '. ' + trimToWidth(x, list[i], 650);
        x.fillStyle = '#2f2a23';
        x.fillText(left, 150, y);
        x.textAlign = 'right';
        x.fillStyle = '#5d5043';
        x.fillText(pageNo, w - 150, y);
        x.textAlign = 'left';
        x.globalAlpha = 0.22;
        x.fillRect(150, y + 16, w - 300, 2);
        x.globalAlpha = 1;
        y += 112;
      }
      return tex(c);
    }

    // Book construction — 3-book centered coverflow on mobile, 4-book fan on tablet/desktop
    const N = books.length;
    const VISIBLE = isMobileScreen ? Math.min(3, N) : Math.min(4, N);

    const W = 1.42,
      H = 2.14,
      T = 0.34,
      CT = 0.032,
      OV = 0.05;
    const PAGE_N = lowPowerDevice ? 6 : 10,
      BACK_PAGE_N = lowPowerDevice ? 3 : 5,
      PW = W - 0.02,
      PH = H - 0.02;
    const BLOCK_D = 0.245,
      BLOCK_Z = -0.0205,
      PIVOT_Z = T / 2 + CT / 2,
      BPIVOT_Z = -(T / 2 + CT / 2),
      HINGE_OVERLAP = 0.05;

    const coverGeo = new THREE.BoxGeometry(W + OV, H + OV * 2, CT);
    const blockGeo = new THREE.BoxGeometry(W - 0.015, H, BLOCK_D);
    const pageGeo = new THREE.PlaneGeometry(PW, PH);
    const spineGeo = new THREE.BoxGeometry(0.028, H + OV * 2, T + CT * 2 + 0.006);
    const hitGeo = new THREE.BoxGeometry(1.56, 2.35, 0.85);
    const blobGeo = new THREE.PlaneGeometry(1, 1);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });

    function std(o: THREE.MeshStandardMaterialParameters) {
      return new THREE.MeshStandardMaterial(Object.assign({ metalness: 0.04 }, o));
    }

    const paperFlat = std({ color: 0xf2ecdd, roughness: 0.95, envMapIntensity: 0.2 });
    const striMatV = std({
      map: striV,
      ...(lowPowerDevice ? {} : { bumpMap: striV, bumpScale: 0.0025 }),
      roughness: 0.95,
      envMapIntensity: 0.2,
    });
    const striMatH = std({
      map: striH,
      ...(lowPowerDevice ? {} : { bumpMap: striH, bumpScale: 0.0025 }),
      roughness: 0.95,
      envMapIntensity: 0.2,
    });
    const endpaperMat = std({ map: endpaperTex, roughness: 0.9, envMapIntensity: 0.25 });
    const pageMats = [0xf4eee0, 0xf1ebdb, 0xf6f0e3].map((c) =>
      std({ color: c, roughness: 0.92, envMapIntensity: 0.22, side: THREE.DoubleSide }),
    );

    type Book = {
      cfg: BookCfg;
      index: number;
      root: THREE.Group;
      float: THREE.Group;
      pivot: THREE.Group;
      backPivot: THREE.Group;
      frontMesh: THREE.Mesh;
      spine: THREE.Mesh;
      block: THREE.Mesh;
      pages: THREE.Group[];
      pageF: number[];
      pagesB: THREE.Group[];
      pageFB: number[];
      hit: THREE.Mesh;
      springs: Record<string, Spring>;
      phase: number;
      slotScale: number;
      hitEdge: number | null;
      scr: { x: number; y: number };
      orbY: number;
      orbYv: number;
      orbPhase: string;
      orbTarget: number;
      orbXs: Spring;
      exit: { segs: { d: number; from: number; to: number; ease: (t: number) => number; end?: () => void }[]; i: number; t: number } | null;
    };

    const bookInstances: Book[] = [];
    const hitMeshes: THREE.Mesh[] = [];

    function buildBook(cfg: BookCfg, index: number): Book {
      const root = new THREE.Group();
      const float = new THREE.Group();
      root.add(float);
      bookRoot.add(root);

      const indexPageMat = hasOverlayRef.current
        ? endpaperMat
        : std({
            map: makeIndexPageTex(cfg.chapters),
            roughness: 0.92,
            envMapIntensity: 0.2,
            side: THREE.DoubleSide,
          });

      const edgeColor = cfg.edge ?? '#eee4cf';
      const mEdge = std({
        color: edgeColor,
        ...(laminateBump ? { bumpMap: laminateBump, bumpScale: 0.0035 } : {}),
        roughness: 0.66,
        envMapIntensity: 0.32,
      });
      const mFront = std({
        ...(laminateBump ? { bumpMap: laminateBump, bumpScale: 0.0035 } : {}),
        roughness: 0.5,
        envMapIntensity: 0.36,
      });
      const mBack = std({
        ...(laminateBump ? { bumpMap: laminateBump, bumpScale: 0.0035 } : {}),
        roughness: 0.54,
        envMapIntensity: 0.3,
      });
      const mSpine = std({
        ...(clothBump ? { bumpMap: clothBump, bumpScale: 0.006 } : {}),
        roughness: 0.72,
        envMapIntensity: 0.28,
      });

      const fw = lowPowerDevice ? 640 : 1024;
      const fh = lowPowerDevice ? 960 : 1536;
      const bw = lowPowerDevice ? 512 : 1024;
      const bh = lowPowerDevice ? 768 : 1536;
      const sw = lowPowerDevice ? 144 : 220;
      const sh = lowPowerDevice ? 960 : 1536;

      loadOrPaint(mFront, cfg.images?.front ?? cfg.coverURL ?? null, () => {
        const c = mkCanvas(fw, fh);
        const ctx = c.getContext('2d')!;
        ctx.scale(fw / 1024, fh / 1536);
        if (cfg.front) cfg.front(ctx, 1024, 1536);
        else paintDefaultFront(ctx, 1024, 1536, { title: cfg.title, author: cfg.author, bg: cfg.spineBg ?? cfg.backBg ?? '#22252b' });
        return c;
      });
      loadOrPaint(mBack, cfg.images?.back ?? null, () => {
        const c = mkCanvas(bw, bh);
        const ctx = c.getContext('2d')!;
        ctx.scale(bw / 1024, bh / 1536);
        if (cfg.back) cfg.back(ctx, 1024, 1536);
        else paintBack(ctx, 1024, 1536, { backBg: cfg.backBg ?? '#22252b', backInk: cfg.backInk ?? '255,255,255' });
        return c;
      });
      loadOrPaint(mSpine, cfg.images?.spine ?? null, () => {
        const c = mkCanvas(sw, sh);
        const ctx = c.getContext('2d')!;
        ctx.scale(sw / 220, sh / 1536);
        if (cfg.spine) cfg.spine(ctx, 220, 1536);
        else
          paintSpine(ctx, 220, 1536, {
            spineBg: cfg.spineBg ?? cfg.backBg ?? '#22252b',
            spineInk: cfg.spineInk ?? '#ffffff',
            spineFont: cfg.spineFont ?? '700 42px Georgia',
            title: cfg.title,
            author: cfg.author,
          });
        return c;
      });

      const backPivot = new THREE.Group();
      backPivot.position.set(-W / 2 - HINGE_OVERLAP, 0, BPIVOT_Z);
      const backMesh = new THREE.Mesh(coverGeo, [mEdge, mEdge, mEdge, mEdge, endpaperMat, mBack]);
      backMesh.position.x = (W + OV) / 2;
      backMesh.castShadow = backMesh.receiveShadow = true;
      backPivot.add(backMesh);
      float.add(backPivot);

      const pivot = new THREE.Group();
      pivot.position.set(-W / 2 - HINGE_OVERLAP, 0, PIVOT_Z);
      const frontMesh = new THREE.Mesh(coverGeo, [mEdge, mEdge, mEdge, mEdge, mFront, endpaperMat]);
      frontMesh.position.x = (W + OV) / 2;
      frontMesh.castShadow = frontMesh.receiveShadow = true;
      pivot.add(frontMesh);
      float.add(pivot);

      const spine = new THREE.Mesh(spineGeo, mSpine);
      spine.position.set(-W / 2 - 0.013, 0, 0);
      spine.castShadow = true;
      float.add(spine);

      const block = new THREE.Mesh(blockGeo, [striMatV, paperFlat, striMatH, striMatH, paperFlat, paperFlat]);
      block.position.set(-0.0075, 0, BLOCK_Z);
      block.castShadow = block.receiveShadow = true;
      float.add(block);

      const pages: THREE.Group[] = [],
        pageF: number[] = [];
      for (let i = 0; i < PAGE_N; i++) {
        const pp = new THREE.Group();
        pp.position.set(-W / 2 + 0.01, (Math.random() - 0.5) * 0.006, 0.166 - i * 0.0042);
        const pm = new THREE.Mesh(pageGeo, i === 0 ? indexPageMat : pageMats[i % 3]);
        pm.position.x = PW / 2;
        pm.rotation.z = (Math.random() - 0.5) * 0.006;
        pp.add(pm);
        float.add(pp);
        pages.push(pp);
        pageF.push(0.3 * Math.pow(1 - i / PAGE_N, 2.6));
      }

      const pagesB: THREE.Group[] = [],
        pageFB: number[] = [];
      for (let i = 0; i < BACK_PAGE_N; i++) {
        const pp = new THREE.Group();
        pp.position.set(-W / 2 + 0.01, (Math.random() - 0.5) * 0.006, -0.166 + i * 0.0042);
        const pm = new THREE.Mesh(pageGeo, pageMats[i % 3]);
        pm.position.x = PW / 2;
        pm.rotation.z = (Math.random() - 0.5) * 0.006;
        pp.add(pm);
        float.add(pp);
        pagesB.push(pp);
        pageFB.push(0.3 * Math.pow(1 - i / BACK_PAGE_N, 2.6));
      }

      const blob = new THREE.Mesh(
        blobGeo,
        new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, opacity: 0.45, depthWrite: false }),
      );
      blob.scale.set(3.1, 3.9, 1);
      blob.position.set(0.1, -0.3, -0.85);
      blob.renderOrder = -5;
      root.add(blob);

      const hit = new THREE.Mesh(hitGeo, hitMat);
      float.add(hit);

      const springs: Record<string, Spring> = {
        px: new Spring(0, 17, 6.8),
        py: new Spring(0, 17, 6.8),
        pz: new Spring(0, 17, 6.8),
        rx: new Spring(0, 17, 6.8),
        ry: new Spring(0, 17, 6.8),
        rz: new Spring(0, 17, 6.8),
        sc: new Spring(1, 17, 6.8),
        tiltX: new Spring(0, 120, 13),
        tiltY: new Spring(0, 120, 13),
        lift: new Spring(0, 120, 13),
        cover: new Spring(0, 90, 12),
        coverB: new Spring(0, 90, 12),
        drag: new Spring(0, 160, 16),
      };

      const b: Book = {
        cfg,
        index,
        root,
        float,
        pivot,
        backPivot,
        frontMesh,
        spine,
        block,
        pages,
        pageF,
        pagesB,
        pageFB,
        hit,
        springs,
        phase: Math.random() * 6.28,
        slotScale: 1,
        hitEdge: null,
        scr: { x: 0, y: 0 },
        orbY: 0,
        orbYv: 0,
        orbPhase: 'idle',
        orbTarget: 0,
        orbXs: new Spring(0, 60, 12),
        exit: null,
      };
      bookInstances.push(b);
      return b;
    }
    books.forEach(buildBook);
    const bookByHit = (m: THREE.Object3D) => bookInstances.find((b) => b.hit === m)!;

    // Floating leaves (detail view)
    const leaves = {
      items: [] as {
        mesh: THREE.Mesh;
        hx: number;
        hy: number;
        hz: number;
        sp: number;
        ph: number;
        rv: THREE.Vector3;
        kick: THREE.Vector3;
        size: number;
        s: Spring;
      }[],
      anchor: null as Book | null,
      activate(book: Book) {
        this.anchor = book;
        this.items.forEach((l) => {
          l.kick.set(-l.hx + (Math.random() - 0.5) * 0.6, -l.hy + (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.5);
          l.s.t = l.size;
          l.mesh.visible = true;
        });
      },
      deactivate() {
        this.items.forEach((l) => {
          l.s.t = 0;
        });
      },
      push(dx: number, dy: number) {
        if (!this.anchor) return;
        this.items.forEach((l) => {
          l.kick.x += dx * 2.4 * Math.random();
          l.kick.y += -dy * 2.4 * Math.random();
        });
      },
      update(dt: number, t: number) {
        if (!this.anchor) return;
        const ap = this.anchor.root.position;
        const w = RM ? 0.15 : 1;
        this.items.forEach((l) => {
          l.kick.multiplyScalar(Math.exp(-1.15 * dt));
          l.mesh.position.set(
            ap.x + l.hx + Math.sin(t * l.sp + l.ph) * 0.4 * w + l.kick.x,
            ap.y + l.hy + Math.cos(t * l.sp * 0.83 + l.ph * 1.3) * 0.3 * w + l.kick.y,
            ap.z * 0.4 + l.hz + l.kick.z,
          );
          l.mesh.rotation.x += l.rv.x * dt * (0.3 + w);
          l.mesh.rotation.y += l.rv.y * dt * (0.3 + w);
          l.mesh.rotation.z += l.rv.z * dt * (0.3 + w);
          const s = l.s.update(dt);
          l.mesh.scale.setScalar(Math.max(s, 0.0001));
          if (l.s.t === 0 && s < 0.01) l.mesh.visible = false;
        });
      },
    };
    (function buildLeaves() {
      if (lowPowerDevice && hasOverlayRef.current) return;
      const shape = new THREE.Shape();
      shape.moveTo(0, -0.5);
      shape.bezierCurveTo(0.3, -0.28, 0.3, 0.22, 0, 0.55);
      shape.bezierCurveTo(-0.3, 0.22, -0.3, -0.28, 0, -0.5);
      const geo = new THREE.ShapeGeometry(shape, 10);
      const cols = leafColors && leafColors.length ? leafColors : [0x3e7c3f, 0x57944a, 0x2f6136, 0x6aa557];
      for (let i = 0; i < 16; i++) {
        const mat = std({ color: cols[i % cols.length], roughness: 0.45, envMapIntensity: 0.4, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.visible = false;
        bookRoot.add(mesh);
        let hx = (Math.random() - 0.5) * 4.6;
        if (i % 5 === 0) hx += 2.8 * Math.sign(hx || 1);
        leaves.items.push({
          mesh,
          hx,
          hy: (Math.random() - 0.5) * 3.2,
          hz: -0.5 + Math.random() * 1.5,
          sp: 0.25 + Math.random() * 0.5,
          ph: Math.random() * 6.28,
          rv: new THREE.Vector3((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8),
          kick: new THREE.Vector3(),
          size: 0.14 + Math.random() * 0.16,
          s: new Spring(0, 60, 10),
        });
      }
    })();

    // Layout slots, state machine, carousel
    const state: {
      mode: 'hero' | 'opening' | 'detail' | 'closing';
      selected: Book | null;
      hovered: Book | null;
      pillLock: Book | null;
      kbIndex: number;
    } = { mode: 'hero', selected: null, hovered: null, pillLock: null, kbIndex: -1 };

    type Slot = { p: [number, number, number]; r: [number, number, number]; s: number };
    const SLOTS: { hero: Slot[]; detail: Slot | null; portrait: boolean } = { hero: [], detail: null, portrait: false };

    function computeSlots() {
      const a = dims.w / Math.max(1, dims.h);
      const portrait = a < 0.85;
      const fourUp = VISIBLE === 4;
      const fit = portrait
        ? fourUp
          ? clamp(a / 0.94, 0.38, 0.77)
          : clamp(a / 0.96, 0.52, 0.76)
        : clamp(a / (fourUp ? 1.74 : 1.62), 0.5, 0.98);
      bookRoot.scale.setScalar(fit);
      bookRoot.position.y = portrait && !fourUp ? 0.36 : -(1 - fit) * 0.22;
      SLOTS.portrait = portrait;

      if (fourUp) {
        SLOTS.hero = portrait
          ? [
              { p: [-1.13, 0.62, 0.08], r: [-0.04, 0.22, 0.05], s: 0.93 },
              { p: [1.13, 0.62, 0.08], r: [-0.04, -0.22, -0.05], s: 0.93 },
              { p: [-1.13, -1.32, 0.2], r: [-0.04, 0.22, 0.05], s: 0.93 },
              { p: [1.13, -1.32, 0.2], r: [-0.04, -0.22, -0.05], s: 0.93 },
            ]
          : [
              { p: [-2.75, -0.4, -0.18], r: [-0.04, 0.34, 0.13], s: 1.09 },
              { p: [-0.91, -0.18, 0.34], r: [-0.045, 0.11, 0.04], s: 1.16 },
              { p: [0.91, -0.18, 0.34], r: [-0.045, -0.11, -0.04], s: 1.16 },
              { p: [2.75, -0.4, -0.18], r: [-0.04, -0.34, -0.13], s: 1.09 },
            ];
      } else {
        SLOTS.hero = portrait
          ? [
              { p: [-1.36, -0.05, -0.58], r: [-0.035, 0.36, 0.085], s: 0.88 },
              { p: [0, 0.06, 0.62], r: [-0.025, 0, 0], s: 1.18 },
              { p: [1.36, -0.05, -0.58], r: [-0.035, -0.36, -0.085], s: 0.88 },
            ]
          : [
              { p: [-2.05, -0.58, -0.12], r: [-0.045, 0.4, 0.185], s: 1.22 },
              { p: [0.25, -0.36, 0.6], r: [-0.05, -0.1, -0.035], s: 1.32 },
              { p: [2.35, -0.64, -0.34], r: [-0.045, -0.42, -0.17], s: 1.22 },
            ];
      }

      if (hasOverlayRef.current) {
        SLOTS.detail = { p: [0, 0, 1.25], r: [0.02, -0.22, 0.03], s: 1.1 };
        return;
      }

      if (!showDetailPanel) {
        SLOTS.detail = { p: [0, -0.05, 0.75], r: [0.02, -0.34, 0.05], s: SLOTS.portrait ? 0.94 : 1.08 };
        return;
      }

      if (SLOTS.portrait) {
        const el = dpRef.current;
        const panelH = el && el.offsetHeight > 40 ? el.offsetHeight : dims.h * 0.48;
        const gap = dims.h * 0.035,
          navB = dims.h * 0.1;
        const freeTop = navB;
        const freeBot = Math.max(dims.h - panelH - gap, freeTop + 140);
        const midPx = (freeTop + freeBot) / 2;
        const T13 = 0.23087,
          camZp = 9.9,
          zw = 0.8 * fit,
          rootY = -(1 - fit) * 0.28;
        const yw = 0.1 + (1 - (2 * midPx) / dims.h) * T13 * (camZp - zw);
        const availW = (((freeBot - freeTop) * 0.92) / dims.h) * 2 * T13 * (camZp - zw);
        const s = clamp(availW / fit / 2.65, 0.42, 0.92);
        SLOTS.detail = { p: [0, (yw - rootY) / fit, 0.8], r: [-0.02, -0.4, 0.06], s };
      } else {
        SLOTS.detail = { p: [-1.72, 0.0, 0.85], r: [0.02, -0.44, 0.08], s: 1.04 };
      }
    }

    function setTargets(b: Book, slot: Slot) {
      const s = b.springs;
      s.px.t = slot.p[0];
      s.py.t = slot.p[1];
      s.pz.t = slot.p[2];
      s.rx.t = slot.r[0];
      s.ry.t = slot.r[1];
      s.rz.t = slot.r[2];
      b.slotScale = slot.s;
    }

    const EASE = {
      hold: () => 1,
      outQuad: (t: number) => 1 - (1 - t) * (1 - t),
      outQuint: (t: number) => 1 - Math.pow(1 - t, 5),
      inOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
    };
    const LIFT = 0.38,
      CLEAR = 4.2;

    function playY(
      b: Book,
      segs: { d: number; from: number; to: number; ease: (t: number) => number; end?: () => void }[],
    ) {
      b.exit = { segs, i: 0, t: 0 };
    }
    function stepY(b: Book, dt: number) {
      const ex = b.exit!,
        s = b.springs;
      ex.t += dt;
      let seg = ex.segs[ex.i];
      while (seg && ex.t >= seg.d) {
        ex.t -= seg.d;
        s.py.v = seg.to;
        if (seg.end) seg.end();
        seg = ex.segs[++ex.i];
      }
      if (seg) s.py.v = seg.from + (seg.to - seg.from) * seg.ease(ex.t / seg.d);
      else b.exit = null;
      s.py.t = s.py.v;
      s.py.vel = 0;
    }
    function pinInPlace(b: Book) {
      const s = b.springs;
      s.px.t = s.px.v;
      s.pz.t = s.pz.v;
      s.rx.t = s.rx.v;
      s.ry.t = s.ry.v;
      s.rz.t = s.rz.v;
    }
    function sendOut(b: Book, i: number, delay: number) {
      const slot = SLOTS.hero[i] ?? SLOTS.hero[1];
      const y0 = slot.p[1],
        here = b.springs.py.v,
        apex = y0 + LIFT;
      const fastMobile = isMobileScreen && hasOverlayRef.current;
      b.root.visible = true;
      pinInPlace(b);
      playY(b, [
        { d: delay, from: here, to: here, ease: EASE.hold },
        { d: fastMobile ? 0.14 : 0.24, from: here, to: apex, ease: EASE.outQuad },
        { d: fastMobile ? 0.34 : 0.72, from: apex, to: y0 - CLEAR, ease: EASE.inOutSine, end: () => { b.root.visible = false; } },
      ]);
    }
    function bringBack(b: Book, i: number, delay: number) {
      const slot = SLOTS.hero[i] ?? SLOTS.hero[1];
      const here = b.springs.py.v;
      const fastMobile = isMobileScreen && hasOverlayRef.current;
      b.root.visible = true;
      pinInPlace(b);
      playY(b, [
        { d: delay, from: here, to: here, ease: EASE.hold },
        { d: fastMobile ? 0.52 : 0.85, from: here, to: slot.p[1], ease: EASE.outQuint },
      ]);
    }

    function windowIndices(start: number, total: number, count: number) {
      const arr: number[] = [];
      for (let i = 0; i < count; i++) arr.push((start + i) % total);
      return arr;
    }
    let carouselStart = isMobileScreen && N > VISIBLE ? N - 1 : 0;
    let currentWindow: number[] = windowIndices(carouselStart, N, VISIBLE);
    let carouselBusy = false;
    setCarouselIdx(carouselStart);

    function rebuildHitMeshes() {
      hitMeshes.length = 0;
      if (state.mode === 'detail' && state.selected) {
        hitMeshes.push(state.selected.hit);
      } else {
        currentWindow.forEach((bi) => hitMeshes.push(bookInstances[bi].hit));
      }
    }

    function applyMode() {
      if (state.mode === 'hero' || state.mode === 'closing') {
        currentWindow.forEach((bi, i) => {
          const slot = SLOTS.hero[i];
          if (slot) setTargets(bookInstances[bi], slot);
        });
      } else if (state.selected && SLOTS.detail) {
        setTargets(state.selected, SLOTS.detail);
      }
    }

    function shiftCarousel(dir: 1 | -1) {
      if (carouselBusy || state.mode !== 'hero' || N <= VISIBLE) return;
      carouselBusy = true;
      resumeAnimation();
      const outgoing = currentWindow;
      carouselStart = (((carouselStart + dir) % N) + N) % N;
      setCarouselIdx(carouselStart);
      const incoming = windowIndices(carouselStart, N, VISIBLE);

      const toHide = outgoing.filter((bi) => !incoming.includes(bi));

      toHide.forEach((bi) => {
        const oldIdx = outgoing.indexOf(bi);
        const slot = SLOTS.hero[oldIdx];
        const b = bookInstances[bi];
        b.exit = null;
        if (slot) b.springs.px.t = slot.p[0] - dir * 7.2;
      });
      setT(() => {
        toHide.forEach((bi) => {
          if (!currentWindow.includes(bi) && state.selected?.index !== bi) {
            bookInstances[bi].exit = null;
            bookInstances[bi].root.visible = false;
          }
        });
      }, 520);

      incoming.forEach((bi, i) => {
        const slot = SLOTS.hero[i];
        if (!slot) return;
        const b = bookInstances[bi];
        const alreadyOnScreen = outgoing.includes(bi);
        b.exit = null;
        b.root.visible = true;
        b.orbY = 0;
        b.orbYv = 0;
        b.orbPhase = 'idle';
        b.orbTarget = 0;
        b.orbXs.set(0);
        if (!alreadyOnScreen) {
          b.springs.px.set(slot.p[0] + dir * 7.2);
          b.springs.py.set(slot.p[1]);
          b.springs.pz.set(slot.p[2]);
          b.springs.rx.set(slot.r[0]);
          b.springs.ry.set(slot.r[1]);
          b.springs.rz.set(slot.r[2]);
          b.springs.sc.set(slot.s * 0.92);
        }
        setTargets(b, slot);
      });

      currentWindow = incoming;
      rebuildHitMeshes();
      setT(() => { carouselBusy = false; }, 420);
    }
    shiftCarouselRef.current = shiftCarousel;

    const camX = new Spring(0, 13, 6.5),
      camY = new Spring(0.1, 13, 6.5),
      camZ = new Spring(9.6, 13, 6.5);
    const lookX = new Spring(0, 13, 6.5),
      lookY = new Spring(0, 13, 6.5);
    const parX = new Spring(0, 60, 10),
      parY = new Spring(0, 60, 10);

    function camTo(mode: string) {
      const fourUp = VISIBLE === 4;
      if (mode === 'detail') {
        if (hasOverlayRef.current) {
          camX.t = 0;
          camZ.t = 9.4;
          lookX.t = 0;
          lookY.t = 0;
        } else {
          camX.t = SLOTS.portrait ? 0 : -0.25;
          camZ.t = SLOTS.portrait ? 10.4 : 9.6;
          lookX.t = SLOTS.portrait ? 0 : -0.35;
          lookY.t = SLOTS.portrait ? 0 : 0.15;
        }
      } else {
        camX.t = 0;
        camZ.t = fourUp ? (SLOTS.portrait ? 11.1 : 10.4) : SLOTS.portrait ? 10.2 : 9.6;
        lookX.t = 0;
        lookY.t = 0;
      }
    }

    const pillX = new Spring(0, 190, 23),
      pillY = new Spring(0, 190, 23);
    let pillOn = false;
    function showPill() {
      const el = openBtnRef.current;
      if (!el) return;
      el.classList.remove(...OPEN_BTN_OFF);
      el.classList.add(...OPEN_BTN_ON);
      pillOn = true;
    }
    function hidePill() {
      const el = openBtnRef.current;
      if (el) {
        el.classList.remove(...OPEN_BTN_ON);
        el.classList.add(...OPEN_BTN_OFF);
      }
      pillOn = false;
    }

    function open(book: Book | null) {
      if (!book) return;
      if (state.mode === 'opening' && state.selected === book) return;
      const myToken = ++transitionToken;
      state.mode = 'opening';
      updateUiMode('opening');
      state.selected = book;
      resumeAnimation();
      state.pillLock = null;
      state.kbIndex = -1;
      ptr.id = null;
      ptr.down = false;
      dragBook = null;
      hidePill();
      book.exit = null;
      root!.classList.add('bs-transit');
      setSelectedCfg(book.cfg);
      onBookSelectRef.current?.(book.cfg);
      computeSlots();

      // Ensure target book is visible and centered in window if it was offscreen
      if (!currentWindow.includes(book.index)) {
        const centerSlot = SLOTS.hero[1] ?? SLOTS.hero[0];
        book.root.visible = true;
        book.springs.px.set(centerSlot.p[0]);
        book.springs.py.set(centerSlot.p[1] - 3.6);
        book.springs.pz.set(centerSlot.p[2]);
        book.springs.rx.set(centerSlot.r[0]);
        book.springs.ry.set(centerSlot.r[1]);
        book.springs.rz.set(centerSlot.r[2]);
        book.springs.sc.set(centerSlot.s);
        book.slotScale = centerSlot.s;
      }

      // Staggered lift-and-drop exit for sibling books
      let out = 0;
      currentWindow.forEach((bi, i) => {
        const b = bookInstances[bi];
        if (b !== book) sendOut(b, i, out++ * 0.07);
      });

      if (!currentWindow.includes(book.index) && N > VISIBLE) {
        carouselStart = (book.index - 1 + N) % N;
        setCarouselIdx(carouselStart);
        currentWindow = windowIndices(carouselStart, N, VISIBLE);
        currentWindow.forEach((bi, i) => {
          const sibling = bookInstances[bi];
          if (sibling !== book) {
            const sl = SLOTS.hero[i] ?? SLOTS.hero[1];
            sibling.springs.px.set(sl.p[0]);
            sibling.springs.py.set(sl.p[1] - CLEAR);
            sibling.springs.pz.set(sl.p[2]);
            sibling.springs.rx.set(sl.r[0]);
            sibling.springs.ry.set(sl.r[1]);
            sibling.springs.rz.set(sl.r[2]);
            sibling.springs.sc.set(sl.s);
            sibling.slotScale = sl.s;
          }
        });
      }

      const fastMobile = isMobileScreen && hasOverlayRef.current;
      const spinDelay = hasOverlayRef.current ? (fastMobile ? 80 : 420) : 620;
      const leavesDelay = hasOverlayRef.current ? (fastMobile ? 260 : 760) : 900;
      const detailDelay = hasOverlayRef.current ? (fastMobile ? 380 : 1350) : 1250;

      // Signature 360-degree spin & glide into detail position (snappy on mobile overlay)
      setT(() => {
        if (myToken !== transitionToken) return;
        if (state.mode !== 'opening' && state.mode !== 'detail') return;
        book.root.visible = true;
        book.orbY = RM ? 0 : fastMobile ? 0 : -6.2832;
        book.orbYv = RM ? 0 : fastMobile ? 0 : 3.2;
        book.orbPhase = fastMobile ? 'idle' : 'return';
        book.orbTarget = 0;
        book.orbXs.set(0);
        applyMode();
        camTo('detail');
      }, spinDelay);

      setT(() => {
        if (myToken !== transitionToken) return;
        leaves.activate(book);
      }, leavesDelay);

      setT(() => {
        if (myToken !== transitionToken) return;
        if (state.mode === 'opening') {
          bookInstances.forEach((sibling) => {
            if (sibling !== book) {
              sibling.exit = null;
              sibling.root.visible = false;
              sibling.orbY = 0;
              sibling.orbYv = 0;
              sibling.orbPhase = 'idle';
              sibling.orbTarget = 0;
              sibling.orbXs.set(0);
            }
          });
          root!.classList.add('bs-detail-open');
          state.mode = 'detail';
          updateUiMode('detail');
          rebuildHitMeshes();
        }
      }, detailDelay);
    }

    function switchBookInDetail(book: Book) {
      if (state.selected === book) return;
      const myToken = ++transitionToken;

      if (hasOverlayRef.current) {
        const prev = state.selected;
        if (prev) {
          prev.exit = null;
          prev.root.visible = false;
          prev.orbY = 0;
          prev.orbYv = 0;
          prev.orbPhase = 'idle';
          prev.orbTarget = 0;
          prev.orbXs.set(0);
        }
        if (!currentWindow.includes(book.index) && N > VISIBLE) {
          carouselStart = (book.index - 1 + N) % N;
          setCarouselIdx(carouselStart);
          currentWindow = windowIndices(carouselStart, N, VISIBLE);
        }
        bookInstances.forEach((bk) => {
          if (bk !== book) {
            bk.exit = null;
            bk.root.visible = false;
          }
        });
        state.selected = book;
        setSelectedCfg(book.cfg);
        onBookSelectRef.current?.(book.cfg);
        computeSlots();
        const dSlot = SLOTS.detail!;
        book.exit = null;
        book.root.visible = true;
        book.springs.px.set(dSlot.p[0]);
        book.springs.py.set(dSlot.p[1]);
        book.springs.pz.set(dSlot.p[2]);
        book.springs.rx.set(dSlot.r[0]);
        book.springs.ry.set(dSlot.r[1]);
        book.springs.rz.set(dSlot.r[2]);
        book.springs.sc.set(dSlot.s);
        book.slotScale = dSlot.s;
        leaves.activate(book);
        state.mode = 'detail';
        updateUiMode('detail');
        rebuildHitMeshes();
        resumeAnimation();
        return;
      }

      const prev = state.selected;
      state.mode = 'opening';
      updateUiMode('opening');
      state.selected = book;
      resumeAnimation();
      setSelectedCfg(book.cfg);
      onBookSelectRef.current?.(book.cfg);
      orbit.drag = false;

      if (prev) {
        prev.exit = null;
        const sl = SLOTS.detail!;
        playY(prev, [
          { d: 0.45, from: prev.springs.py.v, to: sl.p[1] - CLEAR, ease: EASE.inOutSine, end: () => { prev.root.visible = false; } },
        ]);
      }

      if (N > VISIBLE) {
        carouselStart = (book.index - 1 + N) % N;
        currentWindow = windowIndices(carouselStart, N, VISIBLE);
        currentWindow.forEach((bi, i) => {
          const sibling = bookInstances[bi];
          if (sibling !== book && sibling !== prev) {
            const sl = SLOTS.hero[i] ?? SLOTS.hero[1];
            sibling.root.visible = false;
            sibling.springs.px.set(sl.p[0]);
            sibling.springs.py.set(sl.p[1] - CLEAR);
            sibling.springs.pz.set(sl.p[2]);
            sibling.springs.rx.set(sl.r[0]);
            sibling.springs.ry.set(sl.r[1]);
            sibling.springs.rz.set(sl.r[2]);
            sibling.springs.sc.set(sl.s);
            sibling.slotScale = sl.s;
          }
        });
      }

      computeSlots();
      const dSlot = SLOTS.detail!;
      book.exit = null;
      book.root.visible = true;
      book.springs.px.set(dSlot.p[0]);
      book.springs.py.set(dSlot.p[1] - CLEAR);
      book.springs.pz.set(dSlot.p[2]);
      book.springs.rx.set(dSlot.r[0]);
      book.springs.ry.set(dSlot.r[1]);
      book.springs.rz.set(dSlot.r[2]);
      book.springs.sc.set(dSlot.s);
      book.slotScale = dSlot.s;
      book.orbY = RM ? 0 : -6.2832;
      book.orbYv = RM ? 0 : 3;
      book.orbPhase = 'return';
      book.orbTarget = 0;
      book.orbXs.set(0);

      setT(() => {
        if (myToken !== transitionToken) return;
        applyMode();
        camTo('detail');
        leaves.activate(book);
      }, 220);

      setT(() => {
        if (myToken !== transitionToken) return;
        if (prev && prev !== book) {
          prev.exit = null;
          prev.root.visible = false;
        }
        state.mode = 'detail';
        updateUiMode('detail');
        rebuildHitMeshes();
      }, 800);
    }

    function openBookById(id: string) {
      const target = bookInstances.find((b) => b.cfg.id === id);
      if (!target || state.selected === target) return;
      if (state.mode === 'detail') {
        switchBookInDetail(target);
      } else {
        open(target);
      }
    }
    openBookByIdRef.current = openBookById;

    function close() {
      if (state.mode !== 'detail' && state.mode !== 'opening') return;
      const myToken = ++transitionToken;
      state.mode = 'closing';
      updateUiMode('closing');
      root!.classList.remove('bs-detail-open');
      onBookSelectRef.current?.(null);
      leaves.deactivate();
      orbit.drag = false;
      const b = state.selected;

      // Premium close spin on the active book + staggered bringBack for siblings
      const TWO_PI = Math.PI * 2;
      const wrapPi = (a: number) => (((a % TWO_PI) + TWO_PI + Math.PI) % TWO_PI) - Math.PI;
      if (b) {
        b.root.visible = true;
        b.orbY = wrapPi(b.orbY) - TWO_PI;
        b.orbTarget = 0;
        b.orbYv = Math.max(b.orbYv, 3.6);
        b.orbPhase = 'return';
        b.orbXs.t = 0;
      }
      resumeAnimation();

      // Guarantee any book outside currentWindow is hidden and reset
      bookInstances.forEach((bk) => {
        if (!currentWindow.includes(bk.index)) {
          bk.exit = null;
          bk.root.visible = false;
          bk.orbY = 0;
          bk.orbYv = 0;
          bk.orbPhase = 'idle';
          bk.orbTarget = 0;
          bk.orbXs.set(0);
        }
      });

      // Ensure sibling books in currentWindow start straight-facing below the shelf before bringBack floats them in
      currentWindow.forEach((bi, i) => {
        const bk = bookInstances[bi];
        if (bk !== b) {
          bk.orbY = 0;
          bk.orbYv = 0;
          bk.orbPhase = 'idle';
          bk.orbTarget = 0;
          bk.orbXs.set(0);
        }
        if (bk !== b && !bk.root.visible) {
          const slot = SLOTS.hero[i] ?? SLOTS.hero[1];
          bk.springs.px.set(slot.p[0]);
          bk.springs.py.set(slot.p[1] - CLEAR);
          bk.springs.pz.set(slot.p[2]);
          bk.springs.rx.set(slot.r[0]);
          bk.springs.ry.set(slot.r[1]);
          bk.springs.rz.set(slot.r[2]);
          bk.springs.sc.set(slot.s);
          bk.slotScale = slot.s;
        }
      });

      const fastMobile = isMobileScreen && hasOverlayRef.current;
      const returnDelay = hasOverlayRef.current ? (fastMobile ? 50 : 140) : 220;
      const bringBackBase = hasOverlayRef.current ? (fastMobile ? 0.1 : 0.3) : 0.65;
      const heroDoneDelay = hasOverlayRef.current ? (fastMobile ? 540 : 1150) : 1450;

      setT(() => {
        if (myToken !== transitionToken) return;
        root!.classList.remove('bs-transit');
        applyMode();
        camTo('hero');
        let back = 0;
        currentWindow.forEach((bi, i) => {
          const bk = bookInstances[bi];
          if (bk !== b) bringBack(bk, i, bringBackBase + back++ * 0.08);
        });
      }, returnDelay);

      setT(() => {
        if (myToken !== transitionToken) return;
        if (state.mode === 'closing') {
          if (b) {
            b.orbY = wrapPi(b.orbY);
            b.orbTarget = 0;
            b.orbPhase = 'idle';
          }
          state.mode = 'hero';
          updateUiMode('hero');
          state.selected = null;
          setSelectedCfg(null);
          rebuildHitMeshes();
        }
      }, heroDoneDelay);
    }
    closeRef.current = close;

    const onCloseClick = () => close();
    const closeBtn = closeBtnRef.current;
    closeBtn?.addEventListener('click', onCloseClick);

    // Input: pointer as hand, drag to peel, keyboard
    const ptr = {
      ndcX: 0,
      ndcY: 0,
      cx: 0,
      cy: 0,
      lastX: 0,
      lastY: 0,
      down: false,
      downX: 0,
      downY: 0,
      moved: 0,
      t0: 0,
      type: 'mouse',
      seen: false,
      id: null as number | null,
    };
    const isTouch = () => ptr.type === 'touch' || ptr.type === 'pen';
    let dragBook: Book | null = null,
      rayBook: Book | null = null;
    const orbit = { drag: false, dxAcc: 0, dyAcc: 0 };
    const ray = new THREE.Raycaster();
    const tmpV = new THREE.Vector3();

    const canvas = canvasEl;

    const onPointerLeave = () => {
      rayBook = null;
      state.pillLock = null;
      state.kbIndex = -1;
    };
    canvas.addEventListener('pointerleave', onPointerLeave);

    const localXY = (e: PointerEvent) => {
      const r = root!.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (ptr.id !== null && e.pointerId !== ptr.id) return;
      const { x: cx, y: cy } = localXY(e);
      const dxN = (cx - ptr.lastX) / dims.w;
      const dyN = (cy - ptr.lastY) / dims.h;
      ptr.lastX = cx;
      ptr.lastY = cy;
      ptr.cx = cx;
      ptr.cy = cy;
      ptr.ndcX = (cx / dims.w) * 2 - 1;
      ptr.ndcY = -(cy / dims.h) * 2 + 1;
      ptr.type = e.pointerType || 'mouse';
      ptr.seen = true;
      if (state.mode === 'detail') leaves.push(dxN, dyN);
      if (ptr.down && dragBook && !isTouch()) {
        ptr.moved += Math.abs(dxN * dims.w) + Math.abs(dyN * dims.h);
        dragBook.springs.drag.t = clamp(((ptr.downX - cx) / dims.w) * 3.4, 0, 1.0);
      } else if (ptr.down && isTouch()) {
        ptr.moved += Math.abs(dxN * dims.w) + Math.abs(dyN * dims.h);
      }
      if (ptr.down && orbit.drag) {
        orbit.dxAcc += dxN;
        orbit.dyAcc += dyN;
        ptr.moved += Math.abs(dxN * dims.w) + Math.abs(dyN * dims.h);
      }
    };
    canvas.addEventListener('pointermove', onPointerMove);

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (ptr.id !== null) return;
      const { x: cx, y: cy } = localXY(e);
      ptr.cx = cx;
      ptr.cy = cy;
      ptr.lastX = cx;
      ptr.lastY = cy;
      ptr.ndcX = (cx / dims.w) * 2 - 1;
      ptr.ndcY = -(cy / dims.h) * 2 + 1;
      ptr.type = e.pointerType || 'mouse';
      ptr.seen = true;
      castRay();
      const touchEvt = isTouch();
      if ((state.mode === 'hero' || state.mode === 'closing') && (rayBook || touchEvt)) {
        ptr.id = e.pointerId;
        ptr.down = true;
        dragBook = rayBook;
        ptr.downX = cx;
        ptr.downY = cy;
        ptr.moved = 0;
        ptr.t0 = performance.now();
        // Never capture touch pointers in hero/closing so native vertical page scroll works smoothly
        if (!touchEvt && rayBook) {
          canvas.setPointerCapture(e.pointerId);
        }
      } else if (state.mode === 'detail' && !hasOverlayRef.current && rayBook === state.selected) {
        ptr.id = e.pointerId;
        ptr.down = true;
        orbit.drag = true;
        orbit.dxAcc = 0;
        orbit.dyAcc = 0;
        ptr.moved = 0;
        ptr.t0 = performance.now();
        canvas.setPointerCapture(e.pointerId);
      } else {
        state.pillLock = null;
        state.kbIndex = -1;
      }
    };
    canvas.addEventListener('pointerdown', onPointerDown);

    const onPointerUp = (e: PointerEvent) => {
      if (ptr.id !== null && e.pointerId !== ptr.id) return;
      const touchEvt = e.pointerType === 'touch' || e.pointerType === 'pen' || isTouch();
      const { x: cx, y: cy } = localXY(e);
      const dx = cx - ptr.downX;
      const dy = cy - ptr.downY;
      const dtMs = performance.now() - ptr.t0;
      ptr.id = null;
      orbit.drag = false;

      if (touchEvt && ptr.down) {
        if (dragBook) dragBook.springs.drag.t = 0;
        if (state.mode === 'hero' && N > VISIBLE && Math.abs(dx) > 38 && Math.abs(dx) > Math.abs(dy) * 1.25 && dtMs < 750) {
          shiftCarousel(dx < 0 ? 1 : -1);
        } else if (dragBook && Math.hypot(dx, dy) < 22 && dtMs < 550 && (state.mode === 'hero' || state.mode === 'closing')) {
          open(dragBook);
        }
        dragBook = null;
      } else if (dragBook) {
        const slop = 14;
        const limit = 450;
        const wasDrag = ptr.moved > slop;
        dragBook.springs.drag.t = 0;
        if (!wasDrag && (state.mode === 'hero' || state.mode === 'closing') && dtMs < limit) open(dragBook);
        dragBook = null;
      }
      ptr.down = false;
      if (touchEvt) rayBook = null;
    };
    window.addEventListener('pointerup', onPointerUp);

    const cancelPointer = (e?: PointerEvent) => {
      if (e && ptr.id !== null && e.pointerId !== ptr.id) return;
      ptr.id = null;
      ptr.down = false;
      orbit.drag = false;
      if (dragBook) {
        dragBook.springs.drag.t = 0;
        dragBook = null;
      }
      if (isTouch()) rayBook = null;
    };
    window.addEventListener('pointercancel', cancelPointer as EventListener);
    canvas.addEventListener('lostpointercapture', cancelPointer as EventListener);

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (state.mode !== 'hero') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (e.shiftKey) {
          shiftCarousel(e.key === 'ArrowRight' ? 1 : -1);
        } else {
          const d = e.key === 'ArrowRight' ? 1 : -1;
          state.kbIndex = ((state.kbIndex < 0 ? (d > 0 ? -1 : 1) : state.kbIndex) + d + VISIBLE) % VISIBLE;
          state.pillLock = null;
        }
        e.preventDefault();
      }
      if (e.key === 'Enter' && state.hovered) open(state.hovered);
    };
    root.addEventListener('keydown', onKeydown);

    const rayPointer = new THREE.Vector2();
    function castRay() {
      rayPointer.set(ptr.ndcX, ptr.ndcY);
      ray.setFromCamera(rayPointer, camera);
      const hits = ray.intersectObjects(hitMeshes, false);
      if (hits.length) {
        rayBook = bookByHit(hits[0].object);
        const lp = rayBook.hit.worldToLocal(hits[0].point.clone());
        rayBook.hitEdge = clamp((lp.x / 0.9) * 0.5 + 0.5, 0, 1);
      } else {
        rayBook = null;
      }
    }

    // Frame loop
    const timer = new THREE.Timer();
    timer.connect(document);
    const idle = RM ? 0 : 1;
    const DETAIL_OPEN_ANGLE = 0.88;
    const DETAIL_OPEN_SWAY = 0.035;

    function screenPos(b: Book) {
      b.root.getWorldPosition(tmpV).project(camera);
      b.scr.x = (tmpV.x * 0.5 + 0.5) * dims.w;
      b.scr.y = (-tmpV.y * 0.5 + 0.5) * dims.h;
    }

    function tickBook(b: Book, dt: number, t: number) {
      const s = b.springs;
      const isHov = state.hovered === b;
      const inDetail = state.mode === 'detail' && state.selected === b;
      const orbitActive = state.selected === b && state.mode !== 'hero';

      let activity = 0;
      if (orbitActive) {
        if (orbit.drag && inDetail) {
          const step = orbit.dxAcc * 6.5;
          orbit.dxAcc = 0;
          b.orbY += step;
          b.orbYv = clamp(b.orbYv * 0.5 + (step / Math.max(dt, 0.001)) * 0.5, -14, 14);
          b.orbXs.t = clamp(b.orbXs.t + orbit.dyAcc * 3.2, -0.55, 0.55);
          orbit.dyAcc = 0;
          b.orbPhase = 'drag';
        } else {
          b.orbXs.t = 0;
          if (b.orbPhase === 'drag') {
            if (Math.abs(b.orbYv) > 0.6) b.orbPhase = 'spin';
            else {
              b.orbPhase = 'return';
              b.orbTarget = Math.round((b.orbY + b.orbYv * 1.2) / Math.PI) * Math.PI;
            }
          }
          if (b.orbPhase === 'spin') {
            b.orbYv *= Math.exp(-0.9 * dt);
            b.orbY += b.orbYv * dt;
            if (Math.abs(b.orbYv) < 0.5) {
              b.orbPhase = 'return';
              b.orbTarget = Math.round((b.orbY + b.orbYv * 1.2) / Math.PI) * Math.PI;
            }
          } else if (b.orbPhase === 'return') {
            const acc = 16 * (b.orbTarget - b.orbY) - 8 * b.orbYv;
            b.orbYv += acc * dt;
            b.orbY += b.orbYv * dt;
            if (Math.abs(b.orbTarget - b.orbY) < 0.002 && Math.abs(b.orbYv) < 0.01) {
              b.orbY = b.orbTarget;
              b.orbYv = 0;
              b.orbPhase = 'idle';
            }
          }
        }
        const distRest = Math.abs(b.orbY - Math.round(b.orbY / 6.2832) * 6.2832);
        activity = clamp(Math.abs(b.orbYv) * 1.5 + (orbit.drag ? 1 : 0) + distRest * 2, 0, 1);
      } else {
        // Guarantee non-active books on the shelf always settle cleanly facing forward (orbY -> 0)
        b.orbXs.t = 0;
        if (Math.abs(b.orbY) > 0.001 || Math.abs(b.orbYv) > 0.005) {
          const TWO_PI = Math.PI * 2;
          b.orbY = (((b.orbY % TWO_PI) + TWO_PI + Math.PI) % TWO_PI) - Math.PI;
          const acc = 28 * (0 - b.orbY) - 10 * b.orbYv;
          b.orbYv += acc * dt;
          b.orbY += b.orbYv * dt;
          if (Math.abs(b.orbY) < 0.002 && Math.abs(b.orbYv) < 0.01) {
            b.orbY = 0;
            b.orbYv = 0;
            b.orbPhase = 'idle';
          }
        } else {
          b.orbY = 0;
          b.orbYv = 0;
        }
      }
      b.orbXs.update(dt);

      let coverBase = 0;
      if (inDetail || (hasOverlayRef.current && state.mode === 'opening' && state.selected === b)) {
        coverBase = DETAIL_OPEN_ANGLE + Math.sin(t * 0.8 + b.phase) * DETAIL_OPEN_SWAY * idle;
      }
      const fan = orbitActive ? clamp(b.orbYv * 0.16, 0, 0.75) : 0;
      const fanB = orbitActive ? clamp(-b.orbYv * 0.16, 0, 0.75) : 0;
      let coverBBase = 0;
      if (inDetail) coverBBase = 0.2 + Math.sin(t * 0.8 + b.phase + 1.7) * 0.02 * idle;

      if (isHov && ptr.seen && state.mode === 'hero') {
        const dxN = (ptr.cx - b.scr.x) / (dims.w * 0.25);
        const dyN = (b.scr.y - ptr.cy) / (dims.h * 0.3);
        s.tiltY.t = clamp(dxN * 0.28, -0.15, 0.15);
        s.tiltX.t = clamp(-dyN * 0.1, -0.09, 0.1);
        s.lift.t = 0.3;
        coverBase = 0;
      } else {
        s.tiltY.t = 0;
        s.tiltX.t = 0;
        s.lift.t = 0;
      }
      s.cover.t = coverBase + fan;
      s.coverB.t = coverBBase + fanB;
      s.sc.t = b.slotScale * (isHov && state.mode === 'hero' ? 1.09 : 1);

      s.px.update(dt);
      if (b.exit) stepY(b, dt);
      else s.py.update(dt);
      s.pz.update(dt);
      s.rx.update(dt);
      s.ry.update(dt);
      s.rz.update(dt);
      s.sc.update(dt);
      s.tiltX.update(dt);
      s.tiltY.update(dt);
      s.lift.update(dt);
      s.cover.update(dt);
      s.coverB.update(dt);
      s.drag.update(dt);

      b.float.position.y = Math.sin(t * 0.7 + b.phase) * 0.035 * idle;
      b.float.rotation.z = Math.sin(t * 0.9 + b.phase * 1.7) * 0.006 * idle;

      b.root.position.set(s.px.v, s.py.v, s.pz.v + s.lift.v);
      const sway = inDetail ? Math.sin(t * 0.45 + b.phase) * 0.035 * idle * (1 - activity) : 0;
      const swing = clamp(-s.px.vel * 0.12, -0.5, 0.5);
      b.root.rotation.set(s.rx.v + s.tiltX.v + b.orbXs.v, s.ry.v + s.tiltY.v + b.orbY + sway + swing, s.rz.v);
      b.root.scale.setScalar(Math.max(s.sc.v, 0.001));

      const ang = Math.max(0, s.cover.v + s.drag.v);
      const angB = Math.max(0, s.coverB.v);
      b.pivot.rotation.y = -ang;
      b.pivot.position.z = PIVOT_Z + ang * 0.022;
      b.backPivot.rotation.y = angB;
      b.backPivot.position.z = BPIVOT_Z - angB * 0.022;
      b.spine.rotation.y = -ang * 0.16 + angB * 0.16;
      b.block.scale.z = 1 - (ang + angB) * 0.05;
      b.block.position.z = BLOCK_Z - ang * 0.006 + angB * 0.006;
      for (let i = 0; i < PAGE_N; i++) {
        const fl = idle * Math.sin(t * 1.15 + b.phase + i * 0.6) * 0.006 * (1 - i / PAGE_N);
        b.pages[i].rotation.y = -(ang * b.pageF[i] + Math.max(0, fl));
      }
      for (let i = 0; i < BACK_PAGE_N; i++) b.pagesB[i].rotation.y = angB * b.pageFB[i];
    }

    let rafId = 0;
    let isInViewport = true;
    let lastFrameTime = 0;
    let overlayFrameSettled = false;
    function animate(timestamp?: number) {
      if (cancelled || !isInViewport || document.hidden) {
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(animate);
      const now = timestamp ?? performance.now();
      const frameInterval = RM || lowPowerDevice ? 1000 / 30 : 0;
      if (frameInterval > 0 && now - lastFrameTime < frameInterval) return;
      lastFrameTime = now;

      const settledInOverlay =
        state.mode === 'detail' &&
        hasOverlayRef.current &&
        (!state.selected ||
          (state.selected.orbPhase === 'idle' &&
            Math.abs(state.selected.springs.px.v - state.selected.springs.px.t) < 0.01 &&
            Math.abs(state.selected.springs.py.v - state.selected.springs.py.t) < 0.01)) &&
        Math.abs(camZ.v - camZ.t) < 0.02;

      if (settledInOverlay && overlayFrameSettled) {
        timer.update(now);
        return;
      }
      overlayFrameSettled = settledInOverlay;

      timer.update(now);
      const dt = clamp(timer.getDelta(), 0.001, 0.05);
      const t = timer.getElapsed();

      if (ptr.seen && (ptr.type === 'mouse' || ptr.down)) castRay();
      let hov: Book | null = null;
      if (state.mode === 'hero') {
        const kb = state.kbIndex >= 0 ? bookInstances[currentWindow[state.kbIndex]] : null;
        hov = rayBook || state.pillLock || kb || null;
      } else if (state.mode === 'detail') {
        hov = rayBook === state.selected ? rayBook : null;
      }
      state.hovered = hov;
      let cur = 'default';
      if (state.mode === 'hero' && hov) cur = 'pointer';
      else if (state.mode === 'detail' && state.selected) {
        if (orbit.drag) cur = 'grabbing';
        else if (rayBook === state.selected) cur = 'grab';
      }
      canvas.style.cursor = cur;

      for (let i = 0; i < bookInstances.length; i++) {
        const b = bookInstances[i];
        if (!b.root.visible) continue;
        screenPos(b);
        tickBook(b, dt, t);
      }
      leaves.update(dt, t);

      parX.t = RM ? 0 : ptr.ndcX * 0.02;
      parY.t = RM ? 0 : -ptr.ndcY * 0.012;
      bookRoot.rotation.y = parX.update(dt);
      bookRoot.rotation.x = parY.update(dt);

      camera.position.set(camX.update(dt), camY.update(dt), camZ.update(dt));
      camera.lookAt(lookX.update(dt), lookY.update(dt), 0);

      if (state.mode === 'hero' && state.hovered && ptr.seen && !isTouch() && !(ptr.down && ptr.moved > 14)) {
        const tx = ptr.cx,
          ty = ptr.cy + 34;
        if (!pillOn) {
          pillX.set(tx);
          pillY.set(ty);
        }
        pillX.t = tx;
        pillY.t = ty;
        if (openBtnRef.current) {
          openBtnRef.current.style.left = pillX.update(dt) + 'px';
          openBtnRef.current.style.top = pillY.update(dt) + 'px';
        }
        if (!pillOn) showPill();
      } else {
        hidePill();
      }

      renderer.render(scene, camera);
    }

    function resumeAnimation() {
      overlayFrameSettled = false;
      if (!rafId && !cancelled && isInViewport && !document.hidden) {
        rafId = requestAnimationFrame(animate);
      }
    }

    function relayout() {
      overlayFrameSettled = false;
      const r = root!.getBoundingClientRect();
      dims.w = Math.max(1, Math.round(r.width));
      dims.h = Math.max(1, Math.round(r.height));
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPowerDevice ? 1.15 : 1.3));
      renderer.setSize(dims.w, dims.h);
      camera.aspect = dims.w / dims.h;
      camera.updateProjectionMatrix();
      computeSlots();
      applyMode();
      camTo(state.mode === 'detail' || state.mode === 'opening' ? 'detail' : 'hero');
      resumeAnimation();
    }

    relayout();
    currentWindow.forEach((bi, i) => {
      const b = bookInstances[bi];
      const slot = SLOTS.hero[i];
      const s = b.springs;
      s.px.set(slot.p[0]);
      s.py.set(slot.p[1] - (isMobileScreen ? 0.28 : 1.2));
      s.pz.set(slot.p[2]);
      s.rx.set(slot.r[0]);
      s.ry.set(slot.r[1]);
      s.rz.set(slot.r[2] + (VISIBLE === 3 ? 0.08 * (i === 1 ? 0 : Math.sign(slot.p[0])) : 0.25 * (i === 1 ? -1 : Math.sign(slot.p[0]))));
      s.sc.set(slot.s * (isMobileScreen ? 0.94 : 1));
      b.slotScale = slot.s;
      setT(() => setTargets(b, slot), (isMobileScreen ? 40 : 200) + i * (isMobileScreen ? 60 : 120));
    });
    bookInstances.forEach((b, idx) => {
      if (!currentWindow.includes(idx)) b.root.visible = false;
    });
    rebuildHitMeshes();
    camTo('hero');
    animate();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting;
        if (isInViewport) resumeAnimation();
        else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { rootMargin: '160px' },
    );
    visibilityObserver.observe(root);

    const onVisibilityChange = () => {
      if (document.hidden && rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else {
        resumeAnimation();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const onWindowResize = () => relayout();
    let orientationTimeout: ReturnType<typeof setTimeout> | null = null;
    const onOrientation = () => {
      relayout();
      orientationTimeout = setT(relayout, 250);
    };
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('orientationchange', onOrientation);
    let visualViewportHandler: (() => void) | null = null;
    if (window.visualViewport) {
      visualViewportHandler = () => relayout();
      window.visualViewport.addEventListener('resize', visualViewportHandler);
    }
    const ro = new ResizeObserver(() => relayout());
    ro.observe(root);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      timeouts.forEach((id) => clearTimeout(id));
      if (orientationTimeout) clearTimeout(orientationTimeout);

      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      timer.dispose();
      ro.disconnect();
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('orientationchange', onOrientation);
      if (visualViewportHandler && window.visualViewport) {
        window.visualViewport.removeEventListener('resize', visualViewportHandler);
      }
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', cancelPointer as EventListener);
      root.removeEventListener('keydown', onKeydown);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('lostpointercapture', cancelPointer as EventListener);
      closeBtn?.removeEventListener('click', onCloseClick);

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => {
            Object.values(m).forEach((v) => {
              if (v && (v as THREE.Texture).isTexture) (v as THREE.Texture).dispose();
            });
            m.dispose();
          });
        }
      });
      scene.environment?.dispose();
      scene.environment = null;
      renderer.dispose();
    };
  }, [books, showDetailPanel, leafColorsKey, bpKey]);

  const themeVars = {
    '--bs-navy': themeColors?.navy ?? '#141a32',
    '--bs-pink': themeColors?.pink ?? '#f591ac',
    '--bs-cream': themeColors?.cream ?? '#fdfbf4',
    '--bs-lav': themeColors?.lav ?? '#c9d0ee',
    '--bs-peri': themeColors?.peri ?? '#96a2de',
    '--bs-bg-light': themeColors?.bgLight ?? themeColors?.bg ?? '#fafafa',
    '--bs-bg-dark': themeColors?.bgDark ?? themeColors?.bg ?? '#18181b',
    '--bs-fg-light': themeColors?.foregroundLight ?? '#18181b',
    '--bs-fg-dark': themeColors?.foregroundDark ?? '#fafafa',
  } as React.CSSProperties;

  const panelVisible = uiMode === 'detail';
  const heroWordVisible = mounted && uiMode === 'hero';
  const canCarousel = showCarousel && books.length > (isMobileView ? 3 : 4);
  const mobileActiveIdx = books.length > 0 ? (carouselIdx + 1) % books.length : 0;
  const mobileActiveBook = books[mobileActiveIdx] ?? books[0];

  const delayMap: Record<number, string> = {
    50: 'delay-[50ms]',
    130: 'delay-[130ms]',
    210: 'delay-[210ms]',
    270: 'delay-[270ms]',
    330: 'delay-[330ms]',
  };

  const dpChild = (delayMs: number) =>
    panelVisible
      ? `opacity-100 translate-y-0 transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${delayMap[delayMs] || ''}`
      : 'opacity-0 translate-y-[28px] transition-[opacity,transform] duration-[280ms] ease-out';

  const helpers: BooksShowcaseHelpers = {
    close: () => closeRef.current(),
    openBookById: (id: string) => openBookByIdRef.current(id),
    shiftCarousel: (dir: 1 | -1) => shiftCarouselRef.current(dir),
  };

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="region"
      aria-label={`${heroTitle} book showcase`}
      data-state={uiMode}
      className={cn(
        'book-showcase relative isolate min-h-[540px] sm:min-h-[600px] overflow-hidden font-sans outline-none focus:outline-none focus-visible:outline-none [container-type:inline-size] [-webkit-tap-highlight-color:transparent]',
        panelVisible && renderDetailOverlay ? 'h-auto md:h-full' : 'h-full',
        'transition-colors duration-500 ease-out',
        uiMode === 'hero'
          ? 'bg-[var(--bs-bg-dark)] text-[var(--bs-fg-dark)]'
          : 'bg-[var(--bs-navy)] text-[var(--bs-cream)]',
        className,
      )}
      style={themeVars}
    >
      {/* Subtle warm studio aura behind the books */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 72% 52% at 50% 60%, rgba(200, 159, 109, 0.065) 0%, rgba(150, 108, 60, 0.025) 48%, transparent 74%)',
        }}
      />

      {/* hero word */}
      {heroTitle && (
        <div
          className={`pointer-events-none absolute left-1/2 top-[6%] z-[1] -translate-x-1/2 select-none transition-all duration-500 ease-out ${
            heroWordVisible ? 'translate-y-0 opacity-100' : uiMode === 'hero' ? 'translate-y-[60px] opacity-0' : '-translate-y-11 opacity-0'
          }`}
        >
          <span className="block whitespace-nowrap bg-gradient-to-b from-[#f3dec0]/[0.16] via-[#e0b885]/[0.07] to-transparent bg-clip-text text-transparent text-[clamp(3.25rem,14.5cqw,12.5rem)] font-serif font-normal uppercase leading-[0.9] tracking-[0.12em]">
            {heroTitle}
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          'absolute inset-0 z-[2] block h-full w-full transition-opacity duration-300 md:duration-700 ease-out',
          uiMode === 'detail' && !renderDetailOverlay ? 'touch-none' : 'touch-pan-y',
          renderDetailOverlay && uiMode === 'detail' ? 'pointer-events-none opacity-20' : 'opacity-100',
        )}
      />

      {books.length === 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-8 text-center text-sm text-current opacity-60">
          Add at least one book to display the showcase.
        </div>
      )}

      {showNav && (
        <nav
          aria-hidden={uiMode !== 'hero'}
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 z-40 flex flex-wrap items-center justify-between gap-4 px-[clamp(20px,4cqw,42px)] py-[clamp(18px,3cqh,26px)] transition-opacity duration-300',
            uiMode === 'hero' ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
        >
          <div className="text-[clamp(18px,2cqw,26px)] font-serif font-normal tracking-[-0.01em] text-current">
            {navTitle}
          </div>
          {renderHeroControls && (
            <div className={uiMode === 'hero' ? 'pointer-events-auto' : 'pointer-events-none'}>
              {renderHeroControls(helpers)}
            </div>
          )}
        </nav>
      )}

      {canCarousel && (
        <>
          {/* Desktop side carousel arrows */}
          <button
            type="button"
            aria-label="Previous books"
            onClick={() => shiftCarouselRef.current(-1)}
            className={`hidden md:inline-flex absolute top-[53%] z-30 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full border border-white/[0.16] bg-[#160f0a]/85 text-[#d6cec2] backdrop-blur-md shadow-md transition-all duration-200 hover:scale-[1.03] hover:border-[#e0b885]/60 hover:bg-[#21160e] hover:text-[#e0b885] left-6 lg:left-[5%] xl:left-[7%] ${
              uiMode === 'hero' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next books"
            onClick={() => shiftCarouselRef.current(1)}
            className={`hidden md:inline-flex absolute top-[53%] z-30 -translate-y-1/2 h-12 w-12 items-center justify-center rounded-full border border-white/[0.16] bg-[#160f0a]/85 text-[#d6cec2] backdrop-blur-md shadow-md transition-all duration-200 hover:scale-[1.03] hover:border-[#e0b885]/60 hover:bg-[#21160e] hover:text-[#e0b885] right-6 lg:right-[5%] xl:right-[7%] ${
              uiMode === 'hero' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <ChevronRight />
          </button>

          {/* Desktop 5-volume shelf indicator */}
          <div
            className={`hidden md:flex pointer-events-none absolute bottom-11 left-1/2 z-20 -translate-x-1/2 items-center gap-3.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-opacity duration-300 ${
              uiMode === 'hero' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {books.map((b, idx) => {
                const visibleInWindow = Array.from({ length: 4 }, (_, k) => (carouselIdx + k) % books.length).includes(idx);
                return (
                  <span
                    key={b.id}
                    className={`relative pb-1 font-serif italic text-[11px] tracking-[0.06em] transition-all duration-300 ${
                      visibleInWindow ? 'text-[#e0b885]' : 'text-white/25'
                    }`}
                  >
                    {['I', 'II', 'III', 'IV', 'V'][idx] ?? idx + 1}
                    <span
                      className={`absolute inset-x-0 bottom-0 h-[1.5px] rounded-full transition-all duration-300 ${
                        visibleInWindow ? 'bg-[#e0b885]/85' : 'bg-white/15'
                      }`}
                    />
                  </span>
                );
              })}
            </div>
            <span className="h-2.5 w-px bg-white/15" />
            <span className="text-[#b8ada0] text-[9.5px] tracking-[0.22em]">
              4 of {books.length} Volumes
            </span>
          </div>

          {/* Mobile centered bottom dock (arrows clear the books cleanly & pair with swipe) */}
          <div
            className={`md:hidden absolute bottom-5 left-1/2 z-30 -translate-x-1/2 flex w-full max-w-[340px] flex-col items-center gap-2.5 px-4 transition-opacity duration-200 ${
              uiMode === 'hero' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <div className="flex w-full items-center justify-between gap-3">
              <button
                type="button"
                aria-label="Previous volume"
                onClick={() => shiftCarouselRef.current(-1)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.16] bg-[#160f0a]/90 text-[#e8ded1] shadow-md active:scale-95 transition-transform touch-manipulation"
              >
                <ChevronLeft />
              </button>

              <div className="flex items-center gap-3">
                {books.map((b, idx) => {
                  const isFocused = idx === mobileActiveIdx;
                  return (
                    <span
                      key={b.id}
                      className={`relative pb-1 font-serif italic text-[12px] tracking-[0.06em] transition-colors duration-200 ${
                        isFocused ? 'text-[#ffd89b] font-semibold' : 'text-white/30'
                      }`}
                    >
                      {['I', 'II', 'III', 'IV', 'V'][idx] ?? idx + 1}
                      <span
                        className={`absolute inset-x-0 bottom-0 h-[1.5px] rounded-full transition-all duration-200 ${
                          isFocused ? 'bg-[#e0b885]' : 'bg-white/15'
                        }`}
                      />
                    </span>
                  );
                })}
              </div>

              <button
                type="button"
                aria-label="Next volume"
                onClick={() => shiftCarouselRef.current(1)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.16] bg-[#160f0a]/90 text-[#e8ded1] shadow-md active:scale-95 transition-transform touch-manipulation"
              >
                <ChevronRight />
              </button>
            </div>

            {mobileActiveBook && (
              <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-wide text-[#cfc5b7]">
                <span className="text-[#e0b885] font-medium truncate max-w-[165px]">{mobileActiveBook.title}</span>
                <span className="text-white/25">·</span>
                <span>Tap cover to open</span>
              </div>
            )}
          </div>
        </>
      )}

      {/* trailing "open" slip — position is driven by the animation loop via inline style */}
      <button
        ref={openBtnRef}
        tabIndex={-1}
        aria-hidden="true"
        className={
          'absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2 rotate-[-1.6deg] inline-flex items-center gap-2.5 px-[26px] pb-[16px] pt-3.5 ' +
          'text-[14px] font-bold uppercase tracking-[0.12em] text-[var(--bs-navy)] pointer-events-none ' +
          'transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[left,top,opacity,transform] ' +
          '[clip-path:polygon(0%_0.9%,8.3%_0.8%,16.7%_6.3%,25%_3.8%,33.3%_5.5%,41.7%_2.7%,50%_5.2%,58.3%_0.4%,66.7%_5.9%,75%_6.5%,83.3%_1%,91.7%_6.4%,100%_0.7%,97.7%_20%,97%_40%,99.6%_60%,98.7%_80%,100%_96.5%,91.7%_99.8%,83.3%_95.6%,75%_94.9%,66.7%_96.6%,58.3%_93.5%,50%_97.9%,41.7%_99.5%,33.3%_93.2%,25%_93.6%,16.7%_93.2%,8.3%_93.1%,0%_93.5%,0.2%_80%,1.1%_60%,3.9%_40%,3.8%_20%)] ' +
          '[background:repeating-linear-gradient(92deg,rgba(90,74,40,0.03)_0px_2px,transparent_2px_6px),radial-gradient(125%_150%_at_28%_0%,#fffdf7_0%,#f8f2e3_58%,#ede4cf_100%)] ' +
          '[filter:drop-shadow(0_2px_1px_rgba(0,0,0,0.16))_drop-shadow(0_14px_26px_rgba(0,0,0,0.4))] ' +
          OPEN_BTN_OFF.join(' ')
        }
      >
        <span className="relative inline-flex h-5 w-5 items-center justify-center">
          <span className="animate-bs-tap-ring absolute -top-0.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-[#8f6835]/70" />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bs-hand-tap h-[17px] w-[17px] text-[#1f1712]"
            aria-hidden="true"
          >
            <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
            <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v6" />
            <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </svg>
        </span>
        <span>Open</span>
      </button>

      {!renderDetailOverlay && (
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close detail view"
          className={`absolute left-1/2 top-[24px] z-40 -translate-x-1/2 inline-flex h-[48px] w-[48px] items-center justify-center rounded-full border-[1.5px] border-[var(--bs-cream)]/40 bg-[#140e0a]/60 backdrop-blur-md text-[17px] leading-none text-[var(--bs-cream)] transition-[opacity,border-color,transform] duration-300 delay-150 hover:scale-105 hover:border-[var(--bs-cream)]/90 max-md:left-auto max-md:right-[18px] max-md:top-[18px] max-md:translate-x-0 [-webkit-tap-highlight-color:transparent] ${
            uiMode === 'detail' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          &#10005;
        </button>
      )}

      {showDetailPanel && renderDetailOverlay && (
        <div
          aria-live="polite"
          onClick={(e) => {
            if (e.target === e.currentTarget) helpers.close();
          }}
          className={`z-30 flex items-center justify-center px-3 py-4 transition-all ease-[cubic-bezier(0.22,1,0.36,1)] ${
            panelVisible
              ? 'relative md:absolute md:inset-0 pointer-events-auto visible scale-100 opacity-100 duration-500'
              : 'pointer-events-none invisible absolute inset-0 scale-[0.97] opacity-0 duration-250'
          }`}
        >
          {selectedCfg && renderDetailOverlay(selectedCfg, helpers)}
        </div>
      )}

      {showDetailPanel && !renderDetailOverlay && (
        <div
          ref={dpRef}
          aria-live="polite"
          className={`absolute right-[6%] top-1/2 z-[15] w-[min(600px,45%)] -translate-y-1/2 pointer-events-none max-md:right-auto max-md:left-1/2 max-md:top-auto max-md:bottom-[3%] max-md:w-[min(560px,92%)] max-md:-translate-x-1/2 max-md:translate-y-0 ${
            panelVisible ? 'visible' : 'invisible delay-[500ms]'
          }`}
        >
          {selectedCfg && renderDetailContent ? (
            <div className={`${panelVisible ? 'pointer-events-auto' : 'pointer-events-none'} ${dpChild(50)}`}>
              {renderDetailContent(selectedCfg, helpers)}
            </div>
          ) : (
            <>
              <h2
                className={`m-0 font-serif text-[var(--bs-pink)] text-[clamp(42px,4.8cqw,76px)] font-normal leading-[1.02] tracking-[-0.015em] max-md:text-[clamp(32px,8.5cqw,48px)] ${dpChild(
                  50,
                )}`}
              >
                {selectedCfg?.title}
              </h2>
              <p
                className={`mt-5 max-w-[54ch] text-[var(--bs-lav)] text-[clamp(15px,1.2cqw,18px)] leading-[1.65] max-md:mt-3 max-md:line-clamp-4 max-md:text-[14px] ${dpChild(
                  130,
                )}`}
              >
                {selectedCfg?.desc}
              </p>
              <div className={`mt-7 flex items-center gap-[18px] max-md:mt-4 ${dpChild(210)}`}>
                <div className="flex gap-[5px]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg
                      key={i}
                      viewBox="0 0 24 24"
                      className={`h-[22px] w-[22px] fill-[var(--bs-pink)] ${i < (selectedCfg?.stars ?? 0) ? '' : 'opacity-25'}`}
                    >
                      <path d="M12 2.6l2.8 6 6.6.6-5 4.4 1.5 6.5L12 16.7 6.1 20.1l1.5-6.5-5-4.4 6.6-.6z" />
                    </svg>
                  ))}
                </div>
                <div className="h-5 w-px bg-[var(--bs-lav)]/[0.28]" />
                <div className="text-[16px] italic text-[#b8ada0]">{selectedCfg?.badgeLabel ?? 'Official Guide'}</div>
                <div className="ml-auto font-mono text-[14px] text-[#b8ada0]">{selectedCfg?.year}</div>
              </div>
              <div className={`mt-6 border-t border-[var(--bs-lav)]/[0.18] max-md:mt-4 ${dpChild(270)}`} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BooksShowcase;
