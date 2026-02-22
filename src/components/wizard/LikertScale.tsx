import React, { useCallback } from "react";
import { cn } from "@/lib/utils";

interface LikertScaleProps {
  questionId: string;
  questionText: string;
  questionNumber?: number;
  value: number | null;
  onChange: (questionId: string, value: number) => void;
}

const LABELS = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] as const;

export const LikertScale: React.FC<LikertScaleProps> = ({
  questionId,
  questionText,
  questionNumber,
  value,
  onChange,
}) => {
  const handleSelect = useCallback(
    (v: number) => onChange(questionId, v),
    [questionId, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, current: number) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (current < 5) handleSelect(current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (current > 1) handleSelect(current - 1);
      }
    },
    [handleSelect]
  );

  return (
    <fieldset className="flex flex-col gap-3" role="radiogroup" aria-label={questionText}>
      <legend className="text-sm font-medium text-foreground leading-snug">
        {questionNumber != null && (
          <span className="text-muted-foreground mr-1.5">Q{questionNumber}.</span>
        )}
        {questionText}
      </legend>

      <div className="flex items-center justify-between gap-1 sm:gap-2">
        {[1, 2, 3, 4, 5].map((point) => {
          const isSelected = value === point;
          return (
            <button
              key={point}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={LABELS[point - 1]}
              tabIndex={isSelected || (value === null && point === 1) ? 0 : -1}
              onClick={() => handleSelect(point)}
              onKeyDown={(e) => handleKeyDown(e, point)}
              className={cn(
                "flex items-center justify-center rounded-full min-w-[44px] min-h-[44px] w-10 h-10 sm:w-11 sm:h-11 border-2 transition-all duration-150 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground scale-110"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50"
              )}
              style={isSelected ? {
                borderColor: "var(--primary)",
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                transform: "scale(1.2)",
              } : undefined}
            >
              <span className="text-xs font-semibold">{point}</span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <span className="text-[11px] text-muted-foreground">{LABELS[0]}</span>
        <span className="text-[11px] text-muted-foreground">{LABELS[4]}</span>
      </div>
    </fieldset>
  );
};
