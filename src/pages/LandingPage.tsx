import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Menu,
  X,
  ArrowRight,
  Star,
  CheckCircle2,
  ChevronDown,
  Brain,
  Heart,
  Zap,
  Target,
  Users,
  UserCheck,
  Globe,
  TrendingUp,
  BookOpen,
  Compass,
  Lightbulb,
  Shield,
  Clock,
  Award,
  BarChart3,
  FileText,
  Sparkles,
} from "lucide-react";

// ── Shared container ─────────────────────────────────────────
const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

// ── Section 1: Header / Navigation ───────────────────────────
const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border transition-all duration-200 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-background"
      }`}
      role="banner"
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            aria-label="YourVue — home"
          >
            YourVue
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-3"
            aria-label="Main navigation"
          >
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/assessment">Start Your Assessment</Link>
            </Button>
          </nav>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 flex flex-col gap-4 pt-12">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link to="/assessment">Start Your Assessment</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
};

// ── Counter animation hook ────────────────────────────────────
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref };
}

// ── Scroll fade-in hook ──────────────────────────────────────
function useScrollFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, visible };
}

// ── Section 2: Hero ───────────────────────────────────────────
const Hero: React.FC = () => (
  <section
    className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-background"
    aria-labelledby="hero-headline"
  >
    <Container>
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
        {/* Text column */}
        <div className="flex-1 lg:max-w-[60%] text-center lg:text-left">
          <h1 id="hero-headline" className="text-foreground">
            Discover Your Career Path with YourVue Assessment
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
            Our evidence-based 14-factor framework analyses your values,
            aptitudes, interests, and working preferences to match you with
            careers where you'll thrive.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/register">
                Start Your Assessment
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Free to start · No credit card required · 20–25 minutes
          </p>
        </div>

        {/* Decorative visual column */}
        <div
          className="hidden lg:flex flex-1 items-center justify-center relative"
          aria-hidden="true"
        >
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full bg-primary/10 scale-100" />
            <div className="absolute inset-8 rounded-full bg-info/15 rotate-12" />
            <div className="absolute inset-16 rounded-full bg-success/15 -rotate-6" />
            <div className="absolute top-6 right-8 bg-background rounded-xl shadow-md p-3 border border-border">
              <Brain size={24} className="text-primary" />
            </div>
            <div className="absolute bottom-8 left-6 bg-background rounded-xl shadow-md p-3 border border-border">
              <Target size={24} className="text-success" />
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-background rounded-xl shadow-md p-3 border border-border">
              <Heart size={24} className="text-warning" />
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-background rounded-xl shadow-md p-3 border border-border">
              <Compass size={24} className="text-info" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background rounded-2xl shadow-lg border border-border px-5 py-3 text-center">
                <p className="text-2xl font-bold text-primary">14</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Factors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

// ── Section 3: Stats & Trust Indicators ──────────────────────
const STATS = [
  { icon: Users, value: '10,000+', numericValue: 10000, label: 'Users Guided', ariaLabel: '10,000 plus users guided', suffix: '+' },
  { icon: TrendingUp, value: '95%', numericValue: 95, label: 'Success Rate', ariaLabel: '95 percent success rate', suffix: '%' },
  { icon: Clock, value: '20 min', numericValue: 20, label: 'Assessment Time', ariaLabel: '20 minute assessment time', suffix: ' min' },
  { icon: Compass, value: '500+', numericValue: 500, label: 'Career Paths', ariaLabel: '500 plus career paths', suffix: '+' },
] as const;

const StatCard: React.FC<{ stat: typeof STATS[number] }> = ({ stat }) => {
  const { count, ref } = useCountUp(stat.numericValue);
  const Icon = stat.icon;
  const formatted = stat.numericValue >= 1000
    ? count.toLocaleString() + stat.suffix
    : count + stat.suffix;

  return (
    <Card
      ref={ref}
      className="flex flex-col items-center text-center p-6 border border-border shadow-sm"
      aria-label={stat.ariaLabel}
    >
      <Icon size={32} className="text-muted-foreground mb-3" aria-hidden="true" />
      <span className="text-[30px] font-semibold text-info leading-none">
        {formatted}
      </span>
      <span className="mt-2 text-sm text-muted-foreground">{stat.label}</span>
    </Card>
  );
};

const StatsSection: React.FC = () => (
  <section className="py-12 bg-muted" aria-label="Platform statistics">
    <Container>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </Container>
  </section>
);

// ── Section 4: Why Choose YourVue ────────────────────────────
const FEATURES = [
  {
    icon: Brain,
    title: 'Evidence-Based Framework',
    description: 'Built on a rigorous 14-factor model covering the dimensions that matter most for career satisfaction and success.',
  },
  {
    icon: UserCheck,
    title: 'Personalized Guidance',
    description: 'Every recommendation is tailored to your unique profile — your values, strengths, interests, and working style.',
  },
  {
    icon: Target,
    title: 'Actionable Outputs',
    description: 'Go beyond insights. Get a concrete action plan with tasks, timelines, and resources you can execute immediately.',
  },
  {
    icon: Globe,
    title: 'Culturally Inclusive',
    description: 'Designed to respect diverse backgrounds, career stages, and cultural contexts. No one-size-fits-all approach.',
  },
] as const;

const FeatureCard: React.FC<{ feature: typeof FEATURES[number]; index: number }> = ({ feature, index }) => {
  const { ref, visible } = useScrollFadeIn(index * 100);
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={`bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transition: 'opacity 400ms ease-out, transform 400ms ease-out, box-shadow 200ms ease-out' }}
    >
      <Icon size={32} className="text-primary mb-4" aria-hidden="true" />
      <h3 className="text-foreground mb-2">{feature.title}</h3>
      <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
    </div>
  );
};

