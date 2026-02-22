import React from "react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

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
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Why did you choose these 3 values?
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          A brief explanation helps us understand your priorities better
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {coreValueNames.map((name) => (
          <Badge
            key={name}
            variant="default"
            className="text-sm"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            {name}
          </Badge>
        ))}
      </div>

      <Textarea
        value={explanation}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tell us why these values resonate with you…"
        className="min-h-[120px] resize-y"
        aria-label="Core values explanation"
      />
      <p className="text-xs text-muted-foreground text-right">
        {explanation.length} characters
      </p>
    </div>
  );
};
