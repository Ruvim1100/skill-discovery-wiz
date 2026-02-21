import React, { useState, useCallback, useEffect } from "react";
import { OverviewCards } from "./OverviewCards";
import { CareerStageSelector, type CareerStage } from "./CareerStageSelector";
import { LocationInput } from "./LocationInput";
import { MotivationPopup } from "./MotivationPopup";
import { useWizardStore } from "@/store/wizardStore";
import { StageTransition } from "@/components/wizard/StageTransition";

interface S1OrientationPageProps {
  onValidityChange: (valid: boolean) => void;
}

export const S1OrientationPage: React.FC<S1OrientationPageProps> = ({
  onValidityChange,
}) => {
  const { goToNextStage } = useWizardStore();

  // Persisted S1 data
  const [careerStage, setCareerStage] = useState<CareerStage | null>(() => {
    try {
      const stored = localStorage.getItem("yourvue-s1-data");
      if (stored) return JSON.parse(stored).careerStage ?? null;
    } catch {}
    return null;
  });
  const [location, setLocation] = useState(() => {
    try {
      const stored = localStorage.getItem("yourvue-s1-data");
      if (stored) return JSON.parse(stored).preferredLocation ?? "";
    } catch {}
    return "";
  });

  // Sub-step: 1 = overview + career stage, 2 = location, 3 = popup
  const [subStep, setSubStep] = useState<1 | 2 | 3>(1);
  const [showPopup, setShowPopup] = useState(false);

  // Check if motivation popup was already shown
  const [popupShown] = useState(() => {
    try {
      return localStorage.getItem("yourvue-s1-popup-shown") === "true";
    } catch {
      return false;
    }
  });

  // Persist S1 data
  useEffect(() => {
    localStorage.setItem(
      "yourvue-s1-data",
      JSON.stringify({ careerStage, preferredLocation: location })
    );
  }, [careerStage, location]);

  // Validity: career stage must be selected; on sub-step 1, that's the gate.
  // On sub-step 2, always valid (location is optional).
  useEffect(() => {
    if (subStep === 1) {
      onValidityChange(!!careerStage);
    } else if (subStep === 2) {
      onValidityChange(true);
    }
  }, [subStep, careerStage, onValidityChange]);

  const handleContinueFromStep1 = useCallback(() => {
    if (!careerStage) return;
    setSubStep(2);
  }, [careerStage]);

  const handleContinueFromStep2 = useCallback(() => {
    if (!popupShown) {
      setShowPopup(true);
      setSubStep(3);
      localStorage.setItem("yourvue-s1-popup-shown", "true");
    } else {
      goToNextStage();
    }
  }, [popupShown, goToNextStage]);

  const handleSkipLocation = useCallback(() => {
    setLocation("");
    if (!popupShown) {
      setShowPopup(true);
      setSubStep(3);
      localStorage.setItem("yourvue-s1-popup-shown", "true");
    } else {
      goToNextStage();
    }
  }, [popupShown, goToNextStage]);

  const handleStartNow = useCallback(() => {
    setShowPopup(false);
    goToNextStage();
  }, [goToNextStage]);

  const handleMaybeLater = useCallback(() => {
    setShowPopup(false);
    // Stay on S1, go back to sub-step 2 so they can re-trigger
    setSubStep(2);
    onValidityChange(true);
  }, [onValidityChange]);

  return (
    <div className="flex flex-col gap-8">
      {subStep === 1 && (
        <StageTransition stageKey="s1-step1">
          <OverviewCards />
          <div className="h-px mt-4" style={{ backgroundColor: "var(--border)" }} />
          <div className="mt-6">
            <CareerStageSelector value={careerStage} onChange={setCareerStage} />
          </div>

          {/* Sub-step Continue button */}
          <div className="mt-6 flex flex-col items-end gap-1">
            <button
              type="button"
              onClick={handleContinueFromStep1}
              disabled={!careerStage}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium min-h-[44px] px-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              style={{
                backgroundColor: careerStage ? "var(--primary)" : undefined,
                color: careerStage ? "var(--primary-foreground)" : undefined,
              }}
            >
              Continue
            </button>
            {!careerStage && (
              <p className="text-xs text-muted-foreground">
                Please select your current stage
              </p>
            )}
          </div>
        </StageTransition>
      )}

      {subStep === 2 && (
        <StageTransition stageKey="s1-step2">
          <LocationInput
            value={location}
            onChange={setLocation}
            onSkip={handleSkipLocation}
          />

          <div className="mt-6 flex justify-end">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSubStep(1)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium min-h-[44px] px-6 border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleContinueFromStep2}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium min-h-[44px] px-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </StageTransition>
      )}

      {subStep === 3 && (
        <MotivationPopup
          open={showPopup}
          onStartNow={handleStartNow}
          onMaybeLater={handleMaybeLater}
        />
      )}
    </div>
  );
};
