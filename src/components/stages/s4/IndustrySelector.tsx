import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Monitor, TrendingUp, GraduationCap, HeartPulse, Leaf, Palette,
  Wrench, Plane, Landmark, Users, ShoppingBag, Truck,
  Check,
} from "lucide-react";
import { INDUSTRY_CATEGORIES, type IndustryCategory } from "./constants";

const ICON_MAP: Record<string, React.ElementType> = {
  Monitor, TrendingUp, GraduationCap, HeartPulse, Leaf, Palette,
  Wrench, Plane, Landmark, Users, ShoppingBag, Truck,
};

interface IndustrySelectorProps {
  selections: Record<string, string[]>;
  onChange: (categoryId: string, subfields: string[]) => void;
}

const CategorySection: React.FC<{
  category: IndustryCategory;
  selected: string[];
  onChange: (subfields: string[]) => void;
}> = ({ category, selected, onChange }) => {
  const Icon = ICON_MAP[category.icon] ?? Monitor;
  const count = selected.length;

  const toggleSubfield = useCallback(
    (sf: string) => {
      onChange(
        selected.includes(sf)
          ? selected.filter((s) => s !== sf)
          : [...selected, sf]
      );
    },
    [selected, onChange]
  );

  return (
    <AccordionItem
      value={category.id}
      className={cn(
        "rounded-lg border overflow-hidden transition-colors duration-200",
        count > 0 ? "border-primary" : "border-border"
      )}
    >
      <AccordionTrigger className="px-4 py-3.5 hover:no-underline [&>svg]:hidden">
        <div className="flex items-center gap-3 w-full pr-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Icon size={18} className="text-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground flex-1 text-left truncate">
            {category.label}
          </span>
          {count > 0 ? (
            <span className="shrink-0 flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground">
              <Check size={12} />
              {count}
            </span>
          ) : (
            <span className="shrink-0 text-xs text-muted-foreground">
              {category.subfields.length} subfields
            </span>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-0">
        <div className="border-t border-border px-4 py-3.5">
          <div className="flex flex-wrap gap-2">
            {category.subfields.map((sf) => {
              const isChecked = selected.includes(sf);
              return (
                <button
                  key={sf}
                  type="button"
                  onClick={() => toggleSubfield(sf)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-all duration-150 ease-out",
                    "min-h-[36px] border cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                    "active:scale-[1.03]",
                    isChecked
                      ? "border-primary bg-primary text-primary-foreground font-medium shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground"
                  )}
                >
                  {isChecked && <Check size={14} className="shrink-0" />}
                  {sf}
                </button>
              );
            })}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export const IndustrySelector: React.FC<IndustrySelectorProps> = ({
  selections,
  onChange,
}) => {
  const totalSelected = Object.values(selections).reduce((sum, arr) => sum + arr.length, 0);
  const isMinMet = totalSelected >= 3;
  const categoriesWithSelections = Object.values(selections).filter((a) => a.length > 0).length;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">What industries interest you?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select at least 3 fields or subfields that appeal to you
        </p>
      </div>

      {/* Global counter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isMinMet && <Check size={16} className="text-success" />}
          <p className={cn("text-sm font-medium", isMinMet ? "text-success" : "text-muted-foreground")}>
            {totalSelected} selected {!isMinMet && "(minimum 3)"}
          </p>
        </div>
        {categoriesWithSelections > 0 && (
          <p className="text-xs text-muted-foreground">
            across {categoriesWithSelections} categor{categoriesWithSelections === 1 ? "y" : "ies"}
          </p>
        )}
      </div>

      {/* Category list */}
      <Accordion type="multiple" className="flex flex-col gap-3">
        {INDUSTRY_CATEGORIES.map((cat) => (
          <CategorySection
            key={cat.id}
            category={cat}
            selected={selections[cat.id] ?? []}
            onChange={(subfields) => onChange(cat.id, subfields)}
          />
        ))}
      </Accordion>
    </div>
  );
};
