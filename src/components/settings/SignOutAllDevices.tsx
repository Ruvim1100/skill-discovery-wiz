import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "./ConfirmDialog";
import { toast } from "sonner";

export const SignOutAllDevices: React.FC = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();

  const handleSignOutAll = () => {
    setIsSigningOut(true);
    setTimeout(() => {
      toast.success("Signed out of all devices.");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex justify-end mt-4">
      <ConfirmDialog
        title="Sign out all devices"
        description="This will sign you out of all devices, including this one. You will need to log in again."
        confirmLabel="Sign out all"
        variant="destructive"
        onConfirm={handleSignOutAll}
        trigger={
          <Button variant="destructive" size="sm" disabled={isSigningOut}>
            {isSigningOut ? "Signing out…" : "Sign out all devices"}
          </Button>
        }
      />
    </div>
  );
};
