import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2, Upload } from "lucide-react";
import { DeleteSingleFile, UploadSingleFile } from "@/services/uploadFile";
import { addProductCategory, updateProductCategory } from "@/services/productService";
import { toast } from "sonner";
import { ICategoryFormData, IProductCategory } from "@/types/product.category.type";
import { mediaUrl } from "@/utils/helper";

interface SubCategoryFormProps {
    open: boolean;
    closeForm: () => void;
    FetchProductSubCategory: () => void;
    updateData: IProductCategory | null;
}

export function SubCategoryForm({
    open,
    closeForm,
    FetchProductSubCategory,
    updateData
}: SubCategoryFormProps) {

    const [formData, setFormData] = useState<ICategoryFormData>({
        name: "",
        image: "",
        description: "",
        isActive: true,
        displayOrder: null
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    // ✅ Prefill data (Edit mode)
    useEffect(() => {
        if (updateData?._id) {
            setFormData({
                name: updateData.name || "",
                image: updateData.image || "",
                description: updateData.description || "",
                isActive: updateData.isActive ?? true,
                displayOrder: updateData.displayOrder ?? null
            });
        }
    }, [updateData]);

    // ✅ File change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // ✅ Remove image
    const handleRemoveImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setImagePreview("");
        setImageFile(null);
        setFormData((prev) => ({ ...prev, image: "" }));
    };

    // ✅ Reset form
    const resetForm = () => {
        setFormData({
            name: "",
            image: "",
            description: "",
            isActive: true,
            displayOrder: null
        });
        setImageFile(null);
        setImagePreview("");
    };

    // ✅ Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = { ...formData };

            // Upload image
            if (imageFile) {
                const mediaResponse = await UploadSingleFile({ file: imageFile });

                if (mediaResponse?.data?.key) {
                    if (updateData?._id && formData.image) {
                        await DeleteSingleFile({ fileKey: formData.image });
                    }
                    payload.image = mediaResponse.data.key;
                }
            }

            const response = updateData?._id
                ? await updateProductCategory(updateData._id, payload)
                : await addProductCategory(payload);

            if (response) {
                FetchProductSubCategory();
                resetForm();

                toast.success(
                    updateData?._id
                        ? "Subcategory updated successfully"
                        : "Subcategory added successfully"
                );

                closeForm();
            }

        } catch (error) {
            console.error("Subcategory submit error:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={closeForm}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {updateData?._id ? "Update Subcategory" : "Add Subcategory"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Subcategory Name *</Label>
                        <Input
                            id="name"
                            placeholder="Enter subcategory name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* Image */}
                    <div className="space-y-2">
                        <Label htmlFor="image">Upload Image *</Label>

                        <label
                            htmlFor="image"
                            className="relative w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden hover:border-indigo-500 transition group"
                        >
                            {(imagePreview || formData.image) ? (
                                <>
                                    <img
                                        src={imagePreview || mediaUrl(formData.image)}
                                        alt="subcategory"
                                        className="w-full h-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition">
                                        Change Image
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col items-center text-gray-500">
                                    <Upload size={28} className="mb-2" />
                                    <span className="text-sm">Click to upload</span>
                                </div>
                            )}

                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter subcategory description..."
                            rows={4}
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />
                    </div>

                    {/* Other fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="space-y-2">
                            <Label htmlFor="displayOrder">Display Order</Label>
                            <Input
                                id="displayOrder"
                                placeholder="Enter display order..."
                                value={formData.displayOrder ?? ""}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        displayOrder: Number(e.target.value)
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2 flex items-center gap-3">
                            <Switch
                                id="isActive"
                                checked={formData.isActive}
                                onCheckedChange={(checked) =>
                                    setFormData({ ...formData, isActive: checked })
                                }
                            />
                            <Label htmlFor="isActive">Active Subcategory</Label>
                        </div>

                    </div>

                    {/* Footer */}
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeForm}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {updateData?._id ? "Update" : "Add"}
                        </Button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
}