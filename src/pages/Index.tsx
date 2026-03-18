import React, { useState } from "react";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { S1OrientationPage } from "@/components/stages/s1/S1OrientationPage";
import { S2ValuesPage } from "@/components/stages/s2/S2ValuesPage";
import { S3AptitudesPage } from "@/components/stages/s3/S3AptitudesPage";
import { S4InterestsPage } from "@/components/stages/s4/S4InterestsPage";
import { S5PreferencesPage } from "@/components/stages/s5/S5PreferencesPage";
import { S6ReportPage } from "@/components/stages/s6/S6ReportPage";
import { S7PlanPage } from "@/components/stages/s7/S7PlanPage";
import { useWizardStore, STAGES } from "@/store/wizardStore";

const Index: React.FC = () => {
  const [canContinue, setCanContinue] = useState(false);
  const { currentStage } = useWizardStore();

  return (
    <WizardLayout canContinue={canContinue} hideStageNav={currentStage >= 1 && currentStage <= 7}>
      {currentStage === 1 ? (
        <S1OrientationPage onValidityChange={setCanContinue} />
      ) : currentStage === 2 ? (
        <S2ValuesPage onValidityChange={setCanContinue} />
      ) : currentStage === 3 ? (
        <S3AptitudesPage onValidityChange={setCanContinue} />
      ) : currentStage === 4 ? (
        <S4InterestsPage onValidityChange={setCanContinue} />
      ) : currentStage === 5 ? (
        <S5PreferencesPage onValidityChange={setCanContinue} />
      ) : currentStage === 6 ? (
        <S6ReportPage onValidityChange={setCanContinue} />
      ) : currentStage === 7 ? (
        <S7PlanPage onValidityChange={setCanContinue} />
      ) : (
        <div className="flex flex-col gap-6">
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--primary)" }}
          >
            Stage {currentStage} ·{" "}
            {STAGES.find((s) => s.id === currentStage)?.label}
          </p>
          <h1 className="text-3xl font-bold text-foreground">
            Stage {currentStage} Content Here
          </h1>
          <p className="text-muted-foreground">
            This stage's content will be built in a future iteration.
          </p>
          <div
            className="rounded-lg border-2 border-dashed flex items-center justify-center h-48"
            style={{ borderColor: "var(--border)" }}
            onClick={() => setCanContinue(true)}
          >
            <p className="text-sm text-muted-foreground text-center px-4">
              Click here to mark stage as valid and test Continue →
            </p>
          </div>
        </div>
      )}
    </WizardLayout>
  );
};

export default Index;
