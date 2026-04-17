import { useCallback, useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { mediaUrl } from "@/utils/helper";
import { toast } from "sonner";
import { DeleteSingleFile } from "@/services/uploadFile";
import ActionBar from "@/components/admin/ActionBar";
import BulkActions from "@/components/admin/BulkActions";
import TablePagination from "@/components/admin/TablePagination";
import DataTable from "@/components/admin/DataTable";
import DeleteModel from "@/components/admin/DeleteModel";
import { ISubCategoryFilter } from "@/types/sub.category.type";
import { ColorForm } from "@/components/forms/ColorForm";
import { deleteColor, getColors } from "@/services/colorService";
import { IColor, IColorParams } from "@/types/color.type";



export default function Color() {

    // Color States
    const [colorData, setColorData] = useState<IColor[]>([]);
    const [selectedColor, setSelectedColor] = useState<string[]>([]);
    const [activeColor, setActiveColor] = useState<IColor | null>(null);

    // UI States
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


    // Fetch Colors
    const fetchColor = useCallback(async () => {
        try {
            const query: IColorParams = {
                ...(filter?.search && { search: filter.search }),
                ...(filter?.page && { page: filter.page }),
                ...(filter?.limit && { limit: filter.limit }),
                ...(filter?.isActive !== null && { isActive: filter.isActive }),
            };

            const response = await getColors(query);
            console.log("color response", response);
            setColorData(response?.data || []);
        } catch (error) {
            console.error("fetch color error:", error);
        } finally {
            setIsPageLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchColor();
    }, [fetchColor]);

    // Edit
    const handleEdit = (data: IColor) => {
        setActiveColor(data);
        setIsFormOpen(true);
    };

    // Delete
    const handleDeleteColor = async (id: string, fileKey: string) => {
        try {
            setIsLoading(true);

            const response = await deleteColor(id);

            if (response) {
                toast.success("Color deleted successfully");

                if (fileKey) {
                    await DeleteSingleFile({ fileKey });
                }

                fetchColor();
                setIsDeleteModalOpen(false);
            }
        } catch (error) {
            console.error("delete color error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Selection
    const toggleSelect = (id: string) => {
        setSelectedColor((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        // implement if needed
    };

    // Table Columns
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
                ) : "N/A",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (value: string) => value || "N/A",
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
        <AdminLayout title="Colors" subtitle="Manage your colors catalog">
            <ActionBar
                addBtnTitle="Add Color"
                searchPlaceholder="Search colors..."
                setFilter={setFilter}
                openForm={() => setIsFormOpen(true)}
            />

            {selectedColor.length > 0 && (
                <BulkActions
                    selectedCount={selectedColor.length}
                    onDelete={() => console.log("delete selected")}
                />
            )}

            <DataTable
                columns={columns}
                data={colorData}
                rowKey="_id"
                isLoading={isPageLoading}
                selectedRows={selectedColor}
                toggleSelect={toggleSelect}
                toggleSelectAll={toggleSelectAll}
                onView={(row: IColor) => console.log(row)}
                onEdit={handleEdit}
                onDelete={(row: IColor) => {
                    setActiveColor(row);
                    setIsDeleteModalOpen(true);
                }}
            />

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

            {isDeleteModalOpen && (
                <DeleteModel
                    isOpen={isDeleteModalOpen}
                    onClose={() => {
                        setActiveColor(null);
                        setIsDeleteModalOpen(false);
                    }}
                    title="Do you want to delete this color?"
                    message=""
                    isLoading={isLoading}
                    onSubmit={() =>
                        handleDeleteColor(
                            activeColor?._id,
                            activeColor?.image
                        )
                    }
                />
            )}

            {isFormOpen && (
                <ColorForm
                    open={isFormOpen}
                    closeForm={() => setIsFormOpen(false)}
                    fetchColor={fetchColor}
                    updateData={activeColor}
                />
            )}
        </AdminLayout>
    );
}