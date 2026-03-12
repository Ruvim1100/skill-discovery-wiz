import React, { useState, useEffect, useCallback } from "react";
import { useWizardStore } from "@/store/wizardStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Download, Trash2, EyeOff, ArrowRight } from "lucide-react";
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

  // Check assessment completion
  const assessmentComplete = [1, 2, 3, 4, 5].every((s) =>
    completedStages.includes(s as 1 | 2 | 3 | 4 | 5)
  );

  useEffect(() => {
    onValidityChange(false);
  }, [onValidityChange]);

  // Simulate report generation
  useEffect(() => {
    if (!assessmentComplete) {
      setPageState("incomplete");
      return;
    }

    setPageState("loading");
    const timer = setTimeout(() => {
      // Simulate API call — in production, POST /reports then GET /reports/:id
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

  // ── Incomplete State ──
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
          Go Back to Assessment
        </Button>
      </div>
    );
  }

  // ── Loading State ──
  if (pageState === "loading") {
    return <ReportLoading />;
  }

  // ── Error State ──
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

  // ── Report Ready ──
  if (!report) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
          Stage 6 · Career Fit Report
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Your Career Fit Report
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Personalized insights based on your assessment results
        </p>
      </div>

      {/* Report Overview */}
      <ReportOverview report={report} />

      {/* ── Job Recommendations ── */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-foreground">Job Recommendations</h2>

        {/* Strong Fit */}
        {strongFitJobs.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-success text-success-foreground text-xs">Strong Fit</Badge>
              <span className="text-sm text-muted-foreground">
                Roles that closely match your profile
              </span>
            </div>
            {strongFitJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* High Potential */}
        {highPotentialJobs.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary text-primary-foreground text-xs">High Potential</Badge>
              <span className="text-sm text-muted-foreground">
                Stretch roles with growth opportunity
              </span>
            </div>
            {highPotentialJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* ── Report Actions ── */}
      <section className="flex flex-col gap-3 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1.5">
            <Download size={14} />
            Export Report
          </Button>
          <Button variant="outline" size="sm" className="text-xs gap-1.5">
            <EyeOff size={14} />
            Hide My Answers
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1.5 text-destructive hover:text-destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 size={14} />
            Delete Report
          </Button>
        </div>
      </section>

      {/* Continue to Action Plan */}
      <div className="flex justify-between items-center pt-2">
        <Button variant="outline" onClick={goToPreviousStage} className="min-h-[44px]">
          Back
        </Button>
        <Button onClick={goToNextStage} className="min-h-[44px] px-6 gap-2">
          Continue to Action Plan
          <ArrowRight size={16} />
        </Button>
      </div>

      {/* Delete Confirmation */}
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
