import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TargetRole } from "@/store/planStore";

export interface CareerMatchItem {
  id: string;
  jobId: string;
  jobTitle: string;
  jobCategory: string;
  jobSubcategory: string | null;
  matchType: "STRONG_FIT" | "HIGH_POTENTIAL";
}

interface TargetRoleSelectionProps {
  matches: CareerMatchItem[];
  selectedJobId: string | null;
  customTargetRole: string | null;
  isCustomRole: boolean;
  onSelectRole: (role: TargetRole) => void;
  onSetCustomRole: (role: string) => void;
  onClearSelection: () => void;
}

export const TargetRoleSelection: React.FC<TargetRoleSelectionProps> = ({
  matches,
  selectedJobId,
  customTargetRole,
  isCustomRole,
  onSelectRole,
  onSetCustomRole,
  onClearSelection,
}) => {
  const hasSelection = !!selectedJobId || (isCustomRole && !!customTargetRole?.trim());

  const handleRadioChange = (jobId: string) => {
    const match = matches.find((m) => m.jobId === jobId);
    if (!match) return;
    onSelectRole({
      jobId: match.jobId,
      title: match.jobTitle,
      category: match.jobCategory,
      subcategory: match.jobSubcategory,
      matchType: match.matchType,
    });
  };

  const handleCustomInput = (value: string) => {
    onSetCustomRole(value);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          Choose Your Target Role
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
          Select from your career matches or enter a custom one
        </p>
      </div>

      {/* Recommended roles */}
      {matches.length > 0 && (
        <RadioGroup
          value={isCustomRole ? "" : (selectedJobId ?? "")}
          onValueChange={handleRadioChange}
          className="flex flex-col gap-3"
        >
          {matches.map((match) => {
            const isSelected = !isCustomRole && selectedJobId === match.jobId;
            const isStrongFit = match.matchType === "STRONG_FIT";
            const categoryPath = match.jobSubcategory
              ? `${match.jobCategory} → ${match.jobSubcategory}`
              : match.jobCategory;

            return (
              <Label
                key={match.jobId}
                htmlFor={`role-${match.jobId}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all duration-150",
                  isSelected
                    ? "border-primary bg-primary-subtle ring-2 ring-primary/20"
                    : "border-border hover:border-primary/40"
                )}
              >
                <RadioGroupItem
                  value={match.jobId}
                  id={`role-${match.jobId}`}
                  className="flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground leading-tight">
                    {match.jobTitle}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">
                    {categoryPath}
                  </p>
                </div>
                <Badge
                  className={cn(
                    "flex-shrink-0 text-[11px]",
                    isStrongFit
                      ? "bg-strong-fit text-strong-fit-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {isStrongFit ? "Strong Fit" : "High Potential"}
                </Badge>
              </Label>
            );
          })}
        </RadioGroup>
      )}

      {/* Divider */}
      <div className="relative flex items-center py-1">
        <div className="flex-1 border-t border-border" />
        <span className="px-3 text-xs text-muted-foreground bg-background">
          Or enter a custom role
        </span>
        <div className="flex-1 border-t border-border" />
      </div>

      {/* Custom role input */}
      <div
        className={cn(
          "rounded-lg border p-4 transition-all duration-150",
          isCustomRole && customTargetRole?.trim()
            ? "border-primary bg-primary-subtle ring-2 ring-primary/20"
            : "border-border"
        )}
      >
        <Input
          value={customTargetRole ?? ""}
          onChange={(e) => handleCustomInput(e.target.value)}
          maxLength={255}
          placeholder="e.g., Product Manager at a health-tech startup"
          className="border-0 shadow-none focus-visible:ring-0 p-0 h-auto text-base"
        />
      </div>

      {/* Change Target button */}
      {hasSelection && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="self-start gap-2 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Change Target
        </Button>
      )}
    </div>
  );
};
