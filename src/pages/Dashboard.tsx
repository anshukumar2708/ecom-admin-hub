import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { LowStockAlerts } from "@/components/dashboard/LowStockAlerts";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Package,
  RefreshCcw,
} from "lucide-react";

export default function Dashboard() {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Welcome back! Here's what's happening with your store today."
    >
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6">
        <StatCard
          title="Total Revenue"
          value="$89,432"
          change={12.5}
          changeLabel="vs last month"
          icon={<DollarSign className="h-6 w-6" />}
          variant="primary"
        />
        <StatCard
          title="Orders Today"
          value="156"
          change={8.2}
          changeLabel="vs yesterday"
          icon={<ShoppingCart className="h-6 w-6" />}
          variant="success"
        />
        <StatCard
          title="Total Customers"
          value="12,847"
          change={3.1}
          changeLabel="this week"
          icon={<Users className="h-6 w-6" />}
          variant="default"
        />
        <StatCard
          title="Conversion Rate"
          value="3.24%"
          change={-0.8}
          changeLabel="vs last week"
          icon={<TrendingUp className="h-6 w-6" />}
          variant="warning"
        />
        <StatCard
          title="Products"
          value="1,234"
          change={5.7}
          changeLabel="new items"
          icon={<Package className="h-6 w-6" />}
          variant="default"
        />
        <StatCard
          title="Refund Requests"
          value="23"
          change={-15.3}
          changeLabel="vs last month"
          icon={<RefreshCcw className="h-6 w-6" />}
          variant="destructive"
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <RevenueChart />
        <TopProducts />
      </div>

      {/* Orders and Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders />
        <LowStockAlerts />
      </div>
    </AdminLayout>
  );
}
