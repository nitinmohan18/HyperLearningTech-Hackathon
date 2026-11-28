export interface ScheduleMilestone {
  date: string;
  time: string;
  phase: "Preparation" | "Sprint" | "Journey" | "Deadline" | "Judging" | "Results";
  title: string;
  description: string;
  isSprint?: boolean;
  statusBadge?: string;
}

export const scheduleMilestones: ScheduleMilestone[] = [
  {
    date: "25 Dec 2026",
    time: "Published Closing Time (TBA)",
    phase: "Preparation",
    title: "Registration Closes & Roster Locked",
    description:
      "All squad registrations close. Squad rosters and leader details are locked for the competition.",
    statusBadge: "Pre-Event",
  },
  {
    date: "25 Dec 2026",
    time: "Throughout Day",
    phase: "Preparation",
    title: "Preparation Day: Setup & Architecture Planning",
    description:
      "Install dependencies, configure local environments, create dedicated Git repository, invite organiser access, and conduct conceptual planning.",
    statusBadge: "Setup Only",
  },
  {
    date: "26 Dec 2026",
    time: "Before 9:00 PM IST",
    phase: "Preparation",
    title: "Repository Access & Organiser Verification",
    description:
      "Organisers verify registered entries and ensure the official HyperLearningTech GitHub inspection account has verified access.",
    statusBadge: "Verification",
  },
  {
    date: "26 Dec 2026",
    time: "9:30 PM IST",
    phase: "Preparation",
    title: "Official Final Briefing",
    description:
      "Live briefing on rules, documentation requirements, 100-point judging rubric, repository inspection procedures, and support communication channels.",
    statusBadge: "Briefing",
  },
  {
    date: "26 Dec 2026",
    time: "10:00 PM IST",
    phase: "Sprint",
    title: "24-Hour Competition Kickoff",
    description:
      "The official 24-hour build window begins! First commit must contain initial README documentation before project implementation starts.",
    isSprint: true,
    statusBadge: "Kickoff",
  },
  {
    date: "26–27 Dec 2026",
    time: "10:00 PM to 10:00 PM IST",
    phase: "Sprint",
    title: "Recommended 24-Hour Development Journey",
    description:
      "Hour 0–2: Kickoff & initial README • Hour 2–8: Core solution • Hour 8–16: Feature integration • Hour 16–20: Testing & debugging • Hour 20–23: Docs & demo prep • Hour 23–24: Final submission.",
    isSprint: true,
    statusBadge: "24h Window",
  },
  {
    date: "27 Dec 2026",
    time: "10:00 PM IST",
    phase: "Deadline",
    title: "Competition Ends · Final Submission Freeze",
    description:
      "The 24-hour development window closes. Final repository commit and updated README are frozen for evaluation. No new evaluated functionality may be added.",
    statusBadge: "Hard Freeze",
  },
  {
    date: "27 Dec 2026",
    time: "Post-Freeze",
    phase: "Judging",
    title: "Stage 1: Compliance Verification",
    description:
      "Organisers review registration compliance, GitHub repository accessibility, initial and final README documentation, deadline compliance, and Code of Conduct compliance.",
    statusBadge: "Compliance",
  },
  {
    date: "27 Dec 2026",
    time: "Post-Freeze",
    phase: "Judging",
    title: "Stage 2: Project Evaluation & Shortlisting",
    description:
      "Judges evaluate eligible submissions according to the official 100-point rubric. Top 25 eligible teams are shortlisted for the live final round.",
    statusBadge: "Evaluation",
  },
  {
    date: "Post-Evaluation",
    time: "Live Session",
    phase: "Judging",
    title: "Stage 3: Top 25 Live Final Round",
    description:
      "Shortlisted teams present live via Google Meet (5–7 minutes per team) explaining problem, solution, architecture, working demo, and answering jury questions.",
    statusBadge: "Live Final",
  },
  {
    date: "Post-Judging",
    time: "Following Final Judging",
    phase: "Results",
    title: "Official Results Announcement",
    description:
      "Official results announced following completion of the live final judging process, celebrating Champions, Category Pioneers, and Top 25 certified projects.",
    statusBadge: "Ceremony",
  },
  {
    date: "Post-Announcement",
    time: "Within 2–4 Hours",
    phase: "Results",
    title: "Direct UPI Prize Distribution",
    description:
      "Prize money transferred through UPI within 2–4 hours after official result announcement, subject to winner verification and successful payment processing.",
    statusBadge: "Disbursement",
  },
];
