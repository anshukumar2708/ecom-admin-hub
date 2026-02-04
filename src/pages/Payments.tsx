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
import {
  Search,
  Filter,
  DollarSign,
  CreditCard,
  RefreshCcw,
  AlertCircle,
  Download,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: "TXN-001234",
    orderId: "#ORD-1234",
    customer: "Sarah Johnson",
    amount: 245.0,
    fee: 7.35,
    net: 237.65,
    method: "Visa •••• 4242",
    status: "completed",
    date: "2024-01-15 14:32",
  },
  {
    id: "TXN-001233",
    orderId: "#ORD-1233",
    customer: "Michael Chen",
    amount: 89.99,
    fee: 2.7,
    net: 87.29,
    method: "PayPal",
    status: "completed",
    date: "2024-01-15 12:18",
  },
  {
    id: "TXN-001232",
    orderId: "#ORD-1232",
    customer: "Emily Davis",
    amount: 432.5,
    fee: 12.98,
    net: 419.52,
    method: "Mastercard •••• 8521",
    status: "pending",
    date: "2024-01-15 10:45",
  },
  {
    id: "TXN-001231",
    orderId: "#ORD-1231",
    customer: "James Wilson",
    amount: 156.0,
    fee: 4.68,
    net: 151.32,
    method: "Apple Pay",
    status: "failed",
    date: "2024-01-15 09:20",
  },
  {
    id: "TXN-001230",
    orderId: "#ORD-1229",
    customer: "Robert Brown",
    amount: -567.0,
    fee: 0,
    net: -567.0,
    method: "Refund",
    status: "refunded",
    date: "2024-01-14 16:30",
  },
  {
    id: "TXN-001229",
    orderId: "#ORD-1228",
    customer: "Amanda White",
    amount: 234.0,
    fee: 7.02,
    net: 226.98,
    method: "Visa •••• 1234",
    status: "completed",
    date: "2024-01-14 14:22",
  },
];

const statusStyles: Record<string, string> = {
  completed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  refunded: "bg-muted text-muted-foreground border-muted",
};

export default function Payments() {
  return (
    <AdminLayout
      title="Payments"
      subtitle="Track transactions and manage payment processing"
    >
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$89,432</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3" /> +12.5% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processing Fees</p>
                <p className="text-2xl font-bold">$2,683</p>
                <p className="text-xs text-muted-foreground mt-1">2.9% + $0.30</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Refunds</p>
                <p className="text-2xl font-bold">$4,567</p>
                <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                  <ArrowDownLeft className="h-3 w-3" /> 23 refunds this month
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <RefreshCcw className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed Payments</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground mt-1">
                  $1,890 total value
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods Distribution */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        {[
          { method: "Credit Cards", percentage: 68, color: "bg-primary" },
          { method: "PayPal", percentage: 18, color: "bg-info" },
          { method: "Apple Pay", percentage: 10, color: "bg-foreground" },
          { method: "Others", percentage: 4, color: "bg-muted-foreground" },
        ].map((item) => (
          <Card key={item.method} className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.method}</span>
                <span className="text-sm text-muted-foreground">
                  {item.percentage}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn("h-full rounded-full", item.color)}
                  style={{ width: `${item.percentage}%` }}
                />
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
            <Input placeholder="Search transactions..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="card">Credit Card</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="apple">Apple Pay</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="rounded-xl border bg-card shadow-soft overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Transaction ID</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Fee</TableHead>
              <TableHead className="text-right">Net</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.id} className="group">
                <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                <TableCell className="font-mono text-sm text-primary">
                  {txn.orderId}
                </TableCell>
                <TableCell className="font-medium">{txn.customer}</TableCell>
                <TableCell
                  className={cn(
                    "text-right font-semibold",
                    txn.amount < 0 && "text-destructive"
                  )}
                >
                  {txn.amount < 0 ? "-" : ""}${Math.abs(txn.amount).toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  ${txn.fee.toFixed(2)}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-semibold",
                    txn.net < 0 && "text-destructive"
                  )}
                >
                  {txn.net < 0 ? "-" : ""}${Math.abs(txn.net).toFixed(2)}
                </TableCell>
                <TableCell className="text-sm">{txn.method}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("capitalize", statusStyles[txn.status])}
                  >
                    {txn.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {txn.date}
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
                        <Download className="h-4 w-4" />
                        Download Receipt
                      </DropdownMenuItem>
                      {txn.status === "completed" && (
                        <DropdownMenuItem className="gap-2 text-warning">
                          <RefreshCcw className="h-4 w-4" />
                          Process Refund
                        </DropdownMenuItem>
                      )}
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
          Showing 1-6 of 1,234 transactions
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
    </AdminLayout>
  );
}
