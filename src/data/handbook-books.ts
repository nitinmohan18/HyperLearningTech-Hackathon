import type { BookCfg } from '@/components/core/books-showcase';

function paintLuxuryFrame(
  x: CanvasRenderingContext2D,
  w: number,
  h: number,
  bg: string,
  accent: string,
  subtleTint: string,
) {
  const grad = x.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, bg);
  grad.addColorStop(0.55, subtleTint);
  grad.addColorStop(1, bg);
  x.fillStyle = grad;
  x.fillRect(0, 0, w, h);

  // Subtle paper/linen grain
  x.fillStyle = 'rgba(255, 244, 224, 0.035)';
  for (let i = 0; i < 650; i++) {
    x.fillRect(Math.random() * w, Math.random() * h, 2, 2);
  }

  // Soft radial top-center glow
  const glow = x.createRadialGradient(w * 0.5, h * 0.34, 20, w * 0.5, h * 0.34, w * 0.66);
  glow.addColorStop(0, 'rgba(224, 184, 133, 0.16)');
  glow.addColorStop(1, 'rgba(224, 184, 133, 0)');
  x.fillStyle = glow;
  x.fillRect(0, 0, w, h);

  // Outer & inner foil borders
  x.strokeStyle = accent;
  x.globalAlpha = 0.58;
  x.lineWidth = 3;
  x.strokeRect(52, 52, w - 104, h - 104);

  x.globalAlpha = 0.26;
  x.lineWidth = 1.5;
  x.strokeRect(72, 72, w - 144, h - 144);
  x.globalAlpha = 1;

  // Corner diamonds
  const corners: [number, number][] = [
    [72, 72],
    [w - 72, 72],
    [72, h - 72],
    [w - 72, h - 72],
  ];
  x.fillStyle = accent;
  corners.forEach(([cx, cy]) => {
    x.save();
    x.translate(cx, cy);
    x.rotate(Math.PI / 4);
    x.fillRect(-6, -6, 12, 12);
    x.restore();
  });
}

function paintCoverHeader(
  x: CanvasRenderingContext2D,
  w: number,
  vol: string,
  eyebrow: string,
  accent: string,
) {
  x.fillStyle = accent;
  x.textAlign = 'center';
  x.font = '600 26px "JetBrains Mono", monospace';
  x.globalAlpha = 0.9;
  x.fillText(`${vol}  ·  WINTER HACKATHON '26`, w / 2, 155);
  x.globalAlpha = 0.45;
  x.fillRect(w / 2 - 140, 182, 280, 2);
  x.globalAlpha = 0.78;
  x.font = '500 22px "JetBrains Mono", monospace';
  x.fillText(eyebrow.toUpperCase(), w / 2, 224);
  x.globalAlpha = 1;
}

function paintCoverFooter(
  x: CanvasRenderingContext2D,
  w: number,
  h: number,
  line1: string,
  line2: string,
  accent: string,
) {
  x.fillStyle = accent;
  x.globalAlpha = 0.35;
  x.fillRect(140, h - 250, w - 280, 2);
  x.globalAlpha = 0.95;
  x.textAlign = 'center';
  x.font = 'italic 36px Georgia, serif';
  x.fillText(line1, w / 2, h - 185);
  x.fillStyle = '#f0eae1';
  x.globalAlpha = 0.7;
  x.font = '500 22px "JetBrains Mono", monospace';
  x.fillText(line2.toUpperCase(), w / 2, h - 130);
  x.globalAlpha = 1;
}

