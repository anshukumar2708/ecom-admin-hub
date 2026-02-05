 import { useState } from "react";
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
 } from "@/components/ui/dialog";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { Switch } from "@/components/ui/switch";
 
 interface CouponFormProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 export function CouponForm({ open, onOpenChange }: CouponFormProps) {
   const [formData, setFormData] = useState({
     code: "",
     discountType: "",
     discountValue: "",
     minOrderAmount: "",
     maxDiscount: "",
     usageLimit: "",
     startDate: "",
     endDate: "",
     description: "",
     isActive: true,
   });
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     console.log("Coupon submitted:", formData);
     onOpenChange(false);
   };
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
         <DialogHeader>
           <DialogTitle>Create New Coupon</DialogTitle>
         </DialogHeader>
         <form onSubmit={handleSubmit} className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="code">Coupon Code *</Label>
               <Input
                 id="code"
                 placeholder="e.g., SUMMER20"
                 className="uppercase"
                 value={formData.code}
                 onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="discountType">Discount Type *</Label>
               <Select
                 value={formData.discountType}
                 onValueChange={(value) => setFormData({ ...formData, discountType: value })}
               >
                 <SelectTrigger>
                   <SelectValue placeholder="Select type" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="percentage">Percentage (%)</SelectItem>
                   <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                   <SelectItem value="free_shipping">Free Shipping</SelectItem>
                   <SelectItem value="buy_x_get_y">Buy X Get Y</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </div>
 
           <div className="grid grid-cols-3 gap-4">
             <div className="space-y-2">
               <Label htmlFor="discountValue">Discount Value *</Label>
               <Input
                 id="discountValue"
                 type="number"
                 placeholder="20"
                 value={formData.discountValue}
                 onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="minOrderAmount">Min Order Amount ($)</Label>
               <Input
                 id="minOrderAmount"
                 type="number"
                 step="0.01"
                 placeholder="50.00"
                 value={formData.minOrderAmount}
                 onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="maxDiscount">Max Discount ($)</Label>
               <Input
                 id="maxDiscount"
                 type="number"
                 step="0.01"
                 placeholder="100.00"
                 value={formData.maxDiscount}
                 onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
               />
             </div>
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="usageLimit">Usage Limit</Label>
             <Input
               id="usageLimit"
               type="number"
               placeholder="Leave empty for unlimited"
               value={formData.usageLimit}
               onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
             />
           </div>
 
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="startDate">Start Date *</Label>
               <Input
                 id="startDate"
                 type="date"
                 value={formData.startDate}
                 onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="endDate">End Date *</Label>
               <Input
                 id="endDate"
                 type="date"
                 value={formData.endDate}
                 onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                 required
               />
             </div>
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="description">Description</Label>
             <Textarea
               id="description"
               placeholder="Describe this coupon promotion..."
               rows={3}
               value={formData.description}
               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
             />
           </div>
 
           <div className="flex items-center gap-3">
             <Switch
               id="isActive"
               checked={formData.isActive}
               onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
             />
             <Label htmlFor="isActive">Active Coupon</Label>
           </div>
 
           <DialogFooter>
             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
               Cancel
             </Button>
             <Button type="submit">Create Coupon</Button>
           </DialogFooter>
         </form>
       </DialogContent>
     </Dialog>
   );
 }