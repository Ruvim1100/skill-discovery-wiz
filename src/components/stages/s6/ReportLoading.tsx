import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { LOADING_MESSAGES } from "./constants";

export const ReportLoading: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6" role="status" aria-live="polite">
      <Loader2 size={48} className="animate-spin text-primary" aria-hidden="true" />
      <p
        className="text-lg font-medium text-foreground text-center transition-opacity duration-300"
        key={msgIndex}
        style={{ animation: "stage-fade-in 300ms ease-out" }}
      >
        {LOADING_MESSAGES[msgIndex]}
      </p>
      <p className="text-sm text-muted-foreground">This usually takes a few seconds</p>
    </div>
  );
};
