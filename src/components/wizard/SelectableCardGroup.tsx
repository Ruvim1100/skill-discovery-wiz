import React from "react";
import { cn } from "@/lib/utils";
import { SelectableCard, type SelectableCardOption } from "./SelectableCard";

// ── Types ───────────────────────────────────────────────────
interface SingleSelectProps {
  mode: "single";
  value: string | null;
  onChange: (value: string) => void;
}

interface MultiSelectProps {
  mode: "multi";
  value: string[];
  onChange: (value: string[]) => void;
  min?: number;
  max?: number;
}

type SelectableCardGroupProps = (SingleSelectProps | MultiSelectProps) & {
  options: SelectableCardOption[];
  label?: string;
  helperText?: string;
  columns?: 1 | 2 | 3;
  className?: string;
};

// ── SelectableCardGroup ─────────────────────────────────────
export const SelectableCardGroup: React.FC<SelectableCardGroupProps> = (props) => {
  const {
    options,
    label,
    helperText,
    columns = 2,
    className,
    mode,
  } = props;

  const isSelected = (id: string): boolean => {
    if (mode === "single") {
      return (props as SingleSelectProps).value === id;
    }
    return ((props as MultiSelectProps).value ?? []).includes(id);
  };

  const handleSelect = (id: string) => {
    if (mode === "single") {
      (props as SingleSelectProps).onChange(id);
    } else {
      const multiProps = props as MultiSelectProps;
      const current = multiProps.value ?? [];
      const max = multiProps.max;

      if (current.includes(id)) {
        multiProps.onChange(current.filter((v) => v !== id));
      } else {
        if (max !== undefined && current.length >= max) return;
        multiProps.onChange([...current, id]);
      }
    }
  };

  const gridClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  const multiProps = mode === "multi" ? (props as MultiSelectProps) : null;
  const selectedCount = mode === "multi" ? ((props as MultiSelectProps).value?.length ?? 0) : null;

  return (
    <div
      role={mode === "single" ? "radiogroup" : "group"}
      aria-label={label}
      className={cn("flex flex-col gap-3", className)}
    >
      {(label || helperText) && (
        <div>
          {label && (
            <p className="text-sm font-semibold text-foreground mb-0.5">{label}</p>
          )}
          {helperText && (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          )}
          {/* Selection count indicator for multi-select */}
          {mode === "multi" && (multiProps?.min || multiProps?.max) && (
            <p
              className="text-xs mt-1"
              style={{ color: "var(--muted-foreground)" }}
              aria-live="polite"
            >
              {multiProps?.min && multiProps?.max
                ? `Select ${multiProps.min}–${multiProps.max} options (${selectedCount} selected)`
                : multiProps?.max
                ? `Select up to ${multiProps.max} options (${selectedCount} selected)`
                : multiProps?.min
                ? `Select at least ${multiProps.min} (${selectedCount} selected)`
                : `${selectedCount} selected`}
            </p>
          )}
        </div>
      )}

      <div className={cn("grid gap-3", gridClass)}>
        {options.map((option) => (
          <SelectableCard
            key={option.id}
            option={option}
            isSelected={isSelected(option.id)}
            onSelect={handleSelect}
            mode={mode}
          />
        ))}
      </div>
    </div>
  );
};
