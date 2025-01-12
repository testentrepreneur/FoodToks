import React from "react";
import { MainSidebar } from "@/components/navigation/MainSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { BottomNavigation } from "@/components/social/BottomNavigation";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      {!isMobile && <MainSidebar />}
      <main className={`min-h-screen ${isMobile ? 'w-full' : 'ml-64'} p-4 md:p-8`}>
        {children}
      </main>
      {isMobile && <BottomNavigation />}
    </div>
  );
}