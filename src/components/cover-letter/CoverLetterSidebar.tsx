import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SessionCard } from "./SessionCard";
import type { CoverLetter } from "@/store/coverLetterStore";

interface Props {
  letters: CoverLetter[];
  loading: boolean;
  activeId?: string;
  trialExhausted: boolean;
  onSelect: (id: string) => void;
  onNew: () => void;
}

export function CoverLetterSidebar({
  letters,
  loading,
  activeId,
  trialExhausted,
  onSelect,
  onNew,
}: Props) {
  const newButton = (
    <Button
      onClick={onNew}
      disabled={trialExhausted}
      className="w-full justify-start gap-2"
      size="sm"
    >
      <Plus className="h-4 w-4" />
      New Cover Letter
    </Button>
  );

  return (
    <aside className="w-80 shrink-0 hidden lg:block">
      <div className="sticky top-20 space-y-4">
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

        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1 mb-2">
            Letters
          </p>
          <div className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1">
            {loading ? (
              <>
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </>
            ) : letters.length === 0 ? (
              <p className="text-sm text-muted-foreground px-1 py-4">No letters yet</p>
            ) : (
              letters.map((l) => (
                <SessionCard
                  key={l.id}
                  letter={l}
                  active={l.id === activeId}
                  onClick={() => onSelect(l.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
