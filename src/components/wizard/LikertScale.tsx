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
    <fieldset className="flex flex-col gap-4" role="radiogroup" aria-label={questionText}>
      <legend className="text-sm font-medium text-foreground leading-snug">
        {questionText}
      </legend>

      {/* Scale points */}
      <div className="flex items-center justify-between px-2">
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
                "flex items-center justify-center rounded-full transition-all duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "min-w-[44px] min-h-[44px]",
                isSelected
                  ? "w-12 h-12 bg-primary text-primary-foreground shadow-md"
                  : "w-10 h-10 border-2 border-border bg-card text-muted-foreground hover:border-primary"
              )}
            >
              <span className={cn("font-semibold", isSelected ? "text-base" : "text-sm")}>
                {point}
              </span>
            </button>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between px-2">
        <span className="text-[11px] text-muted-foreground">{LABELS[0]}</span>
        <span className="text-[11px] text-muted-foreground text-right">{LABELS[4]}</span>
      </div>
    </fieldset>
  );
};
