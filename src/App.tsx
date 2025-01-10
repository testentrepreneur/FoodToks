import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Directory from "@/pages/Directory";
import { HomeFeed } from "@/components/social/HomeFeed";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import PantryDashboard from "@/pages/PantryDashboard";
import Marketplace from "@/pages/Marketplace";
import { AIAssistant } from "@/components/chat/AIAssistant";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/home" element={<HomeFeed />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pantry" element={<PantryDashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
            </Routes>
            <AIAssistant />
          </BrowserRouter>
        </TooltipProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

export default App;