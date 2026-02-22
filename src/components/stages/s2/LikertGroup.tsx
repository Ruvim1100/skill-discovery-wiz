import React, { useMemo } from "react";
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
          A few questions about your values
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Rate how much you agree with each statement
        </p>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {answered} of {total} questions answered
        </p>
        <Progress value={progressPct} className="h-2" />
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-6">
        {shuffled.map((q, i) => (
          <LikertScale
            key={q.id}
            questionId={q.id}
            questionText={q.text}
            questionNumber={i + 1}
            value={responses[q.id] ?? null}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};
