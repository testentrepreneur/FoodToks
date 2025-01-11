import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Directory from "@/pages/Directory";
import { HomeFeed } from "@/components/social/HomeFeed";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import PantryDashboard from "@/pages/PantryDashboard";
import Marketplace from "@/pages/Marketplace";
import Profile from "@/pages/Profile";
import { AIAssistant } from "@/components/chat/AIAssistant";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/home"
                element={
                  <DashboardLayout>
                    <HomeFeed />
                  </DashboardLayout>
                }
              />
              <Route
                path="/directory"
                element={
                  <DashboardLayout>
                    <Directory />
                  </DashboardLayout>
                }
              />
              <Route
                path="/pantry"
                element={
                  <DashboardLayout>
                    <PantryDashboard />
                  </DashboardLayout>
                }
              />
              <Route
                path="/marketplace"
                element={
                  <DashboardLayout>
                    <Marketplace />
                  </DashboardLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                }
              />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
            <AIAssistant />
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

export default App;