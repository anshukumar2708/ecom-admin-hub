import { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { CategoryForm } from "@/components/forms/CategoryForm";
import { deleteProductCategory, getProductCategory } from "@/services/productService";
import { mediaUrl } from "@/utils/helper";
import { ICategoryFilter, ICategoryParams, IProductCategory } from "@/types/product.category.type";
import { toast } from "sonner";
import { DeleteSingleFile } from "@/services/uploadFile";
import ActionBar from "@/components/admin/ActionBar";
import BulkActions from "@/components/admin/BulkActions";
import TablePagination from "@/components/admin/TablePagination";
import DataTable from "@/components/admin/DataTable";
import DeleteModel from "@/components/admin/DeleteModel";

export default function Category() {
    const [categoryData, setCategoryData] = useState<IProductCategory[] | []>([]);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [filter, setFilter] = useState<ICategoryFilter>({
        search: "",
        page: 1,
        limit: 10,
        isActive: null
    });

    const FetchProductCategory = useCallback(async () => {
        try {

            const query: ICategoryParams = {
                ...(filter?.search && { search: filter?.search }),
                ...(filter?.page && { page: filter?.page }),
                ...(filter?.limit && { limit: filter?.limit }),
                ...(filter?.isActive !== null && { isActive: filter?.isActive }),
            };

            const response = await getProductCategory(query);

            setCategoryData(response?.data?.data)
        } catch (error) {
            console.error("get product category error:", error)
        } finally {
            setIsPageLoading(false);
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

    return (
        <AdminLayout
            title="Categories"
            subtitle="Manage your Categories catalog and inventory"
        >
            {/* Actions Bar */}
            <ActionBar
                addBtnTitle="Add Product Category"
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
                isLoading={isPageLoading}
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
                        page: prev.page - 1,
                    }))
                }
                onNext={() =>
                    setFilter((prev) => ({
                        ...prev,
                        page: prev.page + 1,
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
