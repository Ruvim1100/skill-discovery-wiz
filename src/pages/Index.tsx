import React, { useState } from "react";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { SelectableCardGroup } from "@/components/wizard/SelectableCardGroup";
import { useWizardStore, STAGES } from "@/store/wizardStore";
import {
  Briefcase,
  Rocket,
  RefreshCcw,
  Star,
  Heart,
  Zap,
  Globe,
  Users,
} from "lucide-react";

// ── Mock Stage 1 Content ────────────────────────────────────
const careerStageOptions = [
  {
    id: "exploring",
    label: "Exploring Options",
    description: "I'm open to possibilities and want to discover what fits me best.",
    icon: <Globe size={20} aria-hidden="true" />,
  },
  {
    id: "early",
    label: "Early Career",
    description: "Less than 3 years of experience. Building my foundation.",
    icon: <Rocket size={20} aria-hidden="true" />,
  },
  {
    id: "mid",
    label: "Mid-Career",
    description: "3–10 years in. Looking to grow, specialise, or pivot.",
    icon: <Briefcase size={20} aria-hidden="true" />,
  },
  {
    id: "transition",
    label: "Career Transition",
    description: "Changing industries or roles. Ready for something new.",
    icon: <RefreshCcw size={20} aria-hidden="true" />,
  },
  {
    id: "senior",
    label: "Senior / Leadership",
    description: "10+ years of experience. Pursuing impact and legacy.",
    icon: <Star size={20} aria-hidden="true" />,
  },
  {
    id: "returning",
    label: "Returning to Work",
    description: "Coming back after a break. Finding my footing again.",
    icon: <Heart size={20} aria-hidden="true" />,
  },
];

const goalsOptions = [
  {
    id: "clarity",
    label: "Career Clarity",
    description: "Understand what career paths truly fit me.",
    icon: <Zap size={20} aria-hidden="true" />,
  },
  {
    id: "change",
    label: "Make a Change",
    description: "Transition into a new role, field, or industry.",
    icon: <RefreshCcw size={20} aria-hidden="true" />,
  },
  {
    id: "grow",
    label: "Grow in Current Role",
    description: "Advance, specialise, or lead in my current field.",
    icon: <Rocket size={20} aria-hidden="true" />,
  },
  {
    id: "fulfillment",
    label: "Find Fulfilment",
    description: "Align my work with my values and sense of purpose.",
    icon: <Heart size={20} aria-hidden="true" />,
  },
  {
    id: "network",
    label: "Build My Network",
    description: "Connect with the right people in my target field.",
    icon: <Users size={20} aria-hidden="true" />,
  },
];

// ── Stage 1 Orientation Mock ────────────────────────────────
const Stage1Content: React.FC<{ onValidityChange: (v: boolean) => void }> = ({
  onValidityChange,
}) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleStageSelect = (id: string) => {
    setSelectedStage(id);
    const valid = !!id && selectedGoals.length > 0;
    onValidityChange(valid);
  };

  const handleGoalsChange = (goals: string[]) => {
    setSelectedGoals(goals);
    const valid = !!selectedStage && goals.length > 0;
    onValidityChange(valid);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--primary)" }}
        >
          Stage 1 · Orientation
        </p>
        <h1 className="text-3xl font-bold text-foreground leading-tight">
          Let's get to know you
        </h1>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
          This short orientation helps us personalise your entire assessment. There are no
          right or wrong answers — just your honest perspective.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

      {/* Career stage selection */}
      <section aria-labelledby="career-stage-heading">
        <div className="mb-4">
          <h2
            id="career-stage-heading"
            className="text-lg font-semibold text-foreground"
          >
            Where are you in your career right now?
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose the option that best describes you today.
          </p>
        </div>
        <SelectableCardGroup
          mode="single"
          options={careerStageOptions}
          value={selectedStage}
          onChange={handleStageSelect}
          columns={2}
        />
      </section>

      {/* Goals multi-select */}
      <section aria-labelledby="goals-heading">
        <div className="mb-4">
          <h2
            id="goals-heading"
            className="text-lg font-semibold text-foreground"
          >
            What are you hoping to achieve?
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select all that apply — you can refine these later.
          </p>
        </div>
        <SelectableCardGroup
          mode="multi"
          options={goalsOptions}
          value={selectedGoals}
          onChange={handleGoalsChange}
          columns={2}
          min={1}
        />
      </section>

      {/* Encouraging note */}
      <div
        className="rounded-lg p-4 flex gap-3 items-start"
        style={{
          backgroundColor: "var(--primary-subtle)",
          borderLeft: "3px solid var(--primary)",
        }}
      >
        <span className="text-lg" aria-hidden="true">💡</span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            This is a career conversation, not an exam.
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your answers adapt the journey to you. Take your time — you can always come
            back and change your responses.
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Index page ──────────────────────────────────────────────
const Index: React.FC = () => {
  const [canContinue, setCanContinue] = useState(false);
  const { currentStage } = useWizardStore();

  return (
    <WizardLayout canContinue={canContinue}>
      {currentStage === 1 ? (
        <Stage1Content onValidityChange={setCanContinue} />
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
            This stage's content will be built in a future iteration. The wizard
            shell is fully functional — stepper, navigation, transitions, and
            validation all work.
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
