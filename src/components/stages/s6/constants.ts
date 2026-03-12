// ── S6 Report Mock Data ─────────────────────────────────────

export interface SkillItem {
  name: string;
  level: number; // 0-100
  status: "matched" | "growth" | "bridge";
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  category: "strong-fit" | "high-potential";
  matchScore: number; // 0-100
  salary: string;
  location: string;
  description: string;
  whyMatch: string[];
  skills: {
    matched: SkillItem[];
    toGrow: SkillItem[];
  };
  experience: {
    required: string;
    yours: string;
    gap: string;
  };
  learning: { title: string; provider: string; duration: string; url: string }[];
  careerPath: { role: string; timeline: string }[];
  insights: string[];
  bridgeSkills?: { name: string; description: string }[];
  entryPathways?: { title: string; description: string }[];
}

export interface ReportData {
  generatedAt: string;
  behavioralSignals: { label: string; value: string; icon: string }[];
  target: { statement: string };
  strengths: { title: string; description: string }[];
  growthAreas: { title: string; description: string }[];
  suggestions: string[];
  jobs: JobMatch[];
}

export const LOADING_MESSAGES = [
  "Analyzing your career profile...",
  "Matching your values and aptitudes...",
  "Finding the best career fits...",
  "Generating personalized insights...",
];

