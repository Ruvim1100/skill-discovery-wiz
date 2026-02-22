import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ValueWithCategory {
  name: string;
  category: string;
}

interface ValueRefinementProps {
  /** All 14 selected values (7 categories × 2) */
  allValues: ValueWithCategory[];
  /** Currently chosen core values (max 3) */
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

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Choose your 3 core values</h2>
        <p className="text-sm text-muted-foreground mt-1">
          From your 14 selections, which 3 matter most to you?
        </p>
        <p
          className="text-xs mt-2 font-medium"
          style={{ color: coreValues.length === 3 ? "var(--success)" : "var(--muted-foreground)" }}
          aria-live="polite"
        >
          {coreValues.length}/3 core values selected
        </p>
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
                "relative rounded-lg border-2 p-4 text-left transition-all duration-150 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "min-h-[44px]",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/40",
                disabled && "opacity-40 cursor-not-allowed"
              )}
              style={selected ? { borderColor: "var(--primary)" } : undefined}
            >
              {selected && (
                <div
                  className="absolute top-3 right-3 h-5 w-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--primary)" }}
                  aria-hidden="true"
                >
                  <Check size={12} strokeWidth={3} color="var(--primary-foreground)" />
                </div>
              )}
              <p className={cn("text-sm font-semibold", selected ? "text-foreground" : "text-foreground")}>
                {v.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{v.category}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
