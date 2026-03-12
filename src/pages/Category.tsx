import { useCallback, useEffect, useState } from "react";
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
import { CategoryForm } from "@/components/forms/CategoryForm";
import { deleteProductCategory, getProductCategory } from "@/services/productService";
import { mediaUrl } from "@/utils/helper";

// const categories = [
//     {
//         id: "1",
//         name: "Dairy",
//         slug: "dairy",
//         description: "Milk, butter, cheese, curd and dairy products",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "2",
//         name: "Grains",
//         slug: "grains",
//         description: "Rice, wheat, oats and grain products",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "3",
//         name: "Pulses",
//         slug: "pulses",
//         description: "Dal, lentils and protein-rich pulses",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "4",
//         name: "Oil",
//         slug: "oil",
//         description: "Cooking oil, olive oil and edible oils",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "5",
//         name: "Spices",
//         slug: "spices",
//         description: "Masala, spices and seasoning products",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "6",
//         name: "Vegetables",
//         slug: "vegetables",
//         description: "Fresh vegetables and greens",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "7",
//         name: "Fruits",
//         slug: "fruits",
//         description: "Fresh fruits and seasonal fruits",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "8",
//         name: "Meat",
//         slug: "meat",
//         description: "Chicken, mutton and fresh meat",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "9",
//         name: "Eggs",
//         slug: "eggs",
//         description: "Farm fresh eggs and egg products",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "10",
//         name: "Snacks",
//         slug: "snacks",
//         description: "Biscuits, chips and snack items",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "11",
//         name: "Beverages",
//         slug: "beverages",
//         description: "Juices, soft drinks and beverages",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "12",
//         name: "Cleaning",
//         slug: "cleaning",
//         description: "Detergent, floor cleaner and cleaning supplies",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "13",
//         name: "Personal Care",
//         slug: "personal-care",
//         description: "Soap, shampoo and personal hygiene products",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "14",
//         name: "Household",
//         slug: "household",
//         description: "Daily household essentials and supplies",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "15",
//         name: "Bakery",
//         slug: "bakery",
//         description: "Bread, cakes and bakery items",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
//     {
//         id: "16",
//         name: "Frozen Food",
//         slug: "frozen-food",
//         icon: "🧊",
//         description: "Frozen vegetables, snacks and frozen items",
//         status: "active",
//         image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg?quality=90&webp=true&resize=440,400",
//     },
// ];

const statusStyles: Record<string, string> = {
    active: "bg-success/10 text-success border-success/20",
    inactive: "bg-muted text-muted-foreground border-muted",
    low_stock: "bg-warning/10 text-warning border-warning/20",
    out_of_stock: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels: Record<string, string> = {
    active: "Active",
    inactive: "Inactive",
    low_stock: "Low Stock",
    out_of_stock: "Out of Stock",
};

export default function Category() {
    const [categoryData, setCategoryData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const FetchProductCategory = useCallback(async () => {
        try {
            const response = await getProductCategory();
            setCategoryData(response?.data?.data)
            console.log("response", response);
        } catch (error) {
            console.error("get product category error:", error)
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        FetchProductCategory()
    }, [FetchProductCategory]);

    const toggleSelectAll = () => {
        // if (selectedCategory.length === categories.length) {
        //     setSelectedCategory([]);
        // } else {
        //     setSelectedCategory(categories.map((c) => c.id));
        // }
    };

    const toggleSelect = (id: string) => {
        setSelectedCategory((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const deleteProductCategoryApi = async (id: string) => {
        try {
            const response = await deleteProductCategory(id);
            if (response) {
                FetchProductCategory();
            }
        } catch (error) {
            console.error("get product category error:", error)
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <div className="w-full flex justify-center items-center h-[100vh]"><p>Loading...</p></div>
    }

    return (
        <AdminLayout
            title="Categories"
            subtitle="Manage your Categories catalog and inventory"
        >
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 flex gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search categories..."
                            className="pl-9"
                        />
                    </div>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
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
                        Add Product Category
                    </Button>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedCategory.length > 0 && (
                <div className="flex items-center gap-4 p-4 mb-4 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in">
                    <span className="text-sm font-medium">
                        {selectedCategory.length} selected
                    </span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-destructive">
                            Delete Selected
                        </Button>
                    </div>
                </div>
            )}

            {/* Categories Table */}
            <div className="rounded-xl border bg-card shadow-soft overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-12">
                                <Checkbox
                                    // checked={selectedCategory.length === categories.length}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categoryData?.map((category) => (
                            <TableRow
                                key={category.id}
                                className={cn(
                                    "group transition-colors",
                                    selectedCategory.includes(category?.id) && "bg-primary/5"
                                )}
                            >
                                <TableCell>
                                    <Checkbox
                                        checked={selectedCategory.includes(category?.id)}
                                        onCheckedChange={() => toggleSelect(category?.id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <img
                                        src={mediaUrl(category?.image)}
                                        alt="category-image"
                                        className="h-10 w-10 rounded-lg object-cover"
                                    />
                                </TableCell>

                                <TableCell>
                                    {category?.name}
                                </TableCell>


                                <TableCell>
                                    {category?.description}
                                </TableCell>

                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={cn(statusStyles[category?.status])}
                                    >
                                        {statusLabels[category?.status]}
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
                                            {/* <DropdownMenuItem className="gap-2">
                                                <Copy className="h-4 w-4" />
                                                Duplicate
                                            </DropdownMenuItem> */}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="gap-2 text-destructive"
                                                onClick={() => deleteProductCategoryApi(category?._id)}
                                            >
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
                    Showing 1-8 of 1,234 categories
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

            <CategoryForm open={isFormOpen} onOpenChange={setIsFormOpen} FetchProductCategory={FetchProductCategory} />
        </AdminLayout>
    );
}
