import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GlobalNav } from "./GlobalNav";
import { Stepper } from "./Stepper";
import { StageNavigation } from "./StageNavigation";
import { StageTransition } from "./StageTransition";
import {
  useWizardStore,
  getOverallProgress,
  type StageId,
  STAGES,
} from "@/store/wizardStore";

// ── Progress bar ────────────────────────────────────────────
const WizardProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div
    className="h-1 w-full overflow-hidden"
    style={{ backgroundColor: "var(--muted)" }}
    role="progressbar"
    aria-valuenow={Math.round(progress)}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label={`Assessment ${Math.round(progress)}% complete`}
  >
    <div
      className="h-full progress-bar-fill"
      style={{
        width: `${progress}%`,
        backgroundColor: "var(--primary)",
      }}
    />
  </div>
);

// ── Skeleton loading ────────────────────────────────────────
const ContentSkeleton: React.FC = () => (
  <div className="flex flex-col gap-5 py-8" aria-busy="true" aria-label="Loading content">
    <Skeleton className="h-8 w-2/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="grid grid-cols-2 gap-3 mt-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-24 rounded-lg" />
      ))}
    </div>
  </div>
);

// ── Exit Confirmation Dialog ────────────────────────────────
const ExitDialog: React.FC<{
  open: boolean;
  onStay: () => void;
  onLeave: () => void;
}> = ({ open, onStay, onLeave }) => (
  <Dialog open={open} onOpenChange={(v) => !v && onStay()}>
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Leave assessment?</DialogTitle>
        <DialogDescription>
          Your progress has been saved. You can resume anytime.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="gap-2 sm:gap-0">
        <Button variant="ghost" onClick={onLeave}>
          Leave
        </Button>
        <Button
          onClick={onStay}
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          Stay
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// ── WizardLayout ────────────────────────────────────────────
interface WizardLayoutProps {
  children: React.ReactNode;
  canContinue?: boolean;
  /** Hide the bottom stage navigation bar (when a stage manages its own sub-step nav) */
  hideStageNav?: boolean;
}

export const WizardLayout: React.FC<WizardLayoutProps> = ({
  children,
  canContinue = false,
  hideStageNav = false,
}) => {
  const {
    currentStage,
    completedStages,
    isLoading,
    showExitDialog,
    goToStage,
    goToNextStage,
    goToPreviousStage,
    setShowExitDialog,
  } = useWizardStore();

  const progress = getOverallProgress(completedStages, currentStage);
  const isFirstStage = currentStage === 1;
  const isLastStage = currentStage === 8;

  const handleStageClick = useCallback(
    (stage: StageId) => {
      if (completedStages.includes(stage)) {
        goToStage(stage);
      }
    },
    [completedStages, goToStage]
  );

  const handleBack = useCallback(() => {
    goToPreviousStage();
  }, [goToPreviousStage]);

  const handleContinue = useCallback(() => {
    if (canContinue) goToNextStage();
  }, [canContinue, goToNextStage]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* ── Global Navigation Bar ── */}
      <GlobalNav />

      {/* ── Stepper Bar ── */}
      <Stepper
        currentStage={currentStage}
        completedStages={completedStages}
        onStageClick={handleStageClick}
        isLoading={isLoading}
      />

      {/* ── Progress Bar ── */}
      <WizardProgressBar progress={progress} />

      {/* ── Main Content Area ── */}
      <main className="flex-1 flex flex-col" id="wizard-main">
        <div className="flex-1 w-full max-w-wizard mx-auto px-4 py-8">
          {isLoading ? (
            <ContentSkeleton />
          ) : (
            <StageTransition stageKey={currentStage}>
              {children}
            </StageTransition>
          )}
        </div>

        {/* ── Stage Navigation (Back / Continue) ── */}
        {!hideStageNav && (
          <StageNavigation
            onBack={isFirstStage ? undefined : handleBack}
            onContinue={handleContinue}
            canContinue={canContinue}
            isFirstStage={isFirstStage}
            isLastStage={isLastStage}
          />
        )}
      </main>

      {/* ── Exit Confirmation Dialog ── */}
      <ExitDialog
        open={showExitDialog}
        onStay={() => setShowExitDialog(false)}
        onLeave={() => {
          setShowExitDialog(false);
          window.history.back();
        }}
      />
    </div>
  );
};
