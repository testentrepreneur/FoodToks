import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  DollarSign, 
  Grid, 
  Recycle,
  Clock, 
  Bell, 
  Activity,
  Plus,
  ShoppingCart
} from "lucide-react";

export default function PantryDashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Pantry Pulse</h1>
          <div className="flex gap-4">
            <Input 
              type="search" 
              placeholder="Search items..." 
              className="w-64"
            />
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
                <h3 className="text-2xl font-bold mt-1">124</h3>
                <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
              </div>
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <h3 className="text-2xl font-bold mt-1">$1,245</h3>
                <p className="text-xs text-muted-foreground mt-1">Estimated value</p>
              </div>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <h3 className="text-2xl font-bold mt-1">8</h3>
                <p className="text-xs text-muted-foreground mt-1">Active categories</p>
              </div>
              <Grid className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Waste Prevention</p>
                <h3 className="text-2xl font-bold mt-1">92%</h3>
                <p className="text-xs text-muted-foreground mt-1">Consumption rate</p>
              </div>
              <Recycle className="h-5 w-5 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Categories */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">All Items</h3>
            <div className="space-y-2">
              {['Fresh Food', 'Frozen Foods', 'Vegetables', 'Meat', 'Chicken', 'Grains & Rice'].map((category) => (
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

          {/* Middle Section - Expiring Items */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <h3 className="font-semibold">About to Expire</h3>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Milk', amount: '1L', days: 1 },
                { name: 'Yogurt', amount: '500g', days: 3 },
                { name: 'Fresh Bread', amount: '1 loaf', days: 5 },
                { name: 'Chicken Breast', amount: '500g', days: 6 }
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.amount}</p>
                  </div>
                  <Badge variant={item.days <= 2 ? 'destructive' : 'secondary'}>
                    {item.days} days left
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Right Section - Alerts & Activity */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <h3 className="font-semibold">Stock Alerts</h3>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Rice', amount: '0.5kg of 2kg' },
                  { name: 'Pasta', amount: '200g of 1kg' }
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.amount}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Reorder
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  <h3 className="font-semibold">Recent Activity</h3>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Olive Oil', action: 'Added', time: '2 days ago' },
                  { name: 'Tomatoes', action: 'Updated', time: '3 days ago' },
                  { name: 'Pasta', action: 'Added', time: '5 days ago' }
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                    <Button size="sm">
                      Add Again
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