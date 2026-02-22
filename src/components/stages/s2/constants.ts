export type CareerMotivation = "LEARNING" | "VALUES" | "INFLUENCE" | "MEANING";

export interface ValueCategory {
  id: string;
  label: string;
  values: string[];
}

export const VALUE_CATEGORIES: ValueCategory[] = [
  {
    id: "personal_growth",
    label: "Personal Growth & Self-Development",
    values: [
      "Achievement", "Ambition", "Authenticity", "Confidence", "Courage",
      "Curiosity", "Growth", "Initiative", "Integrity", "Knowledge",
      "Learning", "Perseverance", "Resourcefulness", "Self-discipline",
      "Self-expression", "Self-respect", "Vision", "Wisdom",
    ],
  },
  {
    id: "relationships",
    label: "Relationships & Community",
    values: [
      "Belonging", "Caring", "Collaboration", "Commitment", "Community",
      "Compassion", "Connection", "Cooperation", "Friendship", "Generosity",
      "Giving back", "Inclusion", "Kindness", "Leadership", "Loyalty",
      "Parenting", "Service", "Teamwork", "Trust",
    ],
  },
  {
    id: "values_principles",
    label: "Values & Principles",
    values: [
      "Accountability", "Altruism", "Contribution", "Dignity", "Equality",
      "Ethics", "Excellence", "Fairness", "Forgiveness", "Grace",
      "Gratitude", "Honesty", "Humility", "Justice", "Respect",
      "Responsibility", "Stewardship", "Truth",
    ],
  },
  {
    id: "wellbeing",
    label: "Well-being & Inner Life",
    values: [
      "Balance", "Beauty", "Contentment", "Dignity", "Faith", "Grace",
      "Harmony", "Health", "Hope", "Joy", "Love", "Optimism", "Patience",
      "Peace", "Personal fulfillment", "Serenity", "Simplicity",
      "Spirituality", "Vulnerability", "Well-being", "Wholeheartedness",
    ],
  },
  {
    id: "work_achievement",
    label: "Work & Achievement",
    values: [
      "Being the best", "Career", "Competence", "Efficiency", "Excellence",
      "Job security", "Making a difference", "Power", "Pride", "Recognition",
      "Reliability", "Security", "Success", "Usefulness",
    ],
  },
  {
    id: "lifestyle",
    label: "Lifestyle & Experience",
    values: [
      "Adventure", "Balance", "Environment", "Family", "Financial stability",
      "Freedom", "Future generations", "Home", "Independence", "Leisure",
      "Legacy", "Nature", "Order", "Safety", "Sportsmanship", "Thrift",
      "Time", "Tradition", "Travel", "Wealth",
    ],
  },
  {
    id: "enjoyment",
    label: "Enjoyment & Lightness",
    values: ["Fun", "Humor", "Openness", "Uniqueness"],
  },
];

export interface LikertQuestion {
  id: string;
  text: string;
  group: string;
}

export const LIKERT_QUESTIONS: LikertQuestion[] = [
  // Group: People & Leadership
  { id: "VAL_F7_Q1", text: "When teammates disagree, I try to find common ground.", group: "people_leadership" },
  { id: "VAL_F7_Q2", text: "I enjoy mentoring or supporting others to grow.", group: "people_leadership" },
  { id: "VAL_F7_Q3", text: "People tend to look to me for guidance in a team.", group: "people_leadership" },
  // Group: Service & Responsibility
  { id: "VAL_F10_Q1", text: "I care whether my work truly helps others.", group: "service_responsibility" },
  { id: "VAL_F10_Q2", text: "I naturally offer help when others are struggling.", group: "service_responsibility" },
  { id: "VAL_F10_Q3", text: "I hope my work creates social or emotional value.", group: "service_responsibility" },
  // Group: Emotional Awareness
  { id: "VAL_F11_Q1", text: "Other people's emotions easily affect me.", group: "emotional_awareness" },
  { id: "VAL_F11_Q2", text: "I try to stay professional even when I'm upset.", group: "emotional_awareness" },
  { id: "VAL_F11_Q3", text: "My performance often reflects my emotional state.", group: "emotional_awareness" },
];

export interface MotivationOption {
  id: CareerMotivation;
  label: string;
  description: string;
  iconName: "BookOpen" | "Heart" | "Crown" | "Compass";
}

export const MOTIVATION_OPTIONS: MotivationOption[] = [
  { id: "LEARNING", label: "Learning & Discovery", description: "Learning and discovering my strengths", iconName: "BookOpen" },
  { id: "VALUES", label: "Values Alignment", description: "Finding work that fits my values", iconName: "Heart" },
  { id: "INFLUENCE", label: "Influence & Leadership", description: "Building influence or leading others", iconName: "Crown" },
  { id: "MEANING", label: "Meaningful Change", description: "Changing direction to do something more meaningful", iconName: "Compass" },
];
