import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, Plus, X, Check, GraduationCap, Briefcase, Wrench, Users, FolderOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ── Types ───────────────────────────────────────────────────
export interface EducationEntry {
  id: string;
  degree: string;
  field: string;
  institution: string;
  year: string;
}
export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
}
export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
}
export interface ParsedResumeData {
  education: EducationEntry[];
  experience: ExperienceEntry[];
  hardSkills: string[];
  softSkills: string[];
  projects: ProjectEntry[];
  awards: string[];
}

interface ParsedDataReviewProps {
  data: ParsedResumeData;
  onChange: (data: ParsedResumeData) => void;
}

// ── Helpers ─────────────────────────────────────────────────
let _idCounter = 0;
const genId = () => `entry-${Date.now()}-${++_idCounter}`;

// ── Inline Edit Cell ────────────────────────────────────────
const EditableCell: React.FC<{
  value: string;
  editing: boolean;
  onSave: (v: string) => void;
  placeholder?: string;
}> = ({ value, editing, onSave, placeholder }) => {
  const [draft, setDraft] = useState(value);

  if (!editing) return <span className="text-sm text-foreground">{value || "—"}</span>;

  return (
    <Input
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSave(draft);
        if (e.key === "Escape") onSave(value);
      }}
      onBlur={() => onSave(draft)}
      autoFocus
      placeholder={placeholder}
      className="h-8 text-sm"
    />
  );
};

// ── Tag Chips ───────────────────────────────────────────────
const TagChips: React.FC<{
  items: string[];
  onChange: (items: string[]) => void;
}> = ({ items, onChange }) => {
  const [adding, setAdding] = useState(false);
  const [newVal, setNewVal] = useState("");

  const handleAdd = () => {
    const trimmed = newVal.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
    }
    setNewVal("");
    setAdding(false);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-primary-subtle text-foreground"
        >
          {item}
          <button
            type="button"
            onClick={() => onChange(items.filter((i) => i !== item))}
            className="ml-0.5 rounded-full hover:bg-destructive-subtle p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Remove ${item}`}
          >
            <X size={12} />
          </button>
        </span>
      ))}
      {adding ? (
        <div className="inline-flex items-center gap-1">
          <Input
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") { setAdding(false); setNewVal(""); }
            }}
            onBlur={handleAdd}
            autoFocus
            className="h-7 w-32 text-xs"
            placeholder="New skill..."
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-dashed text-muted-foreground hover:text-primary hover:border-primary min-h-[32px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Plus size={12} /> Add
        </button>
      )}
    </div>
  );
};

// ── Section Wrapper ─────────────────────────────────────────
const Section: React.FC<{
  title: string;
  icon: React.ReactNode;
  editing: boolean;
  onToggleEdit: () => void;
  children: React.ReactNode;
  showEditButton?: boolean;
}> = ({ title, icon, editing, onToggleEdit, children, showEditButton = true }) => (
  <div className="flex flex-col gap-3 rounded-lg border p-4 bg-card transition-colors hover:border-primary">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-primary-subtle flex items-center justify-center shrink-0">
          <span className="text-primary">{icon}</span>
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {showEditButton && (
        <button
          type="button"
          onClick={onToggleEdit}
          className={cn(
            "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            editing ? "bg-primary-subtle hover:bg-primary-subtle" : "hover:bg-muted"
          )}
          aria-label={editing ? `Done editing ${title}` : `Edit ${title}`}
        >
          {editing ? <Check size={16} className="text-primary" /> : <Pencil size={14} className="text-muted-foreground" />}
        </button>
      )}
    </div>
    {children}
  </div>
);

