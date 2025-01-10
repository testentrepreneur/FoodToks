import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Package, 
  DollarSign, 
  Grid, 
  Recycle,
  Clock, 
  Bell, 
  Activity,
  Plus,
  ShoppingCart,
  Search
} from "lucide-react";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiry_date: string;
  estimated_value: number;
}

export default function PantryDashboard() {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const { toast } = useToast();

  useEffect(() => {
    if (session) {
      fetchPantryItems();
    }
  }, [session]);

  const fetchPantryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('pantry_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load pantry items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Pantry Pulse</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search items..." 
                className="w-64 pl-9"
              />
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categories */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Grid className="h-4 w-4" />
              Categories
            </h3>
            <div className="space-y-2">
              {Array.from(new Set(items.map(item => item.category))).map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {category}
                </Button>
              ))}
            </div>
          </Card>

          {/* Expiring Items */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Expiring Soon
            </h3>
            <div className="space-y-4">
              {getExpiringItems().map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    Expires {new Date(item.expiry_date).toLocaleDateString()}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {items.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Added recently</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Reorder
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}