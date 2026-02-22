import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useWizardStore } from "@/store/wizardStore";
import { StageTransition } from "@/components/wizard/StageTransition";
import { Button } from "@/components/ui/button";
import { ValueCategoryPicker } from "./ValueCategoryPicker";
import { ValueRefinement } from "./ValueRefinement";
import { ValueExplanation } from "./ValueExplanation";
import { LikertGroup } from "./LikertGroup";
import { MotivationSelector } from "./MotivationSelector";
import { VALUE_CATEGORIES, LIKERT_QUESTIONS, type CareerMotivation } from "./constants";

const STORAGE_KEY = "yourvue-s2-data";

interface ValueWithCategory {
  name: string;
  category: string;
}

interface S2Data {
  selections: Record<string, string[]>;
  coreValues: ValueWithCategory[];
  explanation: string;
  likertResponses: Record<string, number | null>;
  motivationChoice: CareerMotivation | null;
}

const loadData = (): S2Data => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    selections: {},
    coreValues: [],
    explanation: "",
    likertResponses: {},
    motivationChoice: null,
  };
};

interface S2ValuesPageProps {
  onValidityChange: (valid: boolean) => void;
}

export const S2ValuesPage: React.FC<S2ValuesPageProps> = ({ onValidityChange }) => {
  const { goToNextStage } = useWizardStore();
  const [subStep, setSubStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [data, setData] = useState<S2Data>(loadData);

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Always hide parent nav — we manage our own
  useEffect(() => {
    onValidityChange(false);
  }, [onValidityChange]);

  // Derived validity per sub-step
  const allCategoriesComplete = VALUE_CATEGORIES.every(
    (cat) => (data.selections[cat.id]?.length ?? 0) === 2
  );
  const coreComplete = data.coreValues.length === 3;
  const explanationComplete = data.explanation.trim().length > 0;
  const allLikertAnswered = LIKERT_QUESTIONS.every(
    (q) => data.likertResponses[q.id] != null
  );
  const motivationSelected = data.motivationChoice != null;

  // Flat list of 14 selected values for refinement step
  const allSelectedValues: ValueWithCategory[] = useMemo(() => {
    const result: ValueWithCategory[] = [];
    for (const cat of VALUE_CATEGORIES) {
      const sel = data.selections[cat.id] ?? [];
      for (const name of sel) {
        result.push({ name, category: cat.label });
      }
    }
    return result;
  }, [data.selections]);

  const updateField = useCallback(<K extends keyof S2Data>(key: K, value: S2Data[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleCategoryChange = useCallback((catId: string, values: string[]) => {
    setData((prev) => ({
      ...prev,
      selections: { ...prev.selections, [catId]: values },
      // If a previously selected core value was deselected from its category, remove it from coreValues
      coreValues: prev.coreValues.filter((cv) => {
        if (cv.category === VALUE_CATEGORIES.find((c) => c.id === catId)?.label) {
          return values.includes(cv.name);
        }
        return true;
      }),
    }));
  }, []);

  const handleLikertChange = useCallback((qId: string, val: number) => {
    setData((prev) => ({
      ...prev,
      likertResponses: { ...prev.likertResponses, [qId]: val },
    }));
  }, []);

  const handleContinue = () => {
    if (subStep < 5) {
      setSubStep((s) => (s + 1) as any);
    } else {
      goToNextStage();
    }
  };

  const handleBack = () => {
    if (subStep > 1) setSubStep((s) => (s - 1) as any);
  };

  const canContinue = (() => {
    switch (subStep) {
      case 1: return allCategoriesComplete;
      case 2: return coreComplete;
      case 3: return explanationComplete;
      case 4: return allLikertAnswered;
      case 5: return motivationSelected;
      default: return false;
    }
  })();

  return (
    <div className="flex flex-col gap-6">
      <StageTransition stageKey={`s2-step${subStep}`}>
        {subStep === 1 && (
          <ValueCategoryPicker
            selections={data.selections}
            onChange={handleCategoryChange}
          />
        )}
        {subStep === 2 && (
          <ValueRefinement
            allValues={allSelectedValues}
            coreValues={data.coreValues}
            onChange={(cv) => updateField("coreValues", cv)}
          />
        )}
        {subStep === 3 && (
          <ValueExplanation
            coreValueNames={data.coreValues.map((v) => v.name)}
            explanation={data.explanation}
            onChange={(text) => updateField("explanation", text)}
          />
        )}
        {subStep === 4 && (
          <LikertGroup
            questions={LIKERT_QUESTIONS}
            responses={data.likertResponses}
            onChange={handleLikertChange}
          />
        )}
        {subStep === 5 && (
          <MotivationSelector
            value={data.motivationChoice}
            onChange={(v) => updateField("motivationChoice", v)}
          />
        )}
      </StageTransition>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-2">
        <div>
          {subStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="min-h-[44px]"
            >
              Back
            </Button>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <Button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="min-h-[44px] px-6"
            style={canContinue ? {
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            } : undefined}
          >
            {subStep === 5 ? "Continue to Aptitudes" : subStep === 3 ? "These are my values" : "Continue"}
          </Button>
          {!canContinue && subStep === 1 && (
            <p className="text-xs text-muted-foreground">
              Select 2 values from each category to continue
            </p>
          )}
        </div>
      </div>

      {/* Sub-step indicator */}
      <div className="flex justify-center gap-1.5 pb-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className="h-1.5 rounded-full transition-all duration-200"
            style={{
              width: s === subStep ? 24 : 8,
              backgroundColor: s === subStep ? "var(--primary)" : "var(--border)",
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
};