// ── ParsedDataReview ────────────────────────────────────────
export const ParsedDataReview: React.FC<ParsedDataReviewProps> = ({ data, onChange }) => {
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({});

  const toggleEdit = (section: string) =>
    setEditingSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const isEditing = (section: string) => editingSections[section] ?? false;

  const updateEducation = useCallback(
    (idx: number, field: keyof EducationEntry, value: string) => {
      const updated = [...data.education];
      updated[idx] = { ...updated[idx], [field]: value };
      onChange({ ...data, education: updated });
    },
    [data, onChange]
  );

  const updateExperience = useCallback(
    (idx: number, field: keyof ExperienceEntry, value: string | string[]) => {
      const updated = [...data.experience];
      updated[idx] = { ...updated[idx], [field]: value };
      onChange({ ...data, experience: updated });
    },
    [data, onChange]
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Review your parsed resume</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Check the extracted data and make corrections if needed
        </p>
      </div>

      {/* Education */}
      <Section title="Education" icon={<GraduationCap size={14} />} editing={isEditing("edu")} onToggleEdit={() => toggleEdit("edu")}>
        {data.education.length === 0 ? (
          <p className="text-xs text-muted-foreground">No education entries found</p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.education.map((e, i) => (
              <div key={e.id} className="flex items-start gap-2">
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                  <EditableCell value={e.degree} editing={isEditing("edu")} onSave={(v) => updateEducation(i, "degree", v)} placeholder="Degree" />
                  <EditableCell value={e.field} editing={isEditing("edu")} onSave={(v) => updateEducation(i, "field", v)} placeholder="Field" />
                  <EditableCell value={e.institution} editing={isEditing("edu")} onSave={(v) => updateEducation(i, "institution", v)} placeholder="Institution" />
                  <EditableCell value={e.year} editing={isEditing("edu")} onSave={(v) => updateEducation(i, "year", v)} placeholder="Year" />
                </div>
                {isEditing("edu") && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...data, education: data.education.filter((_, j) => j !== i) })}
                    className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded hover:bg-destructive-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Delete education entry"
                  >
                    <Trash2 size={14} className="text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {isEditing("edu") && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({ ...data, education: [...data.education, { id: genId(), degree: "", field: "", institution: "", year: "" }] })
            }
            className="self-start mt-1 min-h-[44px]"
          >
            <Plus size={14} className="mr-1" /> Add Entry
          </Button>
        )}
      </Section>

      {/* Experience */}
      <Section title="Experience" icon={<Briefcase size={14} />} editing={isEditing("exp")} onToggleEdit={() => toggleEdit("exp")}>
        {data.experience.length === 0 ? (
          <p className="text-xs text-muted-foreground">No experience entries found</p>
        ) : (
          <div className="flex flex-col gap-3">
            {data.experience.map((e, i) => (
              <div key={e.id} className="flex flex-col gap-1 rounded-md border p-3 bg-muted/30">
                <div className="flex items-start justify-between">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                    <EditableCell value={e.title} editing={isEditing("exp")} onSave={(v) => updateExperience(i, "title", v)} placeholder="Title" />
                    <EditableCell value={e.company} editing={isEditing("exp")} onSave={(v) => updateExperience(i, "company", v)} placeholder="Company" />
                    <EditableCell value={e.duration} editing={isEditing("exp")} onSave={(v) => updateExperience(i, "duration", v)} placeholder="Duration" />
                  </div>
                  {isEditing("exp") && (
                    <button
                      type="button"
                      onClick={() => onChange({ ...data, experience: data.experience.filter((_, j) => j !== i) })}
                      className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded hover:bg-destructive-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label="Delete experience entry"
                    >
                      <Trash2 size={14} className="text-destructive" />
                    </button>
                  )}
                </div>
                {e.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-muted-foreground mt-1 space-y-0.5">
                    {e.responsibilities.map((r, ri) => (
                      <li key={ri}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        {isEditing("exp") && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                ...data,
                experience: [...data.experience, { id: genId(), title: "", company: "", duration: "", responsibilities: [] }],
              })
            }
            className="self-start mt-1 min-h-[44px]"
          >
            <Plus size={14} className="mr-1" /> Add Entry
          </Button>
        )}
      </Section>

      {/* Hard Skills */}
      <Section title="Hard Skills" icon={<Wrench size={14} />} editing={false} onToggleEdit={() => {}} showEditButton={false}>
        <TagChips items={data.hardSkills} onChange={(v) => onChange({ ...data, hardSkills: v })} />
      </Section>

      {/* Soft Skills */}
      <Section title="Soft Skills" icon={<Users size={14} />} editing={false} onToggleEdit={() => {}} showEditButton={false}>
        <TagChips items={data.softSkills} onChange={(v) => onChange({ ...data, softSkills: v })} />
      </Section>

      {/* Projects */}
      <Section title="Projects" icon={<FolderOpen size={14} />} editing={isEditing("proj")} onToggleEdit={() => toggleEdit("proj")}>
        {data.projects.length === 0 ? (
          <p className="text-xs text-muted-foreground">No projects found</p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.projects.map((p, i) => (
              <div key={p.id} className="flex items-start gap-2">
                <div className="flex-1 flex flex-col gap-1">
                  <EditableCell
                    value={p.name}
                    editing={isEditing("proj")}
                    onSave={(v) => {
                      const updated = [...data.projects];
                      updated[i] = { ...updated[i], name: v };
                      onChange({ ...data, projects: updated });
                    }}
                    placeholder="Project name"
                  />
                  <span className="text-xs text-muted-foreground">{p.description || "—"}</span>
                </div>
                {isEditing("proj") && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...data, projects: data.projects.filter((_, j) => j !== i) })}
                    className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded hover:bg-destructive-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label="Delete project"
                  >
                    <Trash2 size={14} className="text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        {isEditing("proj") && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({ ...data, projects: [...data.projects, { id: genId(), name: "", description: "" }] })
            }
            className="self-start mt-1 min-h-[44px]"
          >
            <Plus size={14} className="mr-1" /> Add Entry
          </Button>
        )}
      </Section>

      {/* Awards */}
      <Section title="Awards & Certifications" icon={<Award size={14} />} editing={false} onToggleEdit={() => {}} showEditButton={false}>
        <TagChips items={data.awards} onChange={(v) => onChange({ ...data, awards: v })} />
      </Section>
    </div>
  );
};
