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
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56 mt-2" />
        </CardHeader>
        <CardFooter>
          <Skeleton className="h-9 w-28" />
        </CardFooter>
      </Card>
    );
  }

  const isCompleted = MOCK_ASSESSMENT.status === "completed";

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <ClipboardCheck className="h-[18px] w-[18px] text-primary" aria-hidden="true" />
              </div>
              <CardTitle className="text-base">Assessment & Report</CardTitle>
            </div>
            <Badge
              variant="secondary"
              className={cn(
                "text-xs font-medium",
                isCompleted
                  ? "bg-[hsl(var(--success-subtle))] text-[hsl(var(--success))]"
                  : "bg-[hsl(var(--warning-subtle))] text-[hsl(var(--warning))]"
              )}
            >
              {isCompleted ? "Completed" : "In Progress"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          {isCompleted ? (
            <p className="text-sm text-muted-foreground">
              Completed on {MOCK_ASSESSMENT.completedAt}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Continue your assessment to unlock your career report.
            </p>
          )}
        </CardContent>
        <CardFooter className="gap-2 justify-end">
          {isCompleted && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRetakeOpen(true)}
            >
              Retake Assessment
            </Button>
          )}
          <Button size="sm" onClick={() => navigate(isCompleted ? "/assessment" : "/assessment")}>
            {isCompleted ? "View Report" : "Continue Assessment"}
          </Button>
        </CardFooter>
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
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-52 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-3 w-full mt-2" />
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
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Map className="h-[18px] w-[18px] text-primary" aria-hidden="true" />
          </div>
          <CardTitle className="text-base">Current Roadmap</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-3">
        {hasPlan ? (
          <>
            <div>
              <p className="text-sm font-medium">{MOCK_ROADMAP.targetRole}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Target Role</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" aria-hidden="true" />
                {MOCK_ROADMAP.completedTasks} completed
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Circle className="h-4 w-4" aria-hidden="true" />
                {remaining} remaining
              </span>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            You haven't created an action plan yet. Set a target role and build your personalized roadmap.
          </p>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm" onClick={() => navigate("/assessment")}>
          {hasPlan ? "Open Plan" : "Create Plan"}
        </Button>
      </CardFooter>
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
  },
  {
    id: "purpose-finder",
    title: "Purpose Finder",
    description: "Discover your career purpose through guided reflection.",
    icon: Compass,
    available: false,
  },
  {
    id: "cv-builder",
    title: "Smart CV Builder",
    description: "Build a tailored CV optimized for your target roles.",
    icon: FileText,
    available: false,
  },
];

const CareerToolsGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="tools-heading">
      <h2 id="tools-heading" className="text-lg font-semibold mb-4">Career Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TOOLS.map((tool) => (
          <Card
            key={tool.id}
            className={cn(
              "relative cursor-pointer transition-all duration-200",
              tool.available
                ? "hover:border-primary/40 hover:shadow-md"
                : "opacity-60 cursor-default"
            )}
            onClick={() => {
              if (tool.available && tool.href) {
                navigate(tool.href);
              } else {
                toast("Coming soon!", {
                  description: `${tool.title} will be available in a future update.`,
                });
              }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (tool.available && tool.href) navigate(tool.href);
                else toast("Coming soon!");
              }
            }}
          >
            {!tool.available && (
              <Badge
                variant="secondary"
                className="absolute top-3 right-3 text-[10px] font-medium"
              >
                Coming Soon
              </Badge>
            )}
            <CardHeader className="pb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <tool.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <CardTitle className="text-sm mt-3">{tool.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {tool.description}
              </p>
            </CardContent>
          </Card>
        ))}
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
      <Card>
        <CardContent className="pt-6 flex flex-col items-center gap-3">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-44" />
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
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center gap-1">
            <Avatar className="h-16 w-16 text-lg">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold mt-2">
              {profile.firstName} {profile.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            {profile.location && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {profile.location}
              </p>
            )}
            {profile.careerStage && (
              <Badge variant="secondary" className="mt-2 text-xs">
                {profile.careerStage}
              </Badge>
            )}
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
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
              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-1.5" aria-hidden="true" />
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
      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-8 w-20 mt-2" />
          <Skeleton className="h-2 w-full mt-3" />
        </CardContent>
      </Card>
    );
  }

  // If no reward token, render nothing
  if (!MOCK_REWARD) return null;

  const remaining = MOCK_REWARD.total - MOCK_REWARD.used;
  const usagePercent = Math.round((remaining / MOCK_REWARD.total) * 100);
  const expired = MOCK_REWARD.expiresInDays <= 0;
  const depleted = remaining <= 0;

  let expiryLabel = `Expires in ${MOCK_REWARD.expiresInDays} days`;
  if (MOCK_REWARD.expiresInDays === 1) expiryLabel = "Expires tomorrow";
  if (expired) expiryLabel = "Expired";

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--warning-subtle))]">
            <Gift className="h-4 w-4 text-[hsl(var(--warning))]" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold">Free Uses</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{remaining}</span>
          <span className="text-sm text-muted-foreground">/ {MOCK_REWARD.total}</span>
        </div>
        <Progress value={usagePercent} className="h-1.5 mt-3" />
        <p className={cn(
          "text-xs mt-2",
          expired ? "text-destructive" : "text-muted-foreground"
        )}>
          {expiryLabel}
        </p>
        {!depleted && !expired ? (
          <Button
            size="sm"
            className="w-full mt-4"
            onClick={() => navigate("/cover-letter")}
          >
            Generate Cover Letter
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground text-center mt-4">
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
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-4 w-4 text-primary" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold">Join the Community</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          Connect with other YourVue members, share your journey, and get peer support.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => window.open("https://slack.com", "_blank", "noopener,noreferrer")}
        >
          Join Slack
          <ExternalLink className="h-3.5 w-3.5 ml-1.5" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>

    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold">Book a Coaching Call</span>
        </div>
        <div className="mb-3">
          <p className="text-xs font-medium">Your Career Coach</p>
          <p className="text-xs text-muted-foreground">Career Development Specialist</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          Get a free 30-minute discovery session to discuss your career direction.
        </p>
        <Button
          size="sm"
          className="w-full"
          onClick={() => window.open("https://calendly.com", "_blank", "noopener,noreferrer")}
        >
          Book Free Discovery Call
          <ExternalLink className="h-3.5 w-3.5 ml-1.5" aria-hidden="true" />
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
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">Loading…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back, {MOCK_PROFILE.firstName}. Here's your career development overview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Left Column — Main Content */}
          <div className="space-y-6">
            <AssessmentCard loading={false} />
            <RoadmapCard loading={false} />
            <CareerToolsGrid />
          </div>

          {/* Right Column — Sidebar */}
          <aside className="space-y-4 lg:self-start lg:sticky lg:top-[72px]">
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
