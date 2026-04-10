import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardCheck,
  Map,
  PenLine,
  Compass,
  FileText,
  MapPin,
  Gift,
  Users,
  CalendarDays,
  ExternalLink,
  CheckCircle2,
  Circle,
  Loader2,
  Trash2,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmDialog } from "@/components/settings/ConfirmDialog";
import { GlobalNav } from "@/components/wizard/GlobalNav";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ── Mock Data ───────────────────────────────────────────────
const MOCK_PROFILE = {
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex.morgan@example.com",
  location: "London, UK",
  careerStage: "Mid-Career",
};

const MOCK_ASSESSMENT = {
  status: "completed" as const,
  completedAt: "15 January 2024",
};

const MOCK_ROADMAP = {
  targetRole: "Senior Frontend Developer",
  completedTasks: 4,
  totalTasks: 12,
  planId: "plan-1",
};

const MOCK_REWARD = {
  used: 7,
  total: 10,
  expiresInDays: 14,
};

const CAREER_STAGES = [
  "Student",
  "Early Career",
  "Mid-Career",
  "Senior / Leadership",
  "Career Changer",
];

// ── Assessment Summary Card ─────────────────────────────────
const AssessmentCard: React.FC<{ loading: boolean }> = ({ loading }) => {
  const navigate = useNavigate();
  const [retakeOpen, setRetakeOpen] = useState(false);

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-9 w-28 mt-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isCompleted = MOCK_ASSESSMENT.status === "completed";

  return (
    <>
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Subtle gradient accent top bar */}
        <div className="h-1 bg-gradient-to-r from-primary via-primary/70 to-primary/40" />
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <ClipboardCheck className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                <h3 className="font-semibold text-base">Assessment & Report</h3>
                <Badge
                  variant="secondary"
                  className={cn(
                    "w-fit text-xs font-medium px-2.5 py-0.5 rounded-full",
                    isCompleted
                      ? "bg-success-subtle text-success border border-success/20"
                      : "bg-warning-subtle text-warning border border-warning/20"
                  )}
                >
                  <span className={cn(
                    "inline-block h-1.5 w-1.5 rounded-full mr-1.5",
                    isCompleted ? "bg-success" : "bg-warning"
                  )} />
                  {isCompleted ? "Completed" : "In Progress"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {isCompleted
                  ? `Completed on ${MOCK_ASSESSMENT.completedAt}`
                  : "Continue your assessment to unlock your career report."}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                {isCompleted && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setRetakeOpen(true)}
                  >
                    Retake Assessment
                  </Button>
                )}
                <Button
                  size="sm"
                  className="text-xs gap-1.5"
                  onClick={() => navigate("/assessment")}
                >
                  {isCompleted ? "View Report" : "Continue Assessment"}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={retakeOpen}
        onOpenChange={setRetakeOpen}
        title="Retake Assessment?"
        description="This will delete all your current assessment data, career report, and action plan. You'll start the assessment from the beginning. This action cannot be undone."
        confirmLabel="Yes, start over"
        variant="destructive"
        onConfirm={() => {
          setRetakeOpen(false);
          toast.success("Assessment reset. Starting fresh!");
          navigate("/assessment");
        }}
      />
    </>
  );
};

