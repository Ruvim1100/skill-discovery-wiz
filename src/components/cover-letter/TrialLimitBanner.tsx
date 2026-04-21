import { AlertTriangle } from "lucide-react";

export function TrialLimitBanner() {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-warning/40 bg-warning-subtle px-4 py-3 text-sm text-foreground"
    >
      <AlertTriangle className="h-4 w-4 mt-0.5 text-warning shrink-0" aria-hidden />
      <p>
        <span className="font-medium">You've used all your free generations.</span>{" "}
        <span className="text-muted-foreground">Upgrade coming soon.</span>
      </p>
    </div>
  );
}
