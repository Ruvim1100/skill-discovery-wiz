import React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";

interface ValueExplanationProps {
  coreValueNames: string[];
  explanation: string;
  onChange: (text: string) => void;
}

export const ValueExplanation: React.FC<ValueExplanationProps> = ({
  coreValueNames,
  explanation,
  onChange,
}) => {
  const charCount = explanation.length;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl font-semibold text-foreground">
          Why did you choose these 3 values?
        </h2>
        <p className="text-sm text-muted-foreground">
          A brief explanation helps us understand your priorities better
        </p>
      </div>

      {/* Core value badges */}
      <div className="flex flex-wrap gap-2">
        {coreValueNames.map((name) => (
          <span
            key={name}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground shadow-sm"
          >
            <Heart size={12} className="shrink-0" aria-hidden="true" />
            {name}
          </span>
        ))}
      </div>

      {/* Textarea */}
      <div className="flex flex-col gap-1.5">
        <Textarea
          value={explanation}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tell us why these values resonate with you — what do they mean in your life and career?"
          className="min-h-[140px] resize-y text-sm leading-relaxed"
          aria-label="Core values explanation"
        />
        <div className="flex items-center justify-between">
          <p className={cn(
            "text-xs transition-colors",
            charCount > 0 ? "text-muted-foreground" : "text-muted-foreground/60"
          )}>
            {charCount > 0 ? `${charCount} characters` : "Start typing..."}
          </p>
          {charCount >= 50 && (
            <p className="text-xs text-success font-medium">Great detail ✓</p>
          )}
        </div>
      </div>
    </div>
  );
};
