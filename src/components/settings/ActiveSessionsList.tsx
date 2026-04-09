import React, { useState, useEffect } from "react";
import { Monitor, Smartphone, ShieldCheck, Clock, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "./ConfirmDialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Session {
  id: string;
  deviceName: string;
  platform: "desktop" | "mobile";
  lastActive: string;
  signedIn: string;
  isCurrent: boolean;
}

const MOCK_SESSIONS: Session[] = [
  {
    id: "1",
    deviceName: "Chrome on macOS",
    platform: "desktop",
    lastActive: "Just now",
    signedIn: "4/9/2026",
    isCurrent: true,
  },
  {
    id: "2",
    deviceName: "Safari on iOS",
    platform: "mobile",
    lastActive: "2 hours ago",
    signedIn: "4/7/2026",
    isCurrent: false,
  },
  {
    id: "3",
    deviceName: "Edge on Windows",
    platform: "desktop",
    lastActive: "5 minutes ago",
    signedIn: "4/5/2026",
    isCurrent: false,
  },
];

export const ActiveSessionsList: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const loadSessions = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setSessions(MOCK_SESSIONS);
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleRevoke = (sessionId: string) => {
    setRevokingId(sessionId);
    setTimeout(() => {
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      setRevokingId(null);
      toast.success("Session revoked successfully.");
    }, 500);
  };

  if (isLoading) {
    return (
      <div role="status" aria-busy="true" aria-label="Loading sessions" className="space-y-3">
        <div className="h-[72px] rounded-xl bg-muted animate-pulse" />
        <div className="h-[72px] rounded-xl bg-muted animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-destructive">{error}</p>
        <Button variant="outline" size="sm" onClick={loadSessions}>
          Retry
        </Button>
      </div>
    );
  }

  if (sessions.length === 0) {
    return <p className="text-sm text-muted-foreground">No active sessions found.</p>;
  }

  return (
    <div aria-live="polite" className="space-y-2.5">
      {sessions.map((session) => {
        const DeviceIcon = session.platform === "mobile" ? Smartphone : Monitor;
        return (
          <div
            key={session.id}
            className={cn(
              "rounded-xl border p-4 flex items-center justify-between gap-4 transition-colors",
              session.isCurrent
                ? "border-primary/20 bg-primary/[0.03]"
                : "border-border hover:border-primary/30 hover:bg-muted/50"
            )}
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div
                className={cn(
                  "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                  session.isCurrent
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <DeviceIcon className="h-[18px] w-[18px]" aria-hidden="true" />
              </div>
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm leading-tight">
                    {session.deviceName}
                  </span>
                  {session.isCurrent && (
                    <Badge
                      variant="secondary"
                      className="border-primary/20 bg-primary/10 text-primary text-[10px] font-medium px-2 py-0 h-[18px]"
                      aria-label="This is your current device"
                    >
                      <ShieldCheck className="h-3 w-3 mr-0.5" aria-hidden="true" />
                      This device
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {session.lastActive}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" aria-hidden="true" />
                    {session.signedIn}
                  </span>
                </div>
              </div>
            </div>
            {!session.isCurrent && (
              <ConfirmDialog
                title="Revoke session"
                description={`Remove access for ${session.deviceName}? It will be signed out immediately.`}
                confirmLabel="Revoke"
                variant="destructive"
                onConfirm={() => handleRevoke(session.id)}
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    disabled={revokingId === session.id}
                  >
                    {revokingId === session.id ? "Revoking…" : "Revoke"}
                  </Button>
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
