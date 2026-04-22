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
  Quote,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
  X,
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
/*  NARRATIVE CONCEPT — scrollytelling                         */
/* ────────────────────────────────────────────────────────── */

export default function NarrativeConcept() {
  const [openJob, setOpenJob] = React.useState<JobMatch | null>(null);
  const [showAnswers, setShowAnswers] = React.useState(true);

  return (
    <ReportFrame title="" subtitle="" tag="Concept · Narrative">
      {/* HERO — celebratory */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-subtle via-background to-success-subtle" />
          <div className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full bg-success/15 blur-3xl" />
        </div>
        <div className="mx-auto max-w-[1100px] px-6 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles size={12} />
            Career fit report · Generated for you
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl mx-auto">
            You showed up for this.<br />
            <span className="text-primary">Here's what you uncovered.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">{MATCH_SUMMARY}</p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Button size="lg" className="gap-2">
              Read your report <ArrowRight size={16} />
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Download size={16} /> Export PDF
            </Button>
          </div>
        </div>
      </section>

      {/* CHAPTER 01 — Behavioral signature (animated bars) */}
      <Chapter number="01" eyebrow="Behavioral signature" title="How you tend to operate.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BEHAVIORAL_TRAITS.map((t, i) => (
            <div
              key={t.label}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
              style={{ animation: `fadeUp 600ms ease-out ${i * 60}ms both` as React.CSSProperties["animation"] }}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">{t.label}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{t.intensity}</span>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-success transition-[width] duration-1000 ease-out"
                  style={{ width: `${t.intensity}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.description}</p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* CHAPTER 02 — Strengths */}
      <Chapter number="02" eyebrow="What you bring" title="Your strengths." tone="success">
        <div className="space-y-4">
          {STRENGTHS.map((s, i) => (
            <NarrativeRow key={s.title} item={s} index={i} tone="success" />
          ))}
        </div>
      </Chapter>

      {/* CHAPTER 03 — Growth */}
      <Chapter number="03" eyebrow="Where to stretch" title="Your growth edges." tone="warning">
        <div className="space-y-4">
          {GROWTH_AREAS.map((s, i) => (
            <NarrativeRow key={s.title} item={s} index={i} tone="warning" />
          ))}
        </div>
      </Chapter>

      {/* CHAPTER 04 — Improvement plan */}
      <Chapter number="04" eyebrow="The shape of the work" title="Three things to focus on.">
        <ol className="space-y-6">
          {IMPROVEMENTS.map((it, idx) => (
            <li key={it.title} className="grid grid-cols-[60px_1fr] gap-6 sm:gap-10 items-start">
              <div className="text-5xl sm:text-6xl font-bold text-primary/20 leading-none">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{it.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {it.suggestions.map((s) => (
                    <li key={s} className="text-base text-muted-foreground leading-relaxed flex gap-3">
                      <span className="mt-2.5 h-1 w-1 rounded-full bg-foreground/30 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Chapter>

      {/* CHAPTER 05 — Goal Timeline horizontal river */}
      <Chapter number="05" eyebrow="The next twelve months" title="A path, not a checklist.">
        <div className="relative -mx-6 sm:mx-0 overflow-x-auto pb-4">
          <div className="min-w-[900px] grid grid-cols-4 gap-0 px-6 sm:px-0">
            <div className="col-span-4 relative h-2 rounded-full bg-muted overflow-hidden mb-8">
              <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-primary/30 via-primary to-success rounded-full" />
            </div>
            {TIMELINE.map((p, idx) => (
              <div key={p.label} className="relative px-3 -mt-12">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-mono font-bold text-primary shadow-md mb-3",
                    idx === TIMELINE.length - 1 && "border-success text-success"
                  )}
                >
                  {idx + 1}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{p.label}</div>
                <h3 className="mt-1 text-lg font-semibold leading-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.narrative}</p>
                <div className="mt-3 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn("h-1 flex-1 rounded-full", i < p.intensity ? "bg-primary" : "bg-muted")}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Chapter>

      {/* CHAPTER 06 — Job recommendations */}
      <Chapter number="06" eyebrow="Where this leads" title="Roles that fit your shape.">
        <div className="space-y-12">
          <BucketSection
            kind="strong-fit"
            title="Strong Fit"
            description="These roles closely align with your skills, values, and interests. You're well-positioned to pursue these opportunities."
            jobs={STRONG_FIT_JOBS}
            onOpen={setOpenJob}
          />
          <BucketSection
            kind="high-potential"
            title="High Potential"
            description="These roles represent exciting growth paths. With targeted development, you can build towards these careers."
            jobs={HIGH_POTENTIAL_JOBS}
            onOpen={setOpenJob}
          />
        </div>
      </Chapter>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1100px] px-6 py-12 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            This report is yours. Revisit it whenever you need a reminder of where you're going.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAnswers((v) => !v)} className="gap-2">
              {showAnswers ? <EyeOff size={14} /> : <Eye size={14} />}
              {showAnswers ? "Hide answers" : "Show answers"}
            </Button>
            <Button size="sm" className="gap-2">
              <Download size={14} />
              Export PDF
            </Button>
          </div>
        </div>
      </footer>

      {openJob && <FullModal job={openJob} onClose={() => setOpenJob(null)} showAnswers={showAnswers} />}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ReportFrame>
  );
}

const Chapter: React.FC<{
  number: string;
  eyebrow: string;
  title: string;
  tone?: "success" | "warning" | "primary";
  children: React.ReactNode;
}> = ({ number, eyebrow, title, tone, children }) => {
  const eyebrowCls =
    tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-primary";
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1100px] px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-16">
          <div>
            <div className={cn("text-[11px] font-semibold uppercase tracking-[0.18em]", eyebrowCls)}>
              Chapter {number}
            </div>
            <div className="mt-2 text-xs font-mono text-muted-foreground">{eyebrow}</div>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight max-w-2xl">{title}</h2>
            <div className="mt-10">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NarrativeRow: React.FC<{
  item: { title: string; summary: string; detail: string };
  index: number;
  tone: "success" | "warning";
}> = ({ item, index, tone }) => {
  const [open, setOpen] = React.useState(index === 0);
  const accent = tone === "success" ? "border-l-success" : "border-l-warning";
  return (
    <div className={cn("rounded-xl border border-border border-l-4 bg-card", accent)}>
      <button onClick={() => setOpen((v) => !v)} className="w-full text-left p-5 sm:p-6 flex items-start gap-4 group">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold leading-snug group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="mt-1.5 text-base text-muted-foreground leading-relaxed">{item.summary}</p>
        </div>
        <ChevronDown
          size={18}
          className={cn("mt-1.5 text-muted-foreground transition-transform shrink-0", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="px-5 sm:px-6 pb-6">
          <p className="text-sm text-foreground/80 leading-relaxed border-l-2 border-border pl-4">{item.detail}</p>
        </div>
      )}
    </div>
  );
};

const BucketSection: React.FC<{
  kind: "strong-fit" | "high-potential";
  title: string;
  description: string;
  jobs: JobMatch[];
  onOpen: (j: JobMatch) => void;
}> = ({ kind, title, description, jobs, onOpen }) => {
  const c = matchTypeColor(kind);
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className={cn("h-10 w-1 rounded-full", c.bg)} />
        <div>
          <h3 className={cn("text-2xl font-semibold tracking-tight", c.text)}>{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((j) => (
          <NarrativeJobCard key={j.id} job={j} onOpen={() => onOpen(j)} />
        ))}
      </div>
    </div>
  );
};

const NarrativeJobCard: React.FC<{ job: JobMatch; onOpen: () => void }> = ({ job, onOpen }) => {
  const c = matchTypeColor(job.matchType);
  return (
    <button
      onClick={onOpen}
      className={cn(
        "group text-left rounded-xl bg-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border border-border"
      )}
    >
      <div className={cn("h-1 w-full", c.bg)} />
      <div className="p-6">
        <div className="flex items-center justify-between">
          <MatchTypeBadge matchType={job.matchType} />
          <ArrowRight size={16} className="text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </div>
        <h4 className="mt-3 text-xl font-semibold leading-tight">{job.title}</h4>
        <div className="mt-1 text-sm text-muted-foreground">{job.category}</div>
        <p className="mt-3 text-sm text-foreground/80 leading-relaxed line-clamp-2">{job.description}</p>
        <div className="mt-4 flex items-center gap-1.5 flex-wrap">
          <DemandPill level={job.demand} />
          <AIImpactPill impact={job.aiImpact} />
          {job.workTypes.slice(0, 1).map((w) => (
            <span key={w} className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs">
              <MapPin size={11} />
              {w}
            </span>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{job.salary}</span>
          {job.bridgePathway && <span className="ml-2">· Bridge pathway included</span>}
        </div>
      </div>
    </button>
  );
};

const FullModal: React.FC<{ job: JobMatch; onClose: () => void; showAnswers: boolean }> = ({
  job,
  onClose,
  showAnswers,
}) => {
  const [activeTab, setActiveTab] = React.useState<TabId>("overview");
  const c = matchTypeColor(job.matchType);

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-[1100px] px-6 py-4 flex items-center justify-between">
          <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
            <X size={16} /> Close
          </button>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {job.matchType === "strong-fit" ? "Strong Fit" : "High Potential"}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-6 py-12">
        <div className={cn("relative rounded-2xl overflow-hidden border border-border", c.subtle)}>
          <div className={cn("absolute top-0 left-0 right-0 h-1", c.bg)} />
          <div className="px-8 py-10">
            <MatchTypeBadge matchType={job.matchType} />
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">{job.title}</h2>
            <div className="mt-2 text-base text-muted-foreground">{job.category} · {job.salary}</div>
            <div className="mt-5 flex items-center gap-2 flex-wrap">
              <DemandPill level={job.demand} />
              <AIImpactPill impact={job.aiImpact} />
              {job.workTypes.map((w) => (
                <span key={w} className="inline-flex items-center gap-1 rounded-md bg-background border border-border px-2 py-0.5 text-xs">
                  <MapPin size={11} />{w}
                </span>
              ))}
            </div>
          </div>
        </div>

        {job.bridgePathway && (
          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-subtle/40 p-8">
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight size={16} className="text-primary" />
              <h4 className="text-base font-semibold">You're closer than you think</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <SectionLabel>Transferable strengths</SectionLabel>
                <ul className="mt-3 space-y-3">
                  {job.bridgePathway.transferable.map((t) => (
                    <li key={t.name}>
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="font-medium">{t.name}</span>
                        <span className="font-mono text-muted-foreground">{t.current} → {t.target}</span>
                      </div>
                      <div className="mt-1.5"><SkillProgress current={t.current} required={t.target} matchType="high-potential" /></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <SectionLabel>Path to getting there</SectionLabel>
                <ol className="mt-3 space-y-2 text-sm">
                  {job.bridgePathway.steps.map((s, i) => (
                    <li key={s} className="flex gap-3">
                      <span className="text-xs font-mono text-primary mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-muted-foreground leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <SectionLabel>Resources</SectionLabel>
                <ul className="mt-3 space-y-2">
                  {job.bridgePathway.resources.map((r) => (
                    <li key={r.title} className="rounded-md border border-border bg-background p-3">
                      <div className="text-sm font-medium">{r.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{r.platform} · {r.type}</div>
                    </li>
                  ))}
                </ul>
                <Button size="sm" className="mt-4 w-full">Add pathway to plan</Button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mt-10 border-b border-border">
          <div className="flex items-center gap-1 overflow-x-auto -mb-px">
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                    isActive ? cn(c.border, c.text) : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon size={14} />{t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <ModalTabContent tab={activeTab} job={job} />
        </div>

        <MatchExplanation job={job} showAnswers={showAnswers} />
      </div>
    </div>
  );
};

const ModalTabContent: React.FC<{ tab: TabId; job: JobMatch }> = ({ tab, job }) => {
  switch (tab) {
    case "overview":
      return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-foreground/90">{job.description}</p>
            <div>
              <SectionLabel>Core responsibilities</SectionLabel>
              <ul className="mt-3 space-y-2">
                {job.responsibilities.map((r) => (
                  <li key={r} className="text-sm text-muted-foreground flex gap-3">
                    <span className="mt-2 h-1 w-1 rounded-full bg-foreground/30" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="space-y-5">
            <div>
              <SectionLabel>Salary</SectionLabel>
              <div className="mt-1.5 text-lg font-mono">{job.salary}</div>
            </div>
            <div>
              <SectionLabel>Typical employers</SectionLabel>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {job.employers.map((e) => (
                  <span key={e} className="text-xs rounded-md bg-muted px-2 py-1">{e}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      );
    case "skills":
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <SectionLabel>Core skills</SectionLabel>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.skills.map((s) => <SkillBadge key={s.name} name={s.name} state={s.state} />)}
            </div>
            <div className="mt-6">
              <SectionLabel>Bonus skills</SectionLabel>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {job.bonusSkills.map((s) => (
                  <span key={s} className="text-xs rounded-md border border-border px-2 py-0.5 text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <SectionLabel>Priority skills to develop</SectionLabel>
            <ul className="mt-3 space-y-3">
              {job.prioritySkills.map((s) => (
                <li key={s.name}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-xs font-mono text-muted-foreground">{s.current} → {s.required}</span>
                  </div>
                  <div className="mt-1.5"><SkillProgress current={s.current} required={s.required} matchType={job.matchType} /></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "experience":
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <SectionLabel>Day-to-day</SectionLabel>
            <ol className="mt-3 space-y-2">
              {job.dayToDay.map((d, i) => (
                <li key={d} className="text-sm text-muted-foreground flex gap-3">
                  <span className="text-xs font-mono text-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                  {d}
                </li>
              ))}
            </ol>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <SectionLabel icon={<ThumbsUp size={12} className="text-success" />}>Pros</SectionLabel>
              <ul className="mt-2 space-y-1.5">{job.pros.map((p) => <li key={p} className="text-sm text-foreground/80 flex gap-2"><span className="text-success mt-2 h-1 w-1 rounded-full bg-current" />{p}</li>)}</ul>
            </div>
            <div>
              <SectionLabel icon={<ThumbsDown size={12} className="text-destructive" />}>Cons</SectionLabel>
              <ul className="mt-2 space-y-1.5">{job.cons.map((p) => <li key={p} className="text-sm text-foreground/80 flex gap-2"><span className="text-destructive mt-2 h-1 w-1 rounded-full bg-current" />{p}</li>)}</ul>
            </div>
          </div>
        </div>
      );
    case "learning":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {job.courses.map((c) => (
            <div key={c.title} className="rounded-lg border border-border p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium">{c.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{c.platform} · {c.type}</div>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
          ))}
        </div>
      );
    case "career":
      return (
        <div>
          <SectionLabel>Career progression</SectionLabel>
          <div className="mt-6 relative flex items-center justify-between max-w-3xl">
            <div className="absolute left-0 right-0 h-px bg-border top-1/2" />
            {["Junior", "Mid", "Senior", "Lead"].map((stage, i) => (
              <div key={stage} className="relative bg-background px-3 text-center">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center text-xs font-mono mx-auto border-2",
                  i === 1 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"
                )}>{i + 1}</div>
                <div className="mt-2 text-sm font-semibold">{stage}</div>
                <div className="text-[10px] text-muted-foreground">~{2 + i}y</div>
                {i === 1 && <div className="mt-1 text-[10px] font-semibold text-primary uppercase">You</div>}
              </div>
            ))}
          </div>
        </div>
      );
    case "insights":
      return (
        <div className="max-w-2xl">
          <Badge variant="outline" className="bg-primary-subtle text-primary border-primary/20">Career stage · Explorer</Badge>
          <p className="mt-4 text-base text-foreground/90 leading-relaxed">
            Tailored advice for your journey toward <strong>{job.title}</strong>: focus first on closing your highest-leverage
            skill gap, then on building one piece of public proof-of-work that demonstrates it in context.
          </p>
        </div>
      );
  }
};

const MatchExplanation: React.FC<{ job: JobMatch; showAnswers: boolean }> = ({ job, showAnswers }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mt-12 rounded-2xl border border-border bg-muted/30">
      <button onClick={() => setOpen((v) => !v)} className="w-full px-6 py-4 flex items-center justify-between text-sm hover:bg-muted/50 rounded-2xl">
        <span className="flex items-center gap-2 font-medium"><Lightbulb size={16} className="text-primary" />Which of my answers influenced this?</span>
        <ChevronDown size={16} className={cn("text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-6 pb-6 space-y-5">
          <div>
            <SectionLabel>Why this match</SectionLabel>
            <p className="mt-2 text-sm text-foreground/90 leading-relaxed">{job.whyMatch}</p>
          </div>
          <div>
            <SectionLabel icon={<Quote size={12} />}>Your answers</SectionLabel>
            {showAnswers ? (
              <ul className="mt-2 space-y-2">
                {job.contributingAnswers.map((a) => (
                  <li key={a} className="text-sm italic text-foreground/80 border-l-2 border-border pl-3">"{a}"</li>
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
                <span key={d} className="text-xs rounded-md bg-warning-subtle text-warning px-2 py-0.5">{d}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
