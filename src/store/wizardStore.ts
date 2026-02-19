import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Stage definitions ───────────────────────────────────────
export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface StageInfo {
  id: StageId;
  label: string;
  shortLabel: string;
  subSteps: string[];
}

export const STAGES: StageInfo[] = [
  {
    id: 1,
    label: "Orientation",
    shortLabel: "S1",
    subSteps: ["welcome", "career_stage", "goals"],
  },
  {
    id: 2,
    label: "Values",
    shortLabel: "S2",
    subSteps: ["category_selection", "refinement", "explanation", "likert_questions", "motivation"],
  },
  {
    id: 3,
    label: "Aptitudes",
    shortLabel: "S3",
    subSteps: ["self_rating", "evidence", "confirmation"],
  },
  {
    id: 4,
    label: "Interests",
    shortLabel: "S4",
    subSteps: ["holland_codes", "exploration", "priorities"],
  },
  {
    id: 5,
    label: "Preferences",
    shortLabel: "S5",
    subSteps: ["work_style", "environment", "culture"],
  },
  {
    id: 6,
    label: "Report",
    shortLabel: "S6",
    subSteps: ["generating", "overview", "deep_dive"],
  },
  {
    id: 7,
    label: "Plan Preferences",
    shortLabel: "S7",
    subSteps: ["timeline", "constraints", "priorities"],
  },
  {
    id: 8,
    label: "Action Plan",
    shortLabel: "S8",
    subSteps: ["milestones", "resources", "commitment"],
  },
];

// ── Store types ─────────────────────────────────────────────
export interface WizardState {
  currentStage: StageId;
  currentSubStep: string;
  completedStages: StageId[];
  stageValidation: Record<StageId, boolean>;
  hasUnsavedChanges: boolean;
  isLoading: boolean;
  showExitDialog: boolean;

  // Actions
  goToStage: (stage: StageId, subStep?: string) => void;
  goToNextStage: () => void;
  goToPreviousStage: () => void;
  setSubStep: (subStep: string) => void;
  markStageValid: (stage: StageId, valid: boolean) => void;
  markStageComplete: (stage: StageId) => void;
  setHasUnsavedChanges: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setShowExitDialog: (value: boolean) => void;
  resetWizard: () => void;
}

const getInitialSubStep = (stage: StageId): string => {
  const stageInfo = STAGES.find((s) => s.id === stage);
  return stageInfo?.subSteps[0] ?? "default";
};

const initialState = {
  currentStage: 1 as StageId,
  currentSubStep: "welcome",
  completedStages: [] as StageId[],
  stageValidation: {} as Record<StageId, boolean>,
  hasUnsavedChanges: false,
  isLoading: false,
  showExitDialog: false,
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
      ...initialState,

      goToStage: (stage, subStep) => {
        set({
          currentStage: stage,
          currentSubStep: subStep ?? getInitialSubStep(stage),
        });
      },

      goToNextStage: () => {
        const { currentStage, completedStages } = get();
        if (currentStage < 8) {
          const nextStage = (currentStage + 1) as StageId;
          const updated = completedStages.includes(currentStage)
            ? completedStages
            : [...completedStages, currentStage];
          set({
            completedStages: updated,
            currentStage: nextStage,
            currentSubStep: getInitialSubStep(nextStage),
            hasUnsavedChanges: false,
          });
        }
      },

      goToPreviousStage: () => {
        const { currentStage } = get();
        if (currentStage > 1) {
          const prevStage = (currentStage - 1) as StageId;
          set({
            currentStage: prevStage,
            currentSubStep: getInitialSubStep(prevStage),
          });
        }
      },

      setSubStep: (subStep) => set({ currentSubStep: subStep }),

      markStageValid: (stage, valid) =>
        set((state) => ({
          stageValidation: { ...state.stageValidation, [stage]: valid },
        })),

      markStageComplete: (stage) =>
        set((state) => ({
          completedStages: state.completedStages.includes(stage)
            ? state.completedStages
            : [...state.completedStages, stage],
        })),

      setHasUnsavedChanges: (value) => set({ hasUnsavedChanges: value }),
      setIsLoading: (value) => set({ isLoading: value }),
      setShowExitDialog: (value) => set({ showExitDialog: value }),

      resetWizard: () => set(initialState),
    }),
    {
      name: "yourvue-wizard-progress",
      partialize: (state) => ({
        currentStage: state.currentStage,
        currentSubStep: state.currentSubStep,
        completedStages: state.completedStages,
        stageValidation: state.stageValidation,
      }),
    }
  )
);

// ── Derived helpers ─────────────────────────────────────────
export const getOverallProgress = (
  completedStages: StageId[],
  currentStage: StageId
): number => {
  const completedWeight = (completedStages.length / 8) * 100;
  const currentStageProgress = ((currentStage - 1) / 8) * 100;
  return Math.max(completedWeight, currentStageProgress);
};
