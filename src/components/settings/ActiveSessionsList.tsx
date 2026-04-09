import React, { useState, useEffect } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "./ConfirmDialog";
import { toast } from "sonner";

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
        <div className="h-20 rounded-lg bg-muted animate-pulse" />
        <div className="h-20 rounded-lg bg-muted animate-pulse" />
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
    <div aria-live="polite" className="divide-y">
      {sessions.map((session) => {
        const DeviceIcon = session.platform === "mobile" ? Smartphone : Monitor;
        return (
          <div key={session.id} className="py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <DeviceIcon className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{session.deviceName}</span>
                  {session.isCurrent && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0"
                      aria-label="This is your current device"
                    >
                      This device
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last active {session.lastActive} · Signed in {session.signedIn}
                </p>
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
