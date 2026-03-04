import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface GdprConsentProps {
  consented: boolean;
  onChange: (consented: boolean) => void;
}

export const GdprConsent: React.FC<GdprConsentProps> = ({ consented, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn(
      "flex flex-col gap-3 rounded-lg border p-4 transition-colors duration-200",
      consented ? "border-success bg-card" : "border-border bg-card"
    )}>
      <div className="flex items-start gap-3">
        <Checkbox
          id="gdpr-consent"
          checked={consented}
          onCheckedChange={(v) => onChange(v === true)}
          className="mt-0.5 min-w-[20px] min-h-[20px]"
        />
        <label htmlFor="gdpr-consent" className="text-sm text-foreground leading-snug cursor-pointer select-none">
          I consent to my resume being analyzed for generating my personalized career profile.
        </label>
      </div>

      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium text-primary self-start min-h-[44px] px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded hover:underline"
          >
            <Shield size={12} aria-hidden="true" />
            Learn more
            <ChevronDown
              size={14}
              className={cn("transition-transform duration-200", expanded && "rotate-180")}
              aria-hidden="true"
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="text-xs text-muted-foreground leading-relaxed rounded-lg p-4 bg-muted mt-1">
            <p className="font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Shield size={13} className="text-primary" aria-hidden="true" />
              CV Processing & Data Protection Notice
            </p>
            <ul className="space-y-1.5 list-none">
              <li>• Your resume is processed securely on our platform.</li>
              <li>• Personal identifiers (name, email, phone, address) are removed before analysis.</li>
              <li>• Only career-relevant information (skills, experience, education) is used for matching.</li>
              <li>• You can delete your resume and all related data at any time in Settings.</li>
              <li>• Your data is stored encrypted and retained only while your account is active.</li>
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <p className="text-xs text-muted-foreground">
        Note: You can delete your resume and related data anytime in Settings
      </p>
    </div>
  );
};
