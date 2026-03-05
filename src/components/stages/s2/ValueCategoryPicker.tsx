import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
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
import { Info } from "lucide-react";
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
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-foreground">What matters most to you?</h2>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Why these values?"
              >
                <Info size={16} />
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="max-w-xs text-sm leading-relaxed">
              Based on Brené Brown's values framework, identifying your core values
              helps match you with careers that align with what matters most.
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-sm text-muted-foreground">
          Choose 2 values from each category that resonate with you most.
        </p>
      </div>

      {/* Accordion categories */}
      <Accordion type="multiple" defaultValue={[VALUE_CATEGORIES[0].id]} className="flex flex-col gap-2">
        {VALUE_CATEGORIES.map((cat) => {
          const selected = selections[cat.id] ?? [];
          const isComplete = selected.length === 2;

          return (
            <AccordionItem
              key={cat.id}
              value={cat.id}
              className={cn(
                "rounded-lg border overflow-hidden transition-colors duration-200 bg-card",
                isComplete ? "border-success" : "border-border"
              )}
            >
              <AccordionTrigger className="px-4 py-3.5 hover:no-underline [&>svg]:hidden">
                <div className="flex items-center w-full pr-2">
                  <span className="text-sm font-medium text-foreground flex-1 text-left">
                    {cat.label}
                  </span>

                  <span
                    className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-md mr-3 tabular-nums",
                      isComplete
                        ? "text-success"
                        : "text-muted-foreground"
                    )}
                  >
                    {selected.length}/2
                  </span>

                  <ChevronDown
                    size={16}
                    className="shrink-0 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-180"
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
                          "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm min-h-[36px]",
                          "border transition-all duration-150 ease-out",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          "active:scale-105",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground font-medium"
                            : "border-border bg-background text-foreground hover:border-primary",
                          isDisabled && !isSelected && "opacity-30 cursor-not-allowed hover:border-border"
                        )}
                      >
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

      {/* Bottom status */}
      <p className={cn(
        "text-sm font-medium text-center",
        allComplete ? "text-success" : "text-muted-foreground"
      )}>
        {allComplete
          ? `${completedCount} of ${VALUE_CATEGORIES.length} categories completed`
          : `${completedCount} of ${VALUE_CATEGORIES.length} categories completed`}
      </p>
    </div>
  );
};
