import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import BottomNav from "@/components/BottomNav";
import QuickEscapeButton from "@/components/QuickEscapeButton";
import Index from "./pages/Index";
import SOSPage from "./pages/SOSPage";
import ContactsPage from "./pages/ContactsPage";
import MapPage from "./pages/MapPage";
import ReportPage from "./pages/ReportPage";
import ProfilePage from "./pages/ProfilePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import RewardsPage from "./pages/RewardsPage";
import FakeCallPage from "./pages/FakeCallPage";
import AdminPage from "./pages/AdminPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="max-w-lg mx-auto min-h-screen relative">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sos" element={<SOSPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/fake-call" element={<FakeCallPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
            <QuickEscapeButton />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
