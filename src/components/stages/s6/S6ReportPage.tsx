import React, { useState, useEffect, useCallback } from "react";
import { useWizardStore } from "@/store/wizardStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Download,
  Trash2,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  FileText,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReportLoading } from "./ReportLoading";
import { ReportOverview } from "./ReportOverview";
import { JobCard } from "./JobCard";
import { MOCK_REPORT, type ReportData } from "./constants";

interface S6ReportPageProps {
  onValidityChange: (valid: boolean) => void;
}

type PageState = "loading" | "error" | "incomplete" | "ready";

export const S6ReportPage: React.FC<S6ReportPageProps> = ({ onValidityChange }) => {
  const { completedStages, goToNextStage, goToPreviousStage } = useWizardStore();
  const [pageState, setPageState] = useState<PageState>("loading");
  const [report, setReport] = useState<ReportData | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const assessmentComplete = [1, 2, 3, 4, 5].every((s) =>
    completedStages.includes(s as 1 | 2 | 3 | 4 | 5)
  );

  useEffect(() => {
    onValidityChange(false);
  }, [onValidityChange]);

  useEffect(() => {
    if (!assessmentComplete) {
      setPageState("incomplete");
      return;
    }
    setPageState("loading");
    const timer = setTimeout(() => {
      try {
        setReport(MOCK_REPORT);
        setPageState("ready");
        onValidityChange(true);
      } catch {
        setPageState("error");
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [assessmentComplete, onValidityChange]);

  const handleRetry = useCallback(() => {
    setPageState("loading");
    setTimeout(() => {
      setReport(MOCK_REPORT);
      setPageState("ready");
      onValidityChange(true);
    }, 3000);
  }, [onValidityChange]);

  const strongFitJobs = report?.jobs.filter((j) => j.category === "strong-fit") ?? [];
  const highPotentialJobs = report?.jobs.filter((j) => j.category === "high-potential") ?? [];

  // ── Incomplete ──
  if (pageState === "incomplete") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
        <div className="h-14 w-14 rounded-full bg-warning-subtle flex items-center justify-center">
          <AlertTriangle size={28} className="text-warning" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Complete Your Profile First</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Please complete all assessment stages (S1–S5) before generating your Career Fit Report.
          </p>
        </div>
        <Button onClick={goToPreviousStage} className="gap-2">
          <ArrowLeft size={16} />
          Go Back to Assessment
        </Button>
      </div>
    );
  }

  if (pageState === "loading") return <ReportLoading />;

  // ── Error ──
  if (pageState === "error") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
        <div className="h-14 w-14 rounded-full bg-destructive-subtle flex items-center justify-center">
          <AlertTriangle size={28} className="text-destructive" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Something went wrong</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            We couldn't generate your report. Please try again.
          </p>
        </div>
        <Button onClick={handleRetry}>Retry</Button>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="flex flex-col gap-10">
      {/* ── Page Header ── */}
      <div className="pb-6 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-primary-subtle flex items-center justify-center">
            <FileText size={16} className="text-primary" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Stage 6 · Career Fit Report
          </p>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
          Your Career Fit Report
        </h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-lg">
          Personalized insights based on your assessment across values, aptitudes, interests, and preferences.
        </p>
      </div>

      {/* ── Report Overview (Steps 2 & 3) ── */}
      <ReportOverview report={report} />

      {/* ── Job Recommendations (Step 4) ── */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center gap-3 pb-2 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Job Recommendations</h2>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {report.jobs.length} matches
          </Badge>
        </div>

        {report.jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
            <Sparkles size={32} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground max-w-sm">
              We're expanding your matches — check back soon!
            </p>
          </div>
        )}

        {/* Strong Fit */}
        {strongFitJobs.length > 0 && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-success-subtle flex items-center justify-center">
                <Zap size={16} className="text-success" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground leading-tight">Strong Fit</h3>
                <p className="text-[13px] text-muted-foreground">
                  Roles that closely align with your current profile
                </p>
              </div>
            </div>
            {/* Desktop: 3-col grid. Mobile: stack */}
            <div className="grid grid-cols-1 gap-4">
              {strongFitJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        {/* High Potential */}
        {highPotentialJobs.length > 0 && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary-subtle flex items-center justify-center">
                <TrendingUp size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground leading-tight">High Potential</h3>
                <p className="text-[13px] text-muted-foreground">
                  Growth opportunities that match your trajectory
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {highPotentialJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Report Actions ── */}
      <section className="flex flex-col gap-4 pt-6 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Report Actions</p>
        <div className="flex flex-wrap gap-2.5">
          <Button variant="outline" size="sm" className="text-xs gap-1.5 rounded-full">
            <Download size={14} />
            Export Report
          </Button>
          <Button variant="outline" size="sm" className="text-xs gap-1.5 rounded-full">
            <EyeOff size={14} />
            Hide My Answers
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1.5 rounded-full text-destructive hover:text-destructive border-destructive hover:bg-destructive-subtle"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 size={14} />
            Delete Report
          </Button>
        </div>
      </section>

      {/* ── Continue ── */}
      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={goToPreviousStage} className="min-h-[44px] gap-2">
          <ArrowLeft size={16} />
          Back
        </Button>
        <Button onClick={goToNextStage} className="min-h-[44px] px-6 gap-2">
          Continue to Action Plan
          <ArrowRight size={16} />
        </Button>
      </div>

      {/* ── Delete Dialog ── */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Report?</DialogTitle>
            <DialogDescription>
              This will permanently delete your career fit report. You can regenerate it later by
              completing the assessment again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(false);
                setReport(null);
                setPageState("loading");
                handleRetry();
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
