import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Plus } from "lucide-react";
import { GlobalNav } from "@/components/wizard/GlobalNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCoverLetterStore } from "@/store/coverLetterStore";
import { TrialLimitBanner } from "@/components/cover-letter/TrialLimitBanner";
import { CoverLetterSidebar } from "@/components/cover-letter/CoverLetterSidebar";
import { NewCoverLetterForm } from "@/components/cover-letter/NewCoverLetterForm";
import { SessionCard } from "@/components/cover-letter/SessionCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function CoverLetterPage() {
  const navigate = useNavigate();
  const { letters, loading, addLetter, trialExhausted, trialLoaded, trialUsed, trialLimit } =
    useCoverLetterStore();
  const exhausted = trialLoaded && trialExhausted;

  // Simulate trial loading on first mount so banner doesn't flash
  useEffect(() => {
    const t = setTimeout(() => {
      useCoverLetterStore.setState({
        trialLoaded: true,
        trialExhausted: useCoverLetterStore.getState().trialUsed >= useCoverLetterStore.getState().trialLimit,
      });
    }, 250);
    return () => clearTimeout(t);
  }, []);

  const [mobileFormOpen, setMobileFormOpen] = useState(letters.length === 0);

  function handleSubmit(data: { company: string; role: string; jobDescription: string }) {
    const created = addLetter({
      ...data,
      status: "guidance-only",
      guidance: [
        { title: "Hook", body: `Open with a result that resonates with ${data.company}'s mission.` },
        { title: "Relevant Experience", body: `Surface 2 projects most aligned with the ${data.role} role.` },
        { title: "Technical Fit", body: "Map your stack to the JD's listed technologies." },
        { title: "Impact Metrics", body: "Quantify outcomes — not responsibilities." },
        { title: "Close", body: `Name a specific reason ${data.company}, and not just any company.` },
      ],
    });
    toast.success("Cover letter guidance generated");
    navigate(`/cover-letter/${created.id}`);
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

        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Cover Letter Guidance
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {trialLoaded
              ? `${Math.max(0, trialLimit - trialUsed)} of ${trialLimit} free generations remaining`
              : "Loading your usage…"}
          </p>
        </header>

        <div className="flex gap-8">
          {/* Main column */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Desktop form card */}
            <Card className="hidden lg:block">
              <CardHeader>
                <CardTitle className="text-lg">New Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <NewCoverLetterForm disabled={exhausted} onSubmit={handleSubmit} />
              </CardContent>
            </Card>

            {/* Mobile collapsible form */}
            <div className="lg:hidden">
              <Collapsible open={mobileFormOpen} onOpenChange={setMobileFormOpen}>
                {exhausted ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="block">
                        <Button
                          variant="outline"
                          disabled
                          className="w-full justify-between"
                        >
                          <span className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            New Cover Letter
                          </span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Trial limit reached</TooltipContent>
                  </Tooltip>
                ) : (
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        New Cover Letter
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          mobileFormOpen && "rotate-180",
                        )}
                      />
                    </Button>
                  </CollapsibleTrigger>
                )}
                <CollapsibleContent className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <NewCoverLetterForm disabled={exhausted} onSubmit={handleSubmit} />
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Mobile letter list */}
              {letters.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-sm font-semibold text-foreground mb-3">
                    Your Cover Letters
                  </h2>
                  <div className="space-y-2">
                    {letters.map((l) => (
                      <SessionCard
                        key={l.id}
                        letter={l}
                        onClick={() => navigate(`/cover-letter/${l.id}`)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop sidebar */}
          <CoverLetterSidebar
            letters={letters}
            loading={loading}
            trialExhausted={exhausted}
            onSelect={(id) => navigate(`/cover-letter/${id}`)}
            onNew={() => navigate("/cover-letter")}
          />
        </div>
      </main>
    </div>
  );
}
