import React, { useState, useEffect } from "react";
import { TAG_MAP, TAG_COLORS } from "./constants";

interface WorkStyleTagsProps {
  answers: Record<string, string>;
  onComplete: () => void;
  onReview: () => void;
}

export const WorkStyleTags: React.FC<WorkStyleTagsProps> = ({
  answers,
  onComplete,
  onReview,
}) => {
  const tags = Object.entries(TAG_MAP)
    .map(([field, map]) => {
      const val = answers[field];
      return val && map[val] ? map[val] : null;
    })
    .filter(Boolean) as string[];

  const [visibleCount, setVisibleCount] = useState(0);
  const prefersReduced = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  useEffect(() => {
    if (prefersReduced) {
      setVisibleCount(tags.length);
      return;
    }
    setVisibleCount(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    tags.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 300 + i * 150));
    });
    return () => timers.forEach(clearTimeout);
  }, [tags.length, prefersReduced]);

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground">Your Work Style Profile</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Based on your preferences, here's how we see your work style
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {tags.map((tag, i) => {
          const color = TAG_COLORS[i % TAG_COLORS.length];
          const isVisible = i < visibleCount;

          return (
            <span
              key={tag}
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-all"
              style={{
                backgroundColor: color.bg,
                color: color.fg,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(12px)",
                transition: prefersReduced ? "none" : "opacity 300ms ease-out, transform 300ms ease-out",
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onReview}
        className="text-sm text-primary underline underline-offset-4 hover:text-primary-hover transition-colors"
      >
        Review my answers
      </button>

      <button
        type="button"
        onClick={onComplete}
        className="inline-flex items-center justify-center rounded-md px-6 min-h-[44px] text-sm font-medium transition-colors"
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      >
        Complete & Continue
      </button>
    </div>
  );
};
