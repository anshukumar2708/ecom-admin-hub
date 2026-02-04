import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  { product: "iPhone 15 Pro", sku: "APL-IP15P-128", stock: 3, threshold: 10 },
  { product: "Nike Air Max 270", sku: "NKE-AM270-42", stock: 5, threshold: 15 },
  { product: "Samsung Galaxy S24", sku: "SAM-GS24-256", stock: 2, threshold: 8 },
  { product: "Sony WH-1000XM5", sku: "SNY-WH1K-BLK", stock: 4, threshold: 10 },
];

export function LowStockAlerts() {
  return (
    <Card className="shadow-soft border-warning/30">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <CardTitle className="text-lg font-semibold">Low Stock Alerts</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Products that need restocking
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.sku}
              className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <Package className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{alert.product}</p>
                  <p className="text-xs text-muted-foreground">{alert.sku}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p
                    className={cn(
                      "font-bold",
                      alert.stock <= 3 ? "text-destructive" : "text-warning"
                    )}
                  >
                    {alert.stock} left
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Min: {alert.threshold}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <ExternalLink className="h-3 w-3" />
                  Restock
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
