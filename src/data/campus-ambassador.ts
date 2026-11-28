export interface AmbassadorFaq {
  question: string;
  answer: string;
}

export interface AmbassadorTermSection {
  id: string;
  title: string;
  points: string[];
}

export const campusAmbassadorData = {
  eyebrow: "Ambassador Program",
  title: "Bring Winter Hackathon ’26",
  titleAccent: "to your network.",
  heroCopy:
    "Share Winter Hackathon ’26, refer teams on Unstop, and earn cash prizes. Free to join and open to everyone.",
  highlights: [
    { label: "Hackathon", value: "26–27 Dec 2026" },
    { label: "Closes", value: "25 Dec 2026" },
    { label: "Entry", value: "Free" },
    { label: "Who Can Join", value: "Anyone" },
  ],
  eligibility: [
    "Anyone—students, professionals, or creators (18+ preferred).",
    "Active in college, tech, or online groups.",
    "Honest and clear communication.",
  ],
  responsibilities: [
    {
      title: "Share the Link",
      description: "Post the official link and posters in your groups.",
    },
    {
      title: "Send to Unstop",
      description: "Teams register and pay on Unstop only. Never collect money.",
    },
    {
      title: "Log Referrals",
      description: "Submit your referred teams using your private link.",
    },
    {
      title: "Share Real Info",
      description: "Use only official posters and details. No spam.",
    },
  ],
  benefits: [
    {
      title: "Cash Prizes",
      description: "Earn cash for every verified paid team.",
    },
    {
      title: "ID & Promo Kit",
      description: "Get an official ID, posters, and referral link.",
    },
    {
      title: "Certificate",
      description: "Get a verified Ambassador certificate after the event.",
    },
    {
      title: "No Target",
      description: "No minimum limit—every paid team counts.",
    },
  ],
  workflowSteps: [
    { step: "01", title: "Apply", detail: "Fill the short form to apply." },
    { step: "02", title: "Get Approved", detail: "We email your ID and private link." },
    { step: "03", title: "Teams Join", detail: "Teams register and pay on Unstop." },
    { step: "04", title: "Earn Rewards", detail: "Log teams. We verify and pay out." },
  ],
  faqs: [
    {
      question: "Who can apply?",
      answer: "Anyone—students, working professionals, or creators (18+ preferred).",
    },
    {
      question: "Is it free to apply?",
      answer: "Yes, it is 100% free.",
    },
    {
      question: "How do teams register?",
      answer: "Teams register and pay directly on Unstop. Never collect fees yourself.",
    },
    {
      question: "What counts as a valid referral?",
      answer: "One paid, non-refunded team registration verified on Unstop.",
    },
    {
      question: "Is there a minimum target?",
      answer: "No. Every verified paid team counts.",
    },
    {
      question: "How do I submit referrals?",
      answer: "Use the private link we email you after approval—no login needed.",
    },
  ] satisfies AmbassadorFaq[],
  termsSections: [
    {
      id: "eligibility",
      title: "1. Eligibility",
      points: [
        "Open to anyone (18+ preferred).",
        "We review applications manually and email approved ambassadors their ID and referral link.",
      ],
    },
    {
      id: "conduct",
      title: "2. Rules",
      points: [
        "Never collect fees from participants. All payments happen on Unstop.",
        "Use only official posters and links. No spam or false promises.",
        "Breaking these rules leads to removal from the program.",
      ],
    },
    {
      id: "attribution",
      title: "3. Referral Checks",
      points: [
        "One paid, non-refunded Unstop team equals one valid referral.",
        "Claims are checked against official Unstop records.",
        "Duplicate, unpaid, or refunded teams are not counted.",
      ],
    },
    {
      id: "privacy",
      title: "4. Privacy",
      points: [
        "We only collect details needed to review applications and verify referrals.",
        "Keep your private referral link to yourself.",
        "Extra referral data is deleted 90 days after the program ends.",
        "Need data changes or deletion? Email admin@hyperlearningtech.in.",
      ],
    },
  ] satisfies AmbassadorTermSection[],
};