const WhyChooseSection: React.FC = () => (
  <section className="py-12" aria-labelledby="why-choose-heading">
    <Container>
      <h2 id="why-choose-heading" className="text-center mb-10">Why Choose YourVue</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </Container>
  </section>
);

// ── Section 5: How It Works ───────────────────────────────────
const steps = [
  {
    number: "01",
    icon: <Compass size={24} aria-hidden="true" />,
    title: "Orientation",
    description:
      "Tell us where you are in your career journey and what you're hoping to achieve. This personalises your entire assessment experience.",
  },
  {
    number: "02",
    icon: <Heart size={24} aria-hidden="true" />,
    title: "Discover Your Values",
    description:
      "Identify what truly matters to you in work — autonomy, impact, security, creativity — and rank them to reveal your core career drivers.",
  },
  {
    number: "03",
    icon: <Brain size={24} aria-hidden="true" />,
    title: "Map Your Aptitudes",
    description:
      "Self-rate your natural strengths across analytical, creative, interpersonal, and technical domains with evidence-based confidence scales.",
  },
  {
    number: "04",
    icon: <Lightbulb size={24} aria-hidden="true" />,
    title: "Explore Interests",
    description:
      "Uncover which fields and activities energise you using Holland Code theory, structured into six broad interest areas.",
  },
  {
    number: "05",
    icon: <Target size={24} aria-hidden="true" />,
    title: "Define Preferences",
    description:
      "Specify your ideal working environment, team dynamics, structure, and lifestyle — the practical factors that shape day-to-day satisfaction.",
  },
  {
    number: "06",
    icon: <BarChart3 size={24} aria-hidden="true" />,
    title: "Receive Your Report",
    description:
      "Get a personalised Career Fit Report with ranked matches, strengths, growth areas, and specific next-step recommendations.",
  },
];

