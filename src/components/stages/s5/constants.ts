export interface WorkStyleQuestion {
  id: string;
  field: string;
  question: string;
  options: WorkStyleOption[];
}

export interface WorkStyleOption {
  value: string;
  label: string;
  description: string;
  iconName: string;
}

export const WORK_STYLE_QUESTIONS: WorkStyleQuestion[] = [
  {
    id: "collaboration",
    field: "collaboration",
    question: "How do you prefer to work?",
    options: [
      { value: "INDEPENDENT", label: "Independently", description: "I prefer working on my own and managing my tasks", iconName: "User" },
      { value: "COLLABORATIVE", label: "Collaboratively", description: "I prefer working closely with others", iconName: "Users" },
      { value: "MIXED", label: "A mix of both", description: "Some solo work, some teamwork", iconName: "UserPlus" },
    ],
  },
  {
    id: "workLocation",
    field: "workLocation",
    question: "Where do you feel most effective?",
    options: [
      { value: "REMOTE", label: "Fully remote", description: "Working from home or any location", iconName: "Laptop" },
      { value: "HYBRID", label: "Hybrid", description: "Part remote, part office", iconName: "Building" },
      { value: "IN_PERSON", label: "Fully in-person", description: "Working at an office or on-site", iconName: "MapPin" },
    ],
  },
  {
    id: "decisionMaking",
    field: "decisionMaking",
    question: "When making decisions, which best describes you?",
    options: [
      { value: "DATA_DRIVEN", label: "Data-driven", description: "I rely on data and facts", iconName: "BarChart" },
      { value: "INTUITION", label: "Intuition-led", description: "I trust my intuition and experience", iconName: "Sparkles" },
      { value: "BALANCED", label: "Balanced approach", description: "I balance both data and intuition", iconName: "Scale" },
    ],
  },
  {
    id: "workRhythm",
    field: "workRhythm",
    question: "Which work rhythm suits you best?",
    options: [
      { value: "PLAN_FIRST", label: "Plan first", description: "I prefer to plan and think before acting", iconName: "Clock" },
      { value: "ACT_FIRST", label: "Act fast", description: "I prefer to start quickly and adjust along the way", iconName: "Zap" },
    ],
  },
];

export interface LikertQuestion {
  id: string;
  text: string;
  group: string;
}

export const S5_LIKERT_QUESTIONS: LikertQuestion[] = [
  { id: "PRF_F12_Q1", text: "Noisy or crowded environments distract me easily.", group: "environment" },
  { id: "PRF_F12_Q2", text: "I prefer clean and organized workspaces.", group: "environment" },
  { id: "PRF_F12_Q3", text: "I'm sensitive to light, sound, or smell.", group: "environment" },
  { id: "PRF_F13_Q1", text: "I enjoy active work more than sitting all day.", group: "physical" },
  { id: "PRF_F13_Q2", text: "I can handle physical work if the goal feels meaningful.", group: "physical" },
  { id: "PRF_F13_Q3", text: "I like a balance between physical and mental work.", group: "physical" },
  { id: "PRF_F14_Q1", text: "I want a work environment that feels safe and respectful.", group: "culture" },
  { id: "PRF_F14_Q2", text: "Flexible work arrangements matter to me.", group: "culture" },
  { id: "PRF_F14_Q3", text: "I prefer a stable and predictable work rhythm.", group: "culture" },
];

export const TAG_MAP: Record<string, Record<string, string>> = {
  collaboration: {
    INDEPENDENT: "Independent Worker",
    COLLABORATIVE: "Team Collaborator",
    MIXED: "Flexible Collaborator",
  },
  workLocation: {
    REMOTE: "Remote-First",
    HYBRID: "Hybrid Worker",
    IN_PERSON: "Office-Based",
  },
  decisionMaking: {
    DATA_DRIVEN: "Analytical Thinker",
    INTUITION: "Intuitive Decision-Maker",
    BALANCED: "Balanced Strategist",
  },
  workRhythm: {
    PLAN_FIRST: "Structured Planner",
    ACT_FIRST: "Agile Executor",
  },
};

export const TAG_COLORS = [
  { bg: "var(--primary)", fg: "var(--primary-foreground)" },
  { bg: "var(--success)", fg: "var(--success-foreground)" },
  { bg: "var(--info)", fg: "var(--info-foreground)" },
  { bg: "var(--warning)", fg: "var(--warning-foreground)" },
];
