import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Download,
  Trash2,
  KeyRound,
  Monitor,
  Eye,
  EyeOff,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ConfirmDialog } from "@/components/settings/ConfirmDialog";
import { ActiveSessionsList } from "@/components/settings/ActiveSessionsList";
import { SignOutAllDevices } from "@/components/settings/SignOutAllDevices";
import { GlobalNav } from "@/components/wizard/GlobalNav";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ── Export Card ─────────────────────────────────────────────
const ExportCard: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setExportSuccess(false);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader className="gap-1 pb-2">
        <div className="flex items-center gap-2">
          <Download className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <CardTitle className="text-base">Export My Data</CardTitle>
        </div>
        <CardDescription>
          Download a copy of all your YourVue data in JSON format.
        </CardDescription>
      </CardHeader>
      {exportSuccess && (
        <CardContent className="pt-0 pb-2">
          <p className="text-sm text-green-600" role="status">
            Check your email for a download link.
          </p>
        </CardContent>
      )}
      <CardFooter className="justify-end pt-0">
        <Button onClick={handleExport} disabled={isExporting} size="sm">
          {isExporting ? "Requesting export…" : "Export My Data"}
        </Button>
      </CardFooter>
    </Card>
  );
};

// ── Delete Account Card ─────────────────────────────────────
const DeleteAccountCard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0=closed, 1=confirm, 2=email, 3=credential
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [credError, setCredError] = useState<string | null>(null);

  const mockEmail = "user@example.com";

  const resetAll = () => {
    setStep(0);
    setEmailInput("");
    setPasswordInput("");
    setOtpInput("");
    setCredError(null);
    setIsDeleting(false);
  };

  const handleFinalDelete = () => {
    if (!passwordInput && !otpInput) {
      setCredError("Please enter your password or an OTP code.");
      return;
    }
    setIsDeleting(true);
    setCredError(null);
    setTimeout(() => {
      toast.success("Your account has been deleted.");
      resetAll();
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <Card className="border-destructive/50">
        <CardHeader className="gap-1 pb-2">
          <div className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" aria-hidden="true" />
            <CardTitle className="text-base">Delete My Account</CardTitle>
          </div>
          <CardDescription className="text-destructive">
            This action is permanent and cannot be undone. All your data including assessments, reports, and action plans will be permanently deleted.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-end pt-0">
          <Button variant="destructive" size="sm" onClick={() => setStep(1)}>
            Delete My Account
          </Button>
        </CardFooter>
      </Card>

      {/* Step 1: Initial confirmation */}
      <ConfirmDialog
        open={step === 1}
        onOpenChange={(open) => !open && resetAll()}
        title="Are you sure you want to delete your account?"
        description="This will permanently delete all your data including your profile, assessments, career reports, action plans, and CV data. This action cannot be undone."
        confirmLabel="Yes, delete my account"
        variant="destructive"
        onConfirm={() => setStep(2)}
      />

      {/* Step 2: Email confirmation */}
      <AlertDialog open={step === 2} onOpenChange={(open) => !open && resetAll()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm your email</AlertDialogTitle>
            <AlertDialogDescription>
              Please type your email address ({mockEmail}) to confirm account deletion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-2">
            <Input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder={mockEmail}
              type="email"
              autoComplete="email"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={resetAll}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={cn("bg-destructive text-destructive-foreground hover:bg-destructive/90")}
              disabled={emailInput !== mockEmail}
              onClick={() => setStep(3)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Step 3: Credential verification */}
      <AlertDialog open={step === 3} onOpenChange={(open) => !open && resetAll()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Verify your identity</AlertDialogTitle>
            <AlertDialogDescription>
              Enter your password or an OTP code to complete the deletion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="del-password">Password</Label>
              <Input
                id="del-password"
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (e.target.value) setOtpInput("");
                  setCredError(null);
                }}
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="del-otp">OTP Code</Label>
              <Input
                id="del-otp"
                inputMode="numeric"
                maxLength={6}
                value={otpInput}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtpInput(v);
                  if (v) setPasswordInput("");
                  setCredError(null);
                }}
                placeholder="6-digit code"
              />
            </div>
            {credError && (
              <p className="text-sm text-destructive" role="alert">
                {credError}
              </p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={resetAll}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={cn("bg-destructive text-destructive-foreground hover:bg-destructive/90")}
              disabled={isDeleting || (!passwordInput && !otpInput)}
              onClick={handleFinalDelete}
            >
              {isDeleting ? "Deleting…" : "Delete my account permanently"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// ── Set Password Card ───────────────────────────────────────
const SetPasswordCard: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const validate = (): string | null => {
    if (!newPassword) return "Password is required.";
    if (!passwordRegex.test(newPassword))
      return "Password must be at least 8 characters with one uppercase, one lowercase, and one number.";
    if (newPassword !== confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    const err = validate();
    if (err) {
      setSubmitError(err);
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Password set successfully. You can now use it to sign in.");
      setNewPassword("");
      setConfirmPassword("");
    }, 1000);
  };

  return (
    <Card>
      <CardHeader className="gap-1 pb-2">
        <div className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <CardTitle className="text-base">Set Password</CardTitle>
        </div>
        <CardDescription>
          Set a password so you can log in without a verification code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="space-y-1.5">
            <Label htmlFor="new-pw">New Password</Label>
            <div className="relative">
              <Input
                id="new-pw"
                type={showNew ? "text" : "password"}
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setSubmitError(null);
                  setSuccessMessage(null);
                }}
              />
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm p-0.5"
                onClick={() => setShowNew(!showNew)}
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              At least 8 characters with one uppercase letter, one lowercase letter, and one number.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirm-pw">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirm-pw"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setSubmitError(null);
                  setSuccessMessage(null);
                }}
              />
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm p-0.5"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {submitError && (
            <p className="text-sm text-destructive" role="alert">
              {submitError}
            </p>
          )}
          {successMessage && (
            <p className="text-sm text-green-600" role="status">
              {successMessage}
            </p>
          )}

          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Setting password…" : "Set Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// ── Sessions Card ───────────────────────────────────────────
