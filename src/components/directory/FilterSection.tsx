import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export default function FilterSection() {
  const { data: mealTypes } = useQuery({
    queryKey: ['mealTypes'],
    queryFn: async () => {
      const { data } = await supabase.from('meal_types').select('*');
      return data;
    },
  });

  const { data: diningStyles } = useQuery({
    queryKey: ['diningStyles'],
    queryFn: async () => {
      const { data } = await supabase.from('dining_styles').select('*');
      return data;
    },
  });

  const { data: dietaryPreferences } = useQuery({
    queryKey: ['dietaryPreferences'],
    queryFn: async () => {
      const { data } = await supabase.from('dietary_preferences').select('*');
      return data;
    },
  });

  return (
    <div className="flex flex-wrap gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Meal Types</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white">
          {mealTypes?.map((type) => (
            <DropdownMenuItem key={type.id}>
              {type.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Dining Styles</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white">
          {diningStyles?.map((style) => (
            <DropdownMenuItem key={style.id}>
              {style.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Dietary Preferences</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white">
          {dietaryPreferences?.map((pref) => (
            <DropdownMenuItem key={pref.id}>
              {pref.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}