// ── Roadmap Card ────────────────────────────────────────────
const RoadmapCard: React.FC<{ loading: boolean }> = ({ loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-52" />
              <Skeleton className="h-3 w-full mt-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasPlan = !!MOCK_ROADMAP.planId;
  const progressPercent = hasPlan
    ? Math.round((MOCK_ROADMAP.completedTasks / MOCK_ROADMAP.totalTasks) * 100)
    : 0;
  const remaining = MOCK_ROADMAP.totalTasks - MOCK_ROADMAP.completedTasks;

  return (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Map className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base mb-1">Current Roadmap</h3>
            {hasPlan ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="text-sm font-medium">{MOCK_ROADMAP.targetRole}</span>
                </div>

                {/* Progress section */}
                <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Progress</span>
                    <span className="font-semibold text-primary">{progressPercent}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                  <div className="flex items-center gap-5 text-xs">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                      <span className="font-medium">{MOCK_ROADMAP.completedTasks}</span> completed
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Circle className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="font-medium">{remaining}</span> remaining
                    </span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="text-xs gap-1.5"
                  onClick={() => navigate("/assessment")}
                >
                  Open Plan
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  You haven't created an action plan yet. Set a target role and build your personalized roadmap.
                </p>
                <Button
                  size="sm"
                  className="text-xs gap-1.5"
                  onClick={() => navigate("/assessment")}
                >
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Create Plan
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ── Career Tools Grid ───────────────────────────────────────
const TOOLS = [
  {
    id: "cover-letter",
    title: "Cover Letter Generator",
    description: "Get AI-powered guidance and reference letters for job applications.",
    icon: PenLine,
    available: true,
    href: "/cover-letter",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    id: "purpose-finder",
    title: "Purpose Finder",
    description: "Discover your career purpose through guided reflection.",
    icon: Compass,
    available: false,
    gradient: "from-warning/10 to-warning/5",
  },
  {
    id: "cv-builder",
    title: "Smart CV Builder",
    description: "Build a tailored CV optimized for your target roles.",
    icon: FileText,
    available: false,
    gradient: "from-info/10 to-info/5",
  },
];

const CareerToolsGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="tools-heading">
      <div className="flex items-center gap-2 mb-4">
        <h2 id="tools-heading" className="text-lg font-semibold">Career Tools</h2>
        <Badge variant="secondary" className="text-[10px] font-medium">{TOOLS.length}</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TOOLS.map((tool) => {
          const isAvailable = tool.available;
          return (
            <Card
              key={tool.id}
              className={cn(
                "group relative overflow-hidden border-0 shadow-sm transition-all duration-300 cursor-pointer",
                isAvailable
                  ? "hover:shadow-md hover:-translate-y-0.5"
                  : "opacity-55"
              )}
              onClick={() => {
                if (isAvailable && tool.href) navigate(tool.href);
                else toast("Coming soon!", { description: `${tool.title} will be available in a future update.` });
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (isAvailable && tool.href) navigate(tool.href);
                  else toast("Coming soon!");
                }
              }}
            >
              {!isAvailable && (
                <Badge
                  variant="secondary"
                  className="absolute top-3 right-3 text-[10px] font-medium z-10"
                >
                  Coming Soon
                </Badge>
              )}
              <CardContent className="p-5">
                <div className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br mb-4",
                  tool.gradient
                )}>
                  <tool.icon
                    className={cn(
                      "h-5 w-5",
                      isAvailable ? "text-primary" : "text-muted-foreground"
                    )}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-sm font-semibold mb-1.5">{tool.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
                {isAvailable && (
                  <div className="flex items-center gap-1 text-xs text-primary font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Get started
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

// ── Profile Sidebar ─────────────────────────────────────────
const ProfileSidebar: React.FC<{ loading: boolean }> = ({ loading }) => {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [profile, setProfile] = useState(MOCK_PROFILE);
  const [editForm, setEditForm] = useState(MOCK_PROFILE);

  if (loading) {
    return (
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="pt-8 pb-6 flex flex-col items-center gap-3">
          <Skeleton className="h-[72px] w-[72px] rounded-full" />
          <Skeleton className="h-5 w-32 mt-1" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-24" />
        </CardContent>
      </Card>
    );
  }

  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

  const handleSave = () => {
    setProfile(editForm);
    setEditOpen(false);
    toast.success("Profile updated successfully.");
  };

  return (
    <>
      <Card className="border-0 shadow-sm overflow-hidden">
        {/* Profile gradient header */}
        <div className="h-16 bg-gradient-to-br from-primary/15 via-primary/8 to-primary/4" />
        <CardContent className="pt-0 pb-6 -mt-8">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-[72px] w-[72px] text-xl ring-4 ring-background shadow-sm">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-base mt-3">
              {profile.firstName} {profile.lastName}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">{profile.email}</p>
            {profile.location && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {profile.location}
              </p>
            )}
            {profile.careerStage && (
              <Badge variant="secondary" className="mt-3 text-xs font-medium px-3 py-1">
                {profile.careerStage}
              </Badge>
            )}
          </div>
          <Separator className="my-5" />
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                setEditForm(profile);
                setEditOpen(true);
              }}
            >
              Edit Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
              Delete My Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your personal information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="edit-first">First Name</Label>
                <Input
                  id="edit-first"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-last">Last Name</Label>
                <Input
                  id="edit-last"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                placeholder="e.g. London, UK"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-stage">Career Stage</Label>
              <Select
                value={editForm.careerStage}
                onValueChange={(v) => setEditForm({ ...editForm, careerStage: v })}
              >
                <SelectTrigger id="edit-stage">
                  <SelectValue placeholder="Select career stage" />
                </SelectTrigger>
                <SelectContent>
                  {CAREER_STAGES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="sm">Cancel</Button>
            </DialogClose>
            <Button size="sm" onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Data Confirm */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete all your data?"
        description="This will permanently delete your profile, assessment data, career report, and action plan. This action cannot be undone."
        confirmLabel="Yes, delete everything"
        variant="destructive"
        onConfirm={() => {
          setDeleteOpen(false);
          toast.success("All your data has been deleted.");
          navigate("/");
        }}
      />
    </>
  );
};

// ── Reward Balance Card ─────────────────────────────────────
const RewardBalanceCard: React.FC<{ loading: boolean }> = ({ loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-5">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-8 w-20 mt-2" />
          <Skeleton className="h-2 w-full mt-3" />
        </CardContent>
      </Card>
    );
  }

  if (!MOCK_REWARD) return null;

  const remaining = MOCK_REWARD.total - MOCK_REWARD.used;
  const usagePercent = Math.round((remaining / MOCK_REWARD.total) * 100);
  const expired = MOCK_REWARD.expiresInDays <= 0;
  const depleted = remaining <= 0;

  let expiryLabel = `Expires in ${MOCK_REWARD.expiresInDays} days`;
  if (MOCK_REWARD.expiresInDays === 1) expiryLabel = "Expires tomorrow";
  if (expired) expiryLabel = "Expired";

  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-warning-subtle">
              <Gift className="h-[18px] w-[18px] text-warning" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold">Free Uses</span>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "text-[10px] font-medium",
              expired ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {expiryLabel}
          </Badge>
        </div>

        <div className="rounded-lg bg-muted/50 p-3.5 mb-4">
          <div className="flex items-baseline gap-0.5 mb-2">
            <span className="text-3xl font-bold tracking-tight">{remaining}</span>
            <span className="text-sm text-muted-foreground font-medium">/ {MOCK_REWARD.total}</span>
          </div>
          <Progress value={usagePercent} className="h-1.5" />
        </div>

        {!depleted && !expired ? (
          <Button
            size="sm"
            className="w-full text-xs gap-1.5"
            onClick={() => navigate("/cover-letter")}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Generate Cover Letter
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-1">
            Upgrade coming soon
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// ── Community & Coaching Cards ──────────────────────────────
const CommunityCards: React.FC = () => (
  <div className="space-y-4">
    <Card className="border-0 shadow-sm overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-[18px] w-[18px] text-primary" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold">Join the Community</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          Connect with other YourVue members, share your journey, and get peer support.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs gap-1.5"
          onClick={() => window.open("https://slack.com", "_blank", "noopener,noreferrer")}
        >
          Join Slack
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>

    <Card className="border-0 shadow-sm overflow-hidden relative">
      {/* Subtle accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
      <CardContent className="p-5 relative">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
            <CalendarDays className="h-[18px] w-[18px] text-primary" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold">Book a Coaching Call</span>
        </div>
        <div className="rounded-lg bg-muted/50 p-3 mb-3">
          <p className="text-xs font-medium">Your Career Coach</p>
          <p className="text-[11px] text-muted-foreground">Career Development Specialist</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          Get a free 30-minute discovery session to discuss your career direction.
        </p>
        <Button
          size="sm"
          className="w-full text-xs gap-1.5"
          onClick={() => window.open("https://calendly.com", "_blank", "noopener,noreferrer")}
        >
          Book Free Discovery Call
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  </div>
);

// ── Dashboard Page ──────────────────────────────────────────
const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalNav />
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-primary" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">Loading…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.985 0 0)" }}>
      <GlobalNav />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <span className="text-xl" aria-hidden="true">👋</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Welcome back, <span className="font-medium text-foreground">{MOCK_PROFILE.firstName}</span>. Here's your career development overview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
          {/* Left Column — Main Content */}
          <div className="space-y-6">
            <AssessmentCard loading={false} />
            <RoadmapCard loading={false} />
            <CareerToolsGrid />
          </div>

          {/* Right Column — Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-[72px]">
            <ProfileSidebar loading={false} />
            <RewardBalanceCard loading={false} />
            <CommunityCards />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
