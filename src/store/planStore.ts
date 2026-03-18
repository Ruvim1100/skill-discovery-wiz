import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TargetRole {
  jobId: string;
  title: string;
  category: string;
  subcategory: string | null;
  matchType: "STRONG_FIT" | "HIGH_POTENTIAL";
}

export interface PlanState {
  // S7 Target Role (sub-screen 1)
  targetRole: TargetRole | null;
  customTargetRole: string | null;
  isCustomRole: boolean;

  // S7 Preferences (sub-screens 2-4, placeholder)
  weeklyHours: number | null;
  idealTaskLength: number | null;
  planDuration: number | null;
  timeSlots: string[];
  learningMethods: string[];
  difficulty: string | null;
  remindersEnabled: boolean;
  notes: string | null;

  // Plan state
  existingPlanId: string | null;
  isLoading: boolean;

  // Actions
  selectTargetRole: (role: TargetRole) => void;
  setCustomTargetRole: (role: string) => void;
  clearTargetRole: () => void;
  setExistingPlanId: (id: string) => void;
  reset: () => void;
}

const initialState = {
  targetRole: null as TargetRole | null,
  customTargetRole: null as string | null,
  isCustomRole: false,
  weeklyHours: null as number | null,
  idealTaskLength: null as number | null,
  planDuration: null as number | null,
  timeSlots: [] as string[],
  learningMethods: [] as string[],
  difficulty: null as string | null,
  remindersEnabled: false,
  notes: null as string | null,
  existingPlanId: null as string | null,
  isLoading: false,
};

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      ...initialState,

      selectTargetRole: (role) =>
        set({
          targetRole: role,
          customTargetRole: null,
          isCustomRole: false,
        }),

      setCustomTargetRole: (role) =>
        set({
          customTargetRole: role,
          targetRole: null,
          isCustomRole: true,
        }),

      clearTargetRole: () =>
        set({
          targetRole: null,
          customTargetRole: null,
          isCustomRole: false,
        }),

      setExistingPlanId: (id) => set({ existingPlanId: id }),

      reset: () => set(initialState),
    }),
    {
      name: "yourvue-plan",
      partialize: (state) => ({
        targetRole: state.targetRole,
        customTargetRole: state.customTargetRole,
        isCustomRole: state.isCustomRole,
        weeklyHours: state.weeklyHours,
        idealTaskLength: state.idealTaskLength,
        planDuration: state.planDuration,
        timeSlots: state.timeSlots,
        learningMethods: state.learningMethods,
        difficulty: state.difficulty,
        remindersEnabled: state.remindersEnabled,
        notes: state.notes,
        existingPlanId: state.existingPlanId,
      }),
    }
  )
);
