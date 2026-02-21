import React from "react";
import { cn } from "@/lib/utils";
import { Check, HelpCircle, Rocket, Search, RefreshCcw, TrendingUp, HelpCircle as HelpIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type CareerStage = "STARTER" | "EXPLORER" | "SHIFTER" | "ADVANCER" | "UNSURE";

interface CareerStageOption {
  id: CareerStage;
  label: string;
  description: string;
  example: string;
  tooltip: string;
  icon: React.ElementType;
  unsure?: boolean;
}

const CAREER_STAGES: CareerStageOption[] = [
  {
    id: "STARTER",
    label: "Starter",
    description: "Just starting out or entering the workforce for the first time (0–2 years experience)",
    example: "Recent graduate, first job, internship",
    tooltip: "Choose this if you're in the early stages of building your career foundation.",
    icon: Rocket,
  },
  {
    id: "EXPLORER",
    label: "Explorer",
    description: "Exploring options and figuring out what fits (2–7 years experience)",
    example: "Trying different roles, curious about alternatives",
    tooltip: "Choose this if you have some experience but are still searching for the right fit.",
    icon: Search,
  },
  {
    id: "SHIFTER",
    label: "Shifter",
    description: "Ready for a significant career change to a new field",
    example: "Switching industries, retraining, career pivot",
    tooltip: "Choose this if you're planning or actively making a move to a completely different career path.",
    icon: RefreshCcw,
  },
  {
    id: "ADVANCER",
    label: "Advancer",
    description: "Looking to level up and grow within your domain (7+ years)",
    example: "Seeking promotion, leadership role, specialization",
    tooltip: "Choose this if you're experienced and want to accelerate your growth in your current field.",
    icon: TrendingUp,
  },
  {
    id: "UNSURE",
    label: "I'm not sure yet",
    description: "Not sure where you stand — and that's perfectly okay",
    example: "Exploring your options, need clarity",
    tooltip: "It's completely normal to be unsure. We'll help you find clarity throughout the assessment.",
    icon: HelpCircle,
    unsure: true,
  },
];

interface CareerStageSelectorProps {
  value: CareerStage | null;
  onChange: (stage: CareerStage) => void;
}

export const CareerStageSelector: React.FC<CareerStageSelectorProps> = ({
  value,
  onChange,
}) => (
  <TooltipProvider delayDuration={300}>
    <section aria-labelledby="career-stage-heading" className="flex flex-col gap-4">
      <div>
        <h2 id="career-stage-heading" className="text-lg font-semibold text-foreground">
          Where are you in your career?
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Select the option that best describes you today.</p>
      </div>

      <div role="radiogroup" aria-label="Career stage" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CAREER_STAGES.map((stage) => {
          const isSelected = value === stage.id;
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => onChange(stage.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(stage.id);
                }
              }}
              className={cn(
                "relative rounded-lg p-4 cursor-pointer select-none min-h-[44px]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "transition-all duration-150 ease-out",
                stage.unsure ? "border-2 border-dashed" : "border-2 border-solid",
                isSelected
                  ? "shadow-md"
                  : "hover:shadow-md hover:border-muted-foreground",
                // sm:col-span-2 for UNSURE so it sits alone at the bottom on desktop
                stage.unsure && "sm:col-span-2"
              )}
              style={{
                borderColor: isSelected ? "var(--primary)" : "var(--border)",
                backgroundColor: isSelected ? "var(--primary)" : "var(--card)",
                color: isSelected ? "var(--primary-foreground)" : undefined,
              }}
            >
              {/* Checkmark */}
              {isSelected && (
                <div
                  className="absolute top-3 right-3 h-5 w-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--primary-foreground)" }}
                  aria-hidden="true"
                >
                  <Check size={12} strokeWidth={3} style={{ color: "var(--primary)" }} />
                </div>
              )}

              <div className="flex items-start gap-3 pr-8">
                <div
                  className="h-10 w-10 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: isSelected ? "var(--primary-foreground)" : "var(--muted)",
                    color: isSelected ? "var(--primary)" : "var(--muted-foreground)",
                  }}
                >
                  <Icon size={20} aria-hidden="true" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold leading-tight">{stage.label}</p>
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="inline-flex items-center justify-center h-5 w-5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          aria-label={`More info about ${stage.label}`}
                        >
                          <HelpIcon
                            size={14}
                            style={{
                              color: isSelected ? "var(--primary-foreground)" : "var(--muted-foreground)",
                              opacity: 0.7,
                            }}
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[240px] text-xs">
                        {stage.tooltip}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p
                    className="text-xs mt-0.5 leading-snug"
                    style={{
                      color: isSelected ? "var(--primary-foreground)" : "var(--muted-foreground)",
                      opacity: isSelected ? 0.9 : 1,
                    }}
                  >
                    {stage.description}
                  </p>
                  <p
                    className="text-xs mt-1 italic"
                    style={{
                      color: isSelected ? "var(--primary-foreground)" : "var(--muted-foreground)",
                      opacity: 0.7,
                    }}
                  >
                    e.g., {stage.example}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  </TooltipProvider>
);
