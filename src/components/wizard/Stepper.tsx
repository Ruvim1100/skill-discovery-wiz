import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STAGES, type StageId } from "@/store/wizardStore";

interface StepperProps {
  currentStage: StageId;
  completedStages: StageId[];
  onStageClick: (stage: StageId) => void;
  isLoading?: boolean;
}

type StepState = "completed" | "current" | "upcoming";

const getStepState = (
  stageId: StageId,
  currentStage: StageId,
  completedStages: StageId[]
): StepState => {
  if (completedStages.includes(stageId)) return "completed";
  if (stageId === currentStage) return "current";
  return "upcoming";
};

const StepCircle: React.FC<{
  state: StepState;
  label: string;
  isLoading: boolean;
}> = ({ state, label, isLoading }) => {
  if (isLoading) {
    return (
      <div
        className="h-8 w-8 rounded-full bg-muted animate-pulse flex-shrink-0"
        aria-hidden="true"
      />
    );
  }

  if (state === "completed") {
    return (
      <div
        className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "var(--success)" }}
        aria-label={`${label} — completed`}
      >
        <Check size={14} strokeWidth={2.5} color="var(--success-foreground)" aria-hidden="true" />
      </div>
    );
  }

  if (state === "current") {
    return (
      <div
        className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 relative"
        style={{
          backgroundColor: "var(--primary)",
          boxShadow: "0 0 0 4px var(--primary-subtle)",
        }}
        aria-label={`${label} — current`}
        aria-current="step"
      >
        {/* Pulsing dot */}
        <span
          className="stepper-pulse h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: "var(--primary-foreground)" }}
          aria-hidden="true"
        />
      </div>
    );
  }

  // upcoming
  return (
    <div
      className="h-8 w-8 rounded-full border-2 flex items-center justify-center flex-shrink-0"
      style={{ borderColor: "var(--stepper-upcoming)" }}
      aria-label={`${label} — upcoming`}
    />
  );
};

const ConnectorLine: React.FC<{ completed: boolean }> = ({ completed }) => (
  <div
    className="flex-1 h-0.5 mx-1 mt-[-20px] self-start"
    style={{
      backgroundColor: completed ? "var(--success)" : undefined,
      borderTop: completed ? "none" : "2px dashed var(--stepper-line)",
      marginTop: 0,
    }}
    aria-hidden="true"
  />
);

export const Stepper: React.FC<StepperProps> = ({
  currentStage,
  completedStages,
  onStageClick,
  isLoading = false,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Scroll active step into view on mobile
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const activeStep = el.querySelector('[aria-current="step"]')?.parentElement;
    if (activeStep) {
      activeStep.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [currentStage]);

  const currentStageName = STAGES.find((s) => s.id === currentStage)?.label ?? "";

  return (
    <div className="border-b" style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}>
      <div className="max-w-wizard mx-auto px-4 py-3">
        {/* Desktop stepper — hidden on mobile */}
        <div
          className="hidden sm:flex items-start gap-0"
          role="list"
          aria-label="Assessment stages"
        >
          {STAGES.map((stage, index) => {
            const state = getStepState(stage.id, currentStage, completedStages);
            const isClickable = state === "completed";
            const isLast = index === STAGES.length - 1;

            return (
              <React.Fragment key={stage.id}>
                <div
                  role="listitem"
                  className="flex flex-col items-center gap-1.5 min-w-0"
                  style={{ flex: isLast ? "0 0 auto" : "1 1 0%" }}
                >
                  <button
                    onClick={() => isClickable && onStageClick(stage.id)}
                    disabled={!isClickable}
                    className={cn(
                      "flex flex-col items-center gap-1.5 group focus:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1",
                      isClickable ? "cursor-pointer" : "cursor-default"
                    )}
                    aria-disabled={!isClickable}
                    tabIndex={isClickable ? 0 : -1}
                  >
                    <StepCircle state={state} label={stage.label} isLoading={isLoading} />
                    <span
                      className={cn(
                        "text-xs font-medium text-center leading-tight max-w-[64px] line-clamp-2",
                        state === "current" && "font-semibold",
                        state === "upcoming" && "text-muted-foreground",
                        state === "completed" && "text-muted-foreground group-hover:text-foreground transition-colors"
                      )}
                      style={state === "current" ? { color: "var(--primary)" } : undefined}
                    >
                      {stage.label}
                    </span>
                  </button>
                </div>

                {!isLast && (
                  <div className="flex-1 flex items-center pt-4 px-1 min-w-[12px]">
                    <ConnectorLine completed={completedStages.includes(stage.id)} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile stepper — horizontally scrollable icons only */}
        <div className="sm:hidden">
          <div
            ref={scrollRef}
            className="flex items-center gap-0 overflow-x-auto scrollbar-none pb-1"
            style={{ scrollbarWidth: "none" }}
            role="list"
            aria-label="Assessment stages"
          >
            {STAGES.map((stage, index) => {
              const state = getStepState(stage.id, currentStage, completedStages);
              const isClickable = state === "completed";
              const isLast = index === STAGES.length - 1;

              return (
                <React.Fragment key={stage.id}>
                  <div role="listitem" className="flex-shrink-0">
                    <button
                      onClick={() => isClickable && onStageClick(stage.id)}
                      disabled={!isClickable}
                      className={cn(
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1",
                        isClickable ? "cursor-pointer" : "cursor-default"
                      )}
                      aria-disabled={!isClickable}
                      tabIndex={isClickable ? 0 : -1}
                    >
                      <StepCircle state={state} label={stage.label} isLoading={isLoading} />
                    </button>
                  </div>
                  {!isLast && (
                    <div className="flex items-center w-6 flex-shrink-0">
                      <ConnectorLine completed={completedStages.includes(stage.id)} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          {/* Current stage name on mobile */}
          <p
            className="mt-1.5 text-xs font-semibold text-center"
            style={{ color: "var(--primary)" }}
            aria-live="polite"
          >
            Stage {currentStage}: {currentStageName}
          </p>
        </div>
      </div>
    </div>
  );
};
