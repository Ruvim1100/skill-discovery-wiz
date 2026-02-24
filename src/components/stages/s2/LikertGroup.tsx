import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { LikertScale } from "@/components/wizard/LikertScale";
import { Progress } from "@/components/ui/progress";
import type { LikertQuestion } from "./constants";

interface LikertGroupProps {
  questions: LikertQuestion[];
  responses: Record<string, number | null>;
  onChange: (questionId: string, value: number) => void;
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
    // Fisher-Yates shuffle
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
}) => {
  const shuffled = useMemo(() => shuffleWithinGroups(questions), []);
  const answered = shuffled.filter((q) => responses[q.id] != null).length;
  const total = shuffled.length;
  const progressPct = (answered / total) * 100;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          How do these statements resonate with you?
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Rate how much you agree with each statement — there are no right or wrong answers.
        </p>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground" aria-live="polite">
            {answered} of {total} answered
          </p>
          {answered === total && (
            <span className="text-xs font-medium text-success">All done ✓</span>
          )}
        </div>
        <Progress value={progressPct} className="h-2" />
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-4">
        {shuffled.map((q, i) => (
          <div
            key={q.id}
            className={cn(
              "rounded-lg border p-4 transition-colors duration-150",
              responses[q.id] != null
                ? "border-primary/20 bg-primary/[0.03]"
                : "border-border bg-card"
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
