import React from "react";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  CoverLetterSidebar,
  type CoverLetterSession,
} from "@/components/cover-letter/CoverLetterSidebar";
import { CoverLetterDetail } from "@/components/cover-letter/CoverLetterDetail";
import { CoverLetterMobile } from "@/components/cover-letter/CoverLetterMobile";
import { TrialLimitBanner } from "@/components/cover-letter/TrialLimitBanner";

const mockSessions: CoverLetterSession[] = [
  {
    id: "1",
    company: "Acme Corp",
    role: "Senior Engineer",
    createdAt: "2026-04-19",
    hasGuidance: true,
    hasReference: true,
  },
  {
    id: "2",
    company: "Globex",
    role: "Product Designer",
    createdAt: "2026-04-15",
    hasGuidance: true,
    hasReference: false,
  },
  {
    id: "3",
    company: "Initech",
    role: "Data Analyst",
    createdAt: "2026-03-30",
    hasGuidance: false,
    hasReference: false,
  },
];

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="border-b pb-4 mb-6">
    <h2 className="text-xl font-bold tracking-tight">{title}</h2>
    {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
  </div>
);

const PreviewFrame: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="rounded-xl border bg-card overflow-hidden">
    <div className="px-4 py-2 bg-muted/50 border-b text-xs font-medium text-muted-foreground uppercase tracking-wider">
      {label}
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const CoverLetterPreview: React.FC = () => {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Cover Letter — Preview
            </h1>
            <p className="text-sm text-muted-foreground">
              All sidebar states, detail variants, and mobile layouts in one
              place.
            </p>
          </header>

          {/* ── Sidebar States ──────────────────────────────── */}
          <section>
            <SectionHeader
              title="Sidebar States (Desktop ≥ lg)"
              subtitle="Loading · Empty · Populated · Trial exhausted"
            />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <PreviewFrame label="1 · Loading">
                <CoverLetterSidebar sessions={[]} loading />
              </PreviewFrame>
              <PreviewFrame label="2 · Empty">
                <CoverLetterSidebar sessions={[]} />
              </PreviewFrame>
              <PreviewFrame label="3 · Populated">
                <CoverLetterSidebar
                  sessions={mockSessions}
                  activeId="1"
                  onSelect={() => {}}
                />
              </PreviewFrame>
              <PreviewFrame label="4 · Trial exhausted">
                <CoverLetterSidebar sessions={mockSessions} trialExhausted />
              </PreviewFrame>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Note: sidebars are hidden below the <code>lg</code> breakpoint —
              widen the viewport to see them.
            </p>
          </section>

          <Separator />

          {/* ── Detail Variants ─────────────────────────────── */}
          <section>
            <SectionHeader
              title="Detail View Variants"
              subtitle="Has reference · Guidance only · No guidance (edge case)"
            />
            <div className="space-y-6">
              <PreviewFrame label="Variant 1 · Has reference letter">
                <CoverLetterDetail
                  company="Acme Corp"
                  role="Senior Engineer"
                  createdAt="Apr 17, 2026"
                  guidance="full"
                  referenceLetter="Dear Hiring Manager, ..."
                />
              </PreviewFrame>
              <PreviewFrame label="Variant 2 · Guidance only (no reference yet)">
                <CoverLetterDetail
                  company="Globex"
                  role="Product Designer"
                  createdAt="Apr 15, 2026"
                  guidance="full"
                  referenceLetter={null}
                  onGenerateReference={() => {}}
                />
              </PreviewFrame>
              <PreviewFrame label="Variant 3 · No guidance (edge case)">
                <CoverLetterDetail
                  company="Initech"
                  role="Data Analyst"
                  createdAt="Mar 30, 2026"
                  guidance={null}
                  referenceLetter={null}
                />
              </PreviewFrame>
            </div>
          </section>

          <Separator />

          {/* ── Mobile Layouts ──────────────────────────────── */}
          <section>
            <SectionHeader
              title="Mobile Layouts (< lg)"
              subtitle="0 sessions · 3 sessions · 3 sessions + trial exhausted"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PreviewFrame label="1 · 0 sessions (form open)">
                <div className="max-w-sm mx-auto">
                  <CoverLetterMobile sessions={[]} />
                </div>
              </PreviewFrame>
              <PreviewFrame label="2 · 3 sessions (form closed)">
                <div className="max-w-sm mx-auto">
                  <CoverLetterMobile sessions={mockSessions} />
                </div>
              </PreviewFrame>
              <PreviewFrame label="3 · Trial exhausted">
                <div className="max-w-sm mx-auto">
                  <CoverLetterMobile sessions={mockSessions} trialExhausted />
                </div>
              </PreviewFrame>
            </div>
          </section>

          <Separator />

          {/* ── Standalone Banner ───────────────────────────── */}
          <section>
            <SectionHeader title="Trial Limit Banner (standalone)" />
            <PreviewFrame label="TrialLimitBanner">
              <TrialLimitBanner />
            </PreviewFrame>
          </section>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CoverLetterPreview;
