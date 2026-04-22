// Shared mock data for all 3 Career Fit Report redesign concepts.

export type DemandLevel = "high" | "moderate" | "low";
export type AIImpact = "positive" | "neutral" | "negative";
export type MatchType = "strong-fit" | "high-potential";
export type SkillState = "known" | "intermediate" | "gap";

export interface BehavioralTrait {
  label: string;
  description: string;
  intensity: number; // 0-100
}

export interface StrengthOrGrowth {
  title: string;
  summary: string;
  detail: string;
}

export interface ImprovementArea {
  title: string;
  suggestions: string[];
}

export interface TimelinePeriod {
  label: string;
  title: string;
  narrative: string;
  intensity: number; // 1-5
}

export interface SkillChip {
  name: string;
  state: SkillState;
  current?: number;
  required?: number;
}

export interface JobMatch {
  id: string;
  title: string;
  category: string;
  matchType: MatchType;
  alternateTitles: string[];
  demand: DemandLevel;
  aiImpact: AIImpact;
  workTypes: ("Remote" | "Hybrid" | "On-site")[];
  salary: string;
  description: string;
  responsibilities: string[];
  employers: string[];
  skills: SkillChip[];
  prioritySkills: { name: string; current: number; required: number }[];
  bonusSkills: string[];
  dayToDay: string[];
  pros: string[];
  cons: string[];
  courses: { title: string; platform: string; type: "Course" | "Certification" }[];
  whyMatch: string;
  contributingAnswers: string[];
  developmentAreas: string[];
  bridgePathway?: {
    transferable: { name: string; current: number; target: number }[];
    steps: string[];
    resources: { title: string; platform: string; type: "Course" | "Certification" }[];
  };
}

export const BEHAVIORAL_TRAITS: BehavioralTrait[] = [
  { label: "Analytical Thinker", description: "Breaks complex problems into clear, testable parts.", intensity: 88 },
  { label: "Empathic Collaborator", description: "Reads the room and aligns teams around shared goals.", intensity: 82 },
  { label: "Curious Explorer", description: "Drawn to new domains and rapid learning loops.", intensity: 91 },
  { label: "Pragmatic Builder", description: "Prefers shipping iteratively over polishing in isolation.", intensity: 76 },
  { label: "Calm Under Pressure", description: "Steady decision-making in ambiguous, fast-moving contexts.", intensity: 79 },
  { label: "Systems Mindset", description: "Sees the second-order effects others miss.", intensity: 85 },
];

export const MATCH_SUMMARY =
  "Your profile shows unusually strong alignment with hybrid analytical-creative roles. You'll thrive where structured thinking meets human-centered work — and you have meaningful runway into adjacent strategic paths.";

export const STRENGTHS: StrengthOrGrowth[] = [
  {
    title: "Translating ambiguity into structure",
    summary: "You consistently turn vague problems into actionable frameworks others can follow.",
    detail:
      "Across your assessment you returned to language like 'mapping', 'sequencing', and 'unblocking'. This points to a rare combination of synthesis and follow-through — a strength most often found in product, strategy, and research leadership tracks.",
  },
  {
    title: "High-trust collaboration",
    summary: "You build psychological safety quickly, especially in cross-functional groups.",
    detail:
      "You scored highly on consensus-seeking without sacrificing decisiveness. This translates well into roles where stakeholder alignment is the bottleneck — not technical execution.",
  },
  {
    title: "Long-horizon motivation",
    summary: "You stay engaged through multi-quarter problems where feedback is delayed.",
    detail:
      "Your endurance with deferred reward is meaningfully above your cohort. Pair this with your curiosity and you have a natural fit for research, policy, and platform roles.",
  },
];

