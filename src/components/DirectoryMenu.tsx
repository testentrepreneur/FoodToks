import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ChevronRight } from 'lucide-react';

const DirectoryMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        {/* Location Based */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Location Based</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] p-2 gap-1 bg-white">
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">City/Neighborhood Listings</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Tourist Hotspots</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Local Favorites</NavigationMenuLink></li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Eating Establishments */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Eating Establishments</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] p-2 gap-1 bg-white">
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Restaurants</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Street Food Vendors</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Food Trucks</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Coffee Shops</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Bakeries</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Ice Cream Parlors</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Food Markets</NavigationMenuLink></li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Food Experiences */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Food Experiences</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] p-2 gap-1 bg-white">
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Food Festivals</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Food Tours</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Pop-up Markets</NavigationMenuLink></li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Food Education */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Food Education</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] p-2 gap-1 bg-white">
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Cooking Classes</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Food Workshops</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-accent rounded">Culinary Schools</NavigationMenuLink></li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default DirectoryMenu;