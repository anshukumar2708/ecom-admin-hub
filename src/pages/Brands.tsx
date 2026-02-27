import { useState } from "react";
import { ProductForm } from "@/components/forms/ProductForm";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Copy,
    Download,
    Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandsForm } from "@/components/forms/BrandsForm";



const brands = [
    {
        id: "1",
        brandName: "Amul",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Dairy",
        status: "active",
        isTopBrand: true,
    },
    {
        id: "2",
        brandName: "Nestle",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Food & Beverages",
        status: "active",
        isTopBrand: true,
    },
    {
        id: "3",
        brandName: "Fortune",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Cooking Oil",
        status: "active",
        isTopBrand: true,
    },
    {
        id: "4",
        brandName: "Britannia",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Bakery",
        status: "active",
        isTopBrand: true,
    },
    {
        id: "5",
        brandName: "Tata",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Essentials",
        status: "active",
        isTopBrand: true,
    },
    {
        id: "6",
        brandName: "Aashirvaad",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Grains & Atta",
        status: "active",
        isTopBrand: true,
    },
    {
        id: "7",
        brandName: "Surf Excel",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Cleaning",
        status: "active",
        isTopBrand: true,
    },
    {
        id: "8",
        brandName: "Dove",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Personal Care",
        status: "active",
        isTopBrand: false,
    },
    {
        id: "9",
        brandName: "Colgate",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Personal Care",
        status: "active",
        isTopBrand: true,
    },
    {
        id: "10",
        brandName: "Patanjali",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Food & Essentials",
        status: "active",
        isTopBrand: false,
    },
    {
        id: "11",
        brandName: "MDH",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Spices",
        status: "active",
        isTopBrand: false,
    },
    {
        id: "12",
        brandName: "Catch",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Spices",
        status: "active",
        isTopBrand: false,
    },
    {
        id: "13",
        brandName: "Saffola",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Cooking Oil",
        status: "active",
        isTopBrand: true,
    },
    {
        id: "14",
        brandName: "Horlicks",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Health Drinks",
        status: "active",
        isTopBrand: false,
    },
    {
        id: "15",
        brandName: "Maggi",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Instant Food",
        status: "active",
        isTopBrand: true,
    },
    {
        id: "16",
        brandName: "Dettol",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Personal Care",
        status: "active",
        isTopBrand: true,
    },
    {
        id: "17",
        brandName: "Lux",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Soap",
        status: "active",
        isTopBrand: false,
    },
    {
        id: "18",
        brandName: "Wheel",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Detergent",
        status: "active",
        isTopBrand: false,
    },
    {
        id: "19",
        brandName: "India Gate",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Rice",
        status: "active",
        isTopBrand: true,
    },
    {
        id: "20",
        brandName: "Mother Dairy",
        logo: "https://crystalpng.com/wp-content/uploads/2025/09/Amul-logo.png",
        category: "Dairy",
        status: "active",
        isTopBrand: true,
    },
];

const statusStyles: Record<string, string> = {
    active: "bg-success/10 text-success border-success/20",
    inactive: "bg-muted text-muted-foreground border-muted",
    true: "bg-primary/10 text-primary border-primary/20",
    false: "bg-secondary/10 text-secondary border-secondary/20",
};

const statusLabels: Record<string, string> = {
    active: "Active",
    inactive: "Inactive",
    true: "Top Brand",
    false: "Not Top Brand",
};

export default function Brands() {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const toggleSelectAll = () => {
        if (selectedBrands.length === brands?.length) {
            setSelectedBrands([]);
        } else {
            setSelectedBrands(brands.map((b) => b.id));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedBrands((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    return (
        <AdminLayout
            title="Brands"
            subtitle="Manage your product brands and categories"
        >
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 flex gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search brands..."
                            className="pl-9"
                        />
                    </div>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="footwear">Footwear</SelectItem>
                            <SelectItem value="audio">Audio</SelectItem>
                            <SelectItem value="wearables">Wearables</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="low_stock">Low Stock</SelectItem>
                            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Import
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button className="gap-2" onClick={() => setIsFormOpen(true)}>
                        <Plus className="h-4 w-4" />
                        Add Brands
                    </Button>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedBrands.length > 0 && (
                <div className="flex items-center gap-4 p-4 mb-4 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in">
                    <span className="text-sm font-medium">
                        {selectedBrands.length} selected
                    </span>
                    <div className="flex gap-2">
                        {/* <Button variant="outline" size="sm">
                            Edit Selected
                        </Button> */}
                        <Button variant="outline" size="sm" className="text-destructive">
                            Delete Selected
                        </Button>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="rounded-xl border bg-card shadow-soft overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={selectedBrands.length === brands?.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead>Brand Logo</TableHead>
                            <TableHead>Brand Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Top Brand</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {brands.map((brand) => (
                            <TableRow
                                key={brand.id}
                                className={cn(
                                    "group transition-colors",
                                    selectedBrands.includes(brand.id) && "bg-primary/5"
                                )}
                            >
                                <TableCell>
                                    <Checkbox
                                        checked={selectedBrands.includes(brand.id)}
                                        onCheckedChange={() => toggleSelect(brand.id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <img src={brand?.logo} alt={brand?.brandName} className="h-10 w-10 rounded-lg object-cover" />
                                </TableCell>
                                <TableCell>{brand.brandName}</TableCell>
                                <TableCell>{brand.category}</TableCell>


                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={cn(statusStyles[brand.status])}
                                    >
                                        {statusLabels[brand.status]}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={cn(statusStyles[String(brand.isTopBrand)])}
                                    >
                                        {statusLabels[String(brand.isTopBrand)]}
                                    </Badge>
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
                                                <Edit className="h-4 w-4" />
                                                Edit Product
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

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                    Showing 1-8 of 1,234 brands
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

            <BrandsForm open={isFormOpen} onOpenChange={setIsFormOpen} />
        </AdminLayout>
    );
}
