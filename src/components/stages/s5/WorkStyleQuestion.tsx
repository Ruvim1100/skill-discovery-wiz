import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import * as Icons from "lucide-react";
import type { WorkStyleQuestion as WSQ } from "./constants";

interface WorkStyleQuestionProps {
  question: WSQ;
  value: string | null;
  onChange: (field: string, value: string) => void;
}

export const WorkStyleQuestion: React.FC<WorkStyleQuestionProps> = ({
  question,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-semibold text-foreground">{question.question}</h3>
      <div
        className={cn(
          "grid gap-3",
          question.options.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"
        )}
        role="radiogroup"
        aria-label={question.question}
      >
        {question.options.map((opt) => {
          const isSelected = value === opt.value;
          const IconComp = (Icons as any)[opt.iconName] as React.FC<any>;

          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(question.field, opt.value)}
              className={cn(
                "selectable-card relative rounded-xl border-2 p-4 text-left cursor-pointer",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "flex flex-col gap-3 transition-all duration-150",
                isSelected
                  ? "border-primary bg-primary-subtle"
                  : "border-border bg-card hover:border-muted-foreground"
              )}
              style={
                isSelected
                  ? { borderColor: "var(--primary)", backgroundColor: "var(--primary-subtle)" }
                  : undefined
              }
            >
              {/* Check indicator */}
              <div
                className={cn(
                  "absolute top-3 right-3 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-150",
                  isSelected ? "border-primary bg-primary" : "border-border bg-background"
                )}
                style={
                  isSelected
                    ? { borderColor: "var(--primary)", backgroundColor: "var(--primary)" }
                    : undefined
                }
                aria-hidden="true"
              >
                {isSelected && <Check size={11} strokeWidth={3} color="var(--primary-foreground)" />}
              </div>

              {/* Icon */}
              {IconComp && (
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: isSelected ? "var(--primary)" : "var(--muted)",
                    color: isSelected ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    transition: "background-color 150ms, color 150ms",
                  }}
                >
                  <IconComp size={20} />
                </div>
              )}

              {/* Text */}
              <div className="pr-6">
                <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{opt.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
