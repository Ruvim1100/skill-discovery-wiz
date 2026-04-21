import React from "react";
import { AlertTriangle } from "lucide-react";

export const TrialLimitBanner: React.FC = () => (
  <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
    <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
    <p>You've used all your free generations. Upgrade coming soon.</p>
  </div>
);
