import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

interface PantryItemFormData {
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiry_date: string;
  estimated_value: number;
  low_stock_threshold?: number;
}

export function AddItemModal({ onItemAdded }: { onItemAdded: () => void }) {
  const { register, handleSubmit, reset } = useForm<PantryItemFormData>();
  const { toast } = useToast();
  const session = useSession();

  const onSubmit = async (data: PantryItemFormData) => {
    if (!session?.user?.id) return;

    try {
      const { error } = await supabase.from('pantry_items').insert([
        {
          ...data,
          user_id: session.user.id,
        }
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item added to pantry",
      });
      
      reset();
      onItemAdded();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Item Name</Label>
            <Input id="name" {...register("name", { required: true })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity", { required: true, min: 0 })}
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Input id="unit" {...register("unit", { required: true })} />
            </div>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" {...register("category", { required: true })} />
          </div>
          <div>
            <Label htmlFor="expiry_date">Expiry Date</Label>
            <Input
              id="expiry_date"
              type="date"
              {...register("expiry_date", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="estimated_value">Estimated Value ($)</Label>
            <Input
              id="estimated_value"
              type="number"
              step="0.01"
              {...register("estimated_value", { required: true, min: 0 })}
            />
          </div>
          <div>
            <Label htmlFor="low_stock_threshold">Low Stock Alert Threshold</Label>
            <Input
              id="low_stock_threshold"
              type="number"
              {...register("low_stock_threshold", { min: 0 })}
            />
          </div>
          <Button type="submit" className="w-full">Add Item</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}