// ── S6 Report Data Types & Mock Data ─────────────────────────

export interface SkillItem {
  name: string;
  level: number;
  status: "matched" | "growth" | "bridge";
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  category: "strong-fit" | "high-potential";
  salary: string;
  location: string;
  description: string;
  tags: string[];
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

export interface BehavioralSignal {
  label: string;
  color: "primary" | "success" | "warning" | "info";
}

export interface StrengthOrGrowth {
  title: string;
  summary: string;
  details: string;
}

export interface Improvement {
  area: string;
  suggestions: string[];
}

export interface GoalTimelineItem {
  period: string;
  projection: string;
}

export interface ReportData {
  generatedAt: string;
  behavioralSignals: BehavioralSignal[];
  targetPercent: number;
  targetTimeframe: string;
  strengths: StrengthOrGrowth[];
  growthAreas: StrengthOrGrowth[];
  improvements: Improvement[];
  goalTimeline: GoalTimelineItem[];
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
    { label: "Action-oriented", color: "primary" },
    { label: "Team-driven", color: "success" },
    { label: "Analytical thinker", color: "info" },
    { label: "Detail-focused", color: "warning" },
    { label: "Growth-minded", color: "primary" },
    { label: "Structured planner", color: "info" },
  ],

  targetPercent: 70,
  targetTimeframe: "6 months",

  strengths: [
    {
      title: "Analytical Problem-Solving",
      summary: "You excel at breaking down complex problems and finding data-driven solutions.",
      details:
        "Your assessment reveals a strong pattern of methodical analysis across multiple scenarios. You naturally decompose large challenges into manageable parts, evaluate evidence before acting, and prefer decisions grounded in data rather than intuition. This strength is highly valued in product, strategy, and research-oriented roles.",
    },
    {
      title: "Collaborative Leadership",
      summary: "Your ability to work with diverse teams and drive consensus is a key asset.",
      details:
        "You consistently demonstrate comfort in group settings, actively seeking input from others and facilitating productive discussions. Your leadership style is inclusive rather than directive, which builds trust and encourages contribution from all team members — a critical competency in cross-functional environments.",
    },
    {
      title: "Adaptability & Resilience",
      summary: "You navigate change effectively while maintaining focus on objectives.",
      details:
        "When presented with changing circumstances, you show a remarkable ability to recalibrate priorities without losing sight of core goals. You treat setbacks as learning opportunities rather than roadblocks, and you're comfortable operating in ambiguous situations — a trait that distinguishes high-performing professionals.",
    },
  ],

  growthAreas: [
    {
      title: "Public Speaking & Presence",
      summary: "Building confidence in presenting to larger audiences could accelerate your career.",
      details:
        "While you communicate effectively one-on-one and in small groups, your assessment suggests some hesitation around high-stakes presentations. Developing comfort with public speaking — through practice, coaching, or structured courses — could unlock leadership opportunities and amplify your influence within organizations.",
    },
    {
      title: "Strategic Networking",
      summary: "Expanding your professional network beyond your immediate team could open new doors.",
      details:
        "Your current networking pattern tends to stay within familiar circles. Proactively building relationships across industries, attending events, and engaging with professional communities could provide access to mentorship, hidden opportunities, and diverse perspectives that accelerate career growth.",
    },
    {
      title: "Delegation & Prioritization",
      summary: "Learning to let go of tasks and focus on high-impact work could boost your effectiveness.",
      details:
        "Your detail-oriented nature sometimes leads to taking on more than necessary. Practicing strategic delegation and ruthless prioritization — focusing on the 20% of work that drives 80% of results — could help you scale your impact and avoid burnout as you move into more senior roles.",
    },
  ],

