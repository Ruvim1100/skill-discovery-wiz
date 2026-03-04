import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useWizardStore } from "@/store/wizardStore";
import { StageTransition } from "@/components/wizard/StageTransition";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { LikertGroup } from "@/components/stages/s2/LikertGroup";
import { ResumeUpload } from "./ResumeUpload";
import { GdprConsent } from "./GdprConsent";
import { ParsedDataReview, type ParsedResumeData } from "./ParsedDataReview";
import { BehavioralScenarioGroup } from "./BehavioralScenario";
import { S3_LIKERT_QUESTIONS, SCENARIOS, type CareerStage } from "./constants";

const STORAGE_KEY = "yourvue-s3-data";

interface S3Data {
  resumeMode: "upload" | "paste";
  pastedText: string;
  fileName: string | null;
  consented: boolean;
  parsedData: ParsedResumeData;
  likertResponses: Record<string, number | null>;
  scenarioResponses: Record<string, "A" | "B" | "C" | null>;
  parsingDone: boolean;
}

const emptyParsedData: ParsedResumeData = {
  education: [],
  experience: [],
  hardSkills: [],
  softSkills: [],
  projects: [],
  awards: [],
};

const loadData = (): S3Data => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    resumeMode: "upload",
    pastedText: "",
    fileName: null,
    consented: false,
    parsedData: emptyParsedData,
    likertResponses: {},
    scenarioResponses: {},
    parsingDone: false,
  };
};

const LOADING_MESSAGES = [
  "Analyzing your resume...",
  "Extracting skills...",
  "Identifying experience...",
  "Mapping education...",
];

