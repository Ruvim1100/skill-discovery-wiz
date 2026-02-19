import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StageNavigationProps {
  onBack?: () => void;
  onContinue: () => void;
  canContinue: boolean;
  isFirstStage?: boolean;
  isLastStage?: boolean;
  continueLabel?: string;
  backLabel?: string;
  isSubmitting?: boolean;
}

export const StageNavigation: React.FC<StageNavigationProps> = ({
  onBack,
  onContinue,
  canContinue,
  isFirstStage = false,
  isLastStage = false,
  continueLabel,
  backLabel = "Back",
  isSubmitting = false,
}) => {
  const resolvedContinueLabel = continueLabel ?? (isLastStage ? "Finish" : "Continue");

  return (
    <div
      className={cn(
        // Mobile: sticky bottom bar with blur backdrop
        "sm:relative sm:bg-transparent sm:border-t-0 sm:shadow-none sm:pt-8 sm:pb-0 sm:px-0",
        "sticky bottom-0 z-20 bg-background/95 backdrop-blur-sm",
        "border-t px-4 py-3 sm:py-4"
      )}
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-wizard mx-auto flex items-center justify-between gap-4">
        {/* Back button */}
        <div className="flex-shrink-0">
          {!isFirstStage && onBack ? (
            <Button
              variant="ghost"
              onClick={onBack}
              disabled={isSubmitting}
              className="gap-2 text-muted-foreground hover:text-foreground"
              aria-label="Go to previous stage"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {backLabel}
            </Button>
          ) : (
            <div className="w-[80px]" aria-hidden="true" />
          )}
        </div>

        {/* Continue button + helper */}
        <div className="flex flex-col items-end gap-1">
          <Button
            onClick={onContinue}
            disabled={!canContinue || isSubmitting}
            className={cn(
              "gap-2 min-w-[140px] font-semibold transition-all duration-150",
              canContinue
                ? "shadow-sm hover:shadow-md"
                : "opacity-50 cursor-not-allowed"
            )}
            style={
              canContinue
                ? {
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                  }
                : undefined
            }
            aria-disabled={!canContinue}
            aria-describedby={!canContinue ? "continue-helper" : undefined}
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />
                Processing…
              </>
            ) : (
              <>
                {resolvedContinueLabel}
                {!isLastStage && <ArrowRight size={16} aria-hidden="true" />}
              </>
            )}
          </Button>

          {!canContinue && (
            <p
              id="continue-helper"
              className="text-xs text-muted-foreground"
              aria-live="polite"
            >
              Complete all required fields to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
