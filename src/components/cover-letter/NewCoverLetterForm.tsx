import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  disabled?: boolean;
  onSubmit: (data: { company: string; role: string; jobDescription: string }) => void;
}

export function NewCoverLetterForm({ disabled = false, onSubmit }: Props) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const canSubmit = !disabled && company.trim() && role.trim() && jobDescription.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ company: company.trim(), role: role.trim(), jobDescription: jobDescription.trim() });
  }

  function handleClear() {
    setCompany("");
    setRole("");
    setJobDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <fieldset disabled={disabled} className="space-y-4 disabled:opacity-60">
        <div className="space-y-1.5">
          <Label htmlFor="cl-company">Company</Label>
          <Input
            id="cl-company"
            placeholder="e.g. Stripe"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cl-role">Role</Label>
          <Input
            id="cl-role"
            placeholder="e.g. Senior Frontend Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cl-jd">Job Description</Label>
          <Textarea
            id="cl-jd"
            placeholder="Paste the job description here…"
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={!canSubmit}>
            Submit
          </Button>
          <Button type="button" variant="ghost" onClick={handleClear} disabled={disabled}>
            Clear
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
