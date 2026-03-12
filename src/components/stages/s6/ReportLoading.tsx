import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { LOADING_MESSAGES } from "./constants";

export const ReportLoading: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
        setFade(true);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-28 gap-8" role="status" aria-live="polite">
      <div className="relative">
        <div className="h-16 w-16 rounded-full bg-primary/8 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-primary" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 h-16 w-16 rounded-full border-2 border-primary/10 animate-ping" />
      </div>
      <div className="text-center">
        <p
          className="text-lg font-medium text-foreground transition-opacity duration-200"
          style={{ opacity: fade ? 1 : 0 }}
        >
          {LOADING_MESSAGES[msgIndex]}
        </p>
        <p className="text-sm text-muted-foreground mt-2">This usually takes a few seconds</p>
      </div>
      {/* Progress dots */}
      <div className="flex gap-2">
        {LOADING_MESSAGES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i <= msgIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
