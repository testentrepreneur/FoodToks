import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const DirectoryMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        {/* Location Based */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Location Based</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] p-2 gap-1 bg-white">
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">City/Neighborhood Listings</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Tourist Hotspots</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Local Favorites</NavigationMenuLink></li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Eating Establishments */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Eating Establishments</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] p-2 gap-1 bg-white">
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Restaurants</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Street Food Vendors</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Food Trucks</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Coffee Shops</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Bakeries</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Ice Cream Parlors</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Food Markets</NavigationMenuLink></li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Food Experiences */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Food Experiences</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] p-2 gap-1 bg-white">
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Food Festivals</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Food Tours</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Pop-up Markets</NavigationMenuLink></li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Food Education */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Food Education</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] p-2 gap-1 bg-white">
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Cooking Classes</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Food Workshops</NavigationMenuLink></li>
              <li><NavigationMenuLink className="block p-2 hover:bg-[#ff3131]/10 rounded">Culinary Schools</NavigationMenuLink></li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default DirectoryMenu;