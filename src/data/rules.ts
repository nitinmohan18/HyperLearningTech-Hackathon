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
    category: "Project Eligibility and Open Innovation",
    summary: "Open innovation model with clear software scope and participant structure.",
    rules: [
      {
        title: "Software & Technology Focus",
        description:
          "Projects must be functional software or technology products capable of being evaluated through a working MVP, inspectable source code, deployment, and live demonstration.",
        tag: "Requirement",
      },
      {
        title: "Open Innovation Format",
        description:
          "Participants may choose their own problem statement, industry domain, and architecture. Organisers will not impose arbitrary theme restrictions unless announced before registration.",
        tag: "Format",
      },
      {
        title: "Participation Structure",
        description:
          "Participation is conducted exclusively in Squad format (1–4 members) at a flat ₹200 fee per entry, whether competing alone or as a team. An individual may belong to only one registered entry, and each entry submits one project.",
        tag: "Eligibility",
      },
      {
        title: "Roster Lock",
        description:
          "Squad rosters and member details are locked at the official competition start (10:00 PM IST on 26 December). Changes after the start require explicit organiser approval with a documented reason.",
        tag: "Lock",
      },
    ],
  },
  {
    id: "ai-libraries",
    category: "AI Tools and Third-Party Libraries",
    summary: "Clear permissions and mandatory disclosures for AI assistants and external libraries.",
    rules: [
      {
        title: "AI Coding Assistants Allowed",
        description:
          "AI tools (such as GitHub Copilot, Cursor, ChatGPT, Claude, etc.) are permitted to assist development. They are a force multiplier, not a replacement for engineering craft.",
        tag: "Permitted",
      },
      {
        title: "Mandatory AI Disclosure",
        description:
          "Participants must transparently disclose any material use of AI in both their project proposal and final submission declaration, detailing which parts of the application were AI-assisted.",
        tag: "Disclosure",
      },
      {
        title: "Third-Party Libraries & Frameworks",
        description:
          "Standard open-source packages, frameworks (e.g. Next.js, FastAPI, Tailwind), and public APIs are welcome. They must be declared and cannot substitute for the core build effort of the event.",
        tag: "Libraries",
      },
    ],
  },
  {
    id: "existing-code",
    category: "Existing Code and Asset Disclosure",
    summary: "Fair distinction between preparation day and competition-window development.",
    rules: [
      {
        title: "Prior Code & Scaffolding Disclosure",
        description:
          "Any pre-existing codebases, starter templates, pre-trained custom models, UI kits, or pre-built datasets must be declared upfront in your proposal and repository README.",
        tag: "Disclosure",
      },
      {
        title: "Preparation Day Boundaries",
        description:
          "Work done on Preparation Day (25 December)—such as environment setup, library installation, and planning—is encouraged, but does not count toward the 24-hour sprint development effort points.",
        tag: "Boundary",
      },
      {
        title: "Core Build Requirement",
        description:
          "The core product logic, primary features, and demonstrable MVP must be engineered between 10:00 PM IST on 26 December and 10:00 PM IST on 27 December 2026.",
        tag: "Build Rule",
      },
    ],
  },
  {
    id: "plagiarism",
    category: "Plagiarism and Misconduct",
    summary: "Zero tolerance for plagiarism, deceptive demos, or dishonest progress reporting.",
    rules: [
      {
        title: "Plagiarism & Impersonation",
        description:
          "Submitting another author's work as your own, cloning uncredited repositories, or impersonating team members will result in immediate disqualification.",
        tag: "Strict",
      },
      {
        title: "Deceptive Demos & Fake Activity",
        description:
          "Simulated mockups presented as working backends, fabricated commit timestamps, empty progress checkpoints, or attempts to manipulate the leaderboard are strictly prohibited.",
        tag: "Strict",
      },
      {
        title: "Fair Response Opportunity",
        description:
          "In the event of suspicious activity or audit questions, organisers will request a short explanation from the team leader, giving builders a reasonable opportunity to respond before any disqualification.",
        tag: "Fairness",
      },
    ],
  },
  {
    id: "ip-ownership",
    category: "Intellectual Property Ownership",
    summary: "100% builder ownership of all code, assets, and inventions.",
    rules: [
      {
        title: "Participants Retain 100% IP Ownership",
        description:
          "You and your squad retain all intellectual property rights, copyright, and patent potential for everything you conceptualise and build during the hackathon.",
        tag: "Full IP Rights",
      },
      {
        title: "Limited Organiser Showcase License",
        description:
          "HyperLearningTech receives only a limited, non-exclusive permission to display your project name, screenshots, public demo excerpts, and links for event reporting and community showcases.",
        tag: "Showcase Only",
      },
    ],
  },
  {
    id: "repo-requirements",
    category: "Repository Requirements",
    summary: "Mandatory private GitHub setup, inspection collaborator, and public reveal workflow.",
    rules: [
      {
        title: "Single Private GitHub Repository",
        description:
          "The team leader must create exactly one private GitHub repository for the project before the organiser verification deadline.",
        tag: "Mandatory",
      },
      {
        title: "Official Inspection Collaborator",
        description:
          "You must invite the official HyperLearningTech inspection GitHub account (announced before registration closes) as a collaborator. Access must be verified and accepted before kickoff.",
        tag: "Inspection",
      },
      {
        title: "Pending Invitations Are Insufficient",
        description:
          "Do not assume organisers can inspect a repository while the invitation is still pending. Access must be verified before 9:00 PM IST on 26 December.",
        tag: "Critical",
      },
      {
        title: "Public Reveal Protocol",
        description:
          "At 8:00 PM IST on 27 December, team leaders will be instructed to toggle repository visibility to public for transparent peer and judge inspection.",
        tag: "Reveal",
      },
    ],
  },
  {
    id: "security-privacy",
    category: "Security and Privacy",
    summary: "Protecting sensitive keys, credentials, and participant data.",
    rules: [
      {
        title: "Never Expose Secrets in Repositories",
        description:
          "Do not commit API keys, database credentials, server private keys, access tokens, or personal confidential data to your repository. Use .env.example files with mock placeholders.",
        tag: "Security",
      },
      {
        title: "No Account Sharing",
        description:
          "Organisers will never ask for your GitHub password, personal access token, or 2FA codes. All inspection occurs strictly through standard GitHub collaborator permissions.",
        tag: "Safety",
      },
    ],
  },
  {
    id: "submission-demo",
    category: "Submission and Demonstration",
    summary: "Checklist for the 10:00 PM deadline, live deployments, and optional video demo.",
    rules: [
      {
        title: "Submission Freeze at 10:00 PM IST",
        description:
          "The submission window and GitHub snapshot freeze strictly at 10:00 PM IST on 27 December 2026. No post-deadline commits or form edits will be evaluated as competition work.",
        tag: "Deadline",
      },
      {
        title: "Required Submission Artifacts",
        description:
          "Entries must submit: Project title, problem statement, solution overview, feature list, live deployment URL, public repository URL, setup instructions, squad contribution breakdown, and AI/asset declarations.",
        tag: "Checklist",
      },
      {
        title: "Presentation Video Is Optional",
        description:
          "A 3–5 minute presentation video (e.g. unlisted YouTube or Google Drive link) is recommended but purely optional. Live deployments and inspectable code are evaluated on merit so video editing skills do not become a barrier.",
        tag: "Optional",
      },
    ],
  },
];