const SessionsCard: React.FC = () => (
  <Card>
    <CardHeader className="gap-1 pb-2">
      <div className="flex items-center gap-2">
        <Monitor className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <CardTitle className="text-base">Active Sessions</CardTitle>
      </div>
      <CardDescription>
        Manage devices where you're currently signed in.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ActiveSessionsList />
      <SignOutAllDevices />
    </CardContent>
  </Card>
);

// ── Settings Page ───────────────────────────────────────────
const SettingsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isDownloading, setIsDownloading] = useState(false);

  // Handle export token auto-download
  useEffect(() => {
    const exportToken = searchParams.get("exportToken");
    if (!exportToken) return;

    setIsDownloading(true);
    // Mock download
    const timer = setTimeout(() => {
      const blob = new Blob(['{"export": "data"}'], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "yourvue-export.json";
      a.click();
      URL.revokeObjectURL(url);
      setIsDownloading(false);
      window.history.replaceState({}, "", "/settings");
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      <main className="mx-auto max-w-[720px] px-4 py-8">
        <h1 className="text-2xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">
          Manage your account security and personal data.
        </p>

        {isDownloading && (
          <div className="rounded-md bg-muted p-4 mb-6">
            <p className="text-sm text-muted-foreground">Downloading your export…</p>
          </div>
        )}

        {/* Group 1: Data & Privacy */}
        <section aria-labelledby="data-privacy-heading">
          <h2 id="data-privacy-heading" className="text-lg font-semibold mb-4">
            Data & Privacy
          </h2>
          <div className="space-y-4">
            <ExportCard />
            <DeleteAccountCard />
          </div>
        </section>

        <Separator className="my-8" />

        {/* Group 2: Security */}
        <section aria-labelledby="security-heading">
          <h2 id="security-heading" className="text-lg font-semibold mb-4">
            Security
          </h2>
          <div className="space-y-4">
            <SetPasswordCard />
            <SessionsCard />
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsPage;
