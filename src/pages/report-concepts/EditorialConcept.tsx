import * as React from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Briefcase,
  ChevronDown,
  Download,
  Eye,
  EyeOff,
  GraduationCap,
  LayoutGrid,
  Lightbulb,
  MapPin,
  Plus,
  Quote,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  BEHAVIORAL_TRAITS,
  GROWTH_AREAS,
  HIGH_POTENTIAL_JOBS,
  IMPROVEMENTS,
  MATCH_SUMMARY,
  STRENGTHS,
  STRONG_FIT_JOBS,
  TIMELINE,
  type JobMatch,
} from "@/components/report-concepts/mockReport";
import {
  AIImpactPill,
  DemandPill,
  MatchTypeBadge,
  ReportFrame,
  SectionLabel,
  SkillBadge,
  SkillProgress,
  matchTypeColor,
} from "@/components/report-concepts/shared";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "learning", label: "Learning", icon: GraduationCap },
  { id: "career", label: "Career", icon: TrendingUp },
  { id: "insights", label: "Insights", icon: BookOpen },
] as const;
type TabId = typeof TABS[number]["id"];

/* ────────────────────────────────────────────────────────── */
/*  EDITORIAL CONCEPT — magazine layout                        */
/* ────────────────────────────────────────────────────────── */