export const GROWTH_AREAS: StrengthOrGrowth[] = [
  {
    title: "Self-promotion & visibility",
    summary: "You under-narrate your contributions, especially to senior stakeholders.",
    detail:
      "Try a weekly 'what I shipped, what I learned, what I'm stuck on' note to your manager. Within 8 weeks this typically shifts perception meaningfully.",
  },
  {
    title: "Sharper prioritization under load",
    summary: "When competing requests arrive, you tend to absorb rather than negotiate.",
    detail:
      "Practice surfacing trade-offs explicitly: 'If I take this on, X slips by a week — is that the call?' This protects depth and trains stakeholders.",
  },
  {
    title: "Quantitative storytelling",
    summary: "Your narratives are strong; the numbers backing them aren't always front-and-center.",
    detail:
      "A short SQL/analytics refresher will close most of this gap. The goal isn't analyst-grade — it's being able to defend a recommendation with one chart.",
  },
];

export const IMPROVEMENTS: ImprovementArea[] = [
  {
    title: "Build a proof-of-work portfolio",
    suggestions: [
      "Publish 2–3 short case studies in the next 60 days.",
      "Each should show problem → approach → measured outcome.",
      "Link from your LinkedIn 'Featured' section.",
    ],
  },
  {
    title: "Strengthen one technical adjacency",
    suggestions: [
      "Pick SQL or Python — not both.",
      "Aim for 'can independently answer most questions in 30 minutes' fluency.",
    ],
  },
  {
    title: "Network with intent",
    suggestions: [
      "Reach out to 2 people per week in roles you're targeting.",
      "Lead with a specific question, not a coffee chat.",
    ],
  },
];

export const TIMELINE: TimelinePeriod[] = [
  {
    label: "Month 1–3",
    title: "Sharpen your story",
    narrative:
      "Refine how you describe your trajectory. Publish one case study. Identify three target companies and the specific teams within them.",
    intensity: 2,
  },
  {
    label: "Month 4–6",
    title: "Close one skill gap",
    narrative:
      "Commit to a single technical adjacency. Ship a small portfolio piece that demonstrates it in context, not in isolation.",
    intensity: 3,
  },
  {
    label: "Month 7–9",
    title: "Activate your network",
    narrative:
      "Begin warm outreach. Aim for two informational conversations per week. Ask about scope, decision-making, and what 'good' looks like.",
    intensity: 4,
  },
  {
    label: "Month 10–12",
    title: "Apply with leverage",
    narrative:
      "Move from exploration to focused applications. By now you should be referred-in, not cold-applying. Negotiate from a position of clarity.",
    intensity: 5,
  },
];

const baseSkills: SkillChip[] = [
  { name: "Stakeholder facilitation", state: "known" },
  { name: "Roadmap sequencing", state: "known" },
  { name: "User research synthesis", state: "intermediate", current: 60, required: 80 },
  { name: "SQL / data fluency", state: "gap", current: 30, required: 70 },
  { name: "Experiment design", state: "intermediate", current: 55, required: 75 },
  { name: "Written async comms", state: "known" },
];

