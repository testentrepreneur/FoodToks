import React from "react";
import { Card } from "@/components/ui/card";
import { Package, DollarSign, Grid, Clock } from "lucide-react";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiry_date: string;
  estimated_value: number;
}

interface PantryStatsProps {
  items: PantryItem[];
}

export function PantryStats({ items }: PantryStatsProps) {
  const calculateTotalValue = () => {
    return items.reduce((sum, item) => sum + (item.estimated_value || 0), 0);
  };

  const getExpiringItems = () => {
    const now = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    
    return items.filter(item => {
      const expiryDate = new Date(item.expiry_date);
      return expiryDate > now && expiryDate <= weekFromNow;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Items</p>
            <h3 className="text-2xl font-bold mt-1">{items.length}</h3>
            <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
          </div>
          <Package className="h-5 w-5 text-primary" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Value</p>
            <h3 className="text-2xl font-bold mt-1">${calculateTotalValue()}</h3>
            <p className="text-xs text-muted-foreground mt-1">Estimated value</p>
          </div>
          <DollarSign className="h-5 w-5 text-primary" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Categories</p>
            <h3 className="text-2xl font-bold mt-1">
              {new Set(items.map(item => item.category)).size}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Active categories</p>
          </div>
          <Grid className="h-5 w-5 text-primary" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
            <h3 className="text-2xl font-bold mt-1">{getExpiringItems().length}</h3>
            <p className="text-xs text-muted-foreground mt-1">Items expiring this week</p>
          </div>
          <Clock className="h-5 w-5 text-primary" />
        </div>
      </Card>
    </div>
  );
}