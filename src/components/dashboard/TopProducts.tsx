import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

const products = [
  {
    name: "iPhone 15 Pro Max",
    category: "Electronics",
    sales: 1234,
    revenue: "$147,080",
    progress: 92,
  },
  {
    name: "Nike Air Max 270",
    category: "Footwear",
    sales: 987,
    revenue: "$98,700",
    progress: 78,
  },
  {
    name: "MacBook Pro 14\"",
    category: "Electronics",
    sales: 654,
    revenue: "$130,800",
    progress: 65,
  },
  {
    name: "Sony WH-1000XM5",
    category: "Audio",
    sales: 543,
    revenue: "$21,720",
    progress: 54,
  },
  {
    name: "Apple Watch Series 9",
    category: "Wearables",
    sales: 432,
    revenue: "$17,280",
    progress: 43,
  },
];

export function TopProducts() {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-success" />
          <CardTitle className="text-lg font-semibold">Best Selling Products</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Top performers this month
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {products.map((product, index) => (
            <div key={product.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{product.revenue}</p>
                  <p className="text-xs text-muted-foreground">
                    {product.sales.toLocaleString()} sold
                  </p>
                </div>
              </div>
              <Progress value={product.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
