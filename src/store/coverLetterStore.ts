import { create } from "zustand";

export type LetterStatus = "complete" | "guidance-only" | "guidance-missing";

export interface CoverLetter {
  id: string;
  company: string;
  role: string;
  jobDescription: string;
  createdAt: number; // ms
  status: LetterStatus;
  guidance?: { title: string; body: string }[];
  reference?: string;
}

interface CoverLetterState {
  letters: CoverLetter[];
  loading: boolean;
  trialUsed: number;
  trialLimit: number;
  trialLoaded: boolean;
  trialExhausted: boolean;
  setTrialExhausted: (v: boolean) => void;
  addLetter: (l: Omit<CoverLetter, "id" | "createdAt">) => CoverLetter;
  generateReference: (id: string) => Promise<void>;
}

const now = Date.now();
const day = 86400000;

const seed: CoverLetter[] = [
  {
    id: "cl-1",
    company: "Stripe",
    role: "Senior Frontend Engineer",
    jobDescription: "Build payment UIs at scale.",
    createdAt: now - 2 * day,
    status: "complete",
    guidance: [
      { title: "Hook", body: "Open with a specific result tied to Stripe's mission of growing the GDP of the internet." },
      { title: "Relevant Experience", body: "Highlight 2 projects where you shipped customer-facing payment flows." },
      { title: "Technical Fit", body: "Map your React + TypeScript depth to their design system work." },
      { title: "Impact Metrics", body: "Quantify performance wins (LCP, conversion uplift)." },
      { title: "Close", body: "End with a concrete reason you want Stripe specifically — not just any frontend role." },
    ],
    reference:
      "Dear Stripe Hiring Team,\n\nWhen I shipped a redesigned checkout at Acme last year, conversion lifted 14% in the first month — a result that sits at the intersection of careful UX and disciplined engineering, the same intersection where Stripe consistently sets the bar.\n\nOver the past six years I've built React and TypeScript interfaces for fintech products serving millions of users. Most recently I led the migration of a legacy dashboard to a typed component library, cutting bundle size by 38% and reducing P95 LCP to 1.2s.\n\nI'm drawn to Stripe because the work compounds — every primitive you ship lets thousands of teams move faster. I'd love to contribute to that surface area.\n\nBest,\nAlex Morgan",
  },
  {
    id: "cl-2",
    company: "Linear",
    role: "Product Engineer",
    jobDescription: "Craft tools developers love.",
    createdAt: now - 9 * day,
    status: "guidance-only",
    guidance: [
      { title: "Hook", body: "Lead with how you use Linear daily and one workflow you'd improve." },
      { title: "Relevant Experience", body: "Surface product engineering work where you owned both design and code." },
      { title: "Technical Fit", body: "Show familiarity with offline-first, sync-engine architectures." },
      { title: "Impact Metrics", body: "Cite shipped features and adoption numbers, not lines of code." },
      { title: "Close", body: "Reference Linear's writing culture and link a memo or RFC you've written." },
    ],
  },
  {
    id: "cl-3",
    company: "Notion",
    role: "Design Engineer",
    jobDescription: "Bridge design and engineering on flagship surfaces.",
    createdAt: now - 35 * day,
    status: "complete",
    guidance: [
      { title: "Hook", body: "Anchor in a Notion surface you've rebuilt for fun or at work." },
      { title: "Relevant Experience", body: "Pair a design portfolio link with shipped engineering work." },
      { title: "Technical Fit", body: "Discuss prototyping fidelity and your bar for motion + micro-interactions." },
      { title: "Impact Metrics", body: "Talk craft outcomes, not just business metrics." },
      { title: "Close", body: "Name a Notion product principle and how you embody it." },
    ],
    reference:
      "Dear Notion Team,\n\nI rebuilt your slash-menu as a weekend exercise last spring — not because it needed it, but because I wanted to understand the latency budget you're working against. That kind of curiosity is what design engineering looks like to me.\n\nFor the last four years I've worked at the seam between design and code, prototyping in Figma in the morning and shipping production React in the afternoon. At my current role I own the component library that powers our editor surface.\n\nNotion's commitment to craft — and to the long, patient work of getting details right — is rare. I'd be proud to contribute.\n\nBest,\nAlex Morgan",
  },
];

export const useCoverLetterStore = create<CoverLetterState>((set, get) => ({
  letters: seed,
  loading: false,
  trialUsed: 2,
  trialLimit: 5,
  trialLoaded: false,
  trialExhausted: false,
  setTrialExhausted: (v) => set({ trialExhausted: v }),
  addLetter: (l) => {
    const letter: CoverLetter = {
      ...l,
      id: `cl-${Date.now()}`,
      createdAt: Date.now(),
    };
    set({ letters: [letter, ...get().letters], trialUsed: get().trialUsed + 1 });
    return letter;
  },
  generateReference: async (id) => {
    await new Promise((r) => setTimeout(r, 1200));
    set({
      letters: get().letters.map((l) =>
        l.id === id
          ? {
              ...l,
              status: "complete",
              reference:
                `Dear ${l.company} Hiring Team,\n\nI'm writing to express my interest in the ${l.role} role. Based on the guidance generated for this application, here is a personalized draft you can refine before sending.\n\n[Body paragraph tailored to the job description]\n\nI'd welcome the chance to discuss how my background maps to your needs.\n\nBest,\nAlex Morgan`,
            }
          : l,
      ),
    });
  },
}));

export function relativeTime(ms: number): string {
  const diff = Date.now() - ms;
  const d = Math.floor(diff / 86400000);
  if (d < 1) return "today";
  if (d < 7) return `${d}d`;
  if (d < 30) return `${Math.floor(d / 7)}w`;
  if (d < 365) return `${Math.floor(d / 30)}mo`;
  return `${Math.floor(d / 365)}y`;
}

export function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
