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
  const badgeBg = isStrongFit ? "bg-success" : "bg-primary";
  const badgeText = isStrongFit ? "text-success-foreground" : "text-primary-foreground";
  const borderClass = isStrongFit ? "border-success/30" : "border-primary/30";

  return (
    <Card className={cn("overflow-hidden transition-shadow", borderClass, expanded && "shadow-md")}>
      {/* Header */}
      <button
        type="button"
        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer hover:bg-muted/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="text-base font-semibold text-foreground">{job.title}</h4>
            <Badge className={cn("text-xs", badgeBg, badgeText)}>
              {job.matchScore}% {isStrongFit ? "Strong Fit" : "High Potential"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{job.company}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <DollarSign size={14} aria-hidden="true" />
              {job.salary}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} aria-hidden="true" />
              {job.location}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          {expanded ? <ChevronUp size={20} className="text-muted-foreground" /> : <ChevronDown size={20} className="text-muted-foreground" />}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <CardContent className="px-4 sm:px-5 pb-5 pt-0">
          <p className="text-sm text-muted-foreground mb-4">{job.description}</p>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full grid grid-cols-3 sm:grid-cols-6 h-auto gap-0.5 bg-muted p-1">
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
                  className="text-xs px-2 py-1.5 flex flex-col sm:flex-row items-center gap-1 data-[state=active]:bg-background"
                >
                  <tab.icon size={14} aria-hidden="true" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-4">
              <div className="flex flex-col gap-2">
                {job.whyMatch.map((reason, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <Check size={16} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{reason}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="mt-4">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold text-success mb-2 uppercase tracking-wide">Matched Skills</p>
                  {job.skills.matched.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-warning mb-2 uppercase tracking-wide">Skills to Develop</p>
                  {job.skills.toGrow.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="mt-4">
              <div className="flex flex-col gap-3 text-sm">
                <div>
                  <p className="font-medium text-foreground">Required</p>
                  <p className="text-muted-foreground">{job.experience.required}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Your Background</p>
                  <p className="text-muted-foreground">{job.experience.yours}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Gap Analysis</p>
                  <p className="text-muted-foreground">{job.experience.gap}</p>
                </div>
              </div>
            </TabsContent>

            {/* Learning Tab */}
            <TabsContent value="learning" className="mt-4">
              <div className="flex flex-col gap-3">
                {job.learning.map((course, i) => (
                  <Card key={i} className="bg-muted/30">
                    <CardContent className="p-3 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{course.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {course.provider} · {course.duration}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs flex-shrink-0" asChild>
                        <a href={course.url} target="_blank" rel="noopener noreferrer">View</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Career Tab */}
            <TabsContent value="career" className="mt-4">
              <div className="relative pl-6">
                <div className="absolute left-2 top-1 bottom-1 w-px bg-border" />
                {job.careerPath.map((step, i) => (
                  <div key={i} className="relative pb-4 last:pb-0">
                    <div className="absolute left-[-18px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                    <p className="text-sm font-medium text-foreground">{step.role}</p>
                    <p className="text-xs text-muted-foreground">{step.timeline}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="mt-4">
              <ul className="flex flex-col gap-2">
                {job.insights.map((insight, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <Sparkles size={14} className="text-info flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{insight}</span>
                  </li>
                ))}
              </ul>

              {/* Bridge Skills for High Potential */}
              {job.bridgeSkills && job.bridgeSkills.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">Bridge Skills</p>
                  <div className="flex flex-col gap-2">
                    {job.bridgeSkills.map((bs) => (
                      <Card key={bs.name} className="bg-primary-subtle border-primary/20">
                        <CardContent className="p-3">
                          <p className="text-sm font-medium text-foreground">{bs.name}</p>
                          <p className="text-xs text-muted-foreground">{bs.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Entry Pathways for High Potential */}
              {job.entryPathways && job.entryPathways.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">Entry Pathways</p>
                  <div className="flex flex-col gap-2">
                    {job.entryPathways.map((ep) => (
                      <Card key={ep.title} className="bg-muted/30">
                        <CardContent className="p-3">
                          <p className="text-sm font-medium text-foreground">{ep.title}</p>
                          <p className="text-xs text-muted-foreground">{ep.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Why This Match — Collapsible */}
          <Collapsible open={whyOpen} onOpenChange={setWhyOpen} className="mt-4">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs text-primary gap-1 px-0 hover:bg-transparent">
                {whyOpen ? "Hide" : "Why this match?"}
                {whyOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <ul className="flex flex-col gap-2">
                    {job.whyMatch.map((reason, i) => (
                      <li key={i} className="flex gap-2 text-sm text-foreground">
                        <Check size={14} className="text-success flex-shrink-0 mt-0.5" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            <Button
              variant={addedCompare ? "default" : "outline"}
              size="sm"
              className="text-xs gap-1"
              onClick={() => setAddedCompare(!addedCompare)}
            >
              {addedCompare ? <Check size={14} /> : <Plus size={14} />}
              {addedCompare ? "Added" : "Add to Compare"}
            </Button>
            <Button
              variant={addedGoals ? "default" : "outline"}
              size="sm"
              className="text-xs gap-1"
              onClick={() => setAddedGoals(!addedGoals)}
            >
              {addedGoals ? <Check size={14} /> : <Target size={14} />}
              {addedGoals ? "In Goals" : "Add to My Goals"}
            </Button>
            <Button variant="outline" size="sm" className="text-xs gap-1">
              <Eye size={14} />
              View Similar
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

/* ── Skill progress bar ── */
const SkillBar: React.FC<{ skill: { name: string; level: number; status: string } }> = ({ skill }) => {
  const barColor = skill.status === "matched" ? "bg-success" : skill.status === "bridge" ? "bg-primary" : "bg-warning";
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-foreground">{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", barColor)}
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
};
