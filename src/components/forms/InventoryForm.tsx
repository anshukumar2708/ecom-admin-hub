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
 
 interface InventoryFormProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 export function InventoryForm({ open, onOpenChange }: InventoryFormProps) {
   const [formData, setFormData] = useState({
     productName: "",
     sku: "",
     warehouse: "",
     quantity: "",
     minStockLevel: "",
     maxStockLevel: "",
     supplier: "",
     costPerUnit: "",
     notes: "",
   });
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     console.log("Inventory submitted:", formData);
     onOpenChange(false);
   };
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
         <DialogHeader>
           <DialogTitle>Add Inventory Stock</DialogTitle>
         </DialogHeader>
         <form onSubmit={handleSubmit} className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="productName">Product Name *</Label>
               <Input
                 id="productName"
                 placeholder="Enter product name"
                 value={formData.productName}
                 onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="sku">SKU *</Label>
               <Input
                 id="sku"
                 placeholder="e.g., INV-001"
                 value={formData.sku}
                 onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                 required
               />
             </div>
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="warehouse">Warehouse Location *</Label>
             <Select
               value={formData.warehouse}
               onValueChange={(value) => setFormData({ ...formData, warehouse: value })}
             >
               <SelectTrigger>
                 <SelectValue placeholder="Select warehouse" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="main">Main Warehouse</SelectItem>
                 <SelectItem value="north">North Distribution Center</SelectItem>
                 <SelectItem value="south">South Fulfillment Hub</SelectItem>
                 <SelectItem value="west">West Coast Storage</SelectItem>
                 <SelectItem value="east">East Coast Depot</SelectItem>
               </SelectContent>
             </Select>
           </div>
 
           <div className="grid grid-cols-3 gap-4">
             <div className="space-y-2">
               <Label htmlFor="quantity">Quantity *</Label>
               <Input
                 id="quantity"
                 type="number"
                 placeholder="0"
                 value={formData.quantity}
                 onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="minStockLevel">Min Stock Level</Label>
               <Input
                 id="minStockLevel"
                 type="number"
                 placeholder="10"
                 value={formData.minStockLevel}
                 onChange={(e) => setFormData({ ...formData, minStockLevel: e.target.value })}
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="maxStockLevel">Max Stock Level</Label>
               <Input
                 id="maxStockLevel"
                 type="number"
                 placeholder="500"
                 value={formData.maxStockLevel}
                 onChange={(e) => setFormData({ ...formData, maxStockLevel: e.target.value })}
               />
             </div>
           </div>
 
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="supplier">Supplier</Label>
               <Select
                 value={formData.supplier}
                 onValueChange={(value) => setFormData({ ...formData, supplier: value })}
               >
                 <SelectTrigger>
                   <SelectValue placeholder="Select supplier" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="techsupply">TechSupply Inc.</SelectItem>
                   <SelectItem value="globalgoods">Global Goods Ltd.</SelectItem>
                   <SelectItem value="primeparts">Prime Parts Co.</SelectItem>
                   <SelectItem value="qualitywholesale">Quality Wholesale</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             <div className="space-y-2">
               <Label htmlFor="costPerUnit">Cost per Unit ($)</Label>
               <Input
                 id="costPerUnit"
                 type="number"
                 step="0.01"
                 placeholder="0.00"
                 value={formData.costPerUnit}
                 onChange={(e) => setFormData({ ...formData, costPerUnit: e.target.value })}
               />
             </div>
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="notes">Notes</Label>
             <Textarea
               id="notes"
               placeholder="Additional notes about this inventory..."
               rows={3}
               value={formData.notes}
               onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
             />
           </div>
 
           <DialogFooter>
             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
               Cancel
             </Button>
             <Button type="submit">Add Stock</Button>
           </DialogFooter>
         </form>
       </DialogContent>
     </Dialog>
   );
 }