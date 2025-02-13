import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import DirectoryMenu from '@/components/DirectoryMenu';
import FeaturedEvents from '@/components/directory/FeaturedEvents';
import TopRatedRestaurants from '@/components/directory/TopRatedRestaurants';
import TrendingCuisines from '@/components/directory/TrendingCuisines';
import NearbyEateries from '@/components/directory/NearbyEateries';
import FamilyFriendlySpots from '@/components/directory/FamilyFriendlySpots';
import LateNightEats from '@/components/directory/LateNightEats';
import FilterSection from '@/components/directory/FilterSection';

export default function Directory() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-2xl flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search restaurants, cuisines, or dishes" 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Select Location
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t bg-white">
          <div className="container mx-auto px-4">
            <DirectoryMenu />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-8">
        <FilterSection />
        <FeaturedEvents />
        <TopRatedRestaurants />
        <TrendingCuisines />
        <NearbyEateries />
        <FamilyFriendlySpots />
        <LateNightEats />
      </div>
    </div>
  );
}