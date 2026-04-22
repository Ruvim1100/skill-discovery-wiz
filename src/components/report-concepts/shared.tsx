import * as React from "react";
import { TrendingUp, TrendingDown, Minus, Sparkles, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DemandLevel, AIImpact, MatchType, SkillState } from "./mockReport";

export const matchTypeColor = (m: MatchType) =>
  m === "strong-fit"
    ? { text: "text-success", bg: "bg-success", subtle: "bg-success-subtle", border: "border-success", ring: "ring-success" }
    : { text: "text-primary", bg: "bg-primary", subtle: "bg-primary-subtle", border: "border-primary", ring: "ring-primary" };

export const DemandPill: React.FC<{ level: DemandLevel }> = ({ level }) => {
  const map = {
    high: { label: "High demand", icon: TrendingUp, cls: "text-success bg-success-subtle" },
    moderate: { label: "Moderate demand", icon: Minus, cls: "text-warning bg-warning-subtle" },
    low: { label: "Low demand", icon: TrendingDown, cls: "text-destructive bg-destructive-subtle" },
  } as const;
  const { label, icon: Icon, cls } = map[level];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium", cls)}>
      <Icon size={12} />
      {label}
    </span>
  );
};

export const AIImpactPill: React.FC<{ impact: AIImpact }> = ({ impact }) => {
  const map = {
    positive: { label: "AI tailwind", cls: "text-success bg-success-subtle", dot: "bg-success" },
    neutral: { label: "AI neutral", cls: "text-warning bg-warning-subtle", dot: "bg-warning" },
    negative: { label: "AI headwind", cls: "text-destructive bg-destructive-subtle", dot: "bg-destructive" },
  } as const;
  const { label, cls, dot } = map[impact];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium", cls)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
      {label}
    </span>
  );
};

export const SkillBadge: React.FC<{ name: string; state: SkillState }> = ({ name, state }) => {
  const map = {
    known: "bg-success-subtle text-success border-success/20",
    intermediate: "bg-warning-subtle text-warning border-warning/20",
    gap: "bg-destructive-subtle text-destructive border-destructive/20",
  } as const;
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", map[state])}>
      {name}
    </span>
  );
};

export const MatchTypeBadge: React.FC<{ matchType: MatchType }> = ({ matchType }) => {
  const c = matchTypeColor(matchType);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold",
        matchType === "strong-fit" ? "bg-success-subtle text-success" : "bg-primary-subtle text-primary"
      )}
    >
      {matchType === "strong-fit" ? <Sparkles size={12} /> : <TrendingUp size={12} />}
      {matchType === "strong-fit" ? "Strong Fit" : "High Potential"}
    </span>
  );
};

export const SkillProgress: React.FC<{ current: number; required: number; matchType?: MatchType }> = ({
  current,
  required,
  matchType = "strong-fit",
}) => {
  const c = matchTypeColor(matchType);
  return (
    <div className="relative h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <div className={cn("absolute inset-y-0 left-0", c.bg, "opacity-30")} style={{ width: `${required}%` }} />
      <div className={cn("absolute inset-y-0 left-0", c.bg)} style={{ width: `${current}%` }} />
    </div>
  );
};

export const SectionLabel: React.FC<{ children: React.ReactNode; icon?: React.ReactNode }> = ({ children, icon }) => (
  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
    {icon}
    {children}
  </div>
);

export const ReportFrame: React.FC<{ title: string; subtitle: string; tag: string; children: React.ReactNode }> = ({
  title,
  subtitle,
  tag,
  children,
}) => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-[1280px] px-6 py-3 flex items-center justify-between">
        <a href="/report-concepts" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          ← All concepts
        </a>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{tag}</span>
      </div>
    </div>
    {children}
  </div>
);
