import type { LikertQuestion } from "@/components/stages/s2/constants";

export const S3_LIKERT_QUESTIONS: LikertQuestion[] = [
  // F1: Learning & Knowledge
  { id: "APT_F1_Q1", text: "I enjoy mastering new knowledge or learning systematically.", group: "f1" },
  { id: "APT_F1_Q2", text: "I can simplify complex information into clear points.", group: "f1" },
  { id: "APT_F1_Q3", text: "Learning itself is enjoyable to me.", group: "f1" },
  // F2: Problem Solving
  { id: "APT_F2_Q1", text: "I can usually find creative solutions when facing challenges.", group: "f2" },
  { id: "APT_F2_Q2", text: "I like finding the root cause of problems.", group: "f2" },
  { id: "APT_F2_Q3", text: "I prefer long-term solutions over quick fixes.", group: "f2" },
  // F3: Communication
  { id: "APT_F3_Q1", text: "I can explain complex ideas in simple terms.", group: "f3" },
  { id: "APT_F3_Q2", text: "I enjoy communicating across people or teams.", group: "f3" },
  { id: "APT_F3_Q3", text: "I express ideas confidently in writing or speech.", group: "f3" },
  // F5: Planning & Organization
  { id: "APT_F5_Q1", text: "I like planning ahead to avoid last-minute stress.", group: "f5" },
  { id: "APT_F5_Q2", text: "I make task lists and track progress regularly.", group: "f5" },
  { id: "APT_F5_Q3", text: "I'm organized in managing time and resources.", group: "f5" },
  // F8: Accuracy & Integrity
  { id: "APT_F8_Q1", text: "I care deeply about data and information accuracy.", group: "f8" },
  { id: "APT_F8_Q2", text: "I verify facts before making decisions.", group: "f8" },
  { id: "APT_F8_Q3", text: "I take confidentiality and information security seriously.", group: "f8" },
  // F9: Resource Management
  { id: "APT_F9_Q1", text: "I plan budgets and resources responsibly.", group: "f9" },
  { id: "APT_F9_Q2", text: "I can distinguish between essential and optional investments.", group: "f9" },
  { id: "APT_F9_Q3", text: "I aim to achieve the most with limited resources.", group: "f9" },
];

export type CareerStage = "STARTER" | "EXPLORER" | "SHIFTER" | "ADVANCER" | "UNSURE";

export interface ScenarioQuestion {
  id: string;
  text: string;
  options: { letter: "A" | "B" | "C"; text: string }[];
}

export const SCENARIOS: Record<CareerStage, ScenarioQuestion[]> = {
  STARTER: [
    {
      id: "SCN_Q1",
      text: "When you join a new team, what do you do first?",
      options: [
        { letter: "A", text: "Observe how others work" },
        { letter: "B", text: "Introduce yourself to everyone" },
        { letter: "C", text: "Jump in and start helping" },
      ],
    },
    {
      id: "SCN_Q2",
      text: "When a task is beyond your ability, you usually...",
      options: [
        { letter: "A", text: "Research and learn" },
        { letter: "B", text: "Ask for help" },
        { letter: "C", text: "Try first and adjust later" },
      ],
    },
    {
      id: "SCN_Q3",
      text: "When your mentor assigns an open-ended task, you feel...",
      options: [
        { letter: "A", text: "Uncertain" },
        { letter: "B", text: "Excited to experiment" },
        { letter: "C", text: "Eager to clarify expectations" },
      ],
    },
  ],
  EXPLORER: [
    {
      id: "SCN_Q1",
      text: "If you're working on three projects at once, you...",
      options: [
        { letter: "A", text: "Switch between them to stay energized" },
        { letter: "B", text: "Focus deeply on one" },
        { letter: "C", text: "Follow a strict schedule" },
      ],
    },
    {
      id: "SCN_Q2",
      text: "When your tasks get repetitive, you...",
      options: [
        { letter: "A", text: "Automate or improve the process" },
        { letter: "B", text: "Find new ways to make it faster" },
        { letter: "C", text: "Finish and move on" },
      ],
    },
    {
      id: "SCN_Q3",
      text: "If a colleague presents a 'crazy' idea, you...",
      options: [
        { letter: "A", text: "Get excited and want to try" },
        { letter: "B", text: "Assess its feasibility" },
        { letter: "C", text: "Worry it might slow things down" },
      ],
    },
  ],
  SHIFTER: [
    {
      id: "SCN_Q1",
      text: "When considering a new field, you first...",
      options: [
        { letter: "A", text: "Research the market" },
        { letter: "B", text: "Talk to people in the industry" },
        { letter: "C", text: "Take a course and try it" },
      ],
    },
    {
      id: "SCN_Q2",
      text: "If your family, partners, or personal friends worry that starting over is too hard, you...",
      options: [
        { letter: "A", text: "Explain your plan" },
        { letter: "B", text: "Prove it through results" },
        { letter: "C", text: "Hesitate but keep going" },
      ],
    },
    {
      id: "SCN_Q3",
      text: "When you face frequent setbacks in a new job, you...",
      options: [
        { letter: "A", text: "Reflect and analyze" },
        { letter: "B", text: "Seek advice" },
        { letter: "C", text: "Tell yourself 'it's just a transition'" },
      ],
    },
  ],
  ADVANCER: [
    {
      id: "SCN_Q1",
      text: "If your project is delayed, you...",
      options: [
        { letter: "A", text: "Hold a team review to fix issues" },
        { letter: "B", text: "Report and adjust targets" },
        { letter: "C", text: "Quietly work extra to recover" },
      ],
    },
    {
      id: "SCN_Q2",
      text: "When your team has conflict, you...",
      options: [
        { letter: "A", text: "Facilitate open discussion" },
        { letter: "B", text: "Make a firm decision" },
        { letter: "C", text: "Encourage them to resolve it themselves" },
      ],
    },
    {
      id: "SCN_Q3",
      text: "If your manager's decision differs from yours, you...",
      options: [
        { letter: "A", text: "Present data to support your view" },
        { letter: "B", text: "Respect but privately give feedback" },
        { letter: "C", text: "Follow orders but adapt execution" },
      ],
    },
  ],
  UNSURE: [
    {
      id: "SCN_Q1",
      text: "When you think about choosing a career direction, what describes your current feeling best?",
      options: [
        { letter: "A", text: "I feel overwhelmed and don't know where to start" },
        { letter: "B", text: "I'm curious but easily switch between different ideas" },
        { letter: "C", text: "I prefer to explore slowly before making any decisions" },
      ],
    },
    {
      id: "SCN_Q2",
      text: "When you face too many options, you usually...",
      options: [
        { letter: "A", text: "Look for guidance or structured suggestions" },
        { letter: "B", text: "Try a few of them and see what feels right" },
        { letter: "C", text: "Analyze pros and cons but still hesitate to decide" },
      ],
    },
    {
      id: "SCN_Q3",
      text: "If someone asks 'What are you good at?', you tend to...",
      options: [
        { letter: "A", text: "Say 'I'm not sure yet'" },
        { letter: "B", text: "Mention a few things but feel uncertain" },
        { letter: "C", text: "Prefer others to point out your strengths" },
      ],
    },
  ],
};
