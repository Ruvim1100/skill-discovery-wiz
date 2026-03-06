import React, { useState, useEffect, useCallback } from "react";
import { useWizardStore } from "@/store/wizardStore";
import { StageTransition } from "@/components/wizard/StageTransition";
import { Button } from "@/components/ui/button";
import { LikertGroup } from "@/components/stages/s2/LikertGroup";
import { WorkStyleQuestion } from "./WorkStyleQuestion";
import { WorkStyleTags } from "./WorkStyleTags";
import { WORK_STYLE_QUESTIONS, S5_LIKERT_QUESTIONS } from "./constants";

const STORAGE_KEY = "yourvue-s5-data";

interface S5Data {
  workStyle: Record<string, string>;
  likertResponses: Record<string, number | null>;
}

const loadData = (): S5Data => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { workStyle: {}, likertResponses: {} };
};

interface S5PreferencesPageProps {
  onValidityChange: (valid: boolean) => void;
}

export const S5PreferencesPage: React.FC<S5PreferencesPageProps> = ({ onValidityChange }) => {
  const { goToNextStage } = useWizardStore();
  const [subStep, setSubStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<S5Data>(loadData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    onValidityChange(false);
  }, [onValidityChange]);

  const handleWorkStyleChange = useCallback((field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      workStyle: { ...prev.workStyle, [field]: value },
    }));
  }, []);

  const handleLikertChange = useCallback((qId: string, val: number) => {
    setData((prev) => ({
      ...prev,
      likertResponses: { ...prev.likertResponses, [qId]: val },
    }));
  }, []);

  const allWorkStyleDone = WORK_STYLE_QUESTIONS.every((q) => data.workStyle[q.field]);
  const allLikertDone = S5_LIKERT_QUESTIONS.every((q) => data.likertResponses[q.id] != null);

  const canContinue = (() => {
    switch (subStep) {
      case 1: return allWorkStyleDone;
      case 2: return allLikertDone;
      case 3: return true;
      default: return false;
    }
  })();

  const handleContinue = () => {
    if (subStep < 3) {
      setSubStep((s) => (s + 1) as 1 | 2 | 3);
    } else {
      goToNextStage();
    }
  };

  const handleBack = () => {
    if (subStep > 1) setSubStep((s) => (s - 1) as 1 | 2 | 3);
  };

  return (
    <div className="flex flex-col gap-6">
      <StageTransition stageKey={`s5-step${subStep}`}>
        {subStep === 1 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-bold text-foreground">How do you like to work?</h2>
              <p className="text-sm text-muted-foreground mt-1">
                These preferences help us match you with the right work environment
              </p>
            </div>
            <div className="flex flex-col gap-8">
              {WORK_STYLE_QUESTIONS.map((q) => (
                <WorkStyleQuestion
                  key={q.id}
                  question={q}
                  value={data.workStyle[q.field] ?? null}
                  onChange={handleWorkStyleChange}
                />
              ))}
            </div>
          </div>
        )}

        {subStep === 2 && (
          <LikertGroup
            questions={S5_LIKERT_QUESTIONS}
            responses={data.likertResponses}
            onChange={handleLikertChange}
            heading="Your work environment preferences"
            subheading="Rate how much you agree with each statement — there are no right or wrong answers."
          />
        )}

        {subStep === 3 && (
          <WorkStyleTags
            answers={data.workStyle}
            onComplete={handleContinue}
            onReview={() => setSubStep(1)}
          />
        )}
      </StageTransition>

      {/* Navigation — hidden on tag reveal step (it has its own button) */}
      {subStep !== 3 && (
        <div className="flex justify-between items-center pt-2">
          <div>
            {subStep > 1 && (
              <Button type="button" variant="outline" onClick={handleBack} className="min-h-[44px]">
                Back
              </Button>
            )}
          </div>
          <Button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="min-h-[44px] px-6"
          >
            Continue
          </Button>
        </div>
      )}

      {/* Sub-step indicator */}
      <div className="flex justify-center gap-1.5 pb-2">
        {[1, 2, 3].map((s) => (
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
