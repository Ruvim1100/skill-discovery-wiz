import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, LayoutDashboard, Sparkles } from "lucide-react";

const CONCEPTS = [
  {
    slug: "editorial",
    name: "Editorial",
    tagline: "Magazine-grade. Long-form prose meets confident typography.",
    description:
      "Two-column editorial composition with a wide reading column and a context rail. Job recommendations open inline with a focused side-pane for tabs. Best when the report should feel like a personal artifact.",
    icon: BookOpen,
    accent: "from-success/10 to-success/0",
  },
  {
    slug: "dashboard",
    name: "Dashboard",
    tagline: "Data-dense. Scannable. Built for decisive readers.",
    description:
      "Bento-grid composition with sticky section nav. Job tabs open as a split-pane drawer that doesn't lose context. Best for users who want to scan first, dive in second.",
    icon: LayoutDashboard,
    accent: "from-primary/10 to-primary/0",
  },
  {
    slug: "narrative",
    name: "Narrative",
    tagline: "Scrollytelling. Emotional. Celebratory.",
    description:
      "Single-column hero-driven flow with chaptered sections, an animated behavioral signature, and a horizontal goal timeline. Job cards expand into full-bleed modals. Best for first-view delight.",
    icon: Sparkles,
    accent: "from-warning/10 to-warning/0",
  },
];

export default function ReportConceptsIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1100px] px-6 py-16 sm:py-24">
        <div className="max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Career Fit Report — Redesign
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Three directions to choose from.</h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Each concept reuses the same content inventory and design tokens — same green for Strong Fit, same blue for
            High Potential — but proposes a fundamentally different reading experience.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:gap-5">
          {CONCEPTS.map((c, idx) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.slug}
                to={`/report-concepts/${c.slug}`}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8 transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex items-center gap-4 sm:w-72 shrink-0">
                    <div className="h-12 w-12 rounded-lg border border-border bg-background flex items-center justify-center">
                      <Icon size={20} className="text-foreground" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Concept {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="text-xl font-semibold mt-0.5">{c.name}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{c.tagline}</div>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    View
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 rounded-xl border border-border bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Note on semantics.</strong> Across all three concepts, green ={" "}
          <span className="text-success font-medium">Strong Fit</span> and blue ={" "}
          <span className="text-primary font-medium">High Potential</span>. Demand and AI-impact use the warning/destructive
          tokens consistently. Mobile reflows are included on each concept page.
        </div>
      </div>
    </div>
  );
}
