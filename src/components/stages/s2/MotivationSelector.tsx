import React from "react";
import { BookOpen, Heart, Crown, Compass } from "lucide-react";
import { SelectableCardGroup } from "@/components/wizard/SelectableCardGroup";
import { MOTIVATION_OPTIONS, type CareerMotivation } from "./constants";

const ICON_MAP = { BookOpen, Heart, Crown, Compass } as const;

interface MotivationSelectorProps {
  value: CareerMotivation | null;
  onChange: (value: CareerMotivation) => void;
}

export const MotivationSelector: React.FC<MotivationSelectorProps> = ({
  value,
  onChange,
}) => {
  const options = MOTIVATION_OPTIONS.map((opt) => {
    const Icon = ICON_MAP[opt.iconName];
    return {
      id: opt.id,
      label: opt.label,
      description: opt.description,
      icon: <Icon size={22} />,
    };
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          What motivates your next step?
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose the option that resonates most with you
        </p>
      </div>

      <SelectableCardGroup
        mode="single"
        value={value}
        onChange={(v) => onChange(v as CareerMotivation)}
        options={options}
        columns={2}
      />
    </div>
  );
};
