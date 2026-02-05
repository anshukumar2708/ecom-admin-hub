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
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { Switch } from "@/components/ui/switch";
 
 interface UserFormProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 export function UserForm({ open, onOpenChange }: UserFormProps) {
   const [formData, setFormData] = useState({
     firstName: "",
     lastName: "",
     email: "",
     phone: "",
     role: "",
     password: "",
     confirmPassword: "",
     isActive: true,
     sendWelcomeEmail: true,
   });
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (formData.password !== formData.confirmPassword) {
       alert("Passwords do not match");
       return;
     }
     console.log("User submitted:", formData);
     onOpenChange(false);
   };
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
         <DialogHeader>
           <DialogTitle>Add New User</DialogTitle>
         </DialogHeader>
         <form onSubmit={handleSubmit} className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="firstName">First Name *</Label>
               <Input
                 id="firstName"
                 placeholder="John"
                 value={formData.firstName}
                 onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="lastName">Last Name *</Label>
               <Input
                 id="lastName"
                 placeholder="Doe"
                 value={formData.lastName}
                 onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                 required
               />
             </div>
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="email">Email Address *</Label>
             <Input
               id="email"
               type="email"
               placeholder="john@example.com"
               value={formData.email}
               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
               required
             />
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="phone">Phone Number</Label>
             <Input
               id="phone"
               placeholder="+1 (555) 000-0000"
               value={formData.phone}
               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
             />
           </div>
 
           <div className="space-y-2">
             <Label htmlFor="role">Role *</Label>
             <Select
               value={formData.role}
               onValueChange={(value) => setFormData({ ...formData, role: value })}
             >
               <SelectTrigger>
                 <SelectValue placeholder="Select user role" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="customer">Customer</SelectItem>
                 <SelectItem value="admin">Admin</SelectItem>
                 <SelectItem value="manager">Manager</SelectItem>
                 <SelectItem value="support">Support</SelectItem>
                 <SelectItem value="warehouse">Warehouse Staff</SelectItem>
               </SelectContent>
             </Select>
           </div>
 
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
               <Label htmlFor="password">Password *</Label>
               <Input
                 id="password"
                 type="password"
                 placeholder="••••••••"
                 value={formData.password}
                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                 required
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="confirmPassword">Confirm Password *</Label>
               <Input
                 id="confirmPassword"
                 type="password"
                 placeholder="••••••••"
                 value={formData.confirmPassword}
                 onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                 required
               />
             </div>
           </div>
 
           <div className="space-y-4">
             <div className="flex items-center gap-3">
               <Switch
                 id="isActive"
                 checked={formData.isActive}
                 onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
               />
               <Label htmlFor="isActive">Active Account</Label>
             </div>
             <div className="flex items-center gap-3">
               <Switch
                 id="sendWelcomeEmail"
                 checked={formData.sendWelcomeEmail}
                 onCheckedChange={(checked) => setFormData({ ...formData, sendWelcomeEmail: checked })}
               />
               <Label htmlFor="sendWelcomeEmail">Send Welcome Email</Label>
             </div>
           </div>
 
           <DialogFooter>
             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
               Cancel
             </Button>
             <Button type="submit">Add User</Button>
           </DialogFooter>
         </form>
       </DialogContent>
     </Dialog>
   );
 }