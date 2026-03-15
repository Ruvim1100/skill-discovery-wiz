import React, { useState } from "react";
import {
  TrendingUp,
  Sprout,
  Lightbulb,
  Quote,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp,
  Target,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ReportData } from "./constants";

interface ReportOverviewProps {
  report: ReportData;
}

/* ── Badge color map ── */
const SIGNAL_STYLES: Record<string, string> = {
  primary: "bg-primary-subtle text-primary",
  success: "bg-success-subtle text-success",
  warning: "bg-warning-subtle text-warning",
  info: "bg-primary-subtle text-info",
};

export const ReportOverview: React.FC<ReportOverviewProps> = ({ report }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* ── Behavioral Signal Tags ── */}
      <section>
        <SectionHeader
          title="Your Behavioral Profile"
          description="Key traits identified from your assessment"
        />
        <div className="flex flex-wrap gap-2.5">
          {report.behavioralSignals.map((signal) => (
            <Badge
              key={signal.label}
              variant="outline"
              className={cn(
                "text-sm font-medium px-4 py-1.5 rounded-full border-transparent",
                SIGNAL_STYLES[signal.color] ?? SIGNAL_STYLES.primary
              )}
            >
              {signal.label}
            </Badge>
          ))}
        </div>
      </section>

      {/* ── Target Setting Card ── */}
      <section>
        <Card className="border-primary bg-primary-subtle overflow-hidden">
          <CardContent className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <Target size={20} className="text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Your Career Target
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={14} className="text-muted-foreground cursor-help flex-shrink-0" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-sm">
                        This target reflects your readiness trajectory based on your values, aptitudes, interests, and preferences. It's a motivational benchmark, not a guarantee.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-lg sm:text-xl font-bold text-foreground">
                  {report.targetPercent}%+ within {report.targetTimeframe}
                </p>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Based on your profile across all five assessment dimensions, you're well-positioned
                  to make meaningful progress toward your target roles.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Strengths & Growth side by side ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Strengths */}
        <section>
          <SectionHeader
            icon={<TrendingUp size={18} className="text-success" />}
            title="Key Strengths"
          />
          <div className="flex flex-col gap-3">
            {report.strengths.map((s) => (
              <StrengthGrowthCard key={s.title} item={s} variant="strength" />
            ))}
          </div>
        </section>

        {/* Growth Areas */}
        <section>
          <SectionHeader
            icon={<Sprout size={18} className="text-warning" />}
            title="Growth Areas"
          />
          <div className="flex flex-col gap-3">
            {report.growthAreas.map((g) => (
              <StrengthGrowthCard key={g.title} item={g} variant="growth" />
            ))}
          </div>
        </section>
      </div>

      {/* ── Improvement Suggestions ── */}
      <section>
        <SectionHeader
          icon={<Lightbulb size={18} className="text-info" />}
          title="How to Improve"
          description="Actionable steps grouped by your growth areas"
        />
        <div className="flex flex-col gap-5">
          {report.improvements.map((improvement) => (
            <div key={improvement.area}>
              <h4 className="text-sm font-semibold text-foreground mb-2.5">{improvement.area}</h4>
              <ul className="flex flex-col gap-2">
                {improvement.suggestions.map((suggestion, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted text-sm text-foreground leading-relaxed"
                  >
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-info text-info-foreground flex items-center justify-center text-[11px] font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="flex-1">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Goal Achievement Timeline ── */}
      <section>
        <SectionHeader
          icon={<Calendar size={18} className="text-primary" />}
          title="Goal Achievement Timeline"
          description="Your projected milestones over the next year"
        />
        <GoalTimeline items={report.goalTimeline} />
      </section>
    </div>
  );
};

/* ── Collapsible Strength / Growth Card ── */
const StrengthGrowthCard: React.FC<{
  item: { title: string; summary: string; details: string };
  variant: "strength" | "growth";
}> = ({ item, variant }) => {
  const [open, setOpen] = useState(false);
  const isStrength = variant === "strength";

  return (
    <Card
      className={cn(
        "border-l-[3px] border-t-0 border-r-0 border-b-0 rounded-l-sm",
        isStrength ? "border-l-success" : "border-l-warning"
      )}
    >
      <CardContent className="p-4">
        <p className="text-sm font-semibold text-foreground leading-snug">{item.title}</p>
        <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">{item.summary}</p>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex items-center gap-1 mt-2.5 text-xs font-medium text-primary cursor-pointer hover:underline">
            {open ? "Hide details" : "Expand for details"}
            {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="text-[13px] text-muted-foreground mt-2.5 leading-relaxed border-t border-border pt-2.5">
              {item.details}
            </p>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

/* ── Goal Timeline ── */
const GoalTimeline: React.FC<{ items: { period: string; projection: string }[] }> = ({ items }) => {
  return (
    <>
      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-start gap-0">
        {items.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center text-center relative">
            {/* Connecting line */}
            {i < items.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full h-0.5 bg-border z-0" />
            )}
            {/* Node */}
            <div
              className={cn(
                "relative z-10 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 bg-background",
                i === 0
                  ? "border-muted-foreground text-muted-foreground"
                  : i === 1
                  ? "border-primary text-primary"
                  : "border-success text-success"
              )}
            >
              {item.period.replace(" months", "m").replace(" month", "m")}
            </div>
            <p className="text-sm font-semibold text-foreground mt-3">{item.period}</p>
            <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed max-w-[200px]">
              {item.projection}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="flex sm:hidden flex-col relative pl-8">
        <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-border" />
        {items.map((item, i) => (
          <div key={i} className="relative pb-6 last:pb-0">
            <div
              className={cn(
                "absolute left-[-21px] top-1 h-4 w-4 rounded-full border-2 bg-background",
                i === 0
                  ? "border-muted-foreground"
                  : i === 1
                  ? "border-primary"
                  : "border-success"
              )}
            />
            <p className="text-sm font-semibold text-foreground">{item.period}</p>
            <p className="text-[13px] text-muted-foreground mt-0.5 leading-relaxed">
              {item.projection}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

/* ── Section Header helper ── */
const SectionHeader: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description?: string;
}> = ({ icon, title, description }) => (
  <div className="flex items-start gap-2.5 mb-4">
    {icon && <div className="mt-0.5">{icon}</div>}
    <div>
      <h3 className="text-base font-semibold text-foreground leading-tight">{title}</h3>
      {description && (
        <p className="text-[13px] text-muted-foreground mt-0.5">{description}</p>
      )}
    </div>
  </div>
);
