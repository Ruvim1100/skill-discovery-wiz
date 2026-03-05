import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useWizardStore } from "@/store/wizardStore";
import { StageTransition } from "@/components/wizard/StageTransition";
import { Button } from "@/components/ui/button";
import { LikertGroup } from "@/components/stages/s2/LikertGroup";
import { IndustrySelector } from "./IndustrySelector";
import { InterestRanking } from "./InterestRanking";
import { S4_LIKERT_QUESTIONS } from "./constants";

const STORAGE_KEY = "yourvue-s4-data";

interface S4Data {
  industrySelections: Record<string, string[]>;
  interestRanking: string[];
  likertResponses: Record<string, number | null>;
}

const loadData = (): S4Data => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    industrySelections: {},
    interestRanking: [],
    likertResponses: {},
  };
};

interface S4InterestsPageProps {
  onValidityChange: (valid: boolean) => void;
}

export const S4InterestsPage: React.FC<S4InterestsPageProps> = ({ onValidityChange }) => {
  const { goToNextStage } = useWizardStore();
  const [subStep, setSubStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<S4Data>(loadData);

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Hide parent nav
  useEffect(() => {
    onValidityChange(false);
  }, [onValidityChange]);

  // Categories with at least one selection
  const activeCategories = useMemo(() => {
    return Object.entries(data.industrySelections)
      .filter(([, subs]) => subs.length > 0)
      .map(([id]) => id);
  }, [data.industrySelections]);

  const totalSelected = Object.values(data.industrySelections).reduce((s, a) => s + a.length, 0);
  const hasMinSelections = totalSelected >= 3;
  const hasMinCategories = activeCategories.length >= 3;

  // Sync ranking with active categories
  useEffect(() => {
    setData((prev) => {
      const filtered = prev.interestRanking.filter((id) => activeCategories.includes(id));
      const newCats = activeCategories.filter((id) => !filtered.includes(id));
      const updated = [...filtered, ...newCats];
      if (JSON.stringify(updated) === JSON.stringify(prev.interestRanking)) return prev;
      return { ...prev, interestRanking: updated };
    });
  }, [activeCategories]);

  const handleIndustryChange = useCallback((catId: string, subfields: string[]) => {
    setData((prev) => ({
      ...prev,
      industrySelections: { ...prev.industrySelections, [catId]: subfields },
    }));
  }, []);

  const handleLikertChange = useCallback((qId: string, val: number) => {
    setData((prev) => ({
      ...prev,
      likertResponses: { ...prev.likertResponses, [qId]: val },
    }));
  }, []);

  const allLikertDone = S4_LIKERT_QUESTIONS.every((q) => data.likertResponses[q.id] != null);

  const canContinue = (() => {
    switch (subStep) {
      case 1: return hasMinSelections && hasMinCategories;
      case 2: return data.interestRanking.length >= 3;
      case 3: return allLikertDone;
      default: return false;
    }
  })();

  const handleContinue = () => {
    if (subStep < 3) {
      setSubStep((s) => (s + 1) as any);
    } else {
      goToNextStage();
    }
  };

  const handleBack = () => {
    if (subStep > 1) setSubStep((s) => (s - 1) as any);
  };

  return (
    <div className="flex flex-col gap-6">
      <StageTransition stageKey={`s4-step${subStep}`}>
        {subStep === 1 && (
          <IndustrySelector
            selections={data.industrySelections}
            onChange={handleIndustryChange}
          />
        )}
        {subStep === 2 && (
          <InterestRanking
            ranking={data.interestRanking}
            selections={data.industrySelections}
            onChange={(r) => setData((prev) => ({ ...prev, interestRanking: r }))}
          />
        )}
        {subStep === 3 && (
          <LikertGroup
            questions={S4_LIKERT_QUESTIONS}
            responses={data.likertResponses}
            onChange={handleLikertChange}
            heading="How do these resonate with you?"
            subheading="Rate your agreement — there are no right or wrong answers."
          />
        )}
      </StageTransition>

      {/* Navigation */}
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
          {subStep === 3 ? "Continue to Preferences" : "Continue"}
        </Button>
      </div>

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
