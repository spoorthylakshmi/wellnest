import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

// Layout components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingChatbot from "./components/chatbot/FloatingChatbox";

// Pages
import Index from "./pages/Index";
import MentalHealth from "./pages/MentalHealth";
import SoundTherapy from "./pages/SoundTherapy";
import GuidedBreathing from "./pages/GuidedBreathing";
import AIInsights from "./pages/AIInsights";
import PhysicalHealth from "./pages/PhysicalHealth";
import Tracker from "./pages/Tracker";
import DailyInput from "./pages/DailyInput";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Main App Component
 * Wellnest - Mental & Physical Health Wellness Application
 * Frontend only with mock data, ready for backend API integration
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
          {/* Global Header */}
          <Header />
          
          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/mental-health" element={<MentalHealth />} />
              <Route path="/sound-therapy" element={<SoundTherapy />} />
              <Route path="/guided-breathing" element={<GuidedBreathing />} />
              <Route path="/ai-insights" element={<AIInsights />} />
              <Route path="/physical-health" element={<PhysicalHealth />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/daily-input" element={<DailyInput />} />
              {/* Catch-all 404 route */}
              <Route path="*" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          {/* Global Footer */}
          <Footer />
          
            {/* Floating Chatbot */}
            <FloatingChatbot />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
