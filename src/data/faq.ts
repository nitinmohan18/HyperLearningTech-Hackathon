export interface FAQItem {
  question: string;
  answer: string;
  category?: "Participation" | "Development" | "GitHub" | "Evaluation" | "Prizes";
}

export const faqs: FAQItem[] = [
  {
    category: "Participation",
    question: "Is the hackathon completely online?",
    answer:
      "Yes, HyperLearningTech – Winter Hackathon '26 is 100% online. All briefings, checkpoint submissions, repository inspections, live leaderboard updates, and prize disbursements take place remotely via the official platform.",
  },
  {
    category: "Participation",
    question: "Can I participate alone, or is a team required?",
    answer:
      "There is only one unified Squad format (1 to 4 members). Whether you participate alone (1 member) or as a team of 2–4 members, the flat entry fee is ₹200 per entry. All entries are evaluated on the same normalised 100-point rubric.",
  },
  {
    category: "Participation",
    question: "What is the squad size limit and how is the fee charged?",
    answer:
      "The squad size is 1 to 4 members. The registration fee is a flat ₹200 per entry—NOT per person—regardless of whether you compete alone or with up to 4 collaborators. Each entry nominates one team leader.",
  },
  {
    category: "Participation",
    question: "Can squad membership be changed after registration?",
    answer:
      "Squad membership is officially locked at kickoff (10:00 PM IST on 26 December). Any emergency changes after kickoff require explicit organiser approval and a documented reason.",
  },
  {
    category: "Development",
    question: "Does preparation day count towards the 24 hours?",
    answer:
      "No. Preparation Day (25 December 2026) is dedicated to environment setup, reading documentation, dependency installation, and architecture planning. Work done on preparation day does not earn 24-hour competition effort points. The 24-hour sprint begins at 10:00 PM IST on 26 December.",
  },
  {
    category: "Development",
    question: "Can I use AI coding assistants like Copilot, Cursor, or ChatGPT?",
    answer:
      "Yes, AI tools are permitted as engineering assistants. However, you must transparently disclose material AI usage in both your project proposal and final submission declaration, explaining which components were AI-assisted.",
  },
  {
    category: "Development",
    question: "Can I use third-party libraries, UI frameworks, or APIs?",
    answer:
      "Yes! You are encouraged to leverage modern frameworks, open-source packages, and third-party APIs (e.g. Next.js, Tailwind, Supabase, OpenAI APIs). All pre-existing assets or boilerplate templates must be declared upfront and cannot substitute for the core 24-hour build.",
  },
  {
    category: "GitHub",
    question: "Is a private GitHub repository mandatory?",
    answer:
      "Yes, absolutely. Every entry must maintain a private GitHub repository owned by the team leader and invite the official HyperLearningTech inspection account as a collaborator before 9:00 PM IST on 26 December. Pending invitations are insufficient—access must be verified before the 10:00 PM kickoff.",
  },
  {
    category: "GitHub",
    question: "Why does HyperLearningTech inspect private repositories?",
    answer:
      "To ensure fairness and verify authentic engineering effort. We record an initial baseline snapshot at kickoff (10:00 PM on 26 Dec) and monitor regular commit history throughout the 24 hours. At 8:00 PM IST on 27 Dec, repositories will be switched to public for open community and judge inspection.",
  },
  {
    category: "Development",
    question: "What happens during hourly checkpoints?",
    answer:
      "Participants submit concise progress updates through the dashboard: completed work, current status, next milestone, blockers, and git diff/screenshot evidence. Checkpoints reflect real engineering progress, not a meaningless button-click. Empty or repetitive check-ins do not earn points.",
  },
  {
    category: "Evaluation",
    question: "Is the 3–5 minute presentation video compulsory?",
    answer:
      "No, the presentation video is recommended but optional. Judges review working functionality, live deployments, code quality, and git commit history directly so that video editing skills do not become a hidden barrier to winning.",
  },
  {
    category: "Prizes",
    question: "Can a project win both an Overall Top 5 prize and a Special Category award?",
    answer:
      "Each project can receive only one cash award. If an Overall Top 5 project also ranks highest in a special category (such as Best UI/UX or Best Innovation), the special category cash award passes to the next eligible project outside the Overall Top 5.",
  },
  {
    category: "Prizes",
    question: "When will results be announced and prizes distributed?",
    answer:
      "Official results will be announced at 11:00 PM IST on 27 December 2026. Organisers target immediate digital prize distribution by 11:05 PM IST to verified squad team leaders and winning entry leads (who distribute to their members).",
  },
  {
    category: "Prizes",
    question: "Will participants receive certificates?",
    answer:
      "Yes! Every eligible participant who completes event requirements receives an individual verifiable participation certificate. The Top 25 projects receive official ranking certificates, issued individually to all squad members.",
  },
  {
    category: "Prizes",
    question: "What are the Hidden Surprises?",
    answer:
      "Additional surprise rewards may conditionally be offered if the event achieves more than 75% ROI. These rewards are not guaranteed (e.g. mentorship sessions, learning perks, certificates, or community recognitions). Do not assign any invented cash amount to surprise rewards.",
  },
];
