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
 
 interface ProductFormProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 export function ProductForm({ open, onOpenChange }: ProductFormProps) {
   const [formData, setFormData] = useState({
     name: "",
     sku: "",
     category: "",
     price: "",
     discountPrice: "",
     stock: "",
     description: "",
     isActive: true,
   });
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     console.log("Product submitted:", formData);
     onOpenChange(false);
   };
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
         <DialogHeader>
           <DialogTitle>Add New Product</DialogTitle>
         </DialogHeader>
         <form onSubmit={handleSubmit} className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="name">Product Name *</Label>
               <Input
                 id="name"
                 placeholder="Enter product name"
                 value={formData.name}
                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="sku">SKU *</Label>
               <Input
                 id="sku"
                 placeholder="e.g., PRD-001"
                 value={formData.sku}
                 onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                 required
               />
             </div>
           </div>
 
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="category">Category *</Label>
               <Select
                 value={formData.category}
                 onValueChange={(value) => setFormData({ ...formData, category: value })}
               >
                 <SelectTrigger>
                   <SelectValue placeholder="Select category" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="electronics">Electronics</SelectItem>
                   <SelectItem value="footwear">Footwear</SelectItem>
                   <SelectItem value="audio">Audio</SelectItem>
                   <SelectItem value="wearables">Wearables</SelectItem>
                   <SelectItem value="home">Home</SelectItem>
                   <SelectItem value="gaming">Gaming</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             <div className="space-y-2">
               <Label htmlFor="stock">Stock Quantity *</Label>
               <Input
                 id="stock"
                 type="number"
                 placeholder="0"
                 value={formData.stock}
                 onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                 required
               />
             </div>
           </div>
 
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="price">Price ($) *</Label>
               <Input
                 id="price"
                 type="number"
                 step="0.01"
                 placeholder="0.00"
                 value={formData.price}
                 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="discountPrice">Discount Price ($)</Label>
               <Input
                 id="discountPrice"
                 type="number"
                 step="0.01"
                 placeholder="0.00"
                 value={formData.discountPrice}
                 onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
               />
             </div>
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="description">Description</Label>
             <Textarea
               id="description"
               placeholder="Enter product description..."
               rows={4}
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
             <Label htmlFor="isActive">Active Product</Label>
           </div>
 
           <DialogFooter>
             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
               Cancel
             </Button>
             <Button type="submit">Add Product</Button>
           </DialogFooter>
         </form>
       </DialogContent>
     </Dialog>
   );
 }