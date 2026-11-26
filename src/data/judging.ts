export interface JudgingCriterion {
  id: string;
  name: string;
  points: number;
  evaluates: string;
  details: string[];
  subBreakdown?: { item: string; points: number; note: string }[];
}

export const judgingCriteria: JudgingCriterion[] = [
  {
    id: "mvp",
    name: "Working MVP & Functionality",
    points: 25,
    evaluates: "Core features work; user journey is coherent; project solves the stated problem effectively.",
    details: [
      "The core user journey is operational from start to finish without breaking errors.",
      "The product effectively demonstrates real utility and solves the declared problem statement.",
      "Primary features can be actively interacted with and verified by the judging panel.",
    ],
  },
  {
    id: "effort",
    name: "Verified Development Effort",
    points: 25,
    evaluates: "Meaningful hourly progress, code changes, milestones, and consistency during the 24-hour window.",
    details: [
      "Substantive progress updates with evidence rather than empty or button-click check-ins.",
      "Relevant git commits, code diffs, tests, and branch/PR activity during the 24-hour period.",
      "Progress against stated MVP milestones and steady execution throughout the event.",
    ],
    subBreakdown: [
      { item: "Meaningful Hourly Checkpoints", points: 12, note: "Substantive updates with evidence/screenshots; consistency matters" },
      { item: "Meaningful GitHub Activity", points: 6, note: "Relevant code changes, reviews, tests, docs, and git diffs" },
      { item: "Milestone Completion", points: 4, note: "Progress achieved against declared MVP milestones" },
      { item: "Progress Consistency", points: 3, note: "Steady, verifiable engineering work across the 24 hours" },
    ],
  },
  {
    id: "tech",
    name: "Technical Implementation",
    points: 15,
    evaluates: "Architecture, code quality, appropriate technology choices, reliability, and system integration.",
    details: [
      "Clean, maintainable architecture and appropriate tech stack selection for the problem domain.",
      "Proper state management, error handling, modularity, and API/service integration.",
      "Robustness against invalid inputs and sensible engineering trade-offs made under time constraints.",
    ],
  },
  {
    id: "contribution",
    name: "Individual / Team Contribution",
    points: 15,
    evaluates: "Evidence of each participant's contribution and fair distribution of work across squad members.",
    details: [
      "For multi-member squads: verifiable division of responsibilities and balanced code/asset contributions from each member.",
      "For 1-member squad entries: full evaluation of individual ownership and engineering scope without team-size penalties.",
      "Transparent disclosure of who built which component in the final contribution statement.",
    ],
  },
  {
    id: "deployment",
    name: "Live Deployment",
    points: 10,
    evaluates: "Accessible deployment, live stability, and judges' ability to test the product in production.",
    details: [
      "Publicly accessible web or cloud link provided before the 10:00 PM deadline.",
      "Stable runtime performance without crashes during evaluation.",
      "Functional interactive demo environment with sample data if user authentication is required.",
    ],
  },
  {
    id: "docs",
    name: "Documentation",
    points: 5,
    evaluates: "Comprehensive README, clear setup instructions, architecture overview, and usage guidance.",
    details: [
      "README & Project Overview (1 pt): Clear pitch and description of the solution.",
      "Setup & Installation Steps (1 pt): Step-by-step local execution commands.",
      "Architecture & Flow Notes (1 pt): Diagram or explanation of data flow and components.",
      "API & Database Schema (1 pt): Documentation of endpoints, models, or state schema.",
      "Usage Guidance & Screenshots (1 pt): Visual walkthrough of core features.",
    ],
  },
  {
    id: "demo",
    name: "Final Demonstration",
    points: 5,
    evaluates: "Problem/solution clarity, working demonstration, technical explanation, and communication.",
    details: [
      "Problem & Solution articulation (1 pt): Concise explanation of value proposition.",
      "Working live demo (2 pts): Smooth walkthrough of working product capabilities.",
      "Technical explanation (1 pt): Clear explanation of how the system was built and works.",
      "Communication (1 pt): Well-structured, transparent presentation. Note: Video is optional; a live demo link or equivalent evidence is evaluated equally.",
    ],
  },
];
