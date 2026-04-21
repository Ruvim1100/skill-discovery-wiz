import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NewCoverLetterFormProps {
  disabled?: boolean;
  onSubmit?: () => void;
}

export const NewCoverLetterForm: React.FC<NewCoverLetterFormProps> = ({
  disabled = false,
  onSubmit,
}) => {
  return (
    <form
      className="space-y-4 rounded-lg border bg-card p-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <div className="space-y-1.5">
        <Label htmlFor="cl-company" className="text-xs font-medium">
          Company
        </Label>
        <Input id="cl-company" placeholder="Acme Corp" disabled={disabled} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="cl-role" className="text-xs font-medium">
          Role
        </Label>
        <Input id="cl-role" placeholder="Senior Engineer" disabled={disabled} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="cl-jd" className="text-xs font-medium">
          Job Description
        </Label>
        <Textarea
          id="cl-jd"
          placeholder="Paste the job description here…"
          rows={4}
          disabled={disabled}
        />
      </div>
      <Button type="submit" disabled={disabled} className="w-full">
        Generate Guidance
      </Button>
    </form>
  );
};