const HowItWorks: React.FC = () => (
  <section className="py-12 lg:py-16" aria-labelledby="how-it-works-heading">
    <Container>
      <div className="text-center mb-10">
        <h2 id="how-it-works-heading">How the Assessment Works</h2>
        <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
          Six guided stages, each building on the last — designed to take
          20–25 minutes at your own pace.
        </p>
      </div>

      <div className="relative">
        <div
          className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-border"
          aria-hidden="true"
        />

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4 relative">
          {steps.map((step, i) => (
            <li key={step.number} className="flex flex-col items-start lg:items-center lg:text-center">
              <div
                className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 mb-4 shrink-0 z-10"
                aria-hidden="true"
              >
                <span className="text-primary">{step.icon}</span>
                <span className="absolute -top-1 -right-1 text-xs font-bold text-primary-foreground bg-primary rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="text-center mt-10">
        <Button size="lg" asChild>
          <Link to="/assessment">
            Begin Your Journey
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </Container>
  </section>
);

// ── Section 5: 14-Factor Framework ───────────────────────────
const dimensions = [
  {
    label: "Values",
    color: "text-primary",
    bg: "bg-primary/8",
    border: "border-primary/20",
    icon: <Heart size={20} aria-hidden="true" />,
    factors: [
      { name: "Work-Life Integration", desc: "Boundaries, flexibility, and personal time" },
      { name: "Purpose & Impact", desc: "Meaning derived from your contribution" },
      { name: "Financial Security", desc: "Income stability and earning potential" },
      { name: "Autonomy & Independence", desc: "Control over how and when you work" },
    ],
  },
  {
    label: "Aptitudes",
    color: "text-success",
    bg: "bg-success/8",
    border: "border-success/20",
    icon: <Brain size={20} aria-hidden="true" />,
    factors: [
      { name: "Analytical Thinking", desc: "Data, logic, and problem-solving" },
      { name: "Creative Expression", desc: "Ideas, design, and innovation" },
      { name: "Interpersonal Skills", desc: "Communication and relationship-building" },
      { name: "Technical Proficiency", desc: "Hands-on and tool-based skills" },
    ],
  },
  {
    label: "Interests",
    color: "text-info",
    bg: "bg-info/8",
    border: "border-info/20",
    icon: <Lightbulb size={20} aria-hidden="true" />,
    factors: [
      { name: "Investigative", desc: "Research, science, and intellectual curiosity" },
      { name: "Artistic", desc: "Creativity, expression, and aesthetics" },
      { name: "Social", desc: "Teaching, helping, and community impact" },
      { name: "Enterprising", desc: "Leadership, persuasion, and entrepreneurship" },
    ],
  },
  {
    label: "Preferences",
    color: "text-warning",
    bg: "bg-warning/8",
    border: "border-warning/20",
    icon: <Target size={20} aria-hidden="true" />,
    factors: [
      { name: "Work Environment", desc: "Remote, office, field, or hybrid" },
      { name: "Team Dynamics", desc: "Solo, small team, or large organisation" },
    ],
  },
];

const FrameworkSection: React.FC = () => (
  <section
    className="py-12 lg:py-16 bg-secondary/30"
    aria-labelledby="framework-heading"
  >
    <Container>
      <div className="text-center mb-10">
        <h2 id="framework-heading">The 14-Factor Framework</h2>
        <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
          Four career dimensions. Fourteen evidence-based factors. One
          comprehensive picture of where you'll truly fit.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dimensions.map((dim) => (
          <div
            key={dim.label}
            className={`rounded-xl border ${dim.border} ${dim.bg} p-5 flex flex-col gap-4`}
          >
            <div className="flex items-center gap-2">
              <span className={dim.color}>{dim.icon}</span>
              <h3 className={`text-base font-semibold ${dim.color}`}>{dim.label}</h3>
            </div>
            <ul className="flex flex-col gap-3" role="list">
              {dim.factors.map((factor) => (
                <li key={factor.name} className="flex gap-2 items-start">
                  <CheckCircle2
                    size={15}
                    className={`${dim.color} mt-0.5 shrink-0 opacity-80`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground leading-snug">
                      {factor.name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {factor.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ── Section 6: Testimonials ───────────────────────────────────
const testimonials = [
  {
    quote:
      "I'd been stuck in the same role for years, unsure why I felt unfulfilled. YourVue's report showed me that autonomy and creative expression were my top drivers — I'd been in a highly structured environment with zero room for either. Six months later, I'm in a role that actually fits.",
    name: "Sarah M.",
    role: "Former Project Manager, now UX Researcher",
    rating: 5,
  },
  {
    quote:
      "The 14 factors really resonated — it wasn't just another personality quiz. The way it mapped my interests against my aptitudes gave me a specific shortlist of career paths I'd never considered. I started my MSc in Data Science two months after completing it.",
    name: "James T.",
    role: "Career Changer, now Data Science Graduate Student",
    rating: 5,
  },
  {
    quote:
      "What stood out was how the report acknowledged my strengths without glossing over the areas I need to develop. It felt honest and supportive at the same time — like a really good career coach conversation.",
    name: "Priya K.",
    role: "Early-career professional, Marketing to Product",
    rating: 5,
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-warning fill-warning" : "text-border"}
        aria-hidden="true"
      />
    ))}
  </div>
);

const Testimonials: React.FC = () => (
  <section className="py-12 lg:py-16" aria-labelledby="testimonials-heading">
    <Container>
      <div className="text-center mb-10">
        <h2 id="testimonials-heading">What Users Are Saying</h2>
        <p className="mt-3 text-base text-muted-foreground max-w-lg mx-auto">
          Real stories from people who found clarity with YourVue.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <StarRating rating={t.rating} />
            <blockquote>
              <p className="text-sm text-foreground leading-relaxed">"{t.quote}"</p>
            </blockquote>
            <figcaption className="mt-auto">
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Container>
  </section>
);

// ── Section 7: Report Preview / Value Props ───────────────────
const reportFeatures = [
  {
    icon: <BarChart3 size={20} aria-hidden="true" />,
    title: "Career Fit Rankings",
    desc: "Ranked career paths scored against all 14 factors — see your top matches and why they fit.",
  },
  {
    icon: <Shield size={20} aria-hidden="true" />,
    title: "Strengths Profile",
    desc: "A clear breakdown of your top aptitudes and the environments where they shine brightest.",
  },
  {
    icon: <TrendingUp size={20} aria-hidden="true" />,
    title: "Growth Areas",
    desc: "Honest, encouraging insight into where focused development will open up the most opportunity.",
  },
  {
    icon: <FileText size={20} aria-hidden="true" />,
    title: "Action Plan",
    desc: "Concrete next steps — courses, conversations, and milestones — tailored to your top career paths.",
  },
];

const ReportPreview: React.FC = () => (
  <section
    className="py-12 lg:py-16 bg-gradient-to-b from-background to-primary/5"
    aria-labelledby="report-heading"
  >
    <Container>
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left mb-10 lg:mb-0">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <Sparkles size={14} aria-hidden="true" />
            Your Career Fit Report
          </div>
          <h2 id="report-heading" className="text-foreground">
            More than a quiz result — a personalised career blueprint
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
            When you complete all eight stages, you receive a comprehensive
            report that goes beyond vague suggestions — giving you ranked
            matches, honest strengths analysis, and a step-by-step action plan.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link to="/assessment">
              Start Your Assessment
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* Feature grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reportFeatures.map((feat) => (
            <div
              key={feat.title}
              className="bg-card border border-border rounded-xl p-5 flex gap-4 items-start shadow-sm"
            >
              <div className="shrink-0 text-primary mt-0.5">{feat.icon}</div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

// ── Section 8: FAQ ────────────────────────────────────────────
const faqs = [
  {
    q: "How long does the assessment take?",
    a: "Most people complete all eight stages in 20–25 minutes. You can save your progress and return anytime — your answers are preserved exactly where you left off.",
  },
  {
    q: "Is the assessment free?",
    a: "Yes, the full assessment is free to complete. Your Career Fit Report is included at no charge. We believe everyone deserves clarity about their career path.",
  },
  {
    q: "What is the assessment based on?",
    a: "YourVue's 14-factor framework draws on established career development research, including Holland Code interest theory, cognitive aptitude research, and work values models developed across decades of occupational psychology.",
  },
  {
    q: "Can I retake the assessment?",
    a: "Absolutely. Careers evolve, and so do you. You can retake the assessment at any time. We recommend reassessing every 12–18 months or after a significant life or career change.",
  },
  {
    q: "How is YourVue different from other career tests?",
    a: "Most career tests focus on personality type or a single dimension. YourVue analyses four distinct dimensions — values, aptitudes, interests, and preferences — across 14 specific factors, producing a much richer and more actionable picture.",
  },
  {
    q: "Is my data private and secure?",
    a: "Yes. Your assessment responses are encrypted and never shared with third parties. You control your data and can delete your account and all associated data at any time.",
  },
];

const FAQ: React.FC = () => (
  <section className="py-12 lg:py-16 border-t border-border" aria-labelledby="faq-heading">
    <Container>
      <div className="text-center mb-10">
        <h2 id="faq-heading">Frequently Asked Questions</h2>
        <p className="mt-3 text-base text-muted-foreground">
          Everything you need to know before you begin.
        </p>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col divide-y divide-border">
        {faqs.map((faq) => (
          <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
        ))}
      </div>
    </Container>
  </section>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className="flex items-center justify-between w-full py-4 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm group"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </CollapsibleContent>
    </Collapsible>
  );
};

// ── Section 9 (Final): CTA + Footer ──────────────────────────
const Footer: React.FC = () => (
  <footer>
    {/* Final CTA band */}
    <section
      className="py-12 lg:py-16 bg-primary text-primary-foreground"
      aria-labelledby="final-cta-heading"
    >
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <Award size={36} className="mx-auto mb-4 opacity-80" aria-hidden="true" />
          <h2
            id="final-cta-heading"
            className="text-primary-foreground"
          >
            Ready to discover where you'll thrive?
          </h2>
          <p className="mt-4 text-base text-primary-foreground/80 leading-relaxed">
            Start your free YourVue assessment today. 20–25 minutes. No credit
            card. Just clarity.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-foreground hover:bg-secondary/90"
              asChild
            >
              <Link to="/assessment">
                Start Your Assessment
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10"
              asChild
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-primary-foreground/60">
            Free · Private · Takes 20–25 minutes
          </p>
        </div>
      </Container>
    </section>

    {/* Footer links */}
    <div className="bg-foreground text-background/70 py-8">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="font-semibold text-background">YourVue</p>
          <nav className="flex flex-wrap gap-4 justify-center" aria-label="Footer navigation">
            <Link to="/" className="hover:text-background transition-colors duration-150">Privacy Policy</Link>
            <Link to="/" className="hover:text-background transition-colors duration-150">Terms of Use</Link>
            <Link to="/" className="hover:text-background transition-colors duration-150">Accessibility</Link>
            <Link to="/" className="hover:text-background transition-colors duration-150">Contact</Link>
          </nav>
          <p>© {new Date().getFullYear()} YourVue. All rights reserved.</p>
        </div>
      </Container>
    </div>
  </footer>
);

// ── Main landing page ─────────────────────────────────────────
const LandingPage: React.FC = () => (
  <>
    {/* SEO */}
    <title>YourVue — Discover Your Career Path with an Evidence-Based Assessment</title>

    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <StatsSection />
        <WhyChooseSection />
        <HowItWorks />
        <FrameworkSection />
        <Testimonials />
        <ReportPreview />
        <FAQ />
      </main>
      <Footer />
    </div>
  </>
);

export default LandingPage;
