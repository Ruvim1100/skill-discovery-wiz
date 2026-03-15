import React, { useState } from "react";
import {
  MapPin,
  DollarSign,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Sparkles,
  LayoutList,
  Plus,
  Target,
  Eye,
  Check,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { JobMatch } from "./constants";

interface JobCardProps {
  job: JobMatch;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [expanded, setExpanded] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const [addedCompare, setAddedCompare] = useState(false);
  const [addedGoals, setAddedGoals] = useState(false);

  const isStrongFit = job.category === "strong-fit";

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200",
        expanded ? "shadow-md" : "shadow-sm hover:shadow-md",
        isStrongFit ? "border-success" : "border-primary"
      )}
    >
      {/* ── Gradient Header Bar ── */}
      <div
        className={cn(
          "h-1.5",
          isStrongFit
            ? "bg-gradient-to-r from-success to-success"
            : "bg-gradient-to-r from-primary to-info"
        )}
      />

      {/* ── Header (always visible) ── */}
      <button
        type="button"
        className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer hover:bg-muted transition-colors"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
            <h4 className="text-base font-semibold text-foreground leading-snug">{job.title}</h4>
            <Badge
              className={cn(
                "text-[11px] font-semibold px-2.5 py-0.5 border-transparent",
                isStrongFit
                  ? "bg-success-subtle text-success"
                  : "bg-primary-subtle text-primary"
              )}
              variant="outline"
            >
              {isStrongFit ? "Strong Fit" : "High Potential"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{job.company}</p>

          {/* Tags */}
          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-2.5 text-[13px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <DollarSign size={14} className="text-success" aria-hidden="true" />
              {job.salary}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-primary" aria-hidden="true" />
              {job.location}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {expanded ? (
            <ChevronUp size={16} className="text-muted-foreground" />
          ) : (
            <ChevronDown size={16} className="text-muted-foreground" />
          )}
        </div>
      </button>

      {/* ── Expanded Content ── */}
      {expanded && (
        <CardContent className="px-5 sm:px-6 pb-6 pt-0">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 pb-5 border-b border-border">
            {job.description}
          </p>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full grid grid-cols-3 sm:grid-cols-6 h-auto gap-1 bg-muted p-1 rounded-lg">
              {[
                { value: "overview", icon: LayoutList, label: "Overview" },
                { value: "skills", icon: Sparkles, label: "Skills" },
                { value: "experience", icon: Briefcase, label: "Experience" },
                { value: "learning", icon: GraduationCap, label: "Learning" },
                { value: "career", icon: TrendingUp, label: "Career" },
                { value: "insights", icon: BookOpen, label: "Insights" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-xs px-2 py-2 flex items-center gap-1.5 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  <tab.icon size={14} aria-hidden="true" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="mt-5">
              <div className="flex flex-col gap-2.5">
                {job.whyMatch.map((reason, i) => (
                  <div key={i} className="flex gap-3 text-sm items-start">
                    <div className="h-5 w-5 rounded-full bg-success-subtle flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-success" />
                    </div>
                    <span className="text-foreground leading-relaxed">{reason}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Skills */}
            <TabsContent value="skills" className="mt-5">
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-xs font-semibold text-success mb-3 uppercase tracking-wider">Matched Skills</p>
                  <div className="flex flex-col gap-3">
                    {job.skills.matched.map((skill) => (
                      <SkillBar key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-warning mb-3 uppercase tracking-wider">Skills to Develop</p>
                  <div className="flex flex-col gap-3">
                    {job.skills.toGrow.map((skill) => (
                      <SkillBar key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Experience */}
            <TabsContent value="experience" className="mt-5">
              <div className="flex flex-col gap-4">
                {[
                  { label: "Required", value: job.experience.required, color: "text-foreground" },
                  { label: "Your Background", value: job.experience.yours, color: "text-foreground" },
                  { label: "Gap Analysis", value: job.experience.gap, color: "text-warning" },
                ].map((item) => (
                  <div key={item.label} className="p-3.5 rounded-lg bg-muted">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{item.label}</p>
                    <p className={cn("text-sm leading-relaxed", item.color)}>{item.value}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Learning */}
            <TabsContent value="learning" className="mt-5">
              <div className="flex flex-col gap-3">
                {job.learning.map((course, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 p-3.5 rounded-lg bg-muted hover:bg-secondary transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{course.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {course.provider} · {course.duration}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-primary flex-shrink-0" asChild>
                      <a href={course.url} target="_blank" rel="noopener noreferrer">
                        View <ExternalLink size={12} />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Career Path */}
            <TabsContent value="career" className="mt-5">
              <div className="relative pl-7">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
                {job.careerPath.map((step, i) => (
                  <div key={i} className="relative pb-5 last:pb-0">
                    <div
                      className={cn(
                        "absolute left-[-19px] top-1.5 h-3.5 w-3.5 rounded-full border-2 bg-background",
                        i === 0 ? "border-primary bg-primary-subtle" : "border-muted-foreground"
                      )}
                    />
                    <p className="text-sm font-medium text-foreground">{step.role}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.timeline}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Insights */}
            <TabsContent value="insights" className="mt-5">
              <ul className="flex flex-col gap-3">
                {job.insights.map((insight, i) => (
                  <li key={i} className="flex gap-3 text-sm items-start">
                    <Sparkles size={14} className="text-info flex-shrink-0 mt-1" />
                    <span className="text-foreground leading-relaxed">{insight}</span>
                  </li>
                ))}
              </ul>

              {/* Bridge Skills */}
              {job.bridgeSkills && job.bridgeSkills.length > 0 && (
                <div className="mt-6 pt-5 border-t border-border">
                  <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">Bridge Skills</p>
                  <div className="flex flex-col gap-2.5">
                    {job.bridgeSkills.map((bs) => (
                      <div key={bs.name} className="p-3.5 rounded-lg bg-primary-subtle border border-primary">
                        <p className="text-sm font-medium text-foreground">{bs.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{bs.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Entry Pathways */}
              {job.entryPathways && job.entryPathways.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">Entry Pathways</p>
                  <div className="flex flex-col gap-2.5">
                    {job.entryPathways.map((ep) => (
                      <div key={ep.title} className="p-3.5 rounded-lg bg-muted">
                        <p className="text-sm font-medium text-foreground">{ep.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{ep.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Why This Match */}
          <Collapsible open={whyOpen} onOpenChange={setWhyOpen} className="mt-5 pt-5 border-t border-border">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs text-primary gap-1.5 px-0 hover:bg-transparent hover:text-primary-hover">
                {whyOpen ? "Hide match details" : "Why this match?"}
                {whyOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="p-4 rounded-lg bg-muted">
                <ul className="flex flex-col gap-2.5">
                  {job.whyMatch.map((reason, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground items-start">
                      <Check size={14} className="text-success flex-shrink-0 mt-1" />
                      <span className="leading-relaxed">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2.5 mt-5 pt-5 border-t border-border">
            <Button
              variant={addedCompare ? "default" : "outline"}
              size="sm"
              className="text-xs gap-1.5 rounded-full"
              onClick={() => setAddedCompare(!addedCompare)}
            >
              {addedCompare ? <Check size={14} /> : <Plus size={14} />}
              {addedCompare ? "Added" : "Add to Compare"}
            </Button>
            <Button
              variant={addedGoals ? "default" : "outline"}
              size="sm"
              className="text-xs gap-1.5 rounded-full"
              onClick={() => setAddedGoals(!addedGoals)}
            >
              {addedGoals ? <Check size={14} /> : <Target size={14} />}
              {addedGoals ? "In Goals" : "Add to My Goals"}
            </Button>
            <Button variant="outline" size="sm" className="text-xs gap-1.5 rounded-full">
              <Eye size={14} />
              View Similar
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

/* ── Skill indicator bar ── */
const SkillBar: React.FC<{ skill: { name: string; level: number; status: string } }> = ({ skill }) => {
  const barColor =
    skill.status === "matched" ? "bg-success" : skill.status === "bridge" ? "bg-primary" : "bg-warning";
  return (
    <div>
      <div className="flex justify-between text-[13px] mb-1.5">
        <span className="text-foreground font-medium">{skill.name}</span>
        <Badge variant="outline" className={cn(
          "text-[10px] px-1.5 py-0 h-4 border-transparent",
          skill.status === "matched" ? "bg-success-subtle text-success" :
          skill.status === "bridge" ? "bg-primary-subtle text-primary" :
          "bg-warning-subtle text-warning"
        )}>
          {skill.status === "matched" ? "Matched" : skill.status === "bridge" ? "Bridge" : "To grow"}
        </Badge>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", barColor)}
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
};
