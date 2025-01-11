import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider, useSession } from "@supabase/auth-helpers-react";
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

function PrivateRoute({ children }) {
  const session = useSession();
  
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <DashboardLayout>
                      <HomeFeed />
                    </DashboardLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/directory"
                element={
                  <PrivateRoute>
                    <DashboardLayout>
                      <Directory />
                    </DashboardLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/pantry"
                element={
                  <PrivateRoute>
                    <DashboardLayout>
                      <PantryDashboard />
                    </DashboardLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/marketplace"
                element={
                  <PrivateRoute>
                    <DashboardLayout>
                      <Marketplace />
                    </DashboardLayout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <DashboardLayout>
                      <Profile />
                    </DashboardLayout>
                  </PrivateRoute>
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