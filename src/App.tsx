import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Inventory from "./pages/Inventory";
import Payments from "./pages/Payments";
import Marketing from "./pages/Marketing";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Brands from "./pages/Brands";
import Category from "./pages/Category";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/categories" element={<Category />} />
          <Route path="/products/brands" element={<Brands />} />
          <Route path="/products/attributes" element={<Products />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users/customers" element={<Users />} />
          <Route path="/users/admins" element={<Users />} />
          <Route path="/users/roles" element={<Users />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/shipping" element={<Settings />} />
          <Route path="/marketing/coupons" element={<Marketing />} />
          <Route path="/marketing/campaigns" element={<Marketing />} />
          <Route path="/marketing/banners" element={<Marketing />} />
          <Route path="/reviews" element={<Dashboard />} />
          <Route path="/content/pages" element={<Dashboard />} />
          <Route path="/content/blog" element={<Dashboard />} />
          <Route path="/content/faqs" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Settings />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
