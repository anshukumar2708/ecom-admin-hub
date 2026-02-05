 import { useState } from "react";
 import { CouponForm } from "@/components/forms/CouponForm";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Plus,
  Tag,
  Percent,
  Gift,
  Zap,
  ImageIcon,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const coupons = [
  {
    id: "1",
    code: "WELCOME20",
    type: "percentage",
    value: 20,
    used: 234,
    limit: 500,
    minOrder: 50,
    expires: "2024-02-28",
    active: true,
  },
  {
    id: "2",
    code: "FREESHIP",
    type: "free_shipping",
    value: 0,
    used: 1234,
    limit: null,
    minOrder: 75,
    expires: "2024-03-15",
    active: true,
  },
  {
    id: "3",
    code: "SUMMER50",
    type: "fixed",
    value: 50,
    used: 89,
    limit: 100,
    minOrder: 200,
    expires: "2024-01-31",
    active: false,
  },
  {
    id: "4",
    code: "VIP10",
    type: "percentage",
    value: 10,
    used: 567,
    limit: null,
    minOrder: 0,
    expires: null,
    active: true,
  },
];

const campaigns = [
  {
    id: "1",
    name: "New Year Sale",
    type: "Flash Sale",
    startDate: "2024-01-01",
    endDate: "2024-01-07",
    revenue: 45670,
    orders: 234,
    status: "completed",
  },
  {
    id: "2",
    name: "Valentine's Special",
    type: "Seasonal",
    startDate: "2024-02-10",
    endDate: "2024-02-14",
    revenue: 0,
    orders: 0,
    status: "scheduled",
  },
  {
    id: "3",
    name: "Weekend Deal",
    type: "Flash Sale",
    startDate: "2024-01-13",
    endDate: "2024-01-14",
    revenue: 12340,
    orders: 89,
    status: "active",
  },
];

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  scheduled: "bg-info/10 text-info border-info/20",
  completed: "bg-muted text-muted-foreground border-muted",
  expired: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function Marketing() {
   const [isCouponFormOpen, setIsCouponFormOpen] = useState(false);

  return (
    <AdminLayout
      title="Marketing"
      subtitle="Manage coupons, campaigns, and promotions"
    >
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Coupons</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Tag className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Coupon Revenue</p>
                <p className="text-2xl font-bold">$34,567</p>
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
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">4.8%</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-info/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="coupons" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="coupons" className="gap-2">
              <Tag className="h-4 w-4" />
              Coupons
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="gap-2">
              <Zap className="h-4 w-4" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="banners" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Banners
            </TabsTrigger>
          </TabsList>
           <Button className="gap-2" onClick={() => setIsCouponFormOpen(true)}>
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        </div>

        {/* Coupons Tab */}
        <TabsContent value="coupons" className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search coupons..." className="pl-9" />
          </div>

          <div className="rounded-xl border bg-card shadow-soft overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead className="text-center">Usage</TableHead>
                  <TableHead>Min Order</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id} className="group">
                    <TableCell>
                      <code className="px-2 py-1 rounded bg-muted font-semibold">
                        {coupon.code}
                      </code>
                    </TableCell>
                    <TableCell className="capitalize">
                      {coupon.type === "percentage" && (
                        <Badge variant="outline" className="gap-1">
                          <Percent className="h-3 w-3" />
                          Percentage
                        </Badge>
                      )}
                      {coupon.type === "fixed" && (
                        <Badge variant="outline" className="gap-1">
                          <DollarSign className="h-3 w-3" />
                          Fixed
                        </Badge>
                      )}
                      {coupon.type === "free_shipping" && (
                        <Badge variant="outline" className="gap-1">
                          <Gift className="h-3 w-3" />
                          Free Shipping
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {coupon.type === "percentage"
                        ? `${coupon.value}%`
                        : coupon.type === "fixed"
                        ? `$${coupon.value}`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-medium">{coupon.used}</span>
                      <span className="text-muted-foreground">
                        {coupon.limit ? ` / ${coupon.limit}` : " / ∞"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {coupon.minOrder > 0 ? `$${coupon.minOrder}` : "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {coupon.expires || "Never"}
                    </TableCell>
                    <TableCell>
                      <Switch checked={coupon.active} />
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
                            <Edit className="h-4 w-4" />
                            Edit Coupon
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Copy className="h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="shadow-soft">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge
                        variant="outline"
                        className={cn("mb-2", statusStyles[campaign.status])}
                      >
                        {campaign.status}
                      </Badge>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {campaign.type}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Duration: </span>
                    <span className="font-medium">
                      {campaign.startDate} — {campaign.endDate}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-success" />
                      <div>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                        <p className="font-semibold">
                          ${campaign.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Orders</p>
                        <p className="font-semibold">{campaign.orders}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Banners Tab */}
        <TabsContent value="banners" className="space-y-4">
          <div className="flex items-center justify-center h-64 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                Banner Management
              </p>
              <p className="text-sm text-muted-foreground/70">
                Upload and manage promotional banners for your storefront
              </p>
              <Button className="mt-4 gap-2">
                <Plus className="h-4 w-4" />
                Add Banner
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

     <CouponForm open={isCouponFormOpen} onOpenChange={setIsCouponFormOpen} />
    </AdminLayout>
  );
}
