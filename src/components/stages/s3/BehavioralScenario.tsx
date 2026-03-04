import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { ScenarioQuestion } from "./constants";

interface BehavioralScenarioProps {
  scenario: ScenarioQuestion;
  questionNumber: number;
  value: "A" | "B" | "C" | null;
  onChange: (scenarioId: string, answer: "A" | "B" | "C") => void;
}

export const BehavioralScenario: React.FC<BehavioralScenarioProps> = ({
  scenario,
  questionNumber,
  value,
  onChange,
}) => {
  return (
    <fieldset
      className={cn(
        "flex flex-col gap-4 rounded-lg border p-5 transition-colors duration-200",
        value != null ? "border-primary bg-card" : "border-border bg-card"
      )}
      role="radiogroup"
      aria-label={`Scenario ${questionNumber}`}
    >
      <legend className="text-sm font-medium text-foreground leading-relaxed" style={{ maxWidth: 600, lineHeight: 1.6 }}>
        <span className="font-semibold text-primary mr-1.5">Scenario {questionNumber}.</span>
        {scenario.text}
      </legend>

      <div className="flex flex-col gap-2">
        {scenario.options.map((opt) => {
          const isSelected = value === opt.letter;
          return (
            <button
              key={opt.letter}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(scenario.id, opt.letter)}
              className={cn(
                "flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all duration-200 ease-out min-h-[44px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isSelected
                  ? "border-primary bg-card shadow-sm"
                  : "border-border bg-background hover:border-primary hover:bg-muted"
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold shrink-0 transition-all duration-200",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground"
                )}
                aria-hidden="true"
              >
                {isSelected ? <Check size={14} strokeWidth={3} /> : opt.letter}
              </span>
              <span className={cn(
                "text-sm leading-snug transition-colors",
                isSelected ? "text-foreground font-medium" : "text-foreground"
              )}>
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

// ── Group ───────────────────────────────────────────────────
interface BehavioralScenarioGroupProps {
  scenarios: ScenarioQuestion[];
  responses: Record<string, "A" | "B" | "C" | null>;
  onChange: (scenarioId: string, answer: "A" | "B" | "C") => void;
}

export const BehavioralScenarioGroup: React.FC<BehavioralScenarioGroupProps> = ({
  scenarios,
  responses,
  onChange,
}) => {
  const answered = scenarios.filter((s) => responses[s.id] != null).length;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">How would you respond?</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose the option that feels most natural to you
        </p>
        <div className="flex items-center gap-2 mt-2">
          {scenarios.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                "h-2 flex-1 rounded-full transition-all duration-300",
                responses[s.id] != null ? "bg-primary" : "bg-border"
              )}
            />
          ))}
          <span className={cn(
            "text-xs font-semibold tabular-nums ml-1",
            answered === scenarios.length ? "text-success" : "text-muted-foreground"
          )}>
            {answered}/{scenarios.length}
          </span>
        </div>
      </div>

      {scenarios.map((s, i) => (
        <BehavioralScenario
          key={s.id}
          scenario={s}
          questionNumber={i + 1}
          value={responses[s.id] ?? null}
          onChange={onChange}
        />
      ))}
    </div>
  );
};