export const MOCK_REPORT: ReportData = {
  generatedAt: new Date().toISOString(),
  behavioralSignals: [
    { label: "Decision Style", value: "Analytical", icon: "BarChart" },
    { label: "Work Mode", value: "Collaborative", icon: "Users" },
    { label: "Pace", value: "Structured", icon: "Clock" },
    { label: "Environment", value: "Hybrid", icon: "Building" },
  ],
  target: {
    statement:
      "You thrive in structured, collaborative environments where analytical thinking is valued. You seek meaningful work with clear growth pathways.",
  },
  strengths: [
    {
      title: "Analytical Problem-Solving",
      description: "You excel at breaking down complex problems and finding data-driven solutions.",
    },
    {
      title: "Collaborative Leadership",
      description: "Your ability to work with diverse teams and drive consensus is a key asset.",
    },
    {
      title: "Adaptability",
      description: "You navigate change effectively while maintaining focus on objectives.",
    },
  ],
  growthAreas: [
    {
      title: "Public Speaking",
      description: "Building confidence in presenting to larger audiences could accelerate your career.",
    },
    {
      title: "Strategic Networking",
      description: "Expanding your professional network beyond your immediate team.",
    },
  ],
  suggestions: [
    "Consider taking a leadership communication course to enhance your presentation skills.",
    "Join a professional community in your target industry for networking opportunities.",
    "Set up informational interviews with professionals in your top matched roles.",
  ],
  jobs: [
    {
      id: "j1",
      title: "Product Manager",
      company: "Tech Industry",
      category: "strong-fit",
      matchScore: 92,
      salary: "$95K – $140K",
      location: "Hybrid · Major Cities",
      description:
        "Lead cross-functional teams to define, build, and ship products that solve real user problems. Combines analytical thinking with stakeholder collaboration.",
      whyMatch: [
        "Your analytical decision-making style aligns perfectly with data-driven product strategy.",
        "Your collaborative work preference matches the cross-functional nature of this role.",
        "Your structured planning approach is essential for roadmap management.",
      ],
      skills: {
        matched: [
          { name: "Data Analysis", level: 85, status: "matched" },
          { name: "Team Collaboration", level: 90, status: "matched" },
          { name: "Strategic Thinking", level: 78, status: "matched" },
        ],
        toGrow: [
          { name: "SQL / Product Analytics", level: 40, status: "growth" },
          { name: "A/B Testing", level: 30, status: "growth" },
        ],
      },
      experience: {
        required: "3-5 years in product, strategy, or related field",
        yours: "Relevant experience in analytical and collaborative roles",
        gap: "May benefit from direct product management exposure",
      },
      learning: [
        { title: "Product Management Fundamentals", provider: "Coursera", duration: "6 weeks", url: "#" },
        { title: "SQL for Product Managers", provider: "DataCamp", duration: "4 weeks", url: "#" },
        { title: "A/B Testing Mastery", provider: "Udemy", duration: "3 weeks", url: "#" },
      ],
      careerPath: [
        { role: "Associate Product Manager", timeline: "0–1 year" },
        { role: "Product Manager", timeline: "1–3 years" },
        { role: "Senior Product Manager", timeline: "3–5 years" },
        { role: "Director of Product", timeline: "5–8 years" },
      ],
      insights: [
        "Product management is one of the fastest-growing career paths in tech.",
        "The role combines your love of data with human-centered problem solving.",
        "Remote and hybrid options are widely available in this field.",
      ],
    },
    {
      id: "j2",
      title: "UX Researcher",
      company: "Design & Tech",
      category: "strong-fit",
      matchScore: 87,
      salary: "$80K – $125K",
      location: "Remote · Flexible",
      description:
        "Uncover user needs through qualitative and quantitative research methods. Translate findings into actionable product improvements.",
      whyMatch: [
        "Your analytical skills map directly to research methodology design.",
        "Your empathy and collaboration strengths enhance stakeholder communication.",
        "Your structured approach ensures rigorous, reproducible research.",
      ],
      skills: {
        matched: [
          { name: "Research Methods", level: 75, status: "matched" },
          { name: "Data Interpretation", level: 82, status: "matched" },
        ],
        toGrow: [
          { name: "Usability Testing Tools", level: 35, status: "growth" },
          { name: "Survey Design", level: 45, status: "growth" },
        ],
      },
      experience: {
        required: "2-4 years in research, psychology, or UX",
        yours: "Strong analytical foundation applicable to research",
        gap: "Hands-on UX research portfolio may need development",
      },
      learning: [
        { title: "UX Research & Strategy", provider: "Interaction Design Foundation", duration: "8 weeks", url: "#" },
        { title: "Qualitative Research Methods", provider: "Coursera", duration: "5 weeks", url: "#" },
      ],
      careerPath: [
        { role: "Junior UX Researcher", timeline: "0–1 year" },
        { role: "UX Researcher", timeline: "1–3 years" },
        { role: "Senior UX Researcher", timeline: "3–5 years" },
        { role: "Research Lead", timeline: "5+ years" },
      ],
      insights: [
        "UX research demand has grown 30% year over year.",
        "This role lets you directly impact how millions of people interact with products.",
      ],
    },
    {
      id: "j3",
      title: "Management Consultant",
      company: "Professional Services",
      category: "high-potential",
      matchScore: 74,
      salary: "$90K – $160K",
      location: "Hybrid · Travel Required",
      description:
        "Advise organizations on strategy, operations, and transformation. Requires strong analytical and communication skills.",
      whyMatch: [
        "Your analytical decision-making aligns with consulting methodologies.",
        "Your adaptability is crucial for diverse client engagements.",
        "This role would stretch your communication and networking growth areas.",
      ],
      skills: {
        matched: [
          { name: "Analytical Thinking", level: 85, status: "matched" },
          { name: "Problem Solving", level: 80, status: "matched" },
        ],
        toGrow: [
          { name: "Client Presentation", level: 35, status: "bridge" },
          { name: "Business Development", level: 25, status: "bridge" },
        ],
      },
      experience: {
        required: "2-5 years in consulting, strategy, or analytics",
        yours: "Strong analytical base with some transferable skills",
        gap: "Client-facing experience and business acumen need development",
      },
      learning: [
        { title: "Case Interview Prep", provider: "Management Consulted", duration: "4 weeks", url: "#" },
        { title: "Business Strategy Fundamentals", provider: "edX", duration: "6 weeks", url: "#" },
      ],
      careerPath: [
        { role: "Business Analyst", timeline: "0–1 year" },
        { role: "Consultant", timeline: "1–3 years" },
        { role: "Senior Consultant", timeline: "3–5 years" },
        { role: "Manager / Partner Track", timeline: "5–10 years" },
      ],
      insights: [
        "Consulting provides unmatched breadth of industry exposure.",
        "The travel component has decreased with the rise of virtual engagements.",
      ],
      bridgeSkills: [
        { name: "Client Presentation", description: "Develop structured storytelling for executive audiences." },
        { name: "Business Development", description: "Learn to identify and pursue new client opportunities." },
      ],
      entryPathways: [
        { title: "Boutique Consulting Firm", description: "Smaller firms offer faster learning with more hands-on responsibility." },
        { title: "Internal Strategy Role", description: "Start in corporate strategy to build consulting-adjacent skills." },
      ],
    },
  ],
};
