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

const POINT_SIZES: Record<number, string> = {
  1: "w-9 h-9 sm:w-10 sm:h-10",
  2: "w-8 h-8 sm:w-9 sm:h-9",
  3: "w-7 h-7 sm:w-8 sm:h-8",
  4: "w-8 h-8 sm:w-9 sm:h-9",
  5: "w-9 h-9 sm:w-10 sm:h-10",
};

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
          <span className="font-semibold text-primary mr-1.5">Q{questionNumber}.</span>
        )}
        {questionText}
      </legend>

      {/* Scale points */}
      <div className="flex items-center justify-between px-1">
        {[1, 2, 3, 4, 5].map((point) => {
          const isSelected = value === point;
          return (
            <div key={point} className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-label={LABELS[point - 1]}
                tabIndex={isSelected || (value === null && point === 1) ? 0 : -1}
                onClick={() => handleSelect(point)}
                onKeyDown={(e) => handleKeyDown(e, point)}
                className={cn(
                  "flex items-center justify-center rounded-full min-w-[44px] min-h-[44px] transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  POINT_SIZES[point],
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md scale-110 ring-2 ring-primary/20"
                    : "border-2 border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-primary-subtle"
                )}
              >
                <span className={cn("font-semibold", isSelected ? "text-sm" : "text-xs")}>
                  {point}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between px-1">
        <span className="text-[11px] text-muted-foreground max-w-[80px] leading-tight">{LABELS[0]}</span>
        <span className="text-[11px] text-muted-foreground max-w-[80px] leading-tight text-right">{LABELS[4]}</span>
      </div>
    </fieldset>
  );
};
