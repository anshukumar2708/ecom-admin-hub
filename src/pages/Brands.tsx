import { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { getProductCategory, getProductSubCategory } from "@/services/productService";
import { mediaUrl } from "@/utils/helper";
import { toast } from "sonner";
import { DeleteSingleFile } from "@/services/uploadFile";
import ActionBar from "@/components/admin/ActionBar";
import BulkActions from "@/components/admin/BulkActions";
import TablePagination from "@/components/admin/TablePagination";
import DataTable from "@/components/admin/DataTable";
import DeleteModel from "@/components/admin/DeleteModel";
import { ISubCategoryFilter } from "@/types/sub.category.type";
import { BrandForm } from "@/components/forms/BrandsForm";
import { deleteBrand, getBrands } from "@/services/brandsService";
import { IBrand, IBrandParams } from "@/types/brand.type";

export default function Brand() {
    // Renamed states
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [subCategoryData, setSubCategoryData] = useState([]);

    const [brandData, setBrandData] = useState<IBrand[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
    const [activeBrand, setActiveBrand] = useState<IBrand | null>(null);

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

    // Fetch categories for select options
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getProductCategory();
                setCategoryData(response?.data?.data);
            } catch (error) {
                console.error("get product category error:", error);
            }
        };

        fetchCategories();
    }, []);

    // Fetch subcategories for select options
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const response = await getProductSubCategory({ categoryId: selectedCategory });
                setSubCategoryData(response?.data?.data);
            } catch (error) {
                console.error("get product subcategory error:", error);
            }
        };

        if (selectedCategory) {
            fetchSubCategories();
        }
    }, [selectedCategory]);

    // Fetch API
    const fetchBrand = useCallback(async () => {
        try {
            const query: IBrandParams = {
                ...(filter?.search && { search: filter.search }),
                ...(filter?.page && { page: filter.page }),
                ...(filter?.limit && { limit: filter.limit }),
                ...(filter?.isActive !== null && { isActive: filter.isActive }),
            };

            const response = await getBrands(query);

            setBrandData(response?.data || []);
        } catch (error) {
            console.error("fetch brand error:", error);
        } finally {
            setIsPageLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchBrand();
    }, [fetchBrand]);

    // Edit handler
    const handleEdit = (data: IBrand) => {
        setActiveBrand(data);
        setIsFormOpen(true);
    };

    // Delete API
    const handleDeleteBrand = async (id: string, fileKey: string) => {
        try {
            setIsLoading(true);

            const response = await deleteBrand(id);

            if (response) {
                toast.success("Brand deleted successfully");

                if (fileKey) {
                    await DeleteSingleFile({ fileKey });
                }

                fetchBrand();
                setIsDeleteModalOpen(false);
            }
        } catch (error) {
            console.error("delete brand error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Selection logic
    const toggleSelect = (id: string) => {
        setSelectedBrand((prev) =>
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
            render: (value: string) =>
                value ? (
                    <img
                        src={mediaUrl(value)}
                        className="h-10 w-10 rounded-lg object-cover"
                    />
                ) : (
                    "N/A"
                ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value: string) => value || "N/A",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (category: IBrand) => category?.name || "N/A",
        },
        {
            title: "Sub Category",
            dataIndex: "subCategory",
            key: "subCategory",
            render: (subCategory: IBrand) => subCategory?.name || "N/A",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (value: string) => value || "N/A",
        },
        {
            title: "Status",
            dataIndex: "isActive",
            key: "isActive",
            render: (value?: boolean) =>
                value === true ? "Active" : value === false ? "Inactive" : "N/A",
        },
        {
            title: "Display Order",
            dataIndex: "displayOrder",
            key: "displayOrder",
            render: (value?: number) =>
                value !== undefined && value !== null ? value : "N/A",
        },
    ];

    return (
        <AdminLayout
            title="Brands"
            subtitle="Manage your brands catalog and inventory"
        >
            {/* Actions */}
            <ActionBar
                addBtnTitle="Add Brand"
                setFilter={setFilter}
                openForm={() => setIsFormOpen(true)}
            />

            {/* Bulk Actions */}
            {selectedBrand.length > 0 && (
                <BulkActions
                    selectedCount={selectedBrand.length}
                    onDelete={() => console.log("delete selected")}
                />
            )}

            {/* Table */}
            <DataTable
                columns={columns}
                data={brandData}
                rowKey="_id"
                isLoading={isPageLoading}
                selectedRows={selectedBrand}
                toggleSelect={toggleSelect}
                toggleSelectAll={toggleSelectAll}
                onView={(row: IBrand) => console.log(row)}
                onEdit={handleEdit}
                onDelete={(row: IBrand) => {
                    setActiveBrand(row);
                    setIsDeleteModalOpen(true);
                }}
            />

            {/* Pagination */}
            <TablePagination
                page={Number(filter.page)}
                total={1234}
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
                        setActiveBrand(null);
                        setIsDeleteModalOpen(false);
                    }}
                    title="Do you want to delete this brand?"
                    message=""
                    isLoading={isLoading}
                    onSubmit={() =>
                        handleDeleteBrand(
                            activeBrand?._id,
                            activeBrand?.image
                        )
                    }
                />
            )}

            {/* Form */}
            {isFormOpen && (
                <BrandForm
                    open={isFormOpen}
                    closeForm={() => setIsFormOpen(false)}
                    categoryData={categoryData}
                    subCategoryData={subCategoryData}
                    setSelectedCategory={setSelectedCategory}
                    FetchBrand={fetchBrand}
                    updateData={activeBrand}
                />
            )}

        </AdminLayout>
    );
}