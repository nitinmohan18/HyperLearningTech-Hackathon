export interface RuleAccordionItem {
  id: string;
  category: string;
  summary: string;
  rules: {
    title: string;
    description: string;
    tag?: string;
  }[];
}

export const rulesData: RuleAccordionItem[] = [
  {
    id: "eligibility",
    category: "Project Eligibility & Open Innovation",
    summary: "Unrestricted open innovation model with clear software scope and unified squad format.",
    rules: [
      {
        title: "Open Innovation Model",
        description:
          "Participants may identify any meaningful problem and engineer a technological solution using their preferred tools, programming languages, and technology stacks without predefined statement restrictions.",
        tag: "Theme",
      },
      {
        title: "Accepted Project Formats",
        description:
          "Accepted formats include websites, web applications, mobile applications, AI agents, APIs, browser extensions, games, data tools, software applications, IoT systems, and hardware prototypes.",
        tag: "Scope",
      },
      {
        title: "Unified Squad Participation Structure",
        description:
          "Participation operates in a unified Squad format (1–4 members) at a flat ₹200 fee per entry, whether competing alone or as a collaborative team. An individual may belong to only one registered entry, and each entry submits one project.",
        tag: "Format",
      },
      {
        title: "Roster Lock & Start Boundary",
        description:
          "Squad rosters and member details are locked at the official competition start (10:00 PM IST on 26 December). Project-specific implementation must take place during the official 24-hour competition window.",
        tag: "Schedule",
      },
    ],
  },
  {
    id: "mandatory-requirements",
    category: "Mandatory Technical Requirements (Only Two)",
    summary: "The hackathon enforces ONLY TWO mandatory technical requirements for all participants.",
    rules: [
      {
        title: "Requirement 01: GitHub Repository & Organiser Access",
        description:
          "Every team must create a dedicated GitHub repository (public or private). The team leader must manage repository access and ensure the official HyperLearningTech GitHub account has verified collaborator access for evaluation and originality verification until the process concludes. Participants retain complete project ownership.",
        tag: "Mandatory",
      },
      {
        title: "Requirement 02: Documentation-First Development",
        description:
          "The first meaningful project commit must contain initial README documentation before project-specific application development begins (explaining title, team details, problem statement, target users, proposed solution, planned features, and intended tech stack).",
        tag: "Mandatory",
      },
      {
        title: "Final Submission README Update",
        description:
          "Teams must update their README before the final deadline to explain implemented functionality, setup and running instructions, external resources, significant reused or AI-assisted components, and known limitations. The README is directly utilized during evaluation.",
        tag: "Mandatory",
      },
    ],
  },
  {
    id: "recommended-practices",
    category: "Recommended Engineering Practices (NOT Mandatory)",
    summary: "Encouraged professional standards that serve as quality evidence, not disqualification triggers.",
    rules: [
      {
        title: "Encouraged Development Practices",
        description:
          "Regular Git commits, feature branches, pull requests, branch protection, code reviews, descriptive commit messages, automated tests, CI/CD, modular code, and architecture diagrams are recommended professional practices.",
        tag: "Recommended",
      },
      {
        title: "No Automatic Penalties for Optional Practices",
        description:
          "Not following a recommended engineering practice does NOT automatically cause disqualification or a fixed scoring penalty. Judges evaluate demonstrated quality through any suitable evidence provided.",
        tag: "Policy",
      },
      {
        title: "Live Deployment & Demonstration Alternatives",
        description:
          "Live cloud deployment is strongly encouraged. However, runnable local applications, recorded demonstration videos, interactive prototypes, and equivalent evaluation methods are fully acceptable alternatives.",
        tag: "Flexibility",
      },
    ],
  },
  {
    id: "ai-tools",
    category: "Tools, AI & Internet Resources",
    summary: "Full freedom to use modern tools, AI assistants, and open-source libraries with honest ownership.",
    rules: [
      {
        title: "Free & Premium Tools Permitted",
        description:
          "Participants are free to use any legally accessible development tools, platforms, AI coding assistants (Copilot, Cursor, ChatGPT, Claude), AI agents, cloud services, and starter templates across both free and premium tiers.",
        tag: "Permitted",
      },
      {
        title: "Zero AI Penalty & Project Responsibility",
        description:
          "The competition does not penalise participants for using AI. However, participants must understand and take responsibility for their submitted work and clearly distinguish significant external or AI-assisted contributions in their README.",
        tag: "Transparency",
      },
      {
        title: "Learning-Oriented Technology Selection",
        description:
          "There are no restrictions on programming languages, frameworks, or AI providers. The objective is to encourage learning, experimentation, and genuine productivity.",
        tag: "Freedom",
      },
    ],
  },
  {
    id: "originality",
    category: "Originality & Fair Competition",
    summary: "An encouraging, learning-first philosophy prioritizing genuine effort and understanding.",
    rules: [
      {
        title: "Build with Purpose & Integrity",
        description:
          "You are encouraged to use the best tools available to you. The objective is not to restrict how you build, but to ensure that what you submit represents genuine learning, creativity, and original effort during the hackathon.",
        tag: "Philosophy",
      },
      {
        title: "Pre-Event Planning vs. Sprint Implementation",
        description:
          "Research, brainstorming, conceptual planning, and general environment setup are welcomed before the event on 25 December. However, project-specific implementation must take place during the official 24-hour window.",
        tag: "Boundary",
      },
      {
        title: "Prohibited Submissions",
        description:
          "Submitting an already-built application as original hackathon work, copy-pasting complete existing repositories, or reusing previously completed academic projects is prohibited. An honest prototype with original work is more valuable than pre-built complexity.",
        tag: "Fairness",
      },
    ],
  },
  {
    id: "code-of-conduct",
    category: "Code of Conduct & Misconduct Review",
    summary: "A safe, respectful, and transparent environment with fair, evidence-based review processes.",
    rules: [
      {
        title: "Universal Code of Conduct",
        description:
          "All participants, organisers, judges, mentors, and volunteers must maintain professional, respectful, and inclusive communication. Harassment, discrimination, sabotage, and impersonation are strictly prohibited.",
        tag: "Conduct",
      },
      {
        title: "Fair Misconduct Review Process",
        description:
          "Suspected violations are reviewed fairly and confidentially. Participants receive a reasonable opportunity to clarify suspected competition misconduct before any disciplinary decision.",
        tag: "Due Process",
      },
      {
        title: "Automated Flags Are Not Conclusive",
        description:
          "Automated AI detection, unusual commit patterns, or code similarity alone are not treated as conclusive evidence of cheating. Judgments are based on holistic evidence, understanding, and human review.",
        tag: "Fair Review",
      },
    ],
  },
  {
    id: "ip-ownership",
    category: "Intellectual Property & Privacy",
    summary: "100% builder ownership of code, assets, and inventions with strict secrets protection.",
    rules: [
      {
        title: "Participants Retain 100% IP Ownership",
        description:
          "Participation does not transfer intellectual property or source code ownership to HyperLearningTech. Builders retain complete ownership, copyright, and commercial rights to their creations.",
        tag: "Full IP Rights",
      },
      {
        title: "Confidentiality & Showcase Permission",
        description:
          "Private repositories and confidential project information will never be publicly distributed without participant permission. Organiser access is strictly for competition administration, evaluation, and originality verification.",
        tag: "Privacy",
      },
      {
        title: "Secrets & Credentials Protection",
        description:
          "Participants must never commit private API keys, database credentials, server certificates, or sensitive secrets into repositories. Organisers will never request passwords or 2FA codes.",
        tag: "Security",
      },
    ],
  },
  {
    id: "submission-evaluation",
    category: "Submission & Three-Stage Evaluation",
    summary: "Clear submission checklist, three-stage evaluation, and live Google Meet final round.",
    rules: [
      {
        title: "Minimum Submission Requirements",
        description:
          "Submissions require: registered team identity, project title, selected theme/track, GitHub repository URL with verified organiser access, and an updated final README. Live URLs, demo videos, and presentations are recommended supporting evidence.",
        tag: "Submission",
      },
      {
        title: "Stage 1 & Stage 2: Verification and Shortlisting",
        description:
          "Organisers first verify compliance with registration, repo access, README, and deadlines. Eligible projects are evaluated against the 100-point rubric, and the top 25 eligible teams advance to the live final round.",
        tag: "Evaluation",
      },
      {
        title: "Stage 3: Top 25 Live Final Round",
        description:
          "Shortlisted teams present live via Google Meet in a 5–7 minute session per team (explaining problem, demonstrating solution, detailing implementation, and answering jury questions), scored afresh using the official 100-point rubric.",
        tag: "Live Final",
      },
    ],
  },
];
