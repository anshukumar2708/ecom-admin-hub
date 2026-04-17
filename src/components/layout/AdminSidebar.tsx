import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  // Truck,
  // Megaphone,
  // Star,
  // FileText,
  // BarChart3,
  // Bell,
  // Warehouse,
  // Settings,
  ChevronDown,
  ChevronRight,
  Store,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: "default" | "destructive" | "success" | "warning";
  children?: { title: string; href: string }[];
}

const navigation: NavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    title: "Products",
    icon: Package,
    children: [
      { title: "All Products", href: "/products" },
      { title: "Categories", href: "/products/categories" },
      { title: "Sub Categories", href: "/products/sub-categories" },
      { title: "Brands", href: "/products/brands" },
      // { title: "Attributes", href: "/products/attributes" },
    ],
  },
  // {
  //   title: "Inventory",
  //   href: "/inventory",
  //   icon: Warehouse,
  //   badge: "3",
  //   badgeVariant: "warning",
  // },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
    badge: "12",
    badgeVariant: "default",
  },
  {
    title: "Users",
    icon: Users,
    children: [
      { title: "Customers", href: "/users/customers" },
      { title: "Admins", href: "/users/admins" },
      { title: "Roles & Permissions", href: "/users/roles" },
    ],
  },
  { title: "Payments", href: "/payments", icon: CreditCard },
  // { title: "Shipping", href: "/shipping", icon: Truck },
  // {
  //   title: "Marketing",
  //   icon: Megaphone,
  //   children: [
  //     { title: "Coupons", href: "/marketing/coupons" },
  //     { title: "Campaigns", href: "/marketing/campaigns" },
  //     { title: "Banners", href: "/marketing/banners" },
  //   ],
  // },
  // { title: "Reviews", href: "/reviews", icon: Star },
  // {
  //   title: "Content",
  //   icon: FileText,
  //   children: [
  //     { title: "Pages", href: "/content/pages" },
  //     { title: "Blog", href: "/content/blog" },
  //     { title: "FAQs", href: "/content/faqs" },
  //   ],
  // },
  // { title: "Reports", href: "/reports", icon: BarChart3 },
  // { title: "Notifications", href: "/notifications", icon: Bell },
  // { title: "Settings", href: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>(["Products"]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (item: NavItem) =>
    item.children?.some((child) => location.pathname === child.href);

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Store className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">
              ShopAdmin
            </h1>
            <p className="text-xs text-sidebar-muted">E-commerce Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.title}>
                {item.children ? (
                  <Collapsible
                    open={openMenus.includes(item.title)}
                    onOpenChange={() => toggleMenu(item.title)}
                  >
                    <CollapsibleTrigger
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isParentActive(item)
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        {item.title}
                      </span>
                      {openMenus.includes(item.title) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="animate-slide-in-up">
                      <ul className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              className={cn(
                                "flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-200",
                                isActive(child.href)
                                  ? "bg-primary text-primary-foreground font-medium"
                                  : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                              )}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    to={item.href!}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive(item.href!)
                        ? "bg-primary text-primary-foreground"
                        : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </span>
                    {item.badge && (
                      <span
                        className={cn(
                          "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                          item.badgeVariant === "destructive" &&
                          "bg-destructive text-destructive-foreground",
                          item.badgeVariant === "success" &&
                          "bg-success text-success-foreground",
                          item.badgeVariant === "warning" &&
                          "bg-warning text-warning-foreground",
                          item.badgeVariant === "default" &&
                          "bg-primary text-primary-foreground"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                John Doe
              </p>
              <p className="text-xs text-sidebar-muted truncate">Super Admin</p>
            </div>
            <button className="rounded-lg p-2 text-sidebar-muted hover:bg-sidebar-border hover:text-sidebar-foreground transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
