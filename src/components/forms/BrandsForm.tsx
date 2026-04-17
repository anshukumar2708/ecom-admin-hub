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
import { toast } from "sonner";
import { generateSlug, mediaUrl } from "@/utils/helper";
import { ISubCategory } from "@/types/sub.category.type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { IProductCategory } from "@/types/product.category.type";
import { addBrands, updateBrand } from "@/services/brandsService";
import { IBrand, IBrandFormData } from "@/types/brand.type";

interface IBrandFormProps {
    open: boolean;
    closeForm: () => void;
    categoryData: IProductCategory[];
    subCategoryData: ISubCategory[];
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    FetchBrand: () => void;
    updateData: IBrand | null;
}

export function BrandForm({
    open,
    closeForm,
    categoryData,
    subCategoryData,
    setSelectedCategory,
    FetchBrand,
    updateData
}: IBrandFormProps) {

    const [formInputData, setFormInputData] = useState<IBrandFormData>({
        name: "",
        slug: "",
        image: "",
        category: "",
        subCategory: "",
        description: "",
        isActive: true,
        displayOrder: null
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    // Prefill data (Edit mode)
    useEffect(() => {
        if (updateData?._id && categoryData?.length) {
            setFormInputData({
                name: updateData?.name || "",
                slug: updateData?.slug || "",
                image: updateData?.image || "",
                category: updateData?.category?._id || "",
                subCategory: updateData?.subCategory?._id || "",
                description: updateData?.description || "",
                isActive: updateData.isActive ?? true,
                displayOrder: updateData?.displayOrder ?? null
            });
            setSelectedCategory(updateData?.category?._id || "");
        }
    }, [updateData, categoryData, setSelectedCategory]);


    // File change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Remove image
    const handleRemoveImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setImagePreview("");
        setImageFile(null);
        setFormInputData((prev) => ({ ...prev, image: "" }));
    };

    // Reset form
    const resetForm = () => {
        setFormInputData({
            name: "",
            slug: "",
            image: "",
            category: "",
            subCategory: "",
            description: "",
            isActive: true,
            displayOrder: null
        });
        setImageFile(null);
        setImagePreview("");
    };

    // Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = { ...formInputData };

            const formData = new FormData();
            formData.append("file", imageFile as Blob);
            formData.append("folder", "images/brands");

            if (imageFile) {
                const mediaResponse = await UploadSingleFile(formData);

                if (mediaResponse?.data?.key) {
                    if (updateData?._id && formInputData?.image) {
                        await DeleteSingleFile({ fileKey: formInputData?.image });
                    }
                    payload.image = mediaResponse.data.key;
                }
            }

            const response = updateData?._id
                ? await updateBrand(updateData._id, payload)
                : await addBrands(payload);

            if (response) {
                FetchBrand();
                resetForm();

                toast.success(
                    updateData?._id
                        ? "Brand updated successfully"
                        : "Brand added successfully"
                );

                closeForm();
            }

        } catch (error) {
            console.error("Brand submit error:", error);
        }
    };

    console.log("form input data:", updateData);

    return (
        <Dialog open={open} onOpenChange={closeForm}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {updateData?._id ? "Update Brand" : "Add Brand"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Brand Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Brand Name *</Label>
                            <Input
                                id="name"
                                placeholder="Enter brand name"
                                value={formInputData.name}
                                onChange={(e) => {
                                    setFormInputData({
                                        ...formInputData,
                                        name: e.target.value,
                                        slug: generateSlug(e.target.value)
                                    })
                                }}
                                required
                            />
                        </div>

                        {/* Slug */}
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug *</Label>
                            <Input
                                id="slug"
                                placeholder="Enter slug"
                                value={formInputData.slug}
                                onChange={(e) =>
                                    setFormInputData({ ...formInputData, slug: e.target.value })
                                }
                                required
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Select
                                value={formInputData?.category || ""}
                                onValueChange={(value) => {
                                    setFormInputData({ ...formInputData, category: value });
                                    setSelectedCategory(value);
                                    setFormInputData((prev) => ({ ...prev, subCategory: "" }))
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryData?.map((item, index) => (
                                        <SelectItem key={index} value={item?._id}>
                                            <div className="flex items-center">
                                                <img
                                                    src={mediaUrl(item?.image)}
                                                    className="w-7 h-auto"
                                                    alt="category-icon"
                                                />
                                                <span className="ml-2">{item?.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Sub Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category">Sub Category *</Label>
                            <Select
                                value={formInputData?.subCategory || ""}
                                onValueChange={(value) =>
                                    setFormInputData({ ...formInputData, subCategory: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select sub category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subCategoryData?.map((item, index) => (
                                        <SelectItem key={index} value={item?._id}>
                                            <div className="flex items-center">
                                                <img
                                                    src={mediaUrl(item?.image)}
                                                    className="w-7 h-auto"
                                                    alt="category-icon"
                                                />
                                                <span className="ml-2">{item?.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="space-y-2">
                        <Label htmlFor="image">Upload Brand Image *</Label>

                        <label
                            htmlFor="image"
                            className="relative w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden hover:border-indigo-500 transition group"
                        >
                            {(imagePreview || formInputData?.image) ? (
                                <>
                                    <img
                                        src={imagePreview || mediaUrl(formInputData?.image)}
                                        alt="brand"
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
                            placeholder="Enter brand description..."
                            rows={4}
                            value={formInputData.description}
                            onChange={(e) =>
                                setFormInputData({ ...formInputData, description: e.target.value })
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
                                value={formInputData.displayOrder ?? ""}
                                onChange={(e) =>
                                    setFormInputData({
                                        ...formInputData,
                                        displayOrder: Number(e.target.value)
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2 flex items-center gap-3">
                            <Switch
                                id="isActive"
                                checked={formInputData.isActive}
                                onCheckedChange={(checked) =>
                                    setFormInputData({ ...formInputData, isActive: checked })
                                }
                            />
                            <Label htmlFor="isActive">Active Brand</Label>
                        </div>

                    </div>

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