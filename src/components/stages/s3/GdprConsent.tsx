import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface GdprConsentProps {
  consented: boolean;
  onChange: (consented: boolean) => void;
}

export const GdprConsent: React.FC<GdprConsentProps> = ({ consented, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-4 bg-card" style={{ borderColor: "var(--border)" }}>
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

      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="flex items-center gap-1 text-xs font-medium text-primary self-start min-h-[44px] px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
        aria-expanded={expanded}
      >
        Learn more
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", expanded && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <div className="text-xs text-muted-foreground leading-relaxed rounded-md p-3 bg-muted">
          <p className="font-medium text-foreground mb-1">CV Processing & Data Protection Notice</p>
          <p>
            Your resume is processed securely on our platform. Personal identifiers (name, email, phone, address details) are removed before analysis. Only career-relevant information (skills, experience, education) is used for matching. You can delete your resume and all related data at any time in Settings. Your data is stored encrypted and retained only while your account is active.
          </p>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Note: You can delete your resume and related data anytime in Settings
      </p>
    </div>
  );
};
