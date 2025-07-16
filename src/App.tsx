
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/compress" element={<CompressPage />} />
            <Route path="/extract" element={<ExtractPage />} />
            <Route path="/delete" element={<DeletePage />} />
            <Route path="/esign" element={<ESignPage />} />
            <Route path="/unlock" element={<UnlockPage />} />
            <Route path="/protect" element={<ProtectPage />} />
            <Route path="/redact" element={<RedactPage />} />
            <Route path="/uneditable" element={<UneditablePage />} />
            <Route path="/watermark" element={<WatermarkPage />} />
            <Route path="/merge" element={<MergePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
