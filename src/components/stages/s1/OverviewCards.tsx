import React from "react";
import { Heart, Brain, Compass, Briefcase, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DIMENSIONS = [
  {
    icon: Heart,
    title: "Values",
    description: "What matters most to you at work",
  },
  {
    icon: Brain,
    title: "Aptitudes",
    description: "Your natural strengths and skills",
  },
  {
    icon: Compass,
    title: "Interests",
    description: "Fields and industries that excite you",
  },
  {
    icon: Briefcase,
    title: "Preferences",
    description: "Your ideal working environment",
  },
  {
    icon: Users,
    title: "Scenarios",
    description: "How you handle real work situations",
  },
] as const;

export const OverviewCards: React.FC = () => (
  <section aria-labelledby="overview-heading" className="flex flex-col gap-5">
    <div>
      <h1 id="overview-heading" className="text-3xl font-bold text-foreground leading-tight">
        Welcome to Your Career Assessment
      </h1>
      <p className="mt-2 text-base text-muted-foreground leading-relaxed">
        You'll explore 5 dimensions of your career profile
      </p>
    </div>

    {/* Scrollable row on mobile, 5-col grid on desktop */}
    <div className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
      {DIMENSIONS.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="flex-shrink-0 w-36 lg:w-auto rounded-lg border p-4 flex flex-col items-center text-center gap-2"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--card)",
          }}
        >
          <div
            className="h-10 w-10 rounded-md flex items-center justify-center"
            style={{ backgroundColor: "var(--primary-subtle)", color: "var(--primary)" }}
          >
            <Icon size={20} aria-hidden="true" />
          </div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground leading-snug">{description}</p>
        </div>
      ))}
    </div>

    <div className="flex flex-col items-start gap-2">
      <Badge
        variant="secondary"
        className="gap-1.5 px-3 py-1.5 text-sm"
      >
        <Clock size={14} aria-hidden="true" />
        Estimated time: 10–15 minutes
      </Badge>
      <p className="text-sm text-muted-foreground">
        You'll receive a <span className="font-semibold text-foreground">Career Match Report</span> + <span className="font-semibold text-foreground">Action Plan</span>
      </p>
    </div>
  </section>
);
