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
import { AppDialog } from "../admin/AppDialog";
import { useState } from "react";
import { toast } from "sonner";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const [isLogoutModelOpen, setIsLogoutModelOpen] = useState(false);
  const navigate = useNavigate();

  const LogoutHandler = () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("adminToken");
    navigate("/", { replace: true });
  };

  const handleLogoutModelClose = () => {
    setIsLogoutModelOpen(false);
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
        {/* <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search anything..."
            className="w-64 pl-9 bg-muted/50 border-0 focus-visible:bg-background focus-visible:ring-1"
          />
        </div> */}

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
          onClick={() => setIsLogoutModelOpen(true)}
          className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600"
        >
          <LogOut size={22} />
        </div>


        {/* LogOut Model */}
        <AppDialog
          open={isLogoutModelOpen}
          onClose={handleLogoutModelClose}
          maxWidth="sm"
          title=""
        >
          <div className="p-6 space-y-6">
            {/* Header / Message */}
            <div className="flex gap-4">
              {/* Warning Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"
                  />
                </svg>
              </div>

              {/* Text Content */}
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  Logout Confirmation
                </h2>
                <p className="text-sm text-gray-600">
                  Are you sure you want to logout?
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="grid grid-cols-2 gap-3 border-t pt-4">
              <button
                onClick={handleLogoutModelClose}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={LogoutHandler}
                className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                Logout
              </button>
            </div>
          </div>
        </AppDialog>
      </div>

    </header >
  );
}
