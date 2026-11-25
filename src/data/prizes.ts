export interface PrizeItem {
  place: string;
  amount: string;
  rawAmount: number;
  label?: string;
}

export interface SpecialCategory {
  category: string;
  trackLabel: string;
  description: string;
  prizeAmount: string;
  rawAmount: number;
  total: string;
}

export const overallPrizes: PrizeItem[] = [
  { place: "1st", amount: "₹5,999", rawAmount: 5999, label: "Overall Champion" },
  { place: "2nd", amount: "₹3,499", rawAmount: 3499, label: "Runner Up" },
  { place: "3rd", amount: "₹2,499", rawAmount: 2499, label: "2nd Runner Up" },
  { place: "4th", amount: "₹999", rawAmount: 999, label: "4th Place Finalist" },
  { place: "5th", amount: "₹499", rawAmount: 499, label: "5th Place Finalist" },
];

export const specialPrizes: SpecialCategory[] = [
  {
    category: "Best UI/UX",
    trackLabel: "Design Excellence",
    description: "Awarded to the project demonstrating outstanding visual aesthetics, intuitive ergonomics, fluid animations, and responsive mobile polish.",
    prizeAmount: "₹499",
    rawAmount: 499,
    total: "₹499",
  },
  {
    category: "Best Innovation & Uniqueness",
    trackLabel: "Deep-Tech & Creativity",
    description: "Awarded to the most original engineering solution featuring novel architecture, breakthrough technical execution, and inventive problem-solving.",
    prizeAmount: "₹499",
    rawAmount: 499,
    total: "₹499",
  },
  {
    category: "Best Social Impact & Practical Utility",
    trackLabel: "Real-World Utility",
    description: "Awarded to the solution addressing critical community needs with immediately usable, scalable, and high-impact practical execution.",
    prizeAmount: "₹499",
    rawAmount: 499,
    total: "₹499",
  },
];

export const prizePoolMeta = {
  totalCash: "₹14,992",
  positions: "8 Cash Award Positions",
  overallTotal: "₹13,495",
  specialTotal: "₹1,497",
  policyNote:
    "Each project can receive only one cash award. If an Overall Top 5 project also qualifies for a special category award, the special award passes to the next eligible project outside the Overall Top 5.",
  hiddenSurprisesNote:
    "A small number of additional surprise recognitions may be given to promising projects outside cash awards (e.g. mentorship, learning perks, certificates). These are not implied cash prizes.",
  certificatesNote:
    "Every eligible participant receives a verified individual participation certificate. Top 25 projects receive official ranking certificates, issued individually to all squad members.",
};
