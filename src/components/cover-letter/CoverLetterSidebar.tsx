import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SessionCard } from "./SessionCard";

export interface CoverLetterSession {
  id: string;
  company: string;
  role: string;
  createdAt: string;
  hasGuidance: boolean;
  hasReference: boolean;
}

interface CoverLetterSidebarProps {
  sessions: CoverLetterSession[];
  activeId?: string;
  loading?: boolean;
  trialExhausted?: boolean;
  onSelect?: (id: string) => void;
  onNew?: () => void;
}

export const CoverLetterSidebar: React.FC<CoverLetterSidebarProps> = ({
  sessions,
  activeId,
  loading = false,
  trialExhausted = false,
  onSelect,
  onNew,
}) => {
  const newButton = (
    <Button
      onClick={onNew}
      disabled={trialExhausted}
      className="w-full gap-1.5 text-sm font-medium shadow-sm"
      size="default"
    >
      <Plus className="h-4 w-4" aria-hidden="true" />
      New Cover Letter
    </Button>
  );

  return (
    <aside className="hidden lg:flex flex-col w-80 shrink-0 gap-4">
      {trialExhausted ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="block">{newButton}</span>
          </TooltipTrigger>
          <TooltipContent>Trial limit reached</TooltipContent>
        </Tooltip>
      ) : (
        newButton
      )}

      <div className="flex items-center justify-between px-1">
        <h2 className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
          Letters
        </h2>
        {!loading && sessions.length > 0 && (
          <span className="text-[11px] font-medium text-muted-foreground tabular-nums">
            {sessions.length}
          </span>
        )}
      </div>

      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto space-y-2 pr-1 -mr-1">
        {loading ? (
          <>
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </>
        ) : sessions.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
            No letters yet
          </div>
        ) : (
          sessions.map((s) => (
            <SessionCard
              key={s.id}
              company={s.company}
              role={s.role}
              createdAt={s.createdAt}
              hasGuidance={s.hasGuidance}
              hasReference={s.hasReference}
              isActive={s.id === activeId}
              onClick={() => onSelect?.(s.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
};