  improvements: [
    {
      area: "Public Speaking & Presence",
      suggestions: [
        "Consider joining a local Toastmasters group to practice in a supportive environment.",
        "Explore structured courses like 'Speaking with Confidence' on Coursera or LinkedIn Learning.",
        "Try recording yourself presenting and reviewing the footage for self-improvement.",
        "Volunteer to lead a team meeting or present a project update to build exposure gradually.",
      ],
    },
    {
      area: "Strategic Networking",
      suggestions: [
        "Explore attending one industry meetup or virtual conference per month.",
        "Consider reaching out to one new professional per week on LinkedIn with a personalized message.",
        "You could set up informational interviews with professionals in your top matched roles.",
      ],
    },
    {
      area: "Delegation & Prioritization",
      suggestions: [
        "Try using frameworks like the Eisenhower Matrix to categorize tasks by urgency and importance.",
        "Consider identifying one task per week you could delegate to a teammate for mutual growth.",
        "Explore time-blocking techniques to protect focus time for high-impact strategic work.",
      ],
    },
  ],

  goalTimeline: [
    {
      period: "3 months",
      projection: "Complete foundational courses and begin targeted networking in your focus areas.",
    },
    {
      period: "6 months",
      projection: "Build portfolio-ready projects and establish a presence in relevant professional communities.",
    },
    {
      period: "12 months",
      projection: "Be well-positioned for your target roles with refined skills and an active professional network.",
    },
  ],

