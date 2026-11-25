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
  { place: "2nd", amount: "₹3,499", rawAmount: 3499, label: "Overall Runner-Up" },
  { place: "3rd", amount: "₹2,199", rawAmount: 2199, label: "Second Runner-Up" },
  { place: "4th", amount: "₹1,199", rawAmount: 1199, label: "Fourth Place" },
  { place: "5th", amount: "₹599", rawAmount: 599, label: "Fifth Place" },
];

export const specialPrizes: SpecialCategory[] = [
  {
    category: "Best UI/UX",
    trackLabel: "Design Excellence",
    description: "Recognising an exceptionally clear, intuitive and accessible user experience, supported by thoughtful interface design and usability.",
    prizeAmount: "₹499",
    rawAmount: 499,
    total: "₹499",
  },
  {
    category: "Best Innovation & Uniqueness",
    trackLabel: "Deep-Tech & Creativity",
    description: "Recognising an original idea, distinctive approach and creative technical execution that sets the project apart.",
    prizeAmount: "₹499",
    rawAmount: 499,
    total: "₹499",
  },
  {
    category: "Best Social Impact & Practical Utility",
    trackLabel: "Real-World Utility",
    description: "Recognising a practical solution that addresses a meaningful real-world problem and demonstrates clear potential for positive impact.",
    prizeAmount: "₹499",
    rawAmount: 499,
    total: "₹499",
  },
];

export const prizePoolMeta = {
  totalCash: "₹14,992",
  maxPlannedBudget: "₹15,000",
  positions: "8 Cash Award Positions",
  overallTotal: "₹13,495",
  specialTotal: "₹1,497",
  policyNote:
    "Each project can receive only one cash award. If an Overall Top 5 project also qualifies for a special category award, the special award passes to the next eligible project outside the Overall Top 5.",
  hiddenSurprisesNote:
    "Additional surprise rewards may conditionally be offered if the event achieves more than 75% ROI. These rewards are not guaranteed. Do not assign any invented cash amount to surprise rewards.",
  certificatesNote:
    "Every eligible participant receives a verified individual participation certificate. Top 25 projects receive official ranking certificates, issued individually to all squad members.",
};
