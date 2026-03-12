import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const navigate = useNavigate();

  const LogoutHandler = () => {
    localStorage.removeItem("adminToken");
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search anything..."
            className="w-64 pl-9 bg-muted/50 border-0 focus-visible:bg-background focus-visible:ring-1"
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                5
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary hover:text-primary/80">
                Mark all read
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              {[
                { title: "New order #1234", desc: "2 minutes ago", unread: true },
                { title: "Low stock alert", desc: "iPhone 15 Pro - 3 units left", unread: true },
                { title: "Payment received", desc: "$1,234.00 from Order #1230", unread: false },
              ].map((notif, i) => (
                <DropdownMenuItem key={i} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                  <div className="flex w-full items-center gap-2">
                    {notif.unread && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                    <span className="font-medium">{notif.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground pl-4">{notif.desc}</span>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div
          onClick={LogoutHandler}
          className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600"
        >
          <LogOut size={22} />
        </div>
      </div>

    </header>
  );
}
