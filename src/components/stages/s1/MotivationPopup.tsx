import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

interface MotivationPopupProps {
  open: boolean;
  onStartNow: () => void;
  onMaybeLater: () => void;
}

export const MotivationPopup: React.FC<MotivationPopupProps> = ({
  open,
  onStartNow,
  onMaybeLater,
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Auto-dismiss after 5s
  useEffect(() => {
    if (open) {
      timerRef.current = setTimeout(onMaybeLater, 5000);
    }
    return () => clearTimeout(timerRef.current);
  }, [open, onMaybeLater]);

  // Cancel auto-dismiss on any interaction
  const cancelTimer = () => clearTimeout(timerRef.current);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onMaybeLater()}>
      <DialogContent
        className="sm:max-w-sm text-center"
        onPointerDown={cancelTimer}
      >
        {/* Sparkle particles */}
        {open && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="sparkle-particle absolute rounded-full"
                style={{
                  width: `${4 + Math.random() * 6}px`,
                  height: `${4 + Math.random() * 6}px`,
                  backgroundColor: `var(--${["primary", "success", "warning", "info"][i % 4]})`,
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 60}%`,
                  animation: `sparkle-burst ${0.6 + Math.random() * 0.8}s ease-out ${i * 0.05}s forwards`,
                  opacity: 0,
                }}
              />
            ))}
          </div>
        )}

        <DialogHeader className="items-center gap-3">
          <div
            className="h-14 w-14 rounded-full flex items-center justify-center mx-auto"
            style={{ backgroundColor: "var(--primary-subtle)", color: "var(--primary)" }}
          >
            <Gift size={28} aria-hidden="true" />
          </div>
          <DialogTitle className="text-xl">You're on your way!</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Complete your assessment to unlock{" "}
            <span className="font-semibold text-foreground">5 free CV Builder & Cover Letter uses</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-4">
          <Button
            onClick={() => {
              cancelTimer();
              onStartNow();
            }}
            className="w-full min-h-[44px]"
          >
            Start Now
          </Button>
          <button
            type="button"
            onClick={() => {
              cancelTimer();
              onMaybeLater();
            }}
            className="text-sm font-medium min-h-[44px] rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{ color: "var(--muted-foreground)" }}
          >
            Maybe Later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