function paintBookBack(
  x: CanvasRenderingContext2D,
  w: number,
  h: number,
  bg: string,
  accent: string,
  vol: string,
  title: string,
  summaryLines: string[],
) {
  paintLuxuryFrame(x, w, h, bg, accent, bg);
  x.fillStyle = accent;
  x.textAlign = 'center';
  x.font = '600 26px "JetBrains Mono", monospace';
  x.fillText(`HYPERLEARNINGTECH  ·  ${vol}`, w / 2, 210);

  x.fillStyle = '#f0eae1';
  x.font = '400 62px Georgia, serif';
  x.fillText(title, w / 2, 320);

  x.fillStyle = accent;
  x.globalAlpha = 0.4;
  x.fillRect(w / 2 - 120, 360, 240, 2);
  x.globalAlpha = 1;

  x.fillStyle = '#d6cec2';
  x.font = '400 34px Georgia, serif';
  summaryLines.forEach((line, i) => {
    x.fillText(line, w / 2, 480 + i * 62);
  });

  // Barcode block
  x.fillStyle = '#f5efe5';
  x.fillRect(w / 2 - 140, h - 290, 280, 140);
  x.fillStyle = '#140e0a';
  let bx = w / 2 - 118;
  while (bx < w / 2 + 115) {
    const bw = 2 + Math.random() * 6;
    if (Math.random() > 0.35) x.fillRect(bx, h - 270, bw, 84);
    bx += bw + 2 + Math.random() * 4;
  }
  x.font = '500 20px "JetBrains Mono", monospace';
  x.fillText('HLT · DEC 26-27 2026', w / 2, h - 160);
}

