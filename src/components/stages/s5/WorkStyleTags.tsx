import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  const prefersReduced =
    typeof window !== "undefined"
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
    <div className="flex flex-col items-center gap-10 py-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Your Work Style Profile
        </h2>
        <p className="text-sm text-muted-foreground">
          Based on your preferences, here's how we see your work style
        </p>
      </div>

      {/* Tag chips */}
      <div className="flex flex-wrap justify-center gap-3">
        {tags.map((tag, i) => {
          const color = TAG_COLORS[i % TAG_COLORS.length];
          const isVisible = i < visibleCount;

          return (
            <span
              key={tag}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm"
              style={{
                backgroundColor: color.bg,
                color: color.fg,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(12px)",
                transition: prefersReduced
                  ? "none"
                  : "opacity 300ms ease-out, transform 300ms ease-out",
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>

      {/* Review link */}
      <button
        type="button"
        onClick={onReview}
        className="text-sm text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      >
        Review my answers
      </button>

      {/* Complete button */}
      <Button onClick={onComplete} size="lg" className="px-10 rounded-full">
        Complete &amp; Continue
      </Button>
    </div>
  );
};
