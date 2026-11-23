export interface PrizeItem {
  place: string;
  amount: string;
  rawAmount: number;
  label?: string;
}

export interface SpecialCategory {
  category: string;
  description: string;
  prizes: {
    place: string;
    amount: string;
    rawAmount: number;
  }[];
  total: string;
}

export const overallPrizes: PrizeItem[] = [
  { place: "1st", amount: "₹2,999", rawAmount: 2999, label: "Overall Champion" },
  { place: "2nd", amount: "₹1,999", rawAmount: 1999, label: "Runner Up" },
  { place: "3rd", amount: "₹999", rawAmount: 999, label: "2nd Runner Up" },
  { place: "4th", amount: "₹499", rawAmount: 499, label: "4th Place Finalist" },
  { place: "5th", amount: "₹299", rawAmount: 299, label: "5th Place Finalist" },
];

export const specialPrizes: SpecialCategory[] = [
  {
    category: "Best UI/UX",
    description: "Awarded for exceptional design coherence, user journey, and intuitive frontend craft.",
    prizes: [
      { place: "1st", amount: "₹499", rawAmount: 499 },
      { place: "2nd", amount: "₹299", rawAmount: 299 },
      { place: "3rd", amount: "₹199", rawAmount: 199 },
    ],
    total: "₹997",
  },
  {
    category: "Best Innovation & Uniqueness",
    description: "Awarded for original problem-solving, novel architecture, and standout utility.",
    prizes: [
      { place: "1st", amount: "₹499", rawAmount: 499 },
      { place: "2nd", amount: "₹299", rawAmount: 299 },
      { place: "3rd", amount: "₹199", rawAmount: 199 },
    ],
    total: "₹997",
  },
];

export const prizePoolMeta = {
  totalCash: "₹8,789",
  positions: "11 Cash Award Positions",
  overallTotal: "₹6,795",
  specialTotal: "₹1,994",
  policyNote:
    "Each project can receive only one cash award. If an Overall Top 5 project also qualifies for a special category award, the special award passes to the next eligible project outside the Overall Top 5.",
  hiddenSurprisesNote:
    "A small number of additional surprise recognitions may be given to promising projects outside cash awards (e.g. mentorship, learning perks, certificates). These are not implied cash prizes.",
  certificatesNote:
    "Every eligible participant receives a verified individual participation certificate. Top 25 projects receive official ranking certificates, issued individually to all squad members.",
};
