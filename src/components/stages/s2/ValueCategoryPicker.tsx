import React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { VALUE_CATEGORIES } from "./constants";

interface ValueCategoryPickerProps {
  selections: Record<string, string[]>;
  onChange: (categoryId: string, values: string[]) => void;
}

export const ValueCategoryPicker: React.FC<ValueCategoryPickerProps> = ({
  selections,
  onChange,
}) => {
  const handleToggle = (categoryId: string, value: string) => {
    const current = selections[categoryId] ?? [];
    if (current.includes(value)) {
      onChange(categoryId, current.filter((v) => v !== value));
    } else {
      if (current.length >= 2) return;
      onChange(categoryId, [...current, value]);
    }
  };

  const completedCount = VALUE_CATEGORIES.filter(
    (cat) => (selections[cat.id]?.length ?? 0) === 2
  ).length;
  const allComplete = completedCount === VALUE_CATEGORIES.length;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-foreground">Select your values</h2>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Why these values?"
              >
                <Sparkles size={16} aria-hidden="true" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="max-w-xs text-sm leading-relaxed">
              Based on Brené Brown's values framework, identifying your core values
              helps match you with careers that align with what matters most.
            </PopoverContent>
          </Popover>
        </div>

        {/* Progress summary */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {allComplete
              ? "All categories complete — you're ready to continue!"
              : "Select 2 values from each category to continue"}
          </p>
          {!allComplete && (
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              {completedCount}/{VALUE_CATEGORIES.length}
            </span>
          )}
        </div>
      </div>

      {/* Accordion categories */}
      <Accordion type="multiple" defaultValue={[VALUE_CATEGORIES[0].id]} className="flex flex-col gap-2.5">
        {VALUE_CATEGORIES.map((cat) => {
          const selected = selections[cat.id] ?? [];
          const isComplete = selected.length === 2;

          return (
            <AccordionItem
              key={cat.id}
              value={cat.id}
              className={cn(
                "rounded-lg border overflow-hidden transition-colors duration-200",
                isComplete ? "border-success bg-card" : "border-border bg-card"
              )}
            >
              <AccordionTrigger className="px-4 py-3.5 hover:no-underline [&>svg]:hidden">
                <div className="flex items-center gap-2 flex-1">
                  {/* Completion indicator */}
                  <div
                    className={cn(
                      "flex items-center justify-center h-5 w-5 rounded-full shrink-0 transition-all duration-200",
                      isComplete ? "bg-success" : "border-2 border-border"
                    )}
                  >
                    {isComplete && (
                      <Check size={12} strokeWidth={3} className="text-success-foreground" />
                    )}
                  </div>

                  <span className={cn(
                    "text-sm font-medium text-foreground",
                    isComplete && "text-foreground"
                  )}>
                    {cat.label}
                  </span>

                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full ml-auto mr-2 transition-colors duration-200",
                      isComplete
                        ? "bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {selected.length}/2
                  </span>

                  <ChevronDown
                    size={16}
                    className="shrink-0 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-180"
                    aria-hidden="true"
                  />
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4 pt-1">
                <div className="flex flex-wrap gap-2">
                  {cat.values.map((val) => {
                    const isSelected = selected.includes(val);
                    const isDisabled = !isSelected && selected.length >= 2;

                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleToggle(cat.id, val)}
                        disabled={isDisabled}
                        aria-pressed={isSelected}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium min-h-[36px]",
                          "border transition-all duration-150 ease-out",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          "active:scale-105",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border bg-background text-foreground hover:border-primary hover:bg-primary-subtle",
                          isDisabled && !isSelected && "opacity-35 cursor-not-allowed hover:bg-background hover:border-border"
                        )}
                      >
                        {isSelected && <Check size={14} strokeWidth={2.5} aria-hidden="true" />}
                        {val}
                      </button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
