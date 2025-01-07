import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DirectoryMenu from '@/components/DirectoryMenu';
import FeaturedEvents from '@/components/directory/FeaturedEvents';
import TopRatedRestaurants from '@/components/directory/TopRatedRestaurants';
import TrendingCuisines from '@/components/directory/TrendingCuisines';
import NearbyEateries from '@/components/directory/NearbyEateries';
import FamilyFriendlySpots from '@/components/directory/FamilyFriendlySpots';
import LateNightEats from '@/components/directory/LateNightEats';

export default function Directory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Food Directory</h1>
          </div>
          <DirectoryMenu />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-12">
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