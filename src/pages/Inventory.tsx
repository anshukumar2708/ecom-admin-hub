 import { useState } from "react";
 import { InventoryForm } from "@/components/forms/InventoryForm";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Download,
  Plus,
  Warehouse,
} from "lucide-react";
import { cn } from "@/lib/utils";

const inventoryItems = [
  {
    id: "1",
    product: "iPhone 15 Pro Max",
    sku: "APL-IP15P-128",
    warehouse: "Main Warehouse",
    inStock: 45,
    reserved: 12,
    available: 33,
    reorderLevel: 20,
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    product: "Nike Air Max 270",
    sku: "NKE-AM270-42",
    warehouse: "Main Warehouse",
    inStock: 5,
    reserved: 3,
    available: 2,
    reorderLevel: 15,
    lastUpdated: "1 hour ago",
  },
  {
    id: "3",
    product: "MacBook Pro 14\"",
    sku: "APL-MBP14-512",
    warehouse: "Tech Hub",
    inStock: 23,
    reserved: 5,
    available: 18,
    reorderLevel: 10,
    lastUpdated: "30 min ago",
  },
  {
    id: "4",
    product: "Sony WH-1000XM5",
    sku: "SNY-WH1K-BLK",
    warehouse: "Main Warehouse",
    inStock: 0,
    reserved: 0,
    available: 0,
    reorderLevel: 10,
    lastUpdated: "1 day ago",
  },
  {
    id: "5",
    product: "Apple Watch Series 9",
    sku: "APL-AWS9-45",
    warehouse: "Tech Hub",
    inStock: 67,
    reserved: 8,
    available: 59,
    reorderLevel: 25,
    lastUpdated: "4 hours ago",
  },
  {
    id: "6",
    product: "Samsung Galaxy S24 Ultra",
    sku: "SAM-GS24U-256",
    warehouse: "Main Warehouse",
    inStock: 12,
    reserved: 4,
    available: 8,
    reorderLevel: 15,
    lastUpdated: "6 hours ago",
  },
];

const warehouses = [
  { name: "Main Warehouse", products: 856, value: "$1.2M", capacity: 78 },
  { name: "Tech Hub", products: 234, value: "$890K", capacity: 45 },
  { name: "Fashion Center", products: 567, value: "$450K", capacity: 62 },
];

export default function Inventory() {
   const [isFormOpen, setIsFormOpen] = useState(false);

  const getStockStatus = (available: number, reorderLevel: number) => {
    if (available === 0) return { label: "Out of Stock", style: "bg-destructive/10 text-destructive border-destructive/20" };
    if (available <= reorderLevel) return { label: "Low Stock", style: "bg-warning/10 text-warning border-warning/20" };
    return { label: "In Stock", style: "bg-success/10 text-success border-success/20" };
  };

  return (
    <AdminLayout
      title="Inventory"
      subtitle="Track stock levels and manage warehouses"
    >
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">1,657</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold text-warning">23</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Stock Value</p>
                <p className="text-2xl font-bold">$2.54M</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-destructive">8</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warehouses */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {warehouses.map((warehouse) => (
          <Card key={warehouse.name} className="shadow-soft">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Warehouse className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">{warehouse.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Products</span>
                <span className="font-medium">{warehouse.products}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Value</span>
                <span className="font-medium">{warehouse.value}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="font-medium">{warehouse.capacity}%</span>
                </div>
                <Progress value={warehouse.capacity} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 flex gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search inventory..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              <SelectItem value="main">Main Warehouse</SelectItem>
              <SelectItem value="tech">Tech Hub</SelectItem>
              <SelectItem value="fashion">Fashion Center</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="low_stock">Low Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
           <Button className="gap-2" onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Stock
          </Button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-xl border bg-card shadow-soft overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead className="text-center">
                <Button variant="ghost" size="sm" className="gap-1 -ml-3">
                  In Stock <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Reserved</TableHead>
              <TableHead className="text-center">Available</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => {
              const status = getStockStatus(item.available, item.reorderLevel);
              return (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {item.sku}
                  </TableCell>
                  <TableCell>{item.warehouse}</TableCell>
                  <TableCell className="text-center font-semibold">
                    {item.inStock}
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {item.reserved}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-center font-semibold",
                      item.available === 0 && "text-destructive",
                      item.available > 0 &&
                        item.available <= item.reorderLevel &&
                        "text-warning"
                    )}
                  >
                    {item.available}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(status.style)}>
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {item.lastUpdated}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing 1-6 of 1,657 items
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

     <InventoryForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </AdminLayout>
  );
}
