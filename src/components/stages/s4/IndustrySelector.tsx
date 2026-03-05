import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Monitor, TrendingUp, GraduationCap, HeartPulse, Leaf, Palette,
  Wrench, Plane, Landmark, Users, ShoppingBag, Truck,
  ChevronDown, Check,
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

const CategoryCard: React.FC<{
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
    <Collapsible className="rounded-lg border border-border bg-card transition-colors duration-200">
      <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/50 transition-colors group">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon size={18} className="text-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{category.label}</p>
        </div>
        {count > 0 && (
          <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
            {count} selected
          </span>
        )}
        <ChevronDown
          size={16}
          className="shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-t border-border px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {category.subfields.map((sf) => {
            const isChecked = selected.includes(sf);
            return (
              <label
                key={sf}
                className={cn(
                  "flex items-center gap-2.5 rounded-md border px-3 py-2.5 cursor-pointer transition-all duration-150",
                  "min-h-[44px] text-sm",
                  isChecked
                    ? "border-primary bg-card shadow-sm"
                    : "border-transparent bg-transparent hover:bg-muted/50"
                )}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleSubfield(sf)}
                />
                <span className={cn("text-sm", isChecked ? "font-medium text-foreground" : "text-muted-foreground")}>
                  {sf}
                </span>
              </label>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export const IndustrySelector: React.FC<IndustrySelectorProps> = ({
  selections,
  onChange,
}) => {
  const totalSelected = Object.values(selections).reduce((sum, arr) => sum + arr.length, 0);
  const isMinMet = totalSelected >= 3;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">What industries interest you?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select at least 3 fields or subfields that appeal to you
        </p>
      </div>

      {/* Global counter */}
      <div className="flex items-center gap-2">
        {isMinMet && <Check size={16} className="text-success" />}
        <p className={cn("text-sm font-medium", isMinMet ? "text-success" : "text-muted-foreground")}>
          {totalSelected} selected {!isMinMet && "(minimum 3)"}
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {INDUSTRY_CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            selected={selections[cat.id] ?? []}
            onChange={(subfields) => onChange(cat.id, subfields)}
          />
        ))}
      </div>
    </div>
  );
};
