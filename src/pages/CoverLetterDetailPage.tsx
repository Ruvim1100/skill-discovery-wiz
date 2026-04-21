import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Copy, MoreHorizontal, AlertTriangle, Loader2, ChevronDown } from "lucide-react";
import { GlobalNav } from "@/components/wizard/GlobalNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCoverLetterStore, formatDate } from "@/store/coverLetterStore";
import { TrialLimitBanner } from "@/components/cover-letter/TrialLimitBanner";
import { CoverLetterSidebar } from "@/components/cover-letter/CoverLetterSidebar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function CoverLetterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    letters,
    loading,
    trialExhausted,
    trialLoaded,
    generateReference,
  } = useCoverLetterStore();
  const exhausted = trialLoaded && trialExhausted;

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 250);
    return () => clearTimeout(t);
  }, [id]);

  useEffect(() => {
    const t = setTimeout(() => {
      useCoverLetterStore.setState({
        trialLoaded: true,
        trialExhausted:
          useCoverLetterStore.getState().trialUsed >=
          useCoverLetterStore.getState().trialLimit,
      });
    }, 250);
    return () => clearTimeout(t);
  }, []);

  const letter = letters.find((l) => l.id === id);
  const [guidanceOpen, setGuidanceOpen] = useState(true);
  const [generating, setGenerating] = useState(false);

  // When both exist, default guidance to collapsed
  useEffect(() => {
    if (letter?.status === "complete") setGuidanceOpen(false);
    else setGuidanceOpen(true);
  }, [letter?.status, letter?.id]);

  async function handleCopy() {
    if (!letter?.reference) return;
    try {
      await navigator.clipboard.writeText(letter.reference);
      toast.success("Reference letter copied to clipboard");
    } catch {
      toast.error("Failed to copy. Please try again.");
    }
  }

  async function handleGenerate() {
    if (!letter) return;
    setGenerating(true);
    try {
      await generateReference(letter.id);
      toast.success("Reference letter ready");
    } catch {
      toast.error("Reference letter generation is temporarily unavailable. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {exhausted && (
          <div className="mb-6">
            <TrialLimitBanner />
          </div>
        )}

        <div className="flex gap-8">
          <div className="flex-1 min-w-0 space-y-6">
            {/* Mobile back link */}
            <Link
              to="/cover-letter"
              className="lg:hidden inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all letters
            </Link>

            {!hydrated || loading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-64 w-full" />
              </div>
            ) : !letter ? (
              <Card>
                <CardContent className="py-16 text-center space-y-4">
                  <p className="text-foreground font-medium">Letter not found</p>
                  <Button asChild variant="outline">
                    <Link to="/cover-letter">Back to all letters</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Header */}
                <header className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground truncate">
                      {letter.company}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      {letter.role} · {formatDate(letter.createdAt)}
                    </p>
                  </div>
                  {letter.reference && (
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                        Copy reference
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="More actions">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={handleCopy}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy reference
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </header>

                {/* Body */}
                {letter.status === "guidance-missing" ? (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-lg border border-warning/40 bg-warning-subtle px-4 py-4 text-sm"
                  >
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-warning shrink-0" aria-hidden />
                    <p>
                      Guidance generation is temporarily unavailable. Please try again later.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Guidance block */}
                    {letter.guidance && (
                      <Card>
                        <Collapsible open={guidanceOpen} onOpenChange={setGuidanceOpen}>
                          <CollapsibleTrigger asChild>
                            <button
                              type="button"
                              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-accent/40 rounded-t-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              <span className="font-semibold text-foreground">
                                Guidance — {letter.guidance.length} sections
                              </span>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 text-muted-foreground transition-transform",
                                  guidanceOpen && "rotate-180",
                                )}
                              />
                            </button>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="px-6 pb-6 pt-2 space-y-4 border-t">
                              {letter.guidance.map((g, i) => (
                                <div key={i} className="space-y-1">
                                  <p className="text-sm font-medium text-foreground">
                                    {i + 1}. {g.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {g.body}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </Card>
                    )}

                    {/* Reference block or generate panel */}
                    {letter.reference ? (
                      <Card>
                        <div className="px-6 py-4 border-b">
                          <h2 className="font-semibold text-foreground">Reference Letter</h2>
                        </div>
                        <CardContent className="pt-6">
                          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                            {letter.reference}
                          </pre>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="rounded-lg border-2 border-dashed border-border bg-muted/20 p-8 text-center space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Get an AI-generated draft based on the guidance above. Personalize before sending.
                        </p>
                        <Button onClick={handleGenerate} disabled={generating || exhausted}>
                          {generating && <Loader2 className="h-4 w-4 animate-spin" />}
                          Generate a Reference Cover Letter
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          <CoverLetterSidebar
            letters={letters}
            loading={loading}
            activeId={letter?.id}
            trialExhausted={exhausted}
            onSelect={(sid) => navigate(`/cover-letter/${sid}`)}
            onNew={() => navigate("/cover-letter")}
          />
        </div>
      </main>
    </div>
  );
}
