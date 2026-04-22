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

const SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "strengths", label: "Strengths" },
  { id: "growth", label: "Growth" },
  { id: "plan", label: "Plan" },
  { id: "timeline", label: "Timeline" },
  { id: "matches", label: "Matches" },
];

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
/*  DASHBOARD CONCEPT — bento grid + split-pane               */
/* ────────────────────────────────────────────────────────── */

export default function DashboardConcept() {
  const [openJob, setOpenJob] = React.useState<JobMatch | null>(null);
  const [showAnswers, setShowAnswers] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState("profile");

  return (
    <ReportFrame title="" subtitle="" tag="Concept · Dashboard">
      <div className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
          {/* Sticky section nav */}
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-3">
                Sections
              </div>
              <ul className="space-y-1">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setActiveSection(s.id)}
                      className={cn(
                        "block px-3 py-1.5 rounded-md text-sm transition-colors",
                        activeSection === s.id
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-border space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={() => setShowAnswers((v) => !v)}>
                  {showAnswers ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showAnswers ? "Hide answers" : "Show answers"}
                </Button>
                <Button size="sm" className="w-full justify-start gap-2">
                  <Download size={14} />
                  Export PDF
                </Button>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            {/* Header */}
            <header className="pb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Career fit report</span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Your assessment, decoded.</h1>
              <p className="mt-3 text-base text-muted-foreground max-w-2xl leading-relaxed">{MATCH_SUMMARY}</p>
            </header>

            {/* BENTO row 1 — profile + summary */}
            <section id="profile" className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Behavioral signature — radar-style chips */}
              <div className="md:col-span-8 rounded-xl border border-border bg-card p-6">
                <div className="flex items-baseline justify-between mb-5">
                  <SectionLabel>Behavioral signature</SectionLabel>
                  <span className="text-[11px] text-muted-foreground">{BEHAVIORAL_TRAITS.length} traits</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
                  {BEHAVIORAL_TRAITS.map((t) => (
                    <div key={t.label} className="group">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold truncate">{t.label}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{t.intensity}</span>
                      </div>
                      <div className="mt-2 h-[3px] rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary transition-[width] duration-700 ease-out"
                          style={{ width: `${t.intensity}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-snug">{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Match counters */}
              <div className="md:col-span-4 grid grid-rows-2 gap-4">
                <StatTile
                  label="Strong fit roles"
                  value={STRONG_FIT_JOBS.length}
                  description="Closely aligned with your skills, values, interests"
                  tone="success"
                />
                <StatTile
                  label="High potential roles"
                  value={HIGH_POTENTIAL_JOBS.length}
                  description="Stretch paths within reach"
                  tone="primary"
                />
              </div>
            </section>

            {/* BENTO row 2 — strengths / growth */}
            <section className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div id="strengths" className="rounded-xl border border-border bg-card p-6">
                <SectionLabel icon={<TrendingUp size={12} className="text-success" />}>Strengths</SectionLabel>
                <ul className="mt-4 space-y-3">
                  {STRENGTHS.map((s, i) => (
                    <ExpandableItem key={s.title} item={s} index={i} tone="success" />
                  ))}
                </ul>
              </div>
              <div id="growth" className="rounded-xl border border-border bg-card p-6">
                <SectionLabel icon={<AlertTriangle size={12} className="text-warning" />}>Growth areas</SectionLabel>
                <ul className="mt-4 space-y-3">
                  {GROWTH_AREAS.map((s, i) => (
                    <ExpandableItem key={s.title} item={s} index={i} tone="warning" />
                  ))}
                </ul>
              </div>
            </section>

            {/* Improvement plan */}
            <section id="plan" className="mt-4 rounded-xl border border-border bg-card p-6">
              <SectionLabel>Where to focus next</SectionLabel>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {IMPROVEMENTS.map((it, idx) => (
                  <div key={it.title} className="rounded-lg border border-border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="h-6 w-6 rounded-md bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h3 className="text-sm font-semibold">{it.title}</h3>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {it.suggestions.map((s) => (
                        <li key={s} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground/30 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Goal Timeline — horizontal track */}
            <section id="timeline" className="mt-4 rounded-xl border border-border bg-card p-6">
              <div className="flex items-baseline justify-between mb-5">
                <SectionLabel>Goal timeline · 12 months</SectionLabel>
                <span className="text-[11px] text-muted-foreground">Intensity ramps over time</span>
              </div>
              <div className="relative">
                <div className="absolute left-0 right-0 top-3 h-px bg-border" />
                <div className="absolute left-0 top-3 h-px bg-gradient-to-r from-primary via-primary to-primary/40 transition-all" style={{ width: "100%" }} />
                <ol className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
                  {TIMELINE.map((p, idx) => (
                    <li key={p.label} className="relative">
                      <div
                        className={cn(
                          "h-6 w-6 rounded-full border-2 border-background ring-1 ring-border bg-primary flex items-center justify-center text-[10px] font-mono text-primary-foreground",
                          "shadow-sm"
                        )}
                        style={{ opacity: 0.4 + p.intensity * 0.12 }}
                      >
                        {idx + 1}
                      </div>
                      <div className="mt-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        {p.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold leading-tight">{p.title}</div>
                      <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{p.narrative}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Matches */}
            <section id="matches" className="mt-8">
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="text-xl font-semibold tracking-tight">Job recommendations</h2>
                <Badge variant="outline" className="text-xs">
                  {STRONG_FIT_JOBS.length + HIGH_POTENTIAL_JOBS.length} matches
                </Badge>
              </div>

              <div className="space-y-6">
                <BucketBlock
                  kind="strong-fit"
                  title="Strong Fit"
                  description="These roles closely align with your skills, values, and interests."
                  jobs={STRONG_FIT_JOBS}
                  onOpen={setOpenJob}
                />
                <BucketBlock
                  kind="high-potential"
                  title="High Potential"
                  description="These roles represent exciting growth paths you can build towards."
                  jobs={HIGH_POTENTIAL_JOBS}
                  onOpen={setOpenJob}
                />
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Split-pane drawer */}
      {openJob && <JobDrawer job={openJob} onClose={() => setOpenJob(null)} showAnswers={showAnswers} />}
    </ReportFrame>
  );
}

/* ───────────── pieces ───────────── */

const StatTile: React.FC<{ label: string; value: number; description: string; tone: "success" | "primary" }> = ({
  label,
  value,
  description,
  tone,
}) => {
  const cls =
    tone === "success" ? "border-success/30 bg-success-subtle" : "border-primary/30 bg-primary-subtle";
  const text = tone === "success" ? "text-success" : "text-primary";
  return (
    <div className={cn("rounded-xl border p-5 flex flex-col justify-between", cls)}>
      <div>
        <SectionLabel>{label}</SectionLabel>
        <div className={cn("mt-2 text-4xl font-bold tabular-nums", text)}>{value}</div>
      </div>
      <p className="text-xs text-foreground/70 leading-relaxed mt-3">{description}</p>
    </div>
  );
};

const ExpandableItem: React.FC<{
  item: { title: string; summary: string; detail: string };
  index: number;
  tone: "success" | "warning";
}> = ({ item, index, tone }) => {
  const [open, setOpen] = React.useState(index === 0);
  const dot = tone === "success" ? "bg-success" : "bg-warning";
  return (
    <li className="border-b border-border last:border-b-0 pb-3 last:pb-0">
      <button onClick={() => setOpen((v) => !v)} className="w-full text-left flex items-start gap-3 group">
        <span className={cn("mt-2 h-1.5 w-1.5 rounded-full shrink-0", dot)} />
        <span className="flex-1">
          <span className="block text-sm font-semibold leading-snug">{item.title}</span>
          <span className="mt-0.5 block text-xs text-muted-foreground leading-relaxed">{item.summary}</span>
        </span>
        <ChevronDown
          size={14}
          className={cn("mt-1 text-muted-foreground transition-transform shrink-0", open && "rotate-180")}
        />
      </button>
      {open && (
        <p className="mt-2 ml-5 text-xs text-foreground/80 leading-relaxed border-l-2 border-border pl-3">
          {item.detail}
        </p>
      )}
    </li>
  );
};

const BucketBlock: React.FC<{
  kind: "strong-fit" | "high-potential";
  title: string;
  description: string;
  jobs: JobMatch[];
  onOpen: (j: JobMatch) => void;
}> = ({ kind, title, description, jobs, onOpen }) => {
  const c = matchTypeColor(kind);
  return (
    <div>
      <div className="flex items-start gap-3 mb-3">
        <div className={cn("mt-1.5 h-7 w-1 rounded-full", c.bg)} />
        <div>
          <h3 className={cn("text-base font-semibold", c.text)}>{title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground max-w-2xl">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {jobs.map((j) => (
          <CompactJobCard key={j.id} job={j} onOpen={() => onOpen(j)} />
        ))}
      </div>
    </div>
  );
};

const CompactJobCard: React.FC<{ job: JobMatch; onOpen: () => void }> = ({ job, onOpen }) => {
  const c = matchTypeColor(job.matchType);
  return (
    <button
      onClick={onOpen}
      className={cn(
        "text-left rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5",
        "border-l-2",
        c.border
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <MatchTypeBadge matchType={job.matchType} />
          <h4 className="mt-2 text-base font-semibold leading-tight">{job.title}</h4>
          <div className="mt-0.5 text-xs text-muted-foreground">{job.category}</div>
        </div>
        <ArrowRight size={16} className="text-muted-foreground mt-1" />
      </div>
      <div className="mt-3 flex items-center gap-1.5 flex-wrap">
        <DemandPill level={job.demand} />
        <AIImpactPill impact={job.aiImpact} />
      </div>
      <div className="mt-3 text-xs text-muted-foreground line-clamp-2 leading-relaxed">{job.description}</div>
    </button>
  );
};

const JobDrawer: React.FC<{ job: JobMatch; onClose: () => void; showAnswers: boolean }> = ({
  job,
  onClose,
  showAnswers,
}) => {
  const [activeTab, setActiveTab] = React.useState<TabId>("overview");
  const c = matchTypeColor(job.matchType);

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <aside className="w-full max-w-[860px] bg-background border-l border-border shadow-2xl overflow-hidden flex flex-col">
        <header className={cn("border-b border-border", c.subtle)}>
          <div className="px-6 py-5 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <MatchTypeBadge matchType={job.matchType} />
              <h2 className="mt-2 text-2xl font-bold tracking-tight">{job.title}</h2>
              <div className="mt-1 text-sm text-muted-foreground">
                {job.category} · {job.salary}
              </div>
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                <DemandPill level={job.demand} />
                <AIImpactPill impact={job.aiImpact} />
                {job.workTypes.map((w) => (
                  <span key={w} className="inline-flex items-center gap-1 rounded-md bg-background border border-border px-2 py-0.5 text-xs">
                    <MapPin size={10} />
                    {w}
                  </span>
                ))}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X size={16} />
            </Button>
          </div>
          <div className="px-6 pb-3 flex items-center gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap -mb-px",
                    isActive
                      ? cn(c.border, c.text)
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon size={14} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          {job.bridgePathway && (
            <div className="border-b border-border bg-primary-subtle/40 px-6 py-5">
              <div className="flex items-center gap-2">
                <ArrowRight size={14} className="text-primary" />
                <h4 className="text-sm font-semibold">You're closer than you think</h4>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <SectionLabel>Transferable strengths</SectionLabel>
                  <ul className="mt-2 space-y-2">
                    {job.bridgePathway.transferable.map((t) => (
                      <li key={t.name}>
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="font-medium">{t.name}</span>
                          <span className="font-mono text-muted-foreground">{t.current} → {t.target}</span>
                        </div>
                        <div className="mt-1"><SkillProgress current={t.current} required={t.target} matchType="high-potential" /></div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <SectionLabel>Path to getting there</SectionLabel>
                  <ol className="mt-2 space-y-1.5 text-xs">
                    {job.bridgePathway.steps.map((s, i) => (
                      <li key={s} className="flex gap-2">
                        <span className="font-mono text-primary">{i + 1}.</span>
                        <span className="text-muted-foreground leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ol>
                  <Button size="sm" className="mt-3 w-full">Add pathway to plan</Button>
                </div>
              </div>
            </div>
          )}
          <div className="p-6">
            <DrawerTabContent tab={activeTab} job={job} />
          </div>
          <MatchExplanationBlock job={job} showAnswers={showAnswers} />
        </div>
      </aside>
    </div>
  );
};

const DrawerTabContent: React.FC<{ tab: TabId; job: JobMatch }> = ({ tab, job }) => {
  switch (tab) {
    case "overview":
      return (
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-foreground/90 max-w-2xl">{job.description}</p>
          <div>
            <SectionLabel>Core responsibilities</SectionLabel>
            <ul className="mt-2 space-y-1.5 max-w-2xl">
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
                <span key={e} className="text-xs rounded-md bg-muted px-2 py-1">{e}</span>
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
              {job.skills.map((s) => <SkillBadge key={s.name} name={s.name} state={s.state} />)}
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
        <div className="space-y-5 max-w-2xl">
          <div>
            <SectionLabel>Day-to-day</SectionLabel>
            <ol className="mt-2 space-y-1.5">
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
              <ul className="mt-2 space-y-1.5">
                {job.pros.map((p) => <li key={p} className="text-sm text-foreground/80 flex gap-2"><span className="text-success mt-2 h-1 w-1 rounded-full bg-current" />{p}</li>)}
              </ul>
            </div>
            <div>
              <SectionLabel icon={<ThumbsDown size={12} className="text-destructive" />}>Cons</SectionLabel>
              <ul className="mt-2 space-y-1.5">
                {job.cons.map((p) => <li key={p} className="text-sm text-foreground/80 flex gap-2"><span className="text-destructive mt-2 h-1 w-1 rounded-full bg-current" />{p}</li>)}
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
                <div className="mt-0.5 text-xs text-muted-foreground">{c.platform} · {c.type}</div>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
          ))}
        </div>
      );
    case "career":
      return (
        <div className="max-w-2xl">
          <SectionLabel>Career progression</SectionLabel>
          <ol className="mt-4 grid grid-cols-4 gap-3">
            {["Junior", "Mid", "Senior", "Lead"].map((stage, i) => (
              <li key={stage} className={cn("rounded-lg border p-3 text-center", i === 1 ? "border-primary bg-primary-subtle" : "border-border")}>
                <div className="text-sm font-semibold">{stage}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">~{2 + i}y</div>
                {i === 1 && <div className="mt-1 text-[10px] font-semibold text-primary uppercase">You</div>}
              </li>
            ))}
          </ol>
        </div>
      );
    case "insights":
      return (
        <div className="space-y-3 max-w-2xl">
          <Badge variant="outline" className="bg-primary-subtle text-primary border-primary/20">Career stage · Explorer</Badge>
          <p className="text-sm text-foreground/90 leading-relaxed">
            Tailored advice for your journey toward <strong>{job.title}</strong>: focus first on closing your highest-leverage skill gap,
            then on building one piece of public proof-of-work that demonstrates it in context.
          </p>
        </div>
      );
  }
};

const MatchExplanationBlock: React.FC<{ job: JobMatch; showAnswers: boolean }> = ({ job, showAnswers }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-t border-border bg-muted/30">
      <button onClick={() => setOpen((v) => !v)} className="w-full px-6 py-3 flex items-center justify-between text-sm hover:bg-muted/50">
        <span className="flex items-center gap-2 text-muted-foreground"><Lightbulb size={14} />Which of my answers influenced this?</span>
        <ChevronDown size={14} className={cn("text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-6 pb-6 space-y-4">
          <div>
            <SectionLabel>Why this match</SectionLabel>
            <p className="mt-2 text-sm text-foreground/90 leading-relaxed max-w-2xl">{job.whyMatch}</p>
          </div>
          <div>
            <SectionLabel icon={<Quote size={12} />}>Your answers</SectionLabel>
            {showAnswers ? (
              <ul className="mt-2 space-y-2 max-w-2xl">
                {job.contributingAnswers.map((a) => (
                  <li key={a} className="text-sm italic text-foreground/80 border-l-2 border-border pl-3">"{a}"</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground italic">Your answer excerpts are hidden.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
