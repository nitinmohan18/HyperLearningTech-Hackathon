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
      "Yes, HyperLearningTech Winter Hackathon 2026 is 100% online. All briefings, repository inspections, live evaluations, and prize disbursements take place remotely via official channels.",
  },
  {
    category: "Participation",
    question: "Can I participate alone, or is a team required?",
    answer:
      "There is only one unified Squad format (1 to 4 members). Whether you participate alone (1 member) or as a collaborative team of 2–4 members, the flat entry fee is ₹200 per entry. All entries are evaluated fairly on the same 100-point rubric.",
  },
  {
    category: "Participation",
    question: "What is the squad size limit and how is the fee charged?",
    answer:
      "The squad size is 1 to 4 members. The registration fee is a flat ₹200 per entry—NOT per person—regardless of whether you compete alone or with up to 4 collaborators. Each entry nominates one team leader.",
  },
  {
    category: "Development",
    question: "Can I use AI tools?",
    answer:
      "Yes. AI tools, coding assistants, and AI agents are permitted. The competition does not penalise participants for using AI. However, participants must understand and take responsibility for their work, avoid submitting pre-built projects as original implementations, and clearly disclose significant AI-assisted components in their README.",
  },
  {
    category: "Development",
    question: "Can I use premium tools?",
    answer:
      "Yes. Participants are free to use both free and premium tools, cloud services, IDEs, and subscriptions. Premium tools are neither mandatory nor prohibited, and evaluation focuses on demonstrated problem-solving rather than tool subscriptions.",
  },
  {
    category: "GitHub",
    question: "Is a GitHub repository mandatory?",
    answer:
      "Yes. Every project must provide verified repository access to the organisers. This is one of the only two mandatory technical requirements for the competition.",
  },
  {
    category: "GitHub",
    question: "Can my repository be private?",
    answer:
      "Yes. Private and public repositories are both accepted. If private, the team leader must invite the official HyperLearningTech GitHub inspection account as a collaborator before 9:00 PM IST on 26 December so access can be verified.",
  },
  {
    category: "Development",
    question: "Is documentation mandatory?",
    answer:
      "Yes. Initial documentation must be committed in your README before project-specific application development begins. You must also update the README before final submission with setup instructions, external resources, and AI declarations. The README is directly used during judging.",
  },
  {
    category: "Development",
    question: "Are pull requests and branch protection mandatory?",
    answer:
      "No. Feature branches, pull requests, branch protection, CI/CD, and code reviews are encouraged professional development practices, but they are NOT mandatory. Not following them will not cause disqualification or a fixed scoring penalty.",
  },
  {
    category: "Development",
    question: "Is live deployment mandatory?",
    answer:
      "No. Live deployment is strongly encouraged, but other suitable demonstration and evaluation methods—such as runnable local applications, recorded demonstration videos, and interactive prototypes—are fully acceptable alternatives.",
  },
  {
    category: "Development",
    question: "Can I use an existing project?",
    answer:
      "No. Submitting an already-built application as original hackathon work is prohibited. General-purpose libraries, starter templates, public pre-trained models, and authorised third-party APIs are permitted, provided they are declared in your README.",
  },
  {
    category: "Participation",
    question: "What is the Special Track on Sustainable Development?",
    answer:
      "The special track encourages practical technological solutions addressing environmental and societal challenges, aligning with UN Sustainable Development Goals (climate, waste, clean water, renewable energy, rural development). It is a track within the open innovation hackathon, and participating teams remain fully eligible for overall evaluation.",
  },
  {
    category: "Evaluation",
    question: "How will projects be judged?",
    answer:
      "Projects will be evaluated according to the official 100-point rubric across 8 criteria: Technical implementation (20%), Problem understanding (15%), Originality & innovation (15%), Functionality & usability (15%), Engineering & documentation (10%), Impact & feasibility (10%), Learning & project understanding (10%), and Communication (5%). The top 25 eligible teams proceed to the live final round.",
  },
  {
    category: "Evaluation",
    question: "How will the final round be conducted?",
    answer:
      "Shortlisted teams will present their projects live through Google Meet in a 5–7 minute session per team (covering problem & solution, working demonstration, technical implementation, and Q&A). Presentations will be scored afresh using the official 100-point rubric.",
  },
  {
    category: "Prizes",
    question: "When will prize money be distributed?",
    answer:
      "Within 2–4 hours after the official results announcement, subject to winner verification, correct payment details, and successful UPI payment processing. Payment information is collected privately through official communication channels.",
  },
  {
    category: "Prizes",
    question: "Who owns the submitted project?",
    answer:
      "Participants retain 100% ownership and intellectual property rights over their original project contributions. Participation does not transfer IP to HyperLearningTech.",
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