const MOCK_PARSED: ParsedResumeData = {
  education: [
    { id: "e1", degree: "BSc", field: "Computer Science", institution: "University of London", year: "2019" },
  ],
  experience: [
    {
      id: "x1",
      title: "Software Engineer",
      company: "TechCorp",
      duration: "2019–2022",
      responsibilities: ["Built REST APIs", "Led sprint planning", "Mentored junior developers"],
    },
    {
      id: "x2",
      title: "Senior Developer",
      company: "StartupXYZ",
      duration: "2022–Present",
      responsibilities: ["Architecture design", "Team leadership", "CI/CD pipeline management"],
    },
  ],
  hardSkills: ["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
  softSkills: ["Communication", "Leadership", "Problem solving", "Teamwork"],
  projects: [
    { id: "p1", name: "E-commerce Platform", description: "Full-stack marketplace with payments" },
  ],
  awards: ["AWS Certified Solutions Architect", "Employee of the Year 2021"],
};

interface S3AptitudesPageProps {
  onValidityChange: (valid: boolean) => void;
}

export const S3AptitudesPage: React.FC<S3AptitudesPageProps> = ({ onValidityChange }) => {
  const { goToNextStage } = useWizardStore();
  const [subStep, setSubStep] = useState<1 | 2 | 3 | 4>(() => {
    const d = loadData();
    if (d.parsingDone) return 2;
    return 1;
  });
  const [data, setData] = useState<S3Data>(loadData);
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [loadingElapsed, setLoadingElapsed] = useState(0);

  const careerStage = useMemo<CareerStage>(() => {
    try {
      const s1 = localStorage.getItem("yourvue-s1-data");
      if (s1) {
        const parsed = JSON.parse(s1);
        if (parsed.careerStage) return parsed.careerStage;
      }
    } catch {}
    return "UNSURE";
  }, []);

  const scenarios = SCENARIOS[careerStage];

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Hide parent nav
  useEffect(() => {
    onValidityChange(false);
  }, [onValidityChange]);

  // Loading message cycling
  useEffect(() => {
    if (!parsing) return;
    const msgInterval = setInterval(() => {
      setLoadingMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2000);
    const elapsedInterval = setInterval(() => {
      setLoadingElapsed((e) => e + 1);
    }, 1000);
    return () => {
      clearInterval(msgInterval);
      clearInterval(elapsedInterval);
    };
  }, [parsing]);

  const hasContent = data.resumeMode === "upload" ? !!file : data.pastedText.trim().length > 0;
  const canAnalyze = hasContent && data.consented;

  const handleAnalyze = useCallback(() => {
    setParsing(true);
    setLoadingElapsed(0);
    setLoadingMsgIdx(0);
    setTimeout(() => {
      setData((prev) => ({
        ...prev,
        parsedData: MOCK_PARSED,
        parsingDone: true,
        fileName: file?.name ?? null,
      }));
      setParsing(false);
      setSubStep(2);
    }, 3000);
  }, [file]);

  const handleRetry = useCallback(() => {
    setParsing(true);
    setLoadingElapsed(0);
    setTimeout(() => {
      setData((prev) => ({ ...prev, parsedData: MOCK_PARSED, parsingDone: true }));
      setParsing(false);
      setSubStep(2);
    }, 2000);
  }, []);

  const handleLikertChange = useCallback((qId: string, val: number) => {
    setData((prev) => ({
      ...prev,
      likertResponses: { ...prev.likertResponses, [qId]: val },
    }));
  }, []);

  const handleScenarioChange = useCallback((sId: string, ans: "A" | "B" | "C") => {
    setData((prev) => ({
      ...prev,
      scenarioResponses: { ...prev.scenarioResponses, [sId]: ans },
    }));
  }, []);

  const allLikertDone = S3_LIKERT_QUESTIONS.every((q) => data.likertResponses[q.id] != null);
  const allScenariosDone = scenarios.every((s) => data.scenarioResponses[s.id] != null);

  const canContinue = (() => {
    switch (subStep) {
      case 1: return false;
      case 2: return true;
      case 3: return allLikertDone;
      case 4: return allScenariosDone;
      default: return false;
    }
  })();

  const handleContinue = () => {
    if (subStep < 4) {
      setSubStep((s) => (s + 1) as any);
    } else {
      goToNextStage();
    }
  };

  const handleBack = () => {
    if (subStep > 1) setSubStep((s) => (s - 1) as any);
  };

  // Parsing loading state
  if (parsing) {
    return (
      <div className="flex flex-col gap-6 py-8">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary-subtle flex items-center justify-center">
            <Loader2 size={28} className="animate-spin text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground" aria-live="polite">
            {LOADING_MESSAGES[loadingMsgIdx]}
          </p>
          <p className="text-xs text-muted-foreground">This usually takes a few seconds</p>
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-12 rounded-lg" />
          ))}
        </div>
        {loadingElapsed > 15 && (
          <Button
            variant="outline"
            onClick={handleRetry}
            className="self-center min-h-[44px]"
          >
            Retry
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <StageTransition stageKey={`s3-step${subStep}`}>
        {subStep === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Share Your Experience</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Upload or paste your resume so we can understand your background
              </p>
            </div>

            <ResumeUpload
              file={file}
              pastedText={data.pastedText}
              mode={data.resumeMode}
              onFileChange={setFile}
              onPastedTextChange={(text) => setData((prev) => ({ ...prev, pastedText: text }))}
              onModeChange={(mode) => setData((prev) => ({ ...prev, resumeMode: mode }))}
            />

            <GdprConsent
              consented={data.consented}
              onChange={(v) => setData((prev) => ({ ...prev, consented: v }))}
            />

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleAnalyze}
                disabled={!canAnalyze}
                className="min-h-[44px] px-6"
              >
                Analyze Resume
              </Button>
            </div>
          </div>
        )}

        {subStep === 2 && (
          <ParsedDataReview
            data={data.parsedData}
            onChange={(pd) => setData((prev) => ({ ...prev, parsedData: pd }))}
          />
        )}

        {subStep === 3 && (
          <LikertGroup
            questions={S3_LIKERT_QUESTIONS}
            responses={data.likertResponses}
            onChange={handleLikertChange}
            heading="Rate your aptitudes"
            subheading="Rate how much you agree with each statement — there are no right or wrong answers."
          />
        )}

        {subStep === 4 && (
          <BehavioralScenarioGroup
            scenarios={scenarios}
            responses={data.scenarioResponses}
            onChange={handleScenarioChange}
          />
        )}
      </StageTransition>

      {/* Navigation */}
      {subStep !== 1 && (
        <div className="flex justify-between items-center pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="min-h-[44px]"
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="min-h-[44px] px-6"
          >
            {subStep === 2 ? "Confirm & Continue" : subStep === 4 ? "Continue to Interests" : "Continue"}
          </Button>
        </div>
      )}

      {/* Sub-step indicator */}
      <div className="flex justify-center gap-1.5 pb-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: s === subStep ? 24 : 8,
              backgroundColor: s <= subStep ? "var(--primary)" : "var(--border)",
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
};
