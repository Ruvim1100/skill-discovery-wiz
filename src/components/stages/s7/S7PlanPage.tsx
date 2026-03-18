import React, { useState, useEffect, useCallback } from "react";
import { useWizardStore } from "@/store/wizardStore";
import { usePlanStore } from "@/store/planStore";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, ArrowLeft, ArrowRight, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_REPORT } from "@/components/stages/s6/constants";
import {
  TargetRoleSelection,
  type CareerMatchItem,
} from "./TargetRoleSelection";

interface S7PlanPageProps {
  onValidityChange: (valid: boolean) => void;
}

const SUB_SCREEN_COUNT = 4;

const SUB_SCREEN_LABELS = [
  "Target Role",
  "Time & Schedule",
  "Learning Style",
  "Review",
];

export const S7PlanPage: React.FC<S7PlanPageProps> = ({ onValidityChange }) => {
  const { completedStages, goToPreviousStage, goToNextStage } = useWizardStore();
  const planStore = usePlanStore();
  const [subScreen, setSubScreen] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [matches, setMatches] = useState<CareerMatchItem[]>([]);

  // Check S1-S6 complete
  const prerequisitesMet = [1, 2, 3, 4, 5, 6].every((s) =>
    completedStages.includes(s as 1 | 2 | 3 | 4 | 5 | 6)
  );

  // Load matches from S6 mock data
  const loadData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    const timer = setTimeout(() => {
      try {
        const matchItems: CareerMatchItem[] = MOCK_REPORT.jobs.map((job) => ({
          id: job.id,
          jobId: job.id,
          jobTitle: job.title,
          jobCategory: job.company,
          jobSubcategory: job.tags[0] ?? null,
          matchType:
            job.category === "strong-fit" ? "STRONG_FIT" as const : "HIGH_POTENTIAL" as const,
        }));
        setMatches(matchItems);
        setIsLoading(false);
      } catch {
        setHasError(true);
        setIsLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!prerequisitesMet) {
      setIsLoading(false);
      return;
    }
    const cleanup = loadData();
    return cleanup;
  }, [prerequisitesMet, loadData]);

  // Validity: sub-screen 0 needs a role selected
  const isSubScreen0Valid =
    !!planStore.targetRole || (planStore.isCustomRole && !!planStore.customTargetRole?.trim());

  useEffect(() => {
    // Only mark stage valid when on last sub-screen (for now, just sub-screen 0 matters)
    onValidityChange(false);
  }, [onValidityChange]);

  const canGoNext = (() => {
    if (subScreen === 0) return isSubScreen0Valid;
    // Placeholder sub-screens 1-2 are always valid for now
    if (subScreen === 1 || subScreen === 2) return true;
    // Sub-screen 3 (review) enables the final CTA
    if (subScreen === 3) return isSubScreen0Valid;
    return false;
  })();

  const handleBack = () => {
    if (subScreen === 0) {
      goToPreviousStage();
    } else {
      setSubScreen((s) => s - 1);
    }
  };

  const handleNext = () => {
    if (subScreen < SUB_SCREEN_COUNT - 1) {
      setSubScreen((s) => s + 1);
    } else {
      // Final step — advance wizard
      goToNextStage();
    }
  };

  // ── Prerequisites not met ──
  if (!prerequisitesMet) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
        <div className="h-14 w-14 rounded-full bg-warning-subtle flex items-center justify-center">
          <AlertTriangle size={28} className="text-warning" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Complete Previous Stages First</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Please complete all stages (S1–S6) before setting up your action plan.
          </p>
        </div>
        <Button onClick={goToPreviousStage} className="gap-2">
          <ArrowLeft size={16} aria-hidden="true" />
          Go Back
        </Button>
      </div>
    );
  }

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 size={32} className="animate-spin text-primary" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">Loading your career matches…</p>
      </div>
    );
  }

  // ── Error ──
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
        <div className="h-14 w-14 rounded-full bg-destructive-subtle flex items-center justify-center">
          <AlertTriangle size={28} className="text-destructive" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Something went wrong</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            We couldn't load your data. Please try again.
          </p>
        </div>
        <Button onClick={loadData}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* ── Page Header ── */}
      <div className="pb-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-lg bg-primary-subtle flex items-center justify-center">
            <ClipboardList size={16} className="text-primary" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Stage 7 · Plan Preferences
          </p>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
          Set Up Your Action Plan
        </h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-lg">
          Configure your plan preferences so we can build a personalized roadmap for your career goals.
        </p>
      </div>

      {/* ── Sub-screen progress dots ── */}
      <div className="flex items-center justify-center gap-2" role="navigation" aria-label="Plan setup progress">
        {SUB_SCREEN_LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                // Only allow going back, not forward
                if (i < subScreen) setSubScreen(i);
              }}
              disabled={i > subScreen}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium transition-colors rounded-full px-3 py-1.5",
                i === subScreen
                  ? "bg-primary text-primary-foreground"
                  : i < subScreen
                  ? "bg-primary-subtle text-primary cursor-pointer hover:bg-primary/10"
                  : "bg-muted text-muted-foreground cursor-default"
              )}
              aria-current={i === subScreen ? "step" : undefined}
              aria-label={`Step ${i + 1}: ${label}`}
            >
              <span className="font-semibold">{i + 1}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {i < SUB_SCREEN_COUNT - 1 && (
              <div
                className={cn(
                  "w-6 h-px",
                  i < subScreen ? "bg-primary/40" : "bg-border"
                )}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Sub-screen content ── */}
      <div className="min-h-[300px]">
        {subScreen === 0 && (
          <div className="stage-enter">
            <TargetRoleSelection
              matches={matches}
              selectedJobId={planStore.targetRole?.jobId ?? null}
              customTargetRole={planStore.customTargetRole}
              isCustomRole={planStore.isCustomRole}
              onSelectRole={planStore.selectTargetRole}
              onSetCustomRole={planStore.setCustomTargetRole}
              onClearSelection={planStore.clearTargetRole}
            />
          </div>
        )}

        {subScreen === 1 && (
          <div className="stage-enter flex flex-col items-center justify-center py-12 gap-4 text-center">
            <h2 className="text-xl font-bold text-foreground">Time & Schedule</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              This step will let you set weekly hours, preferred time slots, and plan duration.
            </p>
            <div
              className="rounded-lg border-2 border-dashed border-border flex items-center justify-center h-32 w-full max-w-md"
            >
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
          </div>
        )}

        {subScreen === 2 && (
          <div className="stage-enter flex flex-col items-center justify-center py-12 gap-4 text-center">
            <h2 className="text-xl font-bold text-foreground">Learning Style</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              This step will let you choose preferred learning methods and difficulty level.
            </p>
            <div
              className="rounded-lg border-2 border-dashed border-border flex items-center justify-center h-32 w-full max-w-md"
            >
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
          </div>
        )}

        {subScreen === 3 && (
          <div className="stage-enter flex flex-col items-center justify-center py-12 gap-4 text-center">
            <h2 className="text-xl font-bold text-foreground">Review & Confirm</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              Review your preferences before generating your personalized action plan.
            </p>
            <div
              className="rounded-lg border-2 border-dashed border-border flex items-center justify-center h-32 w-full max-w-md"
            >
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <Button variant="outline" onClick={handleBack} className="min-h-[44px] gap-2">
          <ArrowLeft size={16} aria-hidden="true" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canGoNext}
          className="min-h-[44px] px-6 gap-2"
        >
          {subScreen === SUB_SCREEN_COUNT - 1 ? "Create Action Plan" : "Continue"}
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};