export const handbookBooks: BookCfg[] = [
  {
    id: 'schedule',
    title: 'Event Schedule',
    subtitle: 'Milestones & Timings · IST (UTC+5:30)',
    author: 'Phase 01 – 03',
    year: '25–27 Dec 2026',
    stars: 5,
    badgeLabel: '3 Chronological Phases',
    desc: 'Every milestone operates strictly in Indian Standard Time (IST). From 25 December preparation & roster lock, through the 24-hour continuous build sprint (26 Dec 10 PM – 27 Dec 10 PM), to the 10 PM code freeze, three-stage evaluation, and results post-judging.',
    edge: '#efe5d2',
    backBg: '#19110b',
    spineBg: '#23170f',
    spineInk: '#e0b885',
    spineFont: '700 38px Georgia',
    chapters: [
      '25 Dec · Registration & Lock',
      '25 Dec · Prep & Repo Setup',
      '26 Dec 9:00 PM · Access Check',
      '26 Dec 9:30 PM · Final Briefing',
      '26 Dec 10:00 PM · Kickoff',
      '24h · Development Journey',
      '27 Dec 10:00 PM · Code Freeze',
      'Top 25 · Live Google Meet',
      'Results & UPI Payout (2–4h)',
    ],
    front: (x, w, h) => {
      const bg = '#1c120b';
      const accent = '#e6c18b';
      paintLuxuryFrame(x, w, h, bg, accent, '#2c1d12');
      paintCoverHeader(x, w, 'VOLUME I', 'Milestones & Timings', accent);

      // Clock / Orbital ring emblem
      const cx = w / 2;
      const cy = h * 0.43;
      x.save();
      x.strokeStyle = accent;
      x.globalAlpha = 0.25;
      x.lineWidth = 2;
      x.beginPath();
      x.arc(cx, cy, 240, 0, Math.PI * 2);
      x.stroke();
      x.globalAlpha = 0.65;
      x.lineWidth = 3;
      x.beginPath();
      x.arc(cx, cy, 195, -Math.PI * 0.65, Math.PI * 0.85);
      x.stroke();
      // 12 dial ticks
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        x.globalAlpha = i % 3 === 0 ? 0.85 : 0.35;
        x.beginPath();
        x.moveTo(cx + Math.cos(a) * 165, cy + Math.sin(a) * 165);
        x.lineTo(cx + Math.cos(a) * 184, cy + Math.sin(a) * 184);
        x.stroke();
      }
      // 24H centerpiece
      x.globalAlpha = 0.95;
      x.fillStyle = accent;
      x.textAlign = 'center';
      x.font = 'italic 44px Georgia, serif';
      x.fillText('24 Hours · IST', cx, cy + 16);
      x.restore();

      x.fillStyle = '#f5efe5';
      x.textAlign = 'center';
      x.font = '400 104px Georgia, serif';
      x.fillText('Event', w / 2, h * 0.67);
      x.fillStyle = accent;
      x.font = 'italic 106px Georgia, serif';
      x.fillText('Schedule', w / 2, h * 0.745);

      paintCoverFooter(x, w, h, '26–27 Dec · 10 PM to 10 PM', 'Preparation · Sprint · Freeze · Results', accent);
    },
    back: (x, w, h) =>
      paintBookBack(x, w, h, '#18100a', '#e0b885', 'VOLUME I', 'Event Schedule', [
        'Phase 01 · 25 Dec Preparation Day',
        'Phase 02 · 26–27 Dec 24h Build Sprint',
        'Phase 03 · Code Freeze & Three-Stage Review',
        'Results & UPI Transfers Post-Judging',
      ]),
  },
  {
    id: 'how-it-works',
    title: 'How It Works',
    subtitle: '5-Step Participation Flow',
    author: '5-Step Journey',
    year: 'Register → Submit',
    stars: 5,
    badgeLabel: 'End-to-End Flow',
    desc: 'A structured 5-step journey from initial registration to final snapshot grading: Register & Pitch (Squad ₹200 flat · 1–4 members), Setup on 25 Dec, Kickoff at 10 PM on 26 Dec, Ship with hourly checkpoints, and Freeze at 10 PM on 27 Dec.',
    edge: '#efe5d2',
    backBg: '#27150d',
    spineBg: '#321b11',
    spineInk: '#f0c48b',
    spineFont: '700 38px Georgia',
    chapters: [
      '01 · Register & Pitch',
      '02 · Setup on 25 Dec',
      '03 · Kickoff 10 PM 26 Dec',
      '04 · Ship & Checkpoint',
      '05 · Documentation & Final README',
      '06 · Freeze 10 PM 27 Dec',
      'Sprint Boundary Policy',
    ],
    front: (x, w, h) => {
      const bg = '#29150d';
      const accent = '#f0c68f';
      paintLuxuryFrame(x, w, h, bg, accent, '#3d2014');
      paintCoverHeader(x, w, 'VOLUME II', 'Participation Flow', accent);

      // 5-node stepped progression diagram
      const cx = w / 2;
      const startX = 210;
      const endX = w - 210;
      const yBase = h * 0.43;
      x.save();
      x.strokeStyle = accent;
      x.globalAlpha = 0.4;
      x.lineWidth = 3;
      x.beginPath();
      x.moveTo(startX, yBase + 60);
      x.lineTo(endX, yBase - 60);
      x.stroke();

      const labels = ['01', '02', '03', '04', '05'];
      labels.forEach((lbl, i) => {
        const t = i / 4;
        const px = startX + (endX - startX) * t;
        const py = yBase + 60 - 120 * t;
        x.globalAlpha = 1;
        x.fillStyle = bg;
        x.beginPath();
        x.arc(px, py, 34, 0, Math.PI * 2);
        x.fill();
        x.strokeStyle = accent;
        x.lineWidth = 3;
        x.stroke();
        x.fillStyle = accent;
        x.textAlign = 'center';
        x.font = '600 24px "JetBrains Mono", monospace';
        x.fillText(lbl, px, py + 8);
      });
      x.fillStyle = '#f5efe5';
      x.globalAlpha = 0.72;
      x.font = 'italic 32px Georgia, serif';
      x.textAlign = 'center';
      x.fillText('From Idea to Verified Build', cx, yBase + 150);
      x.restore();

      x.fillStyle = '#f5efe5';
      x.textAlign = 'center';
      x.font = '400 100px Georgia, serif';
      x.fillText('How It', w / 2, h * 0.67);
      x.fillStyle = accent;
      x.font = 'italic 104px Georgia, serif';
      x.fillText('Works', w / 2, h * 0.745);

      paintCoverFooter(x, w, h, 'Register · Prepare · Start · Build · Submit', 'Verifiable Engineering Effort', accent);
    },
    back: (x, w, h) =>
      paintBookBack(x, w, h, '#26140c', '#f0c48b', 'VOLUME II', 'How It Works', [
        '01 · Register Squad Format (₹200 flat · 1–4 devs)',
        '02 · Setup Private Repo & Tooling (25 Dec)',
        '03 · Kickoff Baseline Snapshot (26 Dec 10 PM)',
        '04 · Continuous Build & Hourly Checkpoints',
        '05 · Final Submission Freeze & Evaluation',
      ]),
  },
  {
    id: 'judging',
    title: 'Judging & Scoring',
    subtitle: 'Official 100-Point Rubric',
    author: '100-Point Rubric',
    year: '8 Criteria',
    stars: 5,
    badgeLabel: '100% Normalized',
    desc: 'The official 100-point evaluation rubric: Technical Implementation (20 pts), Problem Understanding (15 pts), Originality & Innovation (15 pts), Functionality & Usability (15 pts), Engineering & Documentation (10 pts), Impact & Feasibility (10 pts), Learning & Project Understanding (10 pts), and Communication (5 pts).',
    edge: '#ede3cf',
    backBg: '#121826',
    spineBg: '#192236',
    spineInk: '#e0b885',
    spineFont: '700 36px Georgia',
    chapters: [
      'Tech Implementation · 20 pts',
      'Problem Understanding · 15 pts',
      'Originality & Innovation · 15 pts',
      'Functionality & Usability · 15 pts',
      'Engineering & Docs · 10 pts',
      'Impact & Feasibility · 10 pts',
      'Learning & Understanding · 10 pts',
      'Communication · 5 pts',
    ],
    front: (x, w, h) => {
      const bg = '#141b2b';
      const accent = '#e6c18b';
      paintLuxuryFrame(x, w, h, bg, accent, '#1e283f');
      paintCoverHeader(x, w, 'VOLUME III', 'Transparent Evaluation', accent);

      // Precision Rubric Bars Graphic
      const bars = [
        { label: 'TECH', pts: 20, pct: 1.0 },
        { label: 'PROB', pts: 15, pct: 0.75 },
        { label: 'ORIG', pts: 15, pct: 0.75 },
        { label: 'FUNC', pts: 15, pct: 0.75 },
        { label: 'ENGR', pts: 10, pct: 0.5 },
        { label: 'IMPT', pts: 10, pct: 0.5 },
        { label: 'LRNG', pts: 10, pct: 0.5 },
        { label: 'COMM', pts: 5, pct: 0.25 },
      ];
      const bx = 210;
      const bw = w - 420;
      let by = h * 0.25;
      x.save();
      bars.forEach((b, idx) => {
        x.fillStyle = 'rgba(255,255,255,0.08)';
        x.fillRect(bx, by, bw, 14);
        x.fillStyle = idx === 0 ? accent : 'rgba(224, 184, 133, 0.72)';
        x.fillRect(bx, by, bw * b.pct, 14);

        x.fillStyle = '#d6cec2';
        x.font = '500 17px "JetBrains Mono", monospace';
        x.textAlign = 'left';
        x.fillText(b.label, bx, by - 6);
        x.textAlign = 'right';
        x.fillStyle = accent;
        x.fillText(`${b.pts} PTS`, bx + bw, by - 6);
        by += 46;
      });
      x.restore();

      x.fillStyle = '#f5efe5';
      x.textAlign = 'center';
      x.font = '400 100px Georgia, serif';
      x.fillText('Judging &', w / 2, h * 0.68);
      x.fillStyle = accent;
      x.font = 'italic 104px Georgia, serif';
      x.fillText('Scoring', w / 2, h * 0.755);

      paintCoverFooter(x, w, h, '100-Point Normalized Rubric', '8 Criteria · Tech Craft · Genuine Learning', accent);
    },
    back: (x, w, h) =>
      paintBookBack(x, w, h, '#121826', '#e0b885', 'VOLUME III', 'Judging & Scoring', [
        'Technical Implementation (20 pts)',
        'Problem & Innovation (15 + 15 pts)',
        'Functionality & Engineering (15 + 10 pts)',
        'Impact (10), Learning (10), Comm (5)',
      ]),
  },
  {
    id: 'rules',
    title: 'Rules & Guidelines',
    subtitle: '8 Core Competition Pillars',
    author: 'Fair Play Charter',
    year: '8 Policy Groups',
    stars: 5,
    badgeLabel: '100% IP Retained',
    desc: 'Clear operational policies governing open innovation eligibility, two mandatory technical requirements, recommended practices, tools & AI freedom, originality, code of conduct, and 100% builder IP ownership.',
    edge: '#efe5d2',
    backBg: '#131d17',
    spineBg: '#1a2820',
    spineInk: '#dfba88',
    spineFont: '700 36px Georgia',
    chapters: [
      'Open Innovation Scope',
      'Mandatory Requirements (2)',
      'Recommended Practices',
      'Tools & AI Freedom',
      'Originality & Integrity',
      'Code of Conduct & Review',
      '100% IP & Privacy',
      'Three-Stage Evaluation',
    ],
    front: (x, w, h) => {
      const bg = '#15211a';
      const accent = '#e3be8a';
      paintLuxuryFrame(x, w, h, bg, accent, '#1f3126');
      paintCoverHeader(x, w, 'VOLUME IV', 'Fair Competition Standards', accent);

      // Shield crest emblem
      const cx = w / 2;
      const cy = h * 0.41;
      x.save();
      x.strokeStyle = accent;
      x.lineWidth = 4;
      x.beginPath();
      x.moveTo(cx, cy - 170);
      x.lineTo(cx + 145, cy - 115);
      x.quadraticCurveTo(cx + 140, cy + 75, cx, cy + 175);
      x.quadraticCurveTo(cx - 140, cy + 75, cx - 145, cy - 115);
      x.closePath();
      x.fillStyle = 'rgba(223, 186, 136, 0.08)';
      x.fill();
      x.stroke();

      x.lineWidth = 1.5;
      x.globalAlpha = 0.55;
      x.beginPath();
      x.moveTo(cx, cy - 138);
      x.lineTo(cx + 114, cy - 92);
      x.quadraticCurveTo(cx + 110, cy + 56, cx, cy + 138);
      x.quadraticCurveTo(cx - 110, cy + 56, cx - 114, cy - 92);
      x.closePath();
      x.stroke();

      x.globalAlpha = 0.95;
      x.fillStyle = accent;
      x.textAlign = 'center';
      x.font = '600 32px "JetBrains Mono", monospace';
      x.fillText('100% IP', cx, cy - 6);
      x.fillStyle = '#f5efe5';
      x.font = 'italic 30px Georgia, serif';
      x.fillText('Builder Owned', cx, cy + 38);
      x.restore();

      x.fillStyle = '#f5efe5';
      x.textAlign = 'center';
      x.font = '400 100px Georgia, serif';
      x.fillText('Rules &', w / 2, h * 0.67);
      x.fillStyle = accent;
      x.font = 'italic 96px Georgia, serif';
      x.fillText('Guidelines', w / 2, h * 0.745);

      paintCoverFooter(x, w, h, 'Build Honestly · Document Clearly', '8 Pillars · Git Inspection · Zero Plagiarism', accent);
    },
    back: (x, w, h) =>
      paintBookBack(x, w, h, '#131d17', '#dfba88', 'VOLUME IV', 'Rules & Guidelines', [
        'Open Innovation · Squad Format (1–4 Devs)',
        'Two Mandatory Technical Requirements',
        'Tools & AI Freedom with Honest Ownership',
        'Builders Retain 100% IP Ownership',
      ]),
  },
  {
    id: 'github-submission',
    title: 'GitHub & Submission',
    subtitle: '7-Step Repository Protocol',
    author: 'Repository Integrity',
    year: '7 Steps · Git',
    stars: 5,
    badgeLabel: 'Dedicated Repo',
    desc: 'A transparent submission and evaluation process: create 1 dedicated repo, confirm organiser access before 9 PM, commit initial README first, build 24 hours, update final README, freeze at 10 PM, and enter three-stage review.',
    edge: '#efe5d2',
    backBg: '#161920',
    spineBg: '#1e222b',
    spineInk: '#e0b885',
    spineFont: '700 34px Georgia',
    chapters: [
      '01 · Dedicated GitHub Repo',
      '02 · Organiser Access Verification',
      '03 · Initial README First Commit',
      '04 · 24h Continuous Build Window',
      '05 · Final README Documentation',
      '06 · Final Submission Freeze (10 PM)',
      '07 · Three-Stage Evaluation',
    ],
    front: (x, w, h) => {
      const bg = '#171b24';
      const accent = '#e6c18b';
      paintLuxuryFrame(x, w, h, bg, accent, '#222836');
      paintCoverHeader(x, w, 'VOLUME V', 'Repository Integrity', accent);

      // Git branch & commit graph motif
      const cx = w / 2;
      const topY = h * 0.29;
      const botY = h * 0.52;
      x.save();
      x.strokeStyle = accent;
      x.lineWidth = 4;
      x.globalAlpha = 0.7;
      // Main trunk
      x.beginPath();
      x.moveTo(cx - 75, topY);
      x.lineTo(cx - 75, botY);
      x.stroke();
      // Feature branch curve
      x.beginPath();
      x.moveTo(cx - 75, topY + 60);
      x.bezierCurveTo(cx - 75, topY + 130, cx + 80, topY + 90, cx + 80, topY + 170);
      x.lineTo(cx + 80, botY - 85);
      x.bezierCurveTo(cx + 80, botY - 25, cx - 75, botY - 40, cx - 75, botY - 5);
      x.stroke();

      const nodes: [number, number][] = [
        [cx - 75, topY],
        [cx - 75, topY + 60],
        [cx + 80, topY + 165],
        [cx + 80, topY + 245],
        [cx - 75, botY],
      ];
      nodes.forEach(([nx, ny], idx) => {
        x.globalAlpha = 1;
        x.fillStyle = bg;
        x.beginPath();
        x.arc(nx, ny, 20, 0, Math.PI * 2);
        x.fill();
        x.strokeStyle = accent;
        x.lineWidth = 4;
        x.stroke();
        if (idx === 0 || idx === nodes.length - 1) {
          x.fillStyle = accent;
          x.beginPath();
          x.arc(nx, ny, 8, 0, Math.PI * 2);
          x.fill();
        }
      });

      x.fillStyle = '#f5efe5';
      x.globalAlpha = 0.72;
      x.font = 'italic 30px Georgia, serif';
      x.textAlign = 'center';
      x.fillText('7-Step Submission Protocol', cx, botY + 75);
      x.restore();

      x.fillStyle = '#f5efe5';
      x.textAlign = 'center';
      x.font = '400 96px Georgia, serif';
      x.fillText('GitHub &', w / 2, h * 0.67);
      x.fillStyle = accent;
      x.font = 'italic 94px Georgia, serif';
      x.fillText('Submission', w / 2, h * 0.745);

      paintCoverFooter(x, w, h, 'Dedicated Repo · Organiser Access · Freeze', 'Two Mandatory Requirements · No 3rd-Party Apps', accent);
    },
    back: (x, w, h) =>
      paintBookBack(x, w, h, '#15181f', '#e0b885', 'VOLUME V', 'GitHub & Submission', [
        '01–03 · Dedicated Repo & Initial README',
        '04–05 · 24h Build & Final README Update',
        '06–07 · 10 PM Freeze & Three-Stage Review',
        'Top 25 Live Finals on Google Meet',
      ]),
  },
];
