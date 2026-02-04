import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "#ORD-1234",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    amount: "$245.00",
    status: "completed",
    date: "2 min ago",
  },
  {
    id: "#ORD-1233",
    customer: "Michael Chen",
    email: "michael@example.com",
    amount: "$89.99",
    status: "shipped",
    date: "15 min ago",
  },
  {
    id: "#ORD-1232",
    customer: "Emily Davis",
    email: "emily@example.com",
    amount: "$432.50",
    status: "processing",
    date: "1 hour ago",
  },
  {
    id: "#ORD-1231",
    customer: "James Wilson",
    email: "james@example.com",
    amount: "$156.00",
    status: "pending",
    date: "2 hours ago",
  },
  {
    id: "#ORD-1230",
    customer: "Lisa Anderson",
    email: "lisa@example.com",
    amount: "$78.00",
    status: "cancelled",
    date: "3 hours ago",
  },
];

const statusStyles: Record<string, string> = {
  completed: "bg-success/10 text-success border-success/20",
  shipped: "bg-info/10 text-info border-info/20",
  processing: "bg-warning/10 text-warning border-warning/20",
  pending: "bg-muted text-muted-foreground border-muted",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export function RecentOrders() {
  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Latest customer orders
          </p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary gap-1">
          View all <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {order.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {order.customer}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {order.id}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-foreground">{order.amount}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <Badge
                  variant="outline"
                  className={cn("capitalize", statusStyles[order.status])}
                >
                  {order.status}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