  jobs: [
    {
      id: "j1",
      title: "Product Manager",
      company: "Tech Industry",
      category: "strong-fit",
      salary: "$95K – $140K",
      location: "Hybrid · Major Cities",
      tags: ["Strategy", "Cross-functional", "Data-driven"],
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
      salary: "$80K – $125K",
      location: "Remote · Flexible",
      tags: ["Research", "User-centered", "Empathy"],
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
      id: "j5",
      title: "Business Analyst",
      company: "Enterprise & SaaS",
      category: "strong-fit",
      salary: "$75K – $115K",
      location: "Hybrid · Major Cities",
      tags: ["Analysis", "Process", "Stakeholders"],
      description:
        "Bridge the gap between business needs and technical solutions. Analyze processes, gather requirements, and drive data-informed improvements.",
      whyMatch: [
        "Your analytical problem-solving directly translates to requirements analysis.",
        "Your collaborative nature helps bridge communication between business and tech teams.",
        "Your structured approach aligns with documentation and process mapping work.",
      ],
      skills: {
        matched: [
          { name: "Requirements Analysis", level: 80, status: "matched" },
          { name: "Stakeholder Management", level: 75, status: "matched" },
          { name: "Process Mapping", level: 70, status: "matched" },
        ],
        toGrow: [
          { name: "Business Intelligence Tools", level: 35, status: "growth" },
          { name: "Agile Methodology", level: 45, status: "growth" },
        ],
      },
      experience: {
        required: "2-4 years in analysis, consulting, or operations",
        yours: "Strong analytical and collaborative foundation",
        gap: "Direct BA or consulting experience could strengthen candidacy",
      },
      learning: [
        { title: "Business Analysis Fundamentals", provider: "IIBA", duration: "6 weeks", url: "#" },
        { title: "Agile & Scrum Certification", provider: "Scrum.org", duration: "4 weeks", url: "#" },
      ],
      careerPath: [
        { role: "Junior Business Analyst", timeline: "0–1 year" },
        { role: "Business Analyst", timeline: "1–3 years" },
        { role: "Senior Business Analyst", timeline: "3–5 years" },
        { role: "Product Owner / BA Lead", timeline: "5+ years" },
      ],
      insights: [
        "BA roles are a strong entry point into both tech and consulting careers.",
        "The role offers clear progression paths into product management or strategy.",
      ],
    },
    {
      id: "j3",
      title: "Management Consultant",
      company: "Professional Services",
      category: "high-potential",
      salary: "$90K – $160K",
      location: "Hybrid · Travel Required",
      tags: ["Strategy", "Client-facing", "High-growth"],
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
    {
      id: "j4",
      title: "Data Product Analyst",
      company: "Tech & Finance",
      category: "high-potential",
      salary: "$85K – $130K",
      location: "Remote · Flexible",
      tags: ["Data", "Analytics", "Technical"],
      description:
        "Combine analytical rigor with product thinking to drive data-informed decisions. A bridge between data science and product strategy.",
      whyMatch: [
        "Your analytical strengths are the core competency for this role.",
        "Your collaborative style helps translate data insights for non-technical stakeholders.",
        "This role would develop your technical skills while leveraging existing strengths.",
      ],
      skills: {
        matched: [
          { name: "Data Analysis", level: 80, status: "matched" },
          { name: "Critical Thinking", level: 85, status: "matched" },
        ],
        toGrow: [
          { name: "SQL & Python", level: 30, status: "bridge" },
          { name: "Data Visualization", level: 40, status: "bridge" },
        ],
      },
      experience: {
        required: "2-4 years in analytics, data science, or product",
        yours: "Strong analytical and problem-solving foundation",
        gap: "Technical data skills (SQL, Python, visualization tools) need development",
      },
      learning: [
        { title: "SQL Fundamentals", provider: "DataCamp", duration: "4 weeks", url: "#" },
        { title: "Python for Data Analysis", provider: "Coursera", duration: "8 weeks", url: "#" },
        { title: "Tableau / Power BI Essentials", provider: "Udemy", duration: "3 weeks", url: "#" },
      ],
      careerPath: [
        { role: "Junior Data Analyst", timeline: "0–1 year" },
        { role: "Data Product Analyst", timeline: "1–3 years" },
        { role: "Senior Analyst / Analytics Lead", timeline: "3–5 years" },
        { role: "Head of Analytics", timeline: "5+ years" },
      ],
      insights: [
        "Data literacy is becoming essential across all industries.",
        "This role offers a unique blend of technical and business skills.",
      ],
      bridgeSkills: [
        { name: "SQL & Python", description: "Foundational programming skills for querying and analyzing datasets." },
        { name: "Data Visualization", description: "Learn to build compelling dashboards and visual narratives." },
      ],
      entryPathways: [
        { title: "Analytics Bootcamp", description: "Intensive programs (12-16 weeks) that build job-ready data skills." },
        { title: "Internal Analytics Role", description: "Transition within your current org to a data-focused position." },
      ],
    },
    {
      id: "j6",
      title: "Program Manager",
      company: "Tech & Operations",
      category: "high-potential",
      salary: "$100K – $150K",
      location: "Hybrid · Major Cities",
      tags: ["Leadership", "Operations", "Scale"],
      description:
        "Orchestrate complex, multi-team initiatives from inception to delivery. Requires strong organizational skills and stakeholder management.",
      whyMatch: [
        "Your structured planning style is ideal for managing complex programs.",
        "Your collaborative leadership translates well to cross-team coordination.",
        "This role would challenge you to develop broader strategic communication skills.",
      ],
      skills: {
        matched: [
          { name: "Project Coordination", level: 75, status: "matched" },
          { name: "Stakeholder Communication", level: 80, status: "matched" },
        ],
        toGrow: [
          { name: "Program Governance", level: 30, status: "bridge" },
          { name: "Executive Communication", level: 35, status: "bridge" },
        ],
      },
      experience: {
        required: "4-6 years in project/program management or operations",
        yours: "Solid collaborative and organizational foundation",
        gap: "Large-scale program management experience would strengthen candidacy",
      },
      learning: [
        { title: "PMP Certification Prep", provider: "PMI", duration: "10 weeks", url: "#" },
        { title: "Executive Communication", provider: "LinkedIn Learning", duration: "4 weeks", url: "#" },
      ],
      careerPath: [
        { role: "Project Manager", timeline: "0–2 years" },
        { role: "Program Manager", timeline: "2–4 years" },
        { role: "Senior Program Manager", timeline: "4–6 years" },
        { role: "Director of Programs", timeline: "6+ years" },
      ],
      insights: [
        "Program management is essential for scaling organizations.",
        "This role develops executive-level visibility and influence.",
      ],
      bridgeSkills: [
        { name: "Program Governance", description: "Learn frameworks for managing budgets, risks, and stakeholder alignment at scale." },
        { name: "Executive Communication", description: "Develop skills in presenting program status and strategic recommendations to leadership." },
      ],
      entryPathways: [
        { title: "Project Management Role", description: "Start with smaller-scope projects to build a track record." },
        { title: "Operations Coordinator", description: "Build organizational skills in a support role before stepping into program leadership." },
      ],
    },
  ],
};
