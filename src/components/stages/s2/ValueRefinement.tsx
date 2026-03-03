import React from "react";
import { cn } from "@/lib/utils";
import { Check, Star } from "lucide-react";

interface ValueWithCategory {
  name: string;
  category: string;
}

interface ValueRefinementProps {
  allValues: ValueWithCategory[];
  coreValues: ValueWithCategory[];
  onChange: (coreValues: ValueWithCategory[]) => void;
}

export const ValueRefinement: React.FC<ValueRefinementProps> = ({
  allValues,
  coreValues,
  onChange,
}) => {
  const isCore = (v: ValueWithCategory) =>
    coreValues.some((c) => c.name === v.name && c.category === v.category);

  const handleToggle = (v: ValueWithCategory) => {
    if (isCore(v)) {
      onChange(coreValues.filter((c) => !(c.name === v.name && c.category === v.category)));
    } else {
      if (coreValues.length >= 3) return;
      onChange([...coreValues, v]);
    }
  };

  const count = coreValues.length;
  const isComplete = count === 3;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl font-semibold text-foreground">Choose your 3 core values</h2>
        <p className="text-sm text-muted-foreground">
          From your 14 selections, which 3 matter most to you?
        </p>
        <div className="flex items-center gap-2 mt-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "h-2 flex-1 rounded-full transition-all duration-300",
                i <= count ? "bg-primary" : "bg-border"
              )}
            />
          ))}
          <span
            className={cn(
              "text-xs font-semibold tabular-nums ml-1 transition-colors",
              isComplete ? "text-success" : "text-muted-foreground"
            )}
            aria-live="polite"
          >
            {count}/3
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {allValues.map((v) => {
          const selected = isCore(v);
          const disabled = !selected && coreValues.length >= 3;

          return (
            <button
              key={`${v.category}-${v.name}`}
              type="button"
              onClick={() => handleToggle(v)}
              disabled={disabled}
              aria-pressed={selected}
              className={cn(
                "group relative rounded-lg border-2 p-4 text-left transition-all duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "min-h-[72px]",
                selected
                  ? "border-primary bg-primary-subtle shadow-md"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-sm",
                disabled && "opacity-35 cursor-not-allowed hover:border-border hover:shadow-none"
              )}
            >
              {/* Selection indicator */}
              <div
                className={cn(
                  "absolute top-3 right-3 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-200",
                  selected
                    ? "bg-primary scale-100"
                    : "border-2 border-border bg-background scale-90 group-hover:border-primary/40"
                )}
                aria-hidden="true"
              >
                {selected ? (
                  <Check size={14} strokeWidth={3} className="text-primary-foreground" />
                ) : (
                  <Star size={10} className="text-muted-foreground/50" />
                )}
              </div>

              <p className={cn(
                "text-sm font-semibold pr-8 transition-colors",
                selected ? "text-primary" : "text-foreground"
              )}>
                {v.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{v.category}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