export const STRONG_FIT_JOBS: JobMatch[] = [
  {
    id: "pm-platform",
    title: "Product Manager, Platform",
    category: "Product · Internal Tools",
    matchType: "strong-fit",
    alternateTitles: ["Technical PM", "Infrastructure PM", "Developer Experience PM"],
    demand: "high",
    aiImpact: "positive",
    workTypes: ["Remote", "Hybrid"],
    salary: "$135k – $190k",
    description:
      "Own the roadmap for internal platforms used by other engineering and product teams. Balance reliability with velocity, and translate developer pain into prioritized investment.",
    responsibilities: [
      "Define platform roadmap in partnership with engineering leads",
      "Run quarterly planning across 3–5 dependent teams",
      "Quantify reliability vs velocity trade-offs",
      "Drive adoption of new internal tools",
      "Own platform-level metrics (latency, uptime, DX score)",
    ],
    employers: ["Stripe", "Linear", "Vercel", "Figma", "Datadog"],
    skills: baseSkills,
    prioritySkills: [
      { name: "SQL / data fluency", current: 30, required: 70 },
      { name: "Experiment design", current: 55, required: 75 },
    ],
    bonusSkills: ["Distributed systems literacy", "API design", "OKR facilitation"],
    dayToDay: [
      "Morning standup with platform engineering",
      "Mid-day stakeholder review with a dependent team",
      "Afternoon writing — RFCs, roadmap notes, comms",
      "End-of-day metric review and triage",
    ],
    pros: [
      "High leverage — your work compounds across teams",
      "Strong technical peer group",
      "Clear, quantitative impact",
    ],
    cons: [
      "Less direct user contact than consumer PM",
      "Politically dense — many stakeholders, few users",
    ],
    courses: [
      { title: "Product Management for Platforms", platform: "Reforge", type: "Course" },
      { title: "Technical Foundations for PMs", platform: "Coursera", type: "Certification" },
    ],
    whyMatch:
      "Your assessment showed unusually strong systems thinking paired with high-trust collaboration — the exact pairing platform PM rewards.",
    contributingAnswers: [
      "I get energy from work that other people can build on top of.",
      "I'd rather ship something imperfect that 5 teams use than something perfect that 1 team uses.",
      "When teams are stuck, I try to find the smallest change that unblocks them.",
    ],
    developmentAreas: ["Quantitative storytelling", "Async written comms at scale"],
  },
  {
    id: "ux-research-lead",
    title: "Senior UX Researcher",
    category: "Research · Product",
    matchType: "strong-fit",
    alternateTitles: ["Staff Researcher", "Insights Lead"],
    demand: "moderate",
    aiImpact: "neutral",
    workTypes: ["Remote", "Hybrid"],
    salary: "$120k – $170k",
    description:
      "Lead mixed-methods research programs that shape product strategy. Partner closely with PMs and designers to turn insight into decisions.",
    responsibilities: [
      "Design and run end-to-end research studies",
      "Synthesize across qualitative and quantitative signals",
      "Coach PMs and designers on research literacy",
      "Maintain a living insights repository",
    ],
    employers: ["Airbnb", "Notion", "Atlassian", "Shopify"],
    skills: baseSkills,
    prioritySkills: [{ name: "SQL / data fluency", current: 30, required: 65 }],
    bonusSkills: ["Diary studies", "Repertory grid", "Survey design"],
    dayToDay: [
      "Participant interviews and analysis",
      "Synthesis sessions with cross-functional partners",
      "Writing — playbacks, briefs, and recommendations",
    ],
    pros: ["Deep contact with users", "Influence without authority"],
    cons: ["Impact can feel diffuse", "Requires constant evangelism"],
    courses: [
      { title: "Mixed Methods Research", platform: "NN/g", type: "Certification" },
      { title: "Research Ops Foundations", platform: "Coursera", type: "Course" },
    ],
    whyMatch:
      "You combine empathic collaboration with high tolerance for ambiguity — the bedrock of senior research practice.",
    contributingAnswers: [
      "I'm drawn to questions more than to answers.",
      "I tend to slow teams down with the right question, not by being a bottleneck.",
    ],
    developmentAreas: ["Quantitative analysis depth"],
  },
];

