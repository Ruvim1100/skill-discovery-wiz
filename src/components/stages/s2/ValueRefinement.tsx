import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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
      <div>
        <h2 className="text-xl font-bold text-foreground">Choose Your 3 Core Values</h2>
        <p className="text-sm text-muted-foreground mt-1">
          From your selected values, pick the 3 that matter most to you.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
                "group relative rounded-xl border p-4 text-left transition-all duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "min-h-[80px]",
                selected
                  ? "border-primary bg-primary-subtle"
                  : "border-border bg-card hover:border-muted-foreground",
                disabled && "opacity-30 cursor-not-allowed hover:border-border"
              )}
            >
              {/* Checkmark circle — top right */}
              <div
                className={cn(
                  "absolute top-3 right-3 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-200",
                  selected
                    ? "bg-primary"
                    : "border-2 border-border"
                )}
              >
                {selected && (
                  <Check size={14} strokeWidth={3} className="text-primary-foreground" />
                )}
              </div>

              <p className={cn(
                "text-sm font-semibold pr-8",
                selected ? "text-primary" : "text-foreground"
              )}>
                {v.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{v.category}</p>
            </button>
          );
        })}
      </div>

      {/* Bottom counter */}
      <p className={cn(
        "text-sm font-medium text-center",
        isComplete ? "text-success" : "text-muted-foreground"
      )}>
        {count}/3 selected
      </p>
    </div>
  );
};
