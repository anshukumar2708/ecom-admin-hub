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
    Download,
    Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryForm } from "@/components/forms/CategoryForm";
import { deleteProductCategory, getProductCategory } from "@/services/productService";
import { mediaUrl } from "@/utils/helper";
import { IProductCategory } from "@/types/product.category.type";
import { toast } from "sonner";
import { DeleteSingleFile } from "@/services/uploadFile";
import ActionBar from "@/components/admin/ActionBar";

export interface IFilter {
    search: string,
    page: string,
    limit: string,
}

export default function Category() {
    const [categoryData, setCategoryData] = useState<IProductCategory[] | []>([])
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const [filter, setFilter] = useState<IFilter>({
        search: "",
        page: "1",
        limit: ""
    });

    const FetchProductCategory = useCallback(async () => {
        try {
            const params = new URLSearchParams();

            if (filter.search) params.append("search", filter.search);
            if (filter.page) params.append("page", filter.page);
            if (filter.limit) params.append("limit", filter.limit);

            const query = params.toString() ? `?${params.toString()}` : "";

            const response = await getProductCategory(query);

            setCategoryData(response?.data?.data)
        } catch (error) {
            console.error("get product category error:", error)
        } finally {
            setIsLoading(false);
        }
    }, [filter])

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

    const DeleteProductCategoryApi = async (id: string, fileKey: string) => {
        try {
            const response = await deleteProductCategory(id);
            if (response) {
                toast.success("Product category deleted successfully");
                await DeleteSingleFile({ fileKey });
                FetchProductCategory();
            }
        } catch (error) {
            console.error("get product category error:", error)
        } finally {
            setIsLoading(false);
        }
    }

    const UpdateFormOpenHandler = (data: IProductCategory) => {
        setActiveCategory(data);
        setIsFormOpen(true);
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
            <ActionBar
                setFilter={setFilter}
                openForm={() => setIsFormOpen(true)}
            />

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
                        {categoryData?.map((category, index) => (
                            <TableRow
                                key={index}
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
                                    {category?.isActive ? "Active" : "inActive"}
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
                                                View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => UpdateFormOpenHandler(category)}
                                                className="gap-2"
                                            >
                                                <Edit className="h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            {/* <DropdownMenuItem className="gap-2">
                                                <Copy className="h-4 w-4" />
                                                Duplicate
                                            </DropdownMenuItem> */}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="gap-2 text-destructive"
                                                onClick={() => DeleteProductCategoryApi(category?._id, category?.image)}
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

            {isFormOpen &&
                < CategoryForm
                    open={isFormOpen}
                    closeForm={() => setIsFormOpen(false)}
                    FetchProductCategory={FetchProductCategory}
                    updateData={activeCategory}
                />
            }

        </AdminLayout>
    );
}
