import { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { CategoryForm } from "@/components/forms/CategoryForm";
import { deleteProductCategory, getProductCategory } from "@/services/productService";
import { mediaUrl } from "@/utils/helper";
import { IProductCategory } from "@/types/product.category.type";
import { toast } from "sonner";
import { DeleteSingleFile } from "@/services/uploadFile";
import ActionBar from "@/components/admin/ActionBar";
import BulkActions from "@/components/admin/BulkActions";
import TablePagination from "@/components/admin/TablePagination";
import DataTable from "@/components/admin/DataTable";
import DeleteModel from "@/components/admin/DeleteModel";

export interface IFilter {
    search: string,
    page: string,
    limit: string,
}

export default function Category() {
    const [categoryData, setCategoryData] = useState<IProductCategory[] | []>([]);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [filter, setFilter] = useState<IFilter>({
        search: "",
        page: "1",
        limit: "10"
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
            setPageLoading(false);
        }
    }, [filter])

    useEffect(() => {
        FetchProductCategory()
    }, [FetchProductCategory]);

    const UpdateFormOpenHandler = (data: IProductCategory) => {
        setActiveCategory(data);
        setIsFormOpen(true);
    }

    const DeleteProductCategoryApi = async (id: string, fileKey: string) => {
        try {
            setIsLoading(false);
            const response = await deleteProductCategory(id);
            if (response) {
                toast.success("Product category deleted successfully");
                await DeleteSingleFile({ fileKey });
                FetchProductCategory();
                setIsDeleteModelOpen(false);
            }
        } catch (error) {
            console.error("get product category error:", error)
        } finally {
            setIsLoading(false);
        }
    }

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


    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (value: string) => (
                <img
                    src={mediaUrl(value)}
                    className="h-10 w-10 rounded-lg object-cover"
                />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Status",
            dataIndex: "isActive",
            key: "isActive",
            render: (value: boolean) =>
                value ? "Active" : "Inactive",
        },
        {
            title: "Display Order",
            dataIndex: "displayOrder",
            key: "displayOrder",
            render: (value: number) => {
                return (
                    <p>{value ?? "N/A"}</p>
                )
            }
        }
    ];

    if (pageLoading) {
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
                <BulkActions
                    selectedCount={selectedCategory.length}
                    onDelete={() => console.log("delete selected")}
                />
            )}

            {/* Categories Table */}
            <DataTable
                columns={columns}
                data={categoryData}
                rowKey="_id"
                selectedRows={selectedCategory}
                toggleSelect={toggleSelect}
                toggleSelectAll={toggleSelectAll}

                onView={(row: IProductCategory) => console.log(row)}

                onEdit={(row: IProductCategory) => UpdateFormOpenHandler(row)}

                onDelete={(row: IProductCategory) => {
                    setActiveCategory(row);
                    setIsDeleteModelOpen(true);
                }}
            />

            {/* Pagination */}
            <TablePagination
                page={Number(filter.page)}
                total={1234}
                limit={Number(filter?.limit)}
                onPrev={() =>
                    setFilter((prev) => ({
                        ...prev,
                        page: String(Number(prev.page) - 1),
                    }))
                }
                onNext={() =>
                    setFilter((prev) => ({
                        ...prev,
                        page: String(Number(prev.page) + 1),
                    }))
                }
            />

            {isDeleteModelOpen &&
                <DeleteModel
                    isOpen={isDeleteModelOpen}
                    onClose={() => {
                        setActiveCategory(null);
                    }}
                    title="Do you want to delete this category?"
                    message=""
                    isLoading={isLoading}
                    onSubmit={() => DeleteProductCategoryApi(activeCategory?._id, activeCategory?.image)}
                />
            }

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
