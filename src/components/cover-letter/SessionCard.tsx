import React from "react";
import { Circle, CircleDot, Check, CheckCheck, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SessionCardProps {
  company: string;
  role: string;
  createdAt: string; // ISO date
  hasGuidance: boolean;
  hasReference: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - then);
  const day = 1000 * 60 * 60 * 24;
  const days = Math.floor(diffMs / day);
  if (days < 1) return "today";
  if (days < 7) return `${days}d`;
  if (days < 30) return `${Math.floor(days / 7)}w`;
  if (days < 365) return `${Math.floor(days / 30)}mo`;
  return `${Math.floor(days / 365)}y`;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  company,
  role,
  createdAt,
  hasGuidance,
  hasReference,
  isActive = false,
  onClick,
}) => {
  const ActiveIcon = isActive ? CircleDot : Circle;
  const StatusIcon = !hasGuidance ? AlertTriangle : hasReference ? CheckCheck : Check;
  const statusColor = !hasGuidance
    ? "text-warning"
    : hasReference
    ? "text-success"
    : "text-muted-foreground";

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "group flex items-center gap-3 p-3 cursor-pointer border transition-all duration-200",
        "hover:shadow-md hover:-translate-y-0.5",
        isActive
          ? "border-primary/40 bg-primary-subtle/40 shadow-sm"
          : "border-border hover:border-primary/30"
      )}
    >
      <ActiveIcon
        className={cn(
          "h-4 w-4 shrink-0",
          isActive ? "text-primary fill-primary/20" : "text-muted-foreground"
        )}
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate leading-tight">{company}</p>
        <p className="text-xs text-muted-foreground truncate mt-0.5">{role}</p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <StatusIcon className={cn("h-4 w-4", statusColor)} aria-hidden="true" />
        <span className="text-[10px] font-medium text-muted-foreground tabular-nums">
          {formatRelative(createdAt)}
        </span>
      </div>
    </Card>
  );
};
