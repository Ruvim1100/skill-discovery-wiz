import React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VALUE_CATEGORIES } from "./constants";

interface ValueCategoryPickerProps {
  /** Record of categoryId → array of selected value names (max 2 each) */
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
      if (current.length >= 2) return; // max 2
      onChange(categoryId, [...current, value]);
    }
  };

  const allComplete = VALUE_CATEGORIES.every(
    (cat) => (selections[cat.id]?.length ?? 0) === 2
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-foreground">Select your values</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Why these values?"
                >
                  <HelpCircle size={18} className="text-muted-foreground" aria-hidden="true" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                Based on Brené Brown's values framework, identifying your core values
                helps match you with careers that align with what matters most.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-muted-foreground">
          {allComplete
            ? "All categories complete — you're ready to continue!"
            : "Select 2 values from each category to continue"}
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
              className="rounded-lg border bg-card overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline [&>svg]:hidden">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-medium text-foreground">{cat.label}</span>
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full ml-auto mr-2",
                      isComplete
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                    )}
                    style={isComplete ? { color: "var(--success)" } : undefined}
                  >
                    {selected.length}/2
                    {isComplete && <Check size={12} className="inline ml-1 -mt-0.5" aria-hidden="true" />}
                  </span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 text-muted-foreground transition-transform duration-200 [[data-state=open]>&]:rotate-180"
                    aria-hidden="true"
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-0">
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
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-primary/50",
                          isDisabled && !isSelected && "opacity-40 cursor-not-allowed"
                        )}
                        style={isSelected ? {
                          borderColor: "var(--primary)",
                          backgroundColor: "var(--primary)",
                          color: "var(--primary-foreground)",
                        } : undefined}
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
