 import { useState } from "react";
 import { OrderForm } from "@/components/forms/OrderForm";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  FileText,
  Truck,
  XCircle,
  RefreshCcw,
  Download,
 } from "lucide-react";
 import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "#ORD-1234",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    items: 3,
    total: 245.0,
    status: "pending",
    payment: "paid",
    date: "2024-01-15 14:32",
  },
  {
    id: "#ORD-1233",
    customer: "Michael Chen",
    email: "michael@example.com",
    items: 1,
    total: 89.99,
    status: "shipped",
    payment: "paid",
    date: "2024-01-15 12:18",
  },
  {
    id: "#ORD-1232",
    customer: "Emily Davis",
    email: "emily@example.com",
    items: 5,
    total: 432.5,
    status: "processing",
    payment: "paid",
    date: "2024-01-15 10:45",
  },
  {
    id: "#ORD-1231",
    customer: "James Wilson",
    email: "james@example.com",
    items: 2,
    total: 156.0,
    status: "confirmed",
    payment: "pending",
    date: "2024-01-15 09:20",
  },
  {
    id: "#ORD-1230",
    customer: "Lisa Anderson",
    email: "lisa@example.com",
    items: 1,
    total: 78.0,
    status: "delivered",
    payment: "paid",
    date: "2024-01-14 18:55",
  },
  {
    id: "#ORD-1229",
    customer: "Robert Brown",
    email: "robert@example.com",
    items: 4,
    total: 567.0,
    status: "cancelled",
    payment: "refunded",
    date: "2024-01-14 16:30",
  },
  {
    id: "#ORD-1228",
    customer: "Amanda White",
    email: "amanda@example.com",
    items: 2,
    total: 234.0,
    status: "completed",
    payment: "paid",
    date: "2024-01-14 14:22",
  },
];

const statusStyles: Record<string, string> = {
  pending: "bg-muted text-muted-foreground border-muted",
  confirmed: "bg-info/10 text-info border-info/20",
  processing: "bg-warning/10 text-warning border-warning/20",
  packed: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  shipped: "bg-primary/10 text-primary border-primary/20",
  delivered: "bg-success/10 text-success border-success/20",
  completed: "bg-success/10 text-success border-success/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const paymentStyles: Record<string, string> = {
  paid: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  refunded: "bg-muted text-muted-foreground border-muted",
};

export default function Orders() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");
   const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((o) => o.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((o) => o.status === activeTab);

  return (
    <AdminLayout
      title="Orders"
      subtitle="Track and manage customer orders"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {[
          { label: "All Orders", value: "2,456", active: activeTab === "all" },
          { label: "Pending", value: "156", active: activeTab === "pending" },
          { label: "Processing", value: "89", active: activeTab === "processing" },
          { label: "Shipped", value: "234", active: activeTab === "shipped" },
          { label: "Delivered", value: "1,892", active: activeTab === "delivered" },
          { label: "Cancelled", value: "85", active: activeTab === "cancelled" },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={() => setActiveTab(stat.label.toLowerCase().replace(" ", "_"))}
            className={cn(
              "p-4 rounded-xl border text-left transition-all",
              stat.active
                ? "bg-primary/5 border-primary/30 shadow-soft"
                : "bg-card hover:bg-muted/50"
            )}
          >
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 flex gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Orders
        </Button>
       <Button className="gap-2" onClick={() => setIsFormOpen(true)}>
         <Plus className="h-4 w-4" />
         Create Order
       </Button>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="flex items-center gap-4 p-4 mb-4 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in">
          <span className="text-sm font-medium">
            {selectedOrders.length} selected
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Truck className="h-4 w-4" />
              Ship Selected
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <FileText className="h-4 w-4" />
              Print Invoices
            </Button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="rounded-xl border bg-card shadow-soft overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedOrders.length === orders.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow
                key={order.id}
                className={cn(
                  "group transition-colors",
                  selectedOrders.includes(order.id) && "bg-primary/5"
                )}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => toggleSelect(order.id)}
                  />
                </TableCell>
                <TableCell className="font-mono font-semibold text-primary">
                  {order.id}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center">{order.items}</TableCell>
                <TableCell className="text-right font-semibold">
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("capitalize", statusStyles[order.status])}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("capitalize", paymentStyles[order.payment])}
                  >
                    {order.payment}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {order.date}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <FileText className="h-4 w-4" />
                        Generate Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Truck className="h-4 w-4" />
                        Update Shipping
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2">
                        <RefreshCcw className="h-4 w-4" />
                        Process Refund
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <XCircle className="h-4 w-4" />
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing 1-7 of 2,456 orders
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

     <OrderForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </AdminLayout>
  );
}
