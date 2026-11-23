export interface ScheduleMilestone {
  date: string;
  time: string;
  phase: "Preparation" | "Sprint" | "Reveal" | "Deadline" | "Judging" | "Results";
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
      "All solo and squad registrations close. Squad rosters and leader details are permanently locked for the competition.",
    statusBadge: "Pre-Event",
  },
  {
    date: "25 Dec 2026",
    time: "Throughout Day",
    phase: "Preparation",
    title: "Preparation Day: Setup & Planning",
    description:
      "Install dependencies, configure local environments, create private Git repos, and plan architecture. Note: Preparation-day work does not earn 24-hour competition effort points.",
    statusBadge: "Setup Only",
  },
  {
    date: "26 Dec 2026",
    time: "Before 9:00 PM IST",
    phase: "Preparation",
    title: "Collaborator Access & Repo Verification",
    description:
      "Organisers verify all registered entries, squad rosters, private repository access, and ensure the official inspection account invitation is accepted.",
    statusBadge: "Verification",
  },
  {
    date: "26 Dec 2026",
    time: "9:30 PM IST",
    phase: "Preparation",
    title: "Official Final Briefing",
    description:
      "Live briefing on rules, checkpoint submission format, judging rubric, repository inspection procedures, and support communication channels.",
    statusBadge: "Briefing",
  },
  {
    date: "26 Dec 2026",
    time: "10:00 PM IST",
    phase: "Sprint",
    title: "Competition Begins · Initial Repo Snapshot",
    description:
      "The official 24-hour continuous build challenge begins! The organiser records the initial repository baseline. No pre-kickoff code earns sprint effort points.",
    isSprint: true,
    statusBadge: "Sprint Kickoff",
  },
  {
    date: "26–27 Dec 2026",
    time: "10:00 PM to 10:00 PM IST",
    phase: "Sprint",
    title: "24-Hour Active Development & Hourly Checkpoints",
    description:
      "Continuous build window. Participants commit regularly and log hourly checkpoint updates (completed work, next milestone, blockers, screenshots) to build verifiable effort.",
    isSprint: true,
    statusBadge: "24h Window",
  },
  {
    date: "27 Dec 2026",
    time: "8:00 PM IST",
    phase: "Reveal",
    title: "Planned Public Repository Reveal",
    description:
      "Team leaders switch repository visibility from private to public as instructed by organisers for transparent peer and judge inspection before the final sprint hours.",
    isSprint: true,
    statusBadge: "Public Reveal",
  },
  {
    date: "27 Dec 2026",
    time: "10:00 PM IST",
    phase: "Deadline",
    title: "Competition Ends · Final Submission Freeze",
    description:
      "All development freezes. Organiser records final repository snapshot. Final project details, deployment URL, README, and declarations must be submitted.",
    statusBadge: "Hard Freeze",
  },
  {
    date: "27 Dec 2026",
    time: "10:00 PM – 11:00 PM IST",
    phase: "Judging",
    title: "Judging, Code Review & Verification",
    description:
      "Judges test live deployments, inspect repo diffs and commit histories, evaluate documentation, check AI/asset disclosures, and lock final 100-point scores.",
    statusBadge: "Evaluation",
  },
  {
    date: "27 Dec 2026",
    time: "11:00 PM IST",
    phase: "Results",
    title: "Official Results Announcement",
    description:
      "Final standings revealed on the official leaderboard and event channels: Overall Top 5, Category Winners, Top 25 Ranked, and Hidden Surprise Recognitions.",
    statusBadge: "Ceremony",
  },
  {
    date: "27 Dec 2026",
    time: "By 11:05 PM IST",
    phase: "Results",
    title: "Target Direct Prize Distribution",
    description:
      "Organisers initiate immediate electronic prize transfers to verified solo winners and squad team leaders (subject to payment-system availability).",
    statusBadge: "Disbursement",
  },
];
