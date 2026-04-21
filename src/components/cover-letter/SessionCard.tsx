import { CheckCheck, Check, AlertTriangle, Circle, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { type CoverLetter, relativeTime } from "@/store/coverLetterStore";

interface Props {
  letter: CoverLetter;
  active?: boolean;
  onClick: () => void;
}

export function SessionCard({ letter, active = false, onClick }: Props) {
  const StatusIcon =
    letter.status === "complete"
      ? CheckCheck
      : letter.status === "guidance-only"
        ? Check
        : AlertTriangle;
  const statusColor =
    letter.status === "guidance-missing" ? "text-warning" : "text-muted-foreground";
  const statusLabel =
    letter.status === "complete"
      ? "Guidance and reference letter ready"
      : letter.status === "guidance-only"
        ? "Guidance ready, reference letter not generated"
        : "Guidance missing";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "group w-full text-left rounded-lg border bg-card px-3 py-2.5 transition-colors",
        "hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active ? "border-primary bg-primary-subtle/40" : "border-border",
      )}
    >
      <div className="flex items-start gap-2.5">
        <div className="pt-0.5 shrink-0" aria-hidden>
          {active ? (
            <CircleDot className="h-3.5 w-3.5 text-primary" />
          ) : (
            <Circle className="h-3.5 w-3.5 text-muted-foreground/50" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm text-foreground truncate">{letter.company}</p>
          <p className="text-xs text-muted-foreground truncate">{letter.role}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 text-xs text-muted-foreground">
          <StatusIcon className={cn("h-3.5 w-3.5", statusColor)} aria-label={statusLabel} />
          <span>{relativeTime(letter.createdAt)}</span>
        </div>
      </div>
    </button>
  );
}
