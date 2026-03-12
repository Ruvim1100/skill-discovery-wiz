import React from "react";
import {
  BarChart,
  Users,
  Clock,
  Building,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex flex-col gap-8">
      {/* Behavioral Signals */}
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Profile at a Glance</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {report.behavioralSignals.map((signal) => {
            const Icon = ICON_MAP[signal.icon] ?? BarChart;
            return (
              <Card key={signal.label} className="text-center">
                <CardContent className="p-4 flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary-subtle flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">{signal.label}</p>
                  <p className="text-sm font-semibold text-foreground">{signal.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Target Statement */}
      <Card className="border-primary/20 bg-primary-subtle">
        <CardContent className="p-5">
          <p className="text-sm font-medium text-foreground leading-relaxed">
            {report.target.statement}
          </p>
        </CardContent>
      </Card>

      {/* Strengths */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-success" />
          <h3 className="text-lg font-semibold text-foreground">Key Strengths</h3>
        </div>
        <div className="flex flex-col gap-3">
          {report.strengths.map((s) => (
            <Card key={s.title} className="border-success/30">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-foreground">{s.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Growth Areas */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={20} className="text-warning" />
          <h3 className="text-lg font-semibold text-foreground">Growth Areas</h3>
        </div>
        <div className="flex flex-col gap-3">
          {report.growthAreas.map((g) => (
            <Card key={g.title} className="border-warning/30">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-foreground">{g.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{g.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Suggestions */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={20} className="text-info" />
          <h3 className="text-lg font-semibold text-foreground">Recommended Next Steps</h3>
        </div>
        <Card>
          <CardContent className="p-4">
            <ul className="flex flex-col gap-3">
              {report.suggestions.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-info/10 text-info flex items-center justify-center text-xs font-semibold">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