export default function EditorialConcept() {
  const [showAnswers, setShowAnswers] = React.useState(true);
  return (
    <ReportFrame title="Your Career Fit Report" subtitle="" tag="Concept · Editorial">
      <div className="mx-auto max-w-[1200px] px-6 py-12 lg:py-16">
        {/* Masthead */}
        <header className="pb-12 border-b border-border">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Career Fit Report · Spring 2026
          </div>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            A report shaped by your own answers.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">{MATCH_SUMMARY}</p>
        </header>

        {/* Behavioral signature — radial chips */}
        <section className="py-16 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">
          <div>
            <SectionLabel>Behavioral signature</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Six traits, one shape.</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Length of each bar reflects how strongly the trait surfaced across your assessment — not a score, but a
              fingerprint of how you tend to operate.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
            {BEHAVIORAL_TRAITS.map((t) => (
              <div key={t.label} className="group">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-base font-semibold">{t.label}</span>
                  <span className="text-[11px] font-mono text-muted-foreground">{t.intensity}</span>
                </div>
                <div className="mt-2 h-1 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-foreground transition-[width] duration-700 ease-out"
                    style={{ width: `${t.intensity}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Strengths & growth — two-column drop cap editorial */}
        <section className="py-16 border-t border-border grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <StrengthsList title="Strengths" items={STRENGTHS} tone="success" icon={<TrendingUp size={14} />} />
          <StrengthsList title="Growth areas" items={GROWTH_AREAS} tone="warning" icon={<AlertTriangle size={14} />} />
        </section>

        {/* Improvement plan */}
        <section className="py-16 border-t border-border grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">
          <div>
            <SectionLabel>04 — Where to focus</SectionLabel>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">A plan, not a checklist.</h2>
          </div>
          <ol className="space-y-8">
            {IMPROVEMENTS.map((it, idx) => (
              <li key={it.title} className="grid grid-cols-[40px_1fr] gap-5">
                <div className="text-3xl font-mono font-semibold text-muted-foreground/40">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{it.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {it.suggestions.map((s) => (
                      <li key={s} className="text-sm text-muted-foreground leading-relaxed flex gap-3">
                        <span className="text-foreground/30 mt-2 h-1 w-1 rounded-full bg-current shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <a href="#strong-fit" className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                    View related jobs <ArrowRight size={12} />
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Goal Timeline — editorial vertical */}
        <section className="py-16 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 mb-10">
            <div>
              <SectionLabel>05 — Goal timeline</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">A year, paced.</h2>
            </div>
          </div>
          <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
            {TIMELINE.map((p, idx) => (
              <li key={p.label} className="bg-background p-6 flex flex-col gap-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    {p.label}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={cn("h-1 w-1 rounded-full", i < p.intensity ? "bg-primary" : "bg-muted")}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.narrative}</p>
                {idx < TIMELINE.length - 1 && (
                  <ArrowRight size={14} className="hidden md:block absolute -right-2 top-7 text-border bg-background" />
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* Job recommendations — editorial cards */}
        <section id="strong-fit" className="py-16 border-t border-border">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <SectionLabel>06 — Recommended roles</SectionLabel>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Where this profile leads.</h2>
            </div>
            <Badge variant="outline" className="text-xs">
              {STRONG_FIT_JOBS.length + HIGH_POTENTIAL_JOBS.length} matches
            </Badge>
          </div>

          <div className="mb-12">
            <BucketHeader
              kind="strong-fit"
              title="Strong Fit"
              description="These roles closely align with your skills, values, and interests. You're well-positioned to pursue these opportunities."
            />
            <div className="mt-6 grid gap-5">
              {STRONG_FIT_JOBS.map((j) => (
                <EditorialJobCard key={j.id} job={j} showAnswers={showAnswers} />
              ))}
            </div>
          </div>

          <div>
            <BucketHeader
              kind="high-potential"
              title="High Potential"
              description="These roles represent exciting growth paths. With targeted development, you can build towards these careers."
            />
            <div className="mt-6 grid gap-5">
              {HIGH_POTENTIAL_JOBS.map((j) => (
                <EditorialJobCard key={j.id} job={j} showAnswers={showAnswers} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer actions */}
        <footer className="py-12 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <Button variant="outline" size="sm" onClick={() => setShowAnswers((v) => !v)} className="gap-2">
            {showAnswers ? <EyeOff size={14} /> : <Eye size={14} />}
            {showAnswers ? "Hide my answers" : "Show my answers"}
          </Button>
          <Button size="sm" className="gap-2">
            <Download size={14} />
            Export PDF
          </Button>
        </footer>
      </div>
    </ReportFrame>
  );
}

const StrengthsList: React.FC<{
  title: string;
  items: typeof STRENGTHS;
  tone: "success" | "warning";
  icon: React.ReactNode;
}> = ({ title, items, tone, icon }) => {
  const [open, setOpen] = React.useState<number | null>(0);
  const dotCls = tone === "success" ? "bg-success" : "bg-warning";
  return (
    <div>
      <SectionLabel icon={icon}>{title}</SectionLabel>
      <ul className="mt-5 space-y-6">
        {items.map((s, i) => (
          <li key={s.title} className="border-b border-border pb-5 last:border-b-0">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left flex items-start gap-3 group"
            >
              <span className={cn("mt-2 h-1.5 w-1.5 rounded-full shrink-0", dotCls)} />
              <span className="flex-1">
                <span className="block text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                  {s.title}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground leading-relaxed">{s.summary}</span>
              </span>
              <ChevronDown
                size={16}
                className={cn("mt-2 text-muted-foreground transition-transform shrink-0", open === i && "rotate-180")}
              />
            </button>
            {open === i && (
              <p className="mt-3 ml-5 text-sm text-foreground/80 leading-relaxed border-l-2 border-border pl-4">
                {s.detail}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const BucketHeader: React.FC<{ kind: "strong-fit" | "high-potential"; title: string; description: string }> = ({
  kind,
  title,
  description,
}) => {
  const c = matchTypeColor(kind);
  return (
    <div className="flex items-start gap-4">
      <div className={cn("mt-1.5 h-8 w-1 rounded-full", c.bg)} />
      <div>
        <h3 className={cn("text-2xl font-semibold tracking-tight", c.text)}>{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

/* ── Job card with side-pane tabs ────────────────────────── */

const EditorialJobCard: React.FC<{ job: JobMatch; showAnswers: boolean }> = ({ job, showAnswers }) => {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<TabId>("overview");
  const c = matchTypeColor(job.matchType);

  return (
    <article
      className={cn(
        "rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md",
        "border-t-2",
        c.border
      )}
    >
      <header className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <MatchTypeBadge matchType={job.matchType} />
              <span className="text-xs text-muted-foreground">{job.category}</span>
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight">{job.title}</h3>
            <div className="mt-1.5 text-xs text-muted-foreground">
              Also: {job.alternateTitles.slice(0, 2).join(" · ")}
              {job.alternateTitles.length > 2 && ` · +${job.alternateTitles.length - 2} more`}
            </div>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <DemandPill level={job.demand} />
              <AIImpactPill impact={job.aiImpact} />
              {job.workTypes.map((w) => (
                <span
                  key={w}
                  className="inline-flex items-center gap-1 rounded-md bg-muted text-muted-foreground px-2 py-0.5 text-xs"
                >
                  <MapPin size={11} />
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Add to compare">
              <Plus size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Add to goals">
              <Sparkles size={14} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Similar roles">
              <Users size={14} />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setOpen((v) => !v)} className="ml-1 gap-1.5">
              {open ? "Collapse" : "Explore"}
              <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
            </Button>
          </div>
        </div>
      </header>

      {open && (
        <div className="border-t border-border bg-muted/30">
          {job.bridgePathway && <BridgePathway job={job} />}
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-0">
            {/* Side tabs */}
            <nav className="border-b lg:border-b-0 lg:border-r border-border p-3 flex lg:flex-col gap-1 overflow-x-auto">
              {TABS.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left whitespace-nowrap",
                      isActive
                        ? cn(c.subtle, c.text)
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon size={14} />
                    {t.label}
                  </button>
                );
              })}
            </nav>
            <div className="p-6 bg-background">
              <TabContent tab={activeTab} job={job} />
            </div>
          </div>
          <MatchExplanationFooter job={job} showAnswers={showAnswers} />
        </div>
      )}
    </article>
  );
};

const BridgePathway: React.FC<{ job: JobMatch }> = ({ job }) => {
  if (!job.bridgePathway) return null;
  const bp = job.bridgePathway;
  return (
    <div className="border-b border-border bg-primary-subtle/40 p-6">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center">
          <ArrowRight size={12} className="text-primary" />
        </div>
        <h4 className="text-sm font-semibold">You're closer than you think</h4>
      </div>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <SectionLabel>Transferable strengths</SectionLabel>
          <ul className="mt-3 space-y-3">
            {bp.transferable.map((t) => (
              <li key={t.name}>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-muted-foreground font-mono">
                    {t.current} → {t.target}
                  </span>
                </div>
                <div className="mt-1.5">
                  <SkillProgress current={t.current} required={t.target} matchType="high-potential" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionLabel>Your path to getting there</SectionLabel>
          <ol className="mt-3 space-y-2 text-sm">
            {bp.steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="text-xs font-mono text-primary mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-muted-foreground leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionLabel>Recommended resources</SectionLabel>
          <ul className="mt-3 space-y-2">
            {bp.resources.map((r) => (
              <li key={r.title} className="rounded-md border border-border bg-background p-3">
                <div className="text-sm font-medium">{r.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {r.platform} · {r.type}
                </div>
              </li>
            ))}
          </ul>
          <Button size="sm" className="mt-4 w-full">
            Add pathway to plan
          </Button>
        </div>
      </div>
    </div>
  );
};

const TabContent: React.FC<{ tab: TabId; job: JobMatch }> = ({ tab, job }) => {
  switch (tab) {
    case "overview":
      return (
        <div className="space-y-6 max-w-2xl">
          <p className="text-sm leading-relaxed text-foreground/90">{job.description}</p>
          <div>
            <SectionLabel>Salary range</SectionLabel>
            <p className="mt-1.5 text-base font-mono">{job.salary}</p>
          </div>
          <div>
            <SectionLabel>Core responsibilities</SectionLabel>
            <ul className="mt-2 space-y-1.5">
              {job.responsibilities.map((r) => (
                <li key={r} className="text-sm text-muted-foreground flex gap-3">
                  <span className="mt-2 h-1 w-1 rounded-full bg-foreground/30" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel>Typical employers</SectionLabel>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {job.employers.map((e) => (
                <span key={e} className="text-xs rounded-md bg-muted px-2 py-1">
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    case "skills":
      return (
        <div className="space-y-6 max-w-2xl">
          <div>
            <SectionLabel>Core skills</SectionLabel>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {job.skills.map((s) => (
                <SkillBadge key={s.name} name={s.name} state={s.state} />
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Priority skills to develop</SectionLabel>
            <ul className="mt-3 space-y-3">
              {job.prioritySkills.map((s) => (
                <li key={s.name}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {s.current} → {s.required}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <SkillProgress current={s.current} required={s.required} matchType={job.matchType} />
                  </div>
                </li>
              ))}
            </ul>
            <Button size="sm" variant="outline" className="mt-4">
              Add missing skills to goals
            </Button>
          </div>
          <div>
            <SectionLabel>Bonus skills</SectionLabel>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {job.bonusSkills.map((s) => (
                <span key={s} className="text-xs rounded-md border border-border px-2 py-0.5 text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    case "experience":
      return (
        <div className="space-y-6 max-w-2xl">
          <div>
            <SectionLabel>Day-to-day</SectionLabel>
            <ol className="mt-2 space-y-1.5">
              {job.dayToDay.map((d, i) => (
                <li key={d} className="text-sm text-muted-foreground flex gap-3">
                  <span className="text-xs font-mono text-foreground/40 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  {d}
                </li>
              ))}
            </ol>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <SectionLabel icon={<ThumbsUp size={12} className="text-success" />}>Pros</SectionLabel>
              <ul className="mt-2 space-y-1.5">
                {job.pros.map((p) => (
                  <li key={p} className="text-sm text-foreground/80 flex gap-2">
                    <span className="text-success mt-2 h-1 w-1 rounded-full bg-current shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel icon={<ThumbsDown size={12} className="text-destructive" />}>Cons</SectionLabel>
              <ul className="mt-2 space-y-1.5">
                {job.cons.map((p) => (
                  <li key={p} className="text-sm text-foreground/80 flex gap-2">
                    <span className="text-destructive mt-2 h-1 w-1 rounded-full bg-current shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    case "learning":
      return (
        <div className="space-y-3 max-w-2xl">
          <SectionLabel>Recommended courses & certifications</SectionLabel>
          {job.courses.map((c) => (
            <div key={c.title} className="rounded-lg border border-border p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium">{c.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {c.platform} · {c.type}
                </div>
              </div>
              <Button size="sm" variant="outline">
                View
              </Button>
            </div>
          ))}
        </div>
      );
    case "career":
      return (
        <div className="max-w-2xl">
          <SectionLabel>Career progression</SectionLabel>
          <ol className="mt-4 relative pl-6 border-l border-border space-y-5">
            {["Junior", "Mid", "Senior", "Lead"].map((stage, i) => (
              <li key={stage} className="relative">
                <span
                  className={cn(
                    "absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-background",
                    i === 1 ? "bg-primary" : "bg-muted-foreground/40"
                  )}
                />
                <div className="text-sm font-semibold">{stage}</div>
                <div className="text-xs text-muted-foreground mt-0.5">~{2 + i} years typical</div>
                {i === 1 && (
                  <span className="mt-1 inline-block text-[11px] font-semibold text-primary uppercase tracking-wider">
                    You are here
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      );
    case "insights":
      return (
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-md bg-primary-subtle text-primary px-2.5 py-1 text-xs font-semibold">
            Career stage · Explorer
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            Tailored advice for your journey toward <strong>{job.title}</strong>: focus first on closing your highest-leverage
            skill gap, then on building one piece of public proof-of-work that demonstrates it in context. Most candidates skip
            the second step — don't.
          </p>
        </div>
      );
  }
};

const MatchExplanationFooter: React.FC<{ job: JobMatch; showAnswers: boolean }> = ({ job, showAnswers }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-t border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-6 py-3 flex items-center justify-between text-sm hover:bg-muted/50 transition-colors"
      >
        <span className="flex items-center gap-2 text-muted-foreground">
          <Lightbulb size={14} />
          Which of my answers influenced this?
        </span>
        <ChevronDown size={14} className={cn("text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-6 pb-6 space-y-4">
          <div>
            <SectionLabel>Why this match</SectionLabel>
            <p className="mt-2 text-sm text-foreground/90 leading-relaxed">{job.whyMatch}</p>
          </div>
          <div>
            <SectionLabel icon={<Quote size={12} />}>Your answers that contributed</SectionLabel>
            {showAnswers ? (
              <ul className="mt-2 space-y-2">
                {job.contributingAnswers.map((a) => (
                  <li
                    key={a}
                    className="text-sm italic text-foreground/80 border-l-2 border-border pl-3 leading-relaxed"
                  >
                    "{a}"
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground italic">Your answer excerpts are hidden.</p>
            )}
          </div>
          <div>
            <SectionLabel icon={<AlertTriangle size={12} className="text-warning" />}>Areas for development</SectionLabel>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {job.developmentAreas.map((d) => (
                <span key={d} className="text-xs rounded-md bg-warning-subtle text-warning px-2 py-0.5">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
