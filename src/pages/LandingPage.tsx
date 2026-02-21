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
  ClipboardList,
  Rocket,
  UserPlus,
  Search,
  Settings2,
  FileBarChart,
  ListChecks,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
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
const HOW_IT_WORKS_STEPS = [
  {
    icon: ClipboardList,
    title: 'Assessment',
    description: 'Answer thoughtful questions about your values, aptitudes, interests, and preferences. Takes about 20 minutes.',
  },
  {
    icon: BarChart3,
    title: 'Analysis',
    description: 'Our AI-powered engine matches your profile against 500+ career paths using the 14-factor framework.',
  },
  {
    icon: Rocket,
    title: 'Action',
    description: 'Receive your personalized Career Fit Report and a step-by-step action plan to reach your target role.',
  },
] as const;

const HowItWorksStep: React.FC<{ step: typeof HOW_IT_WORKS_STEPS[number]; index: number; isLast: boolean }> = ({ step, index, isLast }) => {
  const { ref, visible } = useScrollFadeIn(index * 150);
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transition: 'opacity 400ms ease-out, transform 400ms ease-out' }}
    >
      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
        {index + 1}
      </div>
      <Icon size={28} className="text-muted-foreground mt-3" aria-hidden="true" />
      <h3 className="text-foreground mt-3">{step.title}</h3>
      <p className="text-base text-muted-foreground leading-relaxed mt-2 max-w-xs">{step.description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => (
  <section className="py-12 bg-muted" aria-labelledby="how-it-works-heading">
    <Container>
      <h2 id="how-it-works-heading" className="text-center mb-10">How It Works</h2>

      {/* Mobile: vertical with dashed connectors */}
      <div className="flex flex-col items-center gap-0 lg:hidden">
        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <React.Fragment key={step.title}>
            <HowItWorksStep step={step} index={i} isLast={i === HOW_IT_WORKS_STEPS.length - 1} />
            {i < HOW_IT_WORKS_STEPS.length - 1 && (
              <div className="flex justify-center py-1" aria-hidden="true">
                <div className="border-l-2 border-dashed border-border h-8 ml-0" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Desktop: horizontal */}
      <div className="hidden lg:flex items-start justify-center gap-8">
        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <React.Fragment key={step.title}>
            <HowItWorksStep step={step} index={i} isLast={i === HOW_IT_WORKS_STEPS.length - 1} />
            {i < HOW_IT_WORKS_STEPS.length - 1 && (
              <div className="flex items-center pt-5" aria-hidden="true">
                <div className="border-t-2 border-dashed border-border w-16" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </Container>
  </section>
);

// ── Section 6: Assessment Journey Preview ─────────────────────
const JOURNEY_STAGES = [
  { stage: 'S0', icon: UserPlus, name: 'Getting Started', description: 'Create your account and set up your profile' },
  { stage: 'S1', icon: Compass, name: 'Orientation', description: 'Tell us about your career stage and goals' },
  { stage: 'S2', icon: Heart, name: 'Values', description: 'Identify what matters most to you at work' },
  { stage: 'S3', icon: Lightbulb, name: 'Aptitudes', description: 'Discover your natural strengths and skills' },
  { stage: 'S4', icon: Search, name: 'Interests', description: 'Explore industries and fields that excite you' },
  { stage: 'S5', icon: Settings2, name: 'Preferences', description: 'Define your ideal working style and environment' },
  { stage: 'S6', icon: FileBarChart, name: 'Career Fit Report', description: 'See your personalized career matches and insights' },
  { stage: 'S7', icon: Target, name: 'Plan Setup', description: 'Set your goals and preferences for action planning' },
  { stage: 'S8', icon: ListChecks, name: 'Action Plan', description: 'Get a step-by-step roadmap to your target role' },
  { stage: 'S9', icon: LayoutDashboard, name: 'Dashboard', description: 'Track your progress and access career tools' },
] as const;

const AssessmentJourney: React.FC = () => (
  <section className="py-12" aria-labelledby="journey-heading">
    <Container>
      <div className="text-center mb-10">
        <h2 id="journey-heading">Your Assessment Journey</h2>
        <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
          Here's what to expect — no surprises, just a guided career conversation.
        </p>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="lg:hidden flex flex-col relative">
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border" aria-hidden="true" />
        <div className="flex flex-col gap-6">
          {JOURNEY_STAGES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.stage} className="flex gap-4 items-start relative">
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
                  <span className="text-xs font-semibold text-muted-foreground">{s.stage}</span>
                </div>
                <div
                  className="flex-1 bg-card border border-border rounded-lg p-4 flex items-start gap-3 hover:shadow-sm transition-shadow duration-150"
                  title={s.description}
                >
                  <Icon size={20} className="text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{s.name}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: 2 rows of 5 */}
      <div className="hidden lg:flex flex-col gap-6">
        {[JOURNEY_STAGES.slice(0, 5), JOURNEY_STAGES.slice(5)].map((row, rowIdx) => (
          <div key={rowIdx} className="relative">
            <div className="absolute top-5 left-[5%] right-[5%] h-px bg-border" aria-hidden="true" />
            <div className="grid grid-cols-5 gap-4 relative">
              {row.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.stage}
                    className="flex flex-col items-center text-center bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-150 relative z-10"
                    title={s.description}
                  >
                    <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center mb-3">
                      <span className="text-xs font-semibold text-muted-foreground">{s.stage}</span>
                    </div>
                    <Icon size={20} className="text-muted-foreground mb-2" aria-hidden="true" />
                    <p className="text-sm font-semibold text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">{s.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// ── Section 7: Testimonials Carousel ─────────────────────────
const TESTIMONIALS = [
  {
    quote: "YourVue gave me clarity I'd been searching for. The 14-factor framework helped me understand why I felt stuck and showed me paths I'd never considered.",
    name: 'Sarah M.',
    role: 'Marketing Professional',
    stars: 5,
  },
  {
    quote: "As someone just starting out, I was overwhelmed by career options. The assessment broke it down into manageable steps and gave me a clear direction.",
    name: 'James K.',
    role: 'Recent Graduate',
    stars: 5,
  },
  {
    quote: "After 8 years in finance, I knew I wanted a change but didn't know where to start. The action plan was incredibly detailed and practical.",
    name: 'Priya R.',
    role: 'Career Changer',
    stars: 4,
  },
  {
    quote: "I was skeptical at first, but the depth of analysis surprised me. The career matches were spot-on and the skill gap analysis was eye-opening.",
    name: 'Alex T.',
    role: 'Senior Developer',
    stars: 5,
  },
] as const;

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

const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = TESTIMONIALS.length;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setActive((p) => (p + 1) % len), 5000);
    return () => clearInterval(timer);
  }, [paused, len]);

  const goTo = (idx: number) => {
    setActive(idx);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  };

  const t = TESTIMONIALS[active];

  return (
    <section
      className="py-12 bg-muted"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <h2 id="testimonials-heading" className="text-center mb-10">What Our Users Say</h2>

        <div
          className="relative max-w-2xl mx-auto"
          aria-roledescription="carousel"
          aria-label="User testimonials"
        >
          {/* Desktop arrows */}
          <button
            onClick={() => goTo((active - 1 + len) % len)}
            className="hidden lg:flex absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border border-border bg-card hover:bg-accent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="text-muted-foreground" />
          </button>
          <button
            onClick={() => goTo((active + 1) % len)}
            className="hidden lg:flex absolute -right-14 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full border border-border bg-card hover:bg-accent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>

          <div aria-live="polite" className="overflow-hidden">
            <figure
              key={active}
              className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center gap-4 shadow-sm animate-[fade-in_300ms_ease-out]"
            >
              <StarRating rating={t.stars} />
              <blockquote>
                <p className="text-lg italic text-foreground leading-relaxed">"{t.quote}"</p>
              </blockquote>
              <figcaption className="mt-2">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <span className="inline-block mt-1 text-xs text-muted-foreground bg-muted rounded-full px-3 py-1">
                  {t.role}
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  i === active ? 'bg-primary' : 'bg-border'
                }`}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
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

// ── Section 8a: Bottom Call to Action ─────────────────────────
const BottomCTA: React.FC = () => (
  <section
    className="py-16 bg-primary text-primary-foreground"
    aria-labelledby="final-cta-heading"
  >
    <Container>
      <div className="text-center max-w-2xl mx-auto">
        <h2 id="final-cta-heading" className="text-primary-foreground">
          Ready to Discover Your Path?
        </h2>
        <p className="mt-4 text-base text-primary-foreground opacity-90 leading-relaxed">
          Join thousands of professionals who've found career clarity with YourVue.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            asChild
          >
            <Link to="/register">
              Start Your Assessment
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            asChild
          >
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </Container>
  </section>
);

// ── Section 8b: Contact ───────────────────────────────────────
const ContactSection: React.FC = () => (
  <section className="py-8 bg-background" aria-label="Contact information">
    <Container>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0 text-center">
        <a
          href="mailto:contact@workvue.io"
          className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          contact@workvue.io
        </a>
        <span className="hidden lg:inline text-border mx-4" aria-hidden="true">|</span>
        <p className="text-sm text-muted-foreground">
          We typically respond within 2–3 business days
        </p>
        <span className="hidden lg:inline text-border mx-4" aria-hidden="true">|</span>
        <Link
          to="/help"
          className="text-sm text-primary underline hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          FAQ &amp; Help Center
        </Link>
      </div>
    </Container>
  </section>
);

// ── Section 8c: Privacy & Data Summary ────────────────────────
const PrivacySummary: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-6 bg-muted" aria-label="Privacy summary">
      <Container>
        <div className="max-w-2xl mx-auto">
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger
              className="flex items-center justify-center gap-2 w-full py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              aria-expanded={open}
            >
              <Shield size={16} className="text-success" aria-hidden="true" />
              Your data is safe with us
              <ChevronDown
                size={16}
                className={`text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 pb-1">
              <ul className="text-sm text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                <li>CV data is de-identified before AI processing</li>
                <li>You can delete your data at any time</li>
                <li>GDPR compliant</li>
                <li>Full encryption in transit and at rest</li>
              </ul>
              <Link
                to="/privacy"
                className="inline-block mt-3 text-sm text-primary underline hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                Read our full Privacy Policy
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </Container>
    </section>
  );
};

// ── Section 8d: Footer ────────────────────────────────────────
const SiteFooter: React.FC = () => (
  <footer className="py-6 bg-muted border-t border-border" role="contentinfo">
    <Container>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 YourVue. All rights reserved.</p>
        <nav className="flex flex-wrap gap-4 justify-center" aria-label="Footer navigation">
          <Link
            to="/privacy"
            className="hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Terms of Service
          </Link>
          <a
            href="mailto:contact@workvue.io"
            className="hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Contact
          </a>
        </nav>
      </div>
    </Container>
  </footer>
);

// ── Main landing page ─────────────────────────────────────────
const LandingPage: React.FC = () => (
  <>
    {/* SEO handled in index.html */}

    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <StatsSection />
        <WhyChooseSection />
        <HowItWorks />
        <AssessmentJourney />
        <Testimonials />
        <ReportPreview />
        <FAQ />
      </main>
      <BottomCTA />
      <ContactSection />
      <PrivacySummary />
      <SiteFooter />
    </div>
  </>
);

export default LandingPage;
