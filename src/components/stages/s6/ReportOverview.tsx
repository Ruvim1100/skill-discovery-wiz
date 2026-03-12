import React from "react";
import {
  BarChart,
  Users,
  Clock,
  Building,
  TrendingUp,
  Sprout,
  Lightbulb,
  Quote,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ReportData } from "./constants";

const ICON_MAP: Record<string, React.ElementType> = {
  BarChart,
  Users,
  Clock,
  Building,
};

interface ReportOverviewProps {
  report: ReportData;
}

export const ReportOverview: React.FC<ReportOverviewProps> = ({ report }) => {
  return (
    <div className="flex flex-col gap-10">
      {/* ── Target Statement ── */}
      <Card className="border-primary/20 bg-primary-subtle/50 overflow-hidden relative">
        <CardContent className="p-6 sm:p-8">
          <div className="flex gap-3 items-start">
            <Quote size={24} className="text-primary/40 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
                {report.target.statement}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                Based on your assessment across all 5 dimensions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Profile at a Glance ── */}
      <section>
        <SectionHeader
          icon={<BarChart size={18} className="text-info" />}
          title="Your Profile at a Glance"
          description="Key behavioral patterns we identified"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {report.behavioralSignals.map((signal) => {
            const Icon = ICON_MAP[signal.icon] ?? BarChart;
            return (
              <Card key={signal.label} className="border-border/60 hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-5 flex flex-col items-center text-center gap-2.5">
                  <div className="h-11 w-11 rounded-xl bg-primary/8 flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[13px] text-muted-foreground leading-tight">{signal.label}</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">{signal.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── Strengths & Growth side by side on desktop ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Strengths */}
        <section>
          <SectionHeader
            icon={<TrendingUp size={18} className="text-success" />}
            title="Key Strengths"
          />
          <div className="flex flex-col gap-3">
            {report.strengths.map((s) => (
              <Card key={s.title} className="border-l-[3px] border-l-success/60 border-t-0 border-r-0 border-b-0 rounded-l-sm">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-foreground leading-snug">{s.title}</p>
                  <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">{s.description}</p>
                </CardContent>
              </Card>
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
              <Card key={g.title} className="border-l-[3px] border-l-warning/60 border-t-0 border-r-0 border-b-0 rounded-l-sm">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-foreground leading-snug">{g.title}</p>
                  <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">{g.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* ── Next Steps ── */}
      <section>
        <SectionHeader
          icon={<Lightbulb size={18} className="text-info" />}
          title="Recommended Next Steps"
          description="Actions to accelerate your career journey"
        />
        <div className="flex flex-col gap-2.5">
          {report.suggestions.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
            >
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-info/10 text-info flex items-center justify-center text-xs font-bold mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-foreground leading-relaxed flex-1">{s}</p>
              <ArrowRight size={14} className="text-muted-foreground flex-shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ── Section Header helper ── */
const SectionHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
  description?: string;
}> = ({ icon, title, description }) => (
  <div className="flex items-start gap-2.5 mb-4">
    <div className="mt-0.5">{icon}</div>
    <div>
      <h3 className="text-base font-semibold text-foreground leading-tight">{title}</h3>
      {description && (
        <p className="text-[13px] text-muted-foreground mt-0.5">{description}</p>
      )}
    </div>
  </div>
);
