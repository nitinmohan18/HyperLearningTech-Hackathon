export interface JudgingCriterion {
  id: string;
  name: string;
  points: number;
  evaluates: string;
  details: string[];
  subBreakdown?: { item: string; points: number; note: string }[];
}

export const judgingCriteria: JudgingCriterion[] = [
  {
    id: "problem",
    name: "Problem Understanding & Relevance",
    points: 15,
    evaluates: "Depth of problem comprehension, clarity of target audience, and real-world significance of the challenge addressed.",
    details: [
      "Clear identification of the target problem, intended users, and context.",
      "Relevance and timeliness of the issue being tackled within the chosen domain.",
      "Thoughtful articulation of why the problem matters and how the solution directly addresses it.",
    ],
  },
  {
    id: "originality",
    name: "Originality & Innovation",
    points: 15,
    evaluates: "Creativity of concept, novelty in approach or execution, and differentiation from generic solutions.",
    details: [
      "Innovative perspective or unique architectural angle brought to the problem space.",
      "Original problem framing rather than reproducing trivial or boilerplate demonstrations.",
      "Thoughtful integration of tools, workflows, or novel user experiences.",
    ],
  },
  {
    id: "technical",
    name: "Technical Implementation",
    points: 20,
    evaluates: "Architecture, engineering discipline, code quality, stability, and sensible technology choices.",
    details: [
      "Clean, maintainable, and modular system architecture appropriate for the solution.",
      "Proper state management, error handling, edge-case coverage, and reliable API integration.",
      "Demonstrated engineering trade-offs and code craftsmanship executed during the 24-hour sprint.",
    ],
  },
  {
    id: "functionality",
    name: "Functionality & Usability",
    points: 15,
    evaluates: "Working capability of the solution, user journey coherence, accessibility, and interactive stability.",
    details: [
      "Core features execute reliably end-to-end without unhandled crashes or blocking errors.",
      "Intuitive, coherent user flow allowing evaluators to experience the product seamlessly.",
      "Functional interactive prototype or runnable application verifying declared capabilities.",
    ],
  },
  {
    id: "engineering",
    name: "Engineering & Documentation",
    points: 10,
    evaluates: "Quality of README documentation, setup steps, architectural transparency, and Git discipline.",
    details: [
      "Initial README committed before development starts and comprehensive final README before freeze.",
      "Clear local setup or runnable instructions, architecture overview, and external resource attribution.",
      "Transparent disclosure of any starter templates, third-party libraries, and AI-assisted components.",
    ],
  },
  {
    id: "impact",
    name: "Impact & Feasibility",
    points: 10,
    evaluates: "Practical viability, potential real-world value, scalability potential, and realistic implementation.",
    details: [
      "Feasibility of the solution operating in real conditions beyond a superficial concept.",
      "Clear distinction between demonstrated sprint functionality and future roadmap potential.",
      "Potential positive impact for target stakeholders, end users, or communities.",
    ],
  },
  {
    id: "learning",
    name: "Learning & Project Understanding",
    points: 10,
    evaluates: "Genuine understanding of code submitted, technical depth demonstrated, and experimentation courage.",
    details: [
      "Team members deeply understand every submitted component and can explain design trade-offs.",
      "Willingness to explore unfamiliar technologies, experiment courageously, and learn practically.",
      "Honest, transparent prototype ownership valued over uncomprehended pre-built complexity.",
    ],
  },
  {
    id: "communication",
    name: "Communication",
    points: 5,
    evaluates: "Clarity of technical explanation, quality of project presentation, and concise articulation in Q&A.",
    details: [
      "Concise, structured demonstration and technical articulation during evaluation and final round.",
      "Ability to answer jury questions thoughtfully regarding technical decisions and limitations.",
      "Well-organized written, visual, or live demonstration materials.",
    ],
  },
];

export interface TrackCriterion {
  id: string;
  name: string;
  points: number;
  evaluates: string;
  details: string[];
}

export const sustainableTrackRubric: TrackCriterion[] = [
  {
    id: "sustainability-impact",
    name: "Problem Significance & Sustainability Impact",
    points: 25,
    evaluates: "Significance of environmental or societal challenge and credible potential for positive impact.",
    details: [
      "Meaningful alignment with pressing environmental, ecological, or community challenges.",
      "Credible, realistic positive outcomes for target communities or environmental systems.",
    ],
  },
  {
    id: "practical-feasibility",
    name: "Practical Feasibility",
    points: 20,
    evaluates: "Viability of implementation, operational reality, resource constraints, and pragmatic deployment.",
    details: [
      "Pragmatic engineering considering real-world constraints, connectivity, or operational context.",
      "Clear pathway from prototype to deployable, verifiable real-world utility.",
    ],
  },
  {
    id: "technical-innovation",
    name: "Technical Innovation",
    points: 20,
    evaluates: "Creative application of technology, engineering depth, and novel problem-solving methodologies.",
    details: [
      "Innovative use of software, data models, AI agents, IoT, or systems engineering.",
      "Effective technical architecture solving non-trivial technical challenges.",
    ],
  },
  {
    id: "un-sdgs-alignment",
    name: "Alignment with Relevant UN SDGs",
    points: 10,
    evaluates: "Clear, grounded alignment with United Nations Sustainable Development Goals.",
    details: [
      "Explicit, well-justified connection to specific UN Sustainable Development Goals (sdgs.un.org/goals).",
      "Thoughtful contextual understanding of the chosen SDG targets.",
    ],
  },
  {
    id: "affordability-accessibility",
    name: "Affordability & Accessibility",
    points: 15,
    evaluates: "Inclusivity, cost-effectiveness, accessibility for diverse populations, and barrier minimization.",
    details: [
      "Low barriers to adoption for vulnerable, under-resourced, or widespread communities.",
      "Accessible user experience and consideration of diverse user capabilities.",
    ],
  },
  {
    id: "measurable-impact",
    name: "Measurable Impact & Supporting Evidence",
    points: 10,
    evaluates: "Evidence-based metrics, verifiable data, and distinction between tested results and future claims.",
    details: [
      "Tangible indicators for measuring success, efficiency gains, or environmental benefits.",
      "Clear, honest distinction between demonstrated hackathon results and future estimates.",
    ],
  },
];

export const ratingScale = [
  { score: 0, label: "No Evidence", description: "No demonstrable evidence or missing requirement." },
  { score: 1, label: "Weak", description: "Minimal effort, superficial attempt, or major shortcomings." },
  { score: 2, label: "Basic", description: "Meets basic requirements with notable gaps or limited depth." },
  { score: 3, label: "Satisfactory", description: "Competent implementation meeting hackathon standards." },
  { score: 4, label: "Strong", description: "High-quality execution with clear engineering discipline." },
  { score: 5, label: "Exceptional", description: "Outstanding depth, superior craft, and exemplary execution." },
];

export const tieBreakingPolicy = [
  "1. Technical Implementation score",
  "2. Originality & Innovation score",
  "3. Problem Understanding & Relevance score",
  "Unresolved ties will be referred to independent panel review.",
];
