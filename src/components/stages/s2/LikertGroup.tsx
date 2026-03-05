import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { LikertScale } from "@/components/wizard/LikertScale";
import type { LikertQuestion } from "./constants";

interface LikertGroupProps {
  questions: LikertQuestion[];
  responses: Record<string, number | null>;
  onChange: (questionId: string, value: number) => void;
  heading?: string;
  subheading?: string;
}

/** Shuffles within each group, then concatenates groups in order. Stable per mount. */
function shuffleWithinGroups(questions: LikertQuestion[]): LikertQuestion[] {
  const groups = new Map<string, LikertQuestion[]>();
  for (const q of questions) {
    if (!groups.has(q.group)) groups.set(q.group, []);
    groups.get(q.group)!.push(q);
  }
  const result: LikertQuestion[] = [];
  for (const [, groupQs] of groups) {
    const arr = [...groupQs];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    result.push(...arr);
  }
  return result;
}

export const LikertGroup: React.FC<LikertGroupProps> = ({
  questions,
  responses,
  onChange,
  heading = "How do these statements resonate with you?",
  subheading = "Rate how much you agree with each statement — there are no right or wrong answers.",
}) => {
  const shuffled = useMemo(() => shuffleWithinGroups(questions), []);
  const answered = shuffled.filter((q) => responses[q.id] != null).length;
  const total = shuffled.length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">{heading}</h2>
        <p className="text-sm text-muted-foreground mt-1">{subheading}</p>
      </div>

      {/* Progress counter — right-aligned */}
      <div className="flex justify-end">
        <span className={cn(
          "text-sm font-medium",
          answered === total ? "text-success" : "text-muted-foreground"
        )}>
          {answered} of {total} answered
        </span>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-4">
        {shuffled.map((q, i) => (
          <div
            key={q.id}
            className={cn(
              "rounded-xl border p-5 transition-colors duration-200 bg-card",
              responses[q.id] != null ? "border-border" : "border-border"
            )}
          >
            <LikertScale
              questionId={q.id}
              questionText={q.text}
              questionNumber={i + 1}
              value={responses[q.id] ?? null}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
