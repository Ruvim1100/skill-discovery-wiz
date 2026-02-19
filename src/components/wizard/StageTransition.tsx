import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StageTransitionProps {
  stageKey: string | number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps stage content with a fade-out (100ms) → fade-in + 8px slide-up (200ms)
 * transition whenever the stageKey changes.
 */
export const StageTransition: React.FC<StageTransitionProps> = ({
  stageKey,
  children,
  className,
}) => {
  const [displayKey, setDisplayKey] = useState(stageKey);
  const [phase, setPhase] = useState<"enter" | "exit" | "idle">("idle");
  const pendingKey = useRef(stageKey);

  useEffect(() => {
    if (stageKey === displayKey) return;

    pendingKey.current = stageKey;
    setPhase("exit");

    const exitTimer = setTimeout(() => {
      setDisplayKey(pendingKey.current);
      setPhase("enter");
    }, 110);

    const enterTimer = setTimeout(() => {
      setPhase("idle");
    }, 320);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(enterTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageKey]);

  return (
    <div
      className={cn(
        phase === "enter" && "stage-enter",
        phase === "exit" && "stage-exit",
        className
      )}
    >
      {children}
    </div>
  );
};