export const HIGH_POTENTIAL_JOBS: JobMatch[] = [
  {
    id: "strategy-ops",
    title: "Strategy & Operations Lead",
    category: "Strategy · Cross-functional",
    matchType: "high-potential",
    alternateTitles: ["Chief of Staff", "BizOps Lead", "Strategic Programs Lead"],
    demand: "high",
    aiImpact: "positive",
    workTypes: ["Hybrid", "On-site"],
    salary: "$150k – $220k",
    description:
      "Sit at the intersection of executive priorities and team execution. Diagnose what's slowing the company down and run the programs that fix it.",
    responsibilities: [
      "Run leadership offsites and quarterly planning",
      "Diagnose org-level bottlenecks",
      "Drive cross-org programs end-to-end",
      "Synthesize signal for the CEO/COO",
    ],
    employers: ["Ramp", "Brex", "OpenAI", "Anthropic"],
    skills: baseSkills,
    prioritySkills: [
      { name: "SQL / data fluency", current: 30, required: 75 },
      { name: "Financial modeling", current: 25, required: 70 },
    ],
    bonusSkills: ["Board-level comms", "M&A literacy"],
    dayToDay: [
      "1:1s with execs to surface blockers",
      "Cross-functional working sessions",
      "Memo-writing and synthesis",
    ],
    pros: ["Top-of-funnel exposure to every problem", "Career accelerant"],
    cons: ["High context-switching", "Influence-based — no direct reports early on"],
    courses: [
      { title: "Strategy in the Real World", platform: "HBS Online", type: "Certification" },
      { title: "Operational Excellence", platform: "Reforge", type: "Course" },
    ],
    whyMatch:
      "You think in systems and stay calm when the picture is incomplete. With sharper quantitative chops, this path is well within reach.",
    contributingAnswers: [
      "I like being in rooms where the next 6 months get shaped.",
      "I get more energy from removing blockers than from building one specific thing.",
    ],
    developmentAreas: ["Financial modeling", "Quantitative storytelling"],
    bridgePathway: {
      transferable: [
        { name: "Stakeholder facilitation", current: 80, target: 90 },
        { name: "Systems thinking", current: 75, target: 85 },
        { name: "Written synthesis", current: 78, target: 88 },
      ],
      steps: [
        "Take ownership of one cross-functional program in your current role.",
        "Build fluency in financial modeling — one course + one real artifact.",
        "Seek a stretch assignment that requires exec-level comms.",
        "Apply to BizOps/Strategy roles at companies 2× your current scale.",
      ],
      resources: [
        { title: "Financial Modeling Bootcamp", platform: "Wall Street Prep", type: "Course" },
        { title: "Strategic Thinking Certificate", platform: "Wharton Online", type: "Certification" },
      ],
    },
  },
  {
    id: "ai-pm",
    title: "AI Product Manager",
    category: "Product · Applied AI",
    matchType: "high-potential",
    alternateTitles: ["ML PM", "AI Solutions PM"],
    demand: "high",
    aiImpact: "positive",
    workTypes: ["Remote", "Hybrid"],
    salary: "$160k – $230k",
    description:
      "Shape products where the model is the product. Navigate evaluation, latency, cost, and trust as first-class product concerns.",
    responsibilities: [
      "Define eval strategy alongside ML",
      "Own latency/cost/quality trade-offs",
      "Translate model capabilities into user value",
    ],
    employers: ["Anthropic", "OpenAI", "Cohere", "Mistral", "Hugging Face"],
    skills: baseSkills,
    prioritySkills: [
      { name: "ML evaluation literacy", current: 25, required: 75 },
      { name: "SQL / data fluency", current: 30, required: 70 },
    ],
    bonusSkills: ["Prompt engineering", "RAG architecture awareness"],
    dayToDay: [
      "Eval reviews with ML engineers",
      "User research on emerging behaviors",
      "Roadmap and trade-off comms",
    ],
    pros: ["At the frontier", "High demand, high comp"],
    cons: ["Norms still being invented", "Less playbook to follow"],
    courses: [
      { title: "AI for Product Managers", platform: "Reforge", type: "Course" },
      { title: "Applied ML", platform: "DeepLearning.AI", type: "Certification" },
    ],
    whyMatch:
      "Your curiosity and tolerance for ambiguity map well to a domain that rewrites itself every quarter.",
    contributingAnswers: [
      "I'd rather work on something undefined than something well-understood.",
      "I'm energized by fields where the experts are still arguing.",
    ],
    developmentAreas: ["ML evaluation literacy", "Quantitative storytelling"],
    bridgePathway: {
      transferable: [
        { name: "Curiosity & rapid learning", current: 91, target: 91 },
        { name: "Stakeholder facilitation", current: 80, target: 85 },
      ],
      steps: [
        "Ship one internal LLM-powered tool, even if small.",
        "Take an applied ML course and write up what you learned.",
        "Contribute to an eval discussion publicly (blog, talk, or PR).",
      ],
      resources: [
        { title: "Evals for AI Products", platform: "Hamel Husain", type: "Course" },
        { title: "Applied ML Certificate", platform: "DeepLearning.AI", type: "Certification" },
      ],
    },
  },
];
