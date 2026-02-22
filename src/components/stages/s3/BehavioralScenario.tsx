import React from "react";
import { cn } from "@/lib/utils";
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
    <fieldset className="flex flex-col gap-4" role="radiogroup" aria-label={`Scenario ${questionNumber}`}>
      <legend className="text-sm font-medium text-foreground leading-relaxed" style={{ maxWidth: 600, lineHeight: 1.6 }}>
        <span className="text-muted-foreground mr-1.5">Scenario {questionNumber}.</span>
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
                "flex items-start gap-3 rounded-lg border-2 p-4 text-left transition-all duration-150 ease-out min-h-[44px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/40"
              )}
              style={isSelected ? { borderColor: "var(--primary)" } : undefined}
            >
              <span
                className={cn(
                  "flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold shrink-0 mt-0.5",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
                style={isSelected ? {
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                } : undefined}
                aria-hidden="true"
              >
                {opt.letter}
              </span>
              <span className="text-sm text-foreground leading-snug pt-0.5">{opt.text}</span>
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
}) => (
  <div className="flex flex-col gap-6">
    <div>
      <h2 className="text-xl font-semibold text-foreground">How would you respond?</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Choose the option that feels most natural to you
      </p>
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
