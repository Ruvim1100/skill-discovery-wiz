import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import Index from "./pages/Index";
import SettingsPage from "./pages/SettingsPage";
import CoverLetterPage from "./pages/CoverLetterPage";
import CoverLetterDetailPage from "./pages/CoverLetterDetailPage";
import ReportConceptsIndex from "./pages/report-concepts/ReportConceptsIndex";
import EditorialConcept from "./pages/report-concepts/EditorialConcept";
import DashboardConcept from "./pages/report-concepts/DashboardConcept";
import NarrativeConcept from "./pages/report-concepts/NarrativeConcept";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
          <Route path="/cover-letter" element={<CoverLetterPage />} />
          <Route path="/cover-letter/:id" element={<CoverLetterDetailPage />} />
          <Route path="/report-concepts" element={<ReportConceptsIndex />} />
          <Route path="/report-concepts/editorial" element={<EditorialConcept />} />
          <Route path="/report-concepts/dashboard" element={<DashboardConcept />} />
          <Route path="/report-concepts/narrative" element={<NarrativeConcept />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
