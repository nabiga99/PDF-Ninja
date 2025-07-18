
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AnalyticsProvider } from "./components/layout/AnalyticsProvider";
import Index from "./pages/Index";
import CompressPage from "./pages/CompressPage";
import ExtractPage from "./pages/ExtractPage";
import DeletePage from "./pages/DeletePage";
import ESignPage from "./pages/ESignPage";
import UnlockPage from "./pages/UnlockPage";
import ProtectPage from "./pages/ProtectPage";
import RedactPage from "./pages/RedactPage";
import UneditablePage from "./pages/UneditablePage";
import WatermarkPage from "./pages/WatermarkPage";
import MergePage from "./pages/MergePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import PricingPage from "./pages/PricingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PremiumRoute from "./components/PremiumRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnalyticsProvider />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/compress" element={<CompressPage />} />
            <Route path="/extract" element={<ExtractPage />} />
            <Route path="/delete" element={<DeletePage />} />
            <Route path="/esign" element={<ESignPage />} />
            <Route element={<PremiumRoute />}>
              <Route path="/unlock" element={<UnlockPage />} />
              <Route path="/protect" element={<ProtectPage />} />
              <Route path="/redact" element={<RedactPage />} />
              <Route path="/uneditable" element={<UneditablePage />} />
              <Route path="/watermark" element={<WatermarkPage />} />
              <Route path="/merge" element={<MergePage />} />
            </Route>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route index element={<DashboardPage />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
