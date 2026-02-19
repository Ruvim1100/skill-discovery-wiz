import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

// ── Types ───────────────────────────────────────────────────
export interface SelectableCardOption {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  disabled?: boolean;
}

interface SelectableCardProps {
  option: SelectableCardOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  mode: "single" | "multi";
  className?: string;
}

// ── SelectableCard ──────────────────────────────────────────
export const SelectableCard: React.FC<SelectableCardProps> = ({
  option,
  isSelected,
  onSelect,
  mode,
  className,
}) => {
  const { id, label, description, icon, badge, disabled = false } = option;

  const handleClick = () => {
    if (!disabled) onSelect(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <div
      role={mode === "single" ? "radio" : "checkbox"}
      aria-checked={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "selectable-card relative rounded-lg border-2 p-4 cursor-pointer select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "flex flex-col gap-2",
        isSelected
          ? "border-primary bg-primary-subtle"
          : "border-border bg-card hover:border-muted-foreground",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      style={
        isSelected
          ? {
              borderColor: "var(--primary)",
              backgroundColor: "var(--primary-subtle)",
            }
          : undefined
      }
    >
      {/* Selection indicator (top-right) */}
      <div
        className={cn(
          "absolute top-3 right-3 h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150",
          mode === "multi" && "rounded-md",
          isSelected
            ? "border-primary bg-primary"
            : "border-border bg-background"
        )}
        style={
          isSelected
            ? {
                borderColor: "var(--primary)",
                backgroundColor: "var(--primary)",
              }
            : undefined
        }
        aria-hidden="true"
      >
        {isSelected && (
          <Check size={11} strokeWidth={3} color="var(--primary-foreground)" />
        )}
      </div>

      {/* Icon */}
      {icon && (
        <div
          className="h-10 w-10 rounded-md flex items-center justify-center"
          style={{
            backgroundColor: isSelected ? "var(--primary)" : "var(--muted)",
            color: isSelected ? "var(--primary-foreground)" : "var(--muted-foreground)",
            transition: "background-color 150ms ease-out, color 150ms ease-out",
          }}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      {/* Text */}
      <div className="flex-1 pr-6">
        <p
          className={cn(
            "text-sm font-semibold leading-tight",
            isSelected ? "text-foreground" : "text-foreground"
          )}
        >
          {label}
        </p>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
            {description}
          </p>
        )}
      </div>

      {/* Badge */}
      {badge && (
        <span
          className="self-start text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: isSelected ? "var(--primary)" : "var(--muted)",
            color: isSelected ? "var(--primary-foreground)" : "var(--muted-foreground)",
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
};
