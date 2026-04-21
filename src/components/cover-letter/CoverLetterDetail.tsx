import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Copy,
  FileText,
  MoreHorizontal,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CoverLetterDetailProps {
  company: string;
  role: string;
  createdAt: string; // already formatted display string
  guidance?: string | null;
  referenceLetter?: string | null;
  onBack?: () => void;
  onGenerateReference?: () => void;
}

const PlaceholderBlock: React.FC<{ label: string }> = ({ label }) => (
  <div className="min-h-[300px] rounded-md bg-muted/60 border border-dashed border-border flex items-center justify-center text-sm text-muted-foreground">
    {label}
  </div>
);

const CollapsibleSection: React.FC<{
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ title, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between rounded-lg border bg-card px-4 py-3 text-left transition-colors",
            "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <span className="text-sm font-semibold">{title}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="pt-3">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export const CoverLetterDetail: React.FC<CoverLetterDetailProps> = ({
  company,
  role,
  createdAt,
  guidance,
  referenceLetter,
  onBack,
  onGenerateReference,
}) => {
  const handleCopy = async () => {
    if (!referenceLetter) return;
    try {
      await navigator.clipboard.writeText(referenceLetter);
      toast.success("Reference letter copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  // Variant 3 — no guidance
  if (!guidance) {
    return (
      <div className="space-y-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="lg:hidden inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all letters
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {company} <span className="text-muted-foreground font-normal">·</span> {role}{" "}
            <span className="text-muted-foreground font-normal">·</span>{" "}
            <span className="text-muted-foreground font-normal text-lg">{createdAt}</span>
          </h1>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>Guidance generation is temporarily unavailable. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="lg:hidden inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to all letters
        </button>
      )}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight leading-tight">
          {company} <span className="text-muted-foreground font-normal">·</span> {role}{" "}
          <span className="text-muted-foreground font-normal">·</span>{" "}
          <span className="text-muted-foreground font-normal text-lg">{createdAt}</span>
        </h1>

        {referenceLetter && (
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              aria-label="Copy reference letter"
              className="gap-1.5 text-xs"
            >
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy reference
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8" aria-label="More options">
                  <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopy} aria-label="Copy reference letter">
                  <Copy className="h-4 w-4 mr-2" aria-hidden="true" />
                  Copy reference
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Variant 1: has reference */}
      {referenceLetter ? (
        <div className="space-y-3">
          <CollapsibleSection title="Guidance — 5 sections" defaultOpen={false}>
            <PlaceholderBlock label="Guidance content" />
          </CollapsibleSection>
          <CollapsibleSection title="Reference Letter" defaultOpen={true}>
            <PlaceholderBlock label="Reference letter content" />
          </CollapsibleSection>
        </div>
      ) : (
        // Variant 2: guidance only
        <div className="space-y-3">
          <CollapsibleSection title="Guidance — 5 sections" defaultOpen={true}>
            <PlaceholderBlock label="Guidance content" />
          </CollapsibleSection>

          <div className="space-y-2 rounded-lg border border-dashed border-muted-foreground/25 p-6 text-center">
            <Button onClick={onGenerateReference} className="gap-1.5">
              <FileText aria-hidden="true" /> Generate a Reference Cover Letter
            </Button>
            <p className="text-sm text-muted-foreground">
              Get an AI-generated draft based on the guidance above. Personalize before sending.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
