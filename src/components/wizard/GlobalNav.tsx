import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LayoutDashboard, FileText, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// ── YourVue Logo ────────────────────────────────────────────
const Logo: React.FC = () => (
  <Link
    to="/"
    className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
    aria-label="YourVue home"
  >
    <div
      className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm"
      style={{
        backgroundColor: "var(--primary)",
        color: "var(--primary-foreground)",
      }}
    >
      YV
    </div>
    <span className="font-bold text-base tracking-tight hidden sm:block">
      YourVue
    </span>
  </Link>
);

// ── Disabled nav links (during wizard) ─────────────────────
const NavLinks: React.FC<{ orientation?: "horizontal" | "vertical" }> = ({
  orientation = "horizontal",
}) => {
  const links = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "My Report", icon: FileText },
    { label: "My Plan", icon: Compass },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        orientation === "horizontal"
          ? "flex items-center gap-1"
          : "flex flex-col gap-1 w-full"
      )}
    >
      {links.map(({ label, icon: Icon }) => (
        <button
          key={label}
          disabled
          aria-disabled="true"
          title="Complete the assessment to unlock"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
            "text-muted-foreground opacity-60 cursor-not-allowed",
            "focus:outline-none",
            orientation === "vertical" && "w-full justify-start"
          )}
        >
          <Icon size={16} aria-hidden="true" />
          {label}
        </button>
      ))}
    </nav>
  );
};

// ── Profile Avatar Dropdown ─────────────────────────────────
const ProfileDropdown: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-9 w-9 rounded-full flex items-center justify-center",
            "border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "transition-opacity hover:opacity-80"
          )}
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--muted)",
            color: "var(--muted-foreground)",
          }}
          aria-label="Open profile menu"
        >
          <User size={16} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">My Account</p>
          <p className="text-xs text-muted-foreground">Assessment in progress</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => navigate("/")}
        >
          Exit Assessment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ── Global Navigation Bar ───────────────────────────────────
export const GlobalNav: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 border-b"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--background)",
      }}
    >
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Nav links (desktop) */}
        <div className="hidden md:flex items-center">
          <NavLinks orientation="horizontal" />
        </div>

        {/* Right: Profile + mobile menu */}
        <div className="flex items-center gap-2">
          <ProfileDropdown />

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9"
                aria-label="Open navigation menu"
              >
                <Menu size={20} aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <SheetHeader className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
                <SheetTitle className="text-left text-base flex items-center gap-2">
                  <div
                    className="h-7 w-7 rounded-md flex items-center justify-center font-bold text-xs"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    YV
                  </div>
                  YourVue
                </SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">
                  Navigation
                </p>
                <NavLinks orientation="vertical" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
