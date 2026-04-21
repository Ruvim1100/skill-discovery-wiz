import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import Index from "./pages/Index";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import NotFoundPreview from "./app/not-found";
import CoverLetterPreview from "./pages/CoverLetterPreview";
import RootError from "./app/error";
import GlobalError from "./app/global-error";
import AppError from "./app/(app)/error";
import PublicError from "./app/(public)/error";

const queryClient = new QueryClient();

const mockError = new Error("This is a preview of the error page") as Error & { digest?: string };
const mockReset = () => window.location.reload();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/assessment" element={<Index />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/preview/not-found" element={<NotFoundPreview />} />
          <Route path="/preview/error" element={<RootError error={mockError} reset={mockReset} />} />
          <Route path="/preview/global-error" element={<GlobalError error={mockError} reset={mockReset} />} />
          <Route path="/preview/app-error" element={<AppError error={mockError} reset={mockReset} />} />
          <Route path="/preview/public-error" element={<PublicError error={mockError} reset={mockReset} />} />
          <Route path="/preview/cover-letter" element={<CoverLetterPreview />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
