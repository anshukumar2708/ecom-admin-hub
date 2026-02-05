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
 
 interface OrderFormProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 export function OrderForm({ open, onOpenChange }: OrderFormProps) {
   const [formData, setFormData] = useState({
     customerName: "",
     customerEmail: "",
     customerPhone: "",
     shippingAddress: "",
     city: "",
     postalCode: "",
     country: "",
     paymentMethod: "",
     notes: "",
   });
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     console.log("Order submitted:", formData);
     onOpenChange(false);
   };
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
         <DialogHeader>
           <DialogTitle>Create New Order</DialogTitle>
         </DialogHeader>
         <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-4">
             <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
               Customer Information
             </h3>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label htmlFor="customerName">Customer Name *</Label>
                 <Input
                   id="customerName"
                   placeholder="Enter customer name"
                   value={formData.customerName}
                   onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                   required
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="customerEmail">Email *</Label>
                 <Input
                   id="customerEmail"
                   type="email"
                   placeholder="customer@email.com"
                   value={formData.customerEmail}
                   onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                   required
                 />
               </div>
             </div>
             <div className="space-y-2">
               <Label htmlFor="customerPhone">Phone Number</Label>
               <Input
                 id="customerPhone"
                 placeholder="+1 (555) 000-0000"
                 value={formData.customerPhone}
                 onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
               />
             </div>
           </div>
 
           <div className="space-y-4">
             <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
               Shipping Address
             </h3>
             <div className="space-y-2">
               <Label htmlFor="shippingAddress">Street Address *</Label>
               <Textarea
                 id="shippingAddress"
                 placeholder="Enter street address"
                 rows={2}
                 value={formData.shippingAddress}
                 onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                 required
               />
             </div>
             <div className="grid grid-cols-3 gap-4">
               <div className="space-y-2">
                 <Label htmlFor="city">City *</Label>
                 <Input
                   id="city"
                   placeholder="City"
                   value={formData.city}
                   onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                   required
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="postalCode">Postal Code *</Label>
                 <Input
                   id="postalCode"
                   placeholder="12345"
                   value={formData.postalCode}
                   onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                   required
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="country">Country *</Label>
                 <Select
                   value={formData.country}
                   onValueChange={(value) => setFormData({ ...formData, country: value })}
                 >
                   <SelectTrigger>
                     <SelectValue placeholder="Select" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="us">United States</SelectItem>
                     <SelectItem value="uk">United Kingdom</SelectItem>
                     <SelectItem value="ca">Canada</SelectItem>
                     <SelectItem value="au">Australia</SelectItem>
                     <SelectItem value="de">Germany</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
             </div>
           </div>
 
           <div className="space-y-4">
             <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
               Payment
             </h3>
             <div className="space-y-2">
               <Label htmlFor="paymentMethod">Payment Method *</Label>
               <Select
                 value={formData.paymentMethod}
                 onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
               >
                 <SelectTrigger>
                   <SelectValue placeholder="Select payment method" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="credit_card">Credit Card</SelectItem>
                   <SelectItem value="debit_card">Debit Card</SelectItem>
                   <SelectItem value="paypal">PayPal</SelectItem>
                   <SelectItem value="cod">Cash on Delivery</SelectItem>
                   <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="notes">Order Notes</Label>
             <Textarea
               id="notes"
               placeholder="Any special instructions..."
               rows={3}
               value={formData.notes}
               onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
             />
           </div>
 
           <DialogFooter>
             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
               Cancel
             </Button>
             <Button type="submit">Create Order</Button>
           </DialogFooter>
         </form>
       </DialogContent>
     </Dialog>
   );
 }