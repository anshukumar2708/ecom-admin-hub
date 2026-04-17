import { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { deleteProductSubCategory, getProductSubCategory } from "@/services/productService";
import { mediaUrl } from "@/utils/helper";
import { toast } from "sonner";
import { DeleteSingleFile } from "@/services/uploadFile";
import ActionBar from "@/components/admin/ActionBar";
import BulkActions from "@/components/admin/BulkActions";
import TablePagination from "@/components/admin/TablePagination";
import DataTable from "@/components/admin/DataTable";
import DeleteModel from "@/components/admin/DeleteModel";
import { SubCategoryForm } from "@/components/forms/SubCategoryForm";
import { ISubCategory, ISubCategoryFilter, ISubCategoryParams } from "@/types/sub.category.type";

export default function SubCategory() {
    // Renamed states
    const [subCategoryData, setSubCategoryData] = useState<ISubCategory[]>([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string[]>([]);
    const [activeSubCategory, setActiveSubCategory] = useState<ISubCategory | null>(null);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [filter, setFilter] = useState<ISubCategoryFilter>({
        search: "",
        page: 1,
        limit: 10,
        isActive: null
    });

    // Fetch API
    const fetchSubCategory = useCallback(async () => {
        try {
            const query: ISubCategoryParams = {
                ...(filter?.search && { search: filter.search }),
                ...(filter?.page && { page: filter.page }),
                ...(filter?.limit && { limit: filter.limit }),
                ...(filter?.isActive !== null && { isActive: filter.isActive }),
            };

            const response = await getProductSubCategory(query);

            setSubCategoryData(response?.data?.data || []);
        } catch (error) {
            console.error("fetch subcategory error:", error);
        } finally {
            setIsPageLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchSubCategory();
    }, [fetchSubCategory]);

    // Edit handler
    const handleEdit = (data: ISubCategory) => {
        setActiveSubCategory(data);
        setIsFormOpen(true);
    };

    // Delete API
    const handleDeleteSubCategory = async (id: string, fileKey: string) => {
        try {
            setIsLoading(true);

            const response = await deleteProductSubCategory(id);

            if (response) {
                toast.success("Subcategory deleted successfully");

                if (fileKey) {
                    await DeleteSingleFile({ fileKey });
                }

                fetchSubCategory();
                setIsDeleteModalOpen(false);
            }
        } catch (error) {
            console.error("delete subcategory error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Selection logic
    const toggleSelect = (id: string) => {
        setSelectedSubCategory((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        // implement if needed
    };

    // Table columns
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
            title: "Category",
            dataIndex: "categoryId",
            key: "categoryId",
            render: (_, record: ISubCategory) => {
                return record?.category?.name ?? "N/A";
            }
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
            render: (value: boolean) => (value ? "Active" : "Inactive"),
        },
        {
            title: "Display Order",
            dataIndex: "displayOrder",
            key: "displayOrder",
            render: (value: number) => <p>{value ?? "N/A"}</p>,
        },
    ];

    return (
        <AdminLayout
            title="Sub Categories"
            subtitle="Manage your subcategories catalog and inventory"
        >
            {/* Actions */}
            <ActionBar
                addBtnTitle="Add SubCategory"
                setFilter={setFilter}
                openForm={() => setIsFormOpen(true)}
            />

            {/* Bulk Actions */}
            {selectedSubCategory.length > 0 && (
                <BulkActions
                    selectedCount={selectedSubCategory.length}
                    onDelete={() => console.log("delete selected")}
                />
            )}

            {/* Table */}
            <DataTable
                columns={columns}
                data={subCategoryData}
                rowKey="_id"
                isLoading={isPageLoading}
                selectedRows={selectedSubCategory}
                toggleSelect={toggleSelect}
                toggleSelectAll={toggleSelectAll}
                onView={(row: ISubCategory) => console.log(row)}
                onEdit={handleEdit}
                onDelete={(row: ISubCategory) => {
                    setActiveSubCategory(row);
                    setIsDeleteModalOpen(true);
                }}
            />

            {/* Pagination */}
            <TablePagination
                page={Number(filter.page)}
                total={1234} // 👉 replace with API total
                limit={Number(filter.limit)}
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

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <DeleteModel
                    isOpen={isDeleteModalOpen}
                    onClose={() => {
                        setActiveSubCategory(null);
                        setIsDeleteModalOpen(false);
                    }}
                    title="Do you want to delete this sub category?"
                    message=""
                    isLoading={isLoading}
                    onSubmit={() =>
                        handleDeleteSubCategory(
                            activeSubCategory?._id,
                            activeSubCategory?.image
                        )
                    }
                />
            )}

            {/* Form */}
            {isFormOpen && (
                <SubCategoryForm
                    open={isFormOpen}
                    closeForm={() => setIsFormOpen(false)}
                    FetchProductSubCategory={fetchSubCategory}
                    updateData={activeSubCategory}
                />
            )}

        </AdminLayout>
    );
}