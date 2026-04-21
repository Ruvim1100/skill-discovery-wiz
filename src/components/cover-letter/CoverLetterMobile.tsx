import React, { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SessionCard } from "./SessionCard";
import { NewCoverLetterForm } from "./NewCoverLetterForm";
import { TrialLimitBanner } from "./TrialLimitBanner";
import type { CoverLetterSession } from "./CoverLetterSidebar";
import { cn } from "@/lib/utils";

interface CoverLetterMobileProps {
  sessions: CoverLetterSession[];
  trialExhausted?: boolean;
  onSelect?: (id: string) => void;
}

export const CoverLetterMobile: React.FC<CoverLetterMobileProps> = ({
  sessions,
  trialExhausted = false,
  onSelect,
}) => {
  const hasSessions = sessions.length > 0;
  const [open, setOpen] = useState(!hasSessions);

  const triggerButton = (
    <Button
      variant={hasSessions ? "outline" : "default"}
      disabled={trialExhausted}
      className="w-full justify-between gap-2"
    >
      <span className="inline-flex items-center gap-1.5">
        <Plus className="h-4 w-4" aria-hidden="true" />
        New Cover Letter
      </span>
      <ChevronDown
        className={cn(
          "h-4 w-4 transition-transform duration-200",
          open && "rotate-180"
        )}
        aria-hidden="true"
      />
    </Button>
  );

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight">Cover Letter Guidance</h1>

      {trialExhausted && <TrialLimitBanner />}

      <Collapsible open={open} onOpenChange={setOpen}>
        {trialExhausted ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="block">{triggerButton}</span>
            </TooltipTrigger>
            <TooltipContent>Trial limit reached</TooltipContent>
          </Tooltip>
        ) : (
          <CollapsibleTrigger asChild>{triggerButton}</CollapsibleTrigger>
        )}
        <CollapsibleContent className="pt-3 overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <NewCoverLetterForm disabled={trialExhausted} />
        </CollapsibleContent>
      </Collapsible>

      {hasSessions && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Your Cover Letters</h2>
            <span className="text-xs text-muted-foreground tabular-nums">
              {sessions.length}
            </span>
          </div>
          <div className="space-y-2">
            {sessions.map((s) => (
              <SessionCard
                key={s.id}
                company={s.company}
                role={s.role}
                createdAt={s.createdAt}
                hasGuidance={s.hasGuidance}
                hasReference={s.hasReference}
                onClick={() => onSelect?.(s.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
