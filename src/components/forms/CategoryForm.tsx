import { useState } from "react";
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
import { UploadSingleFile } from "@/services/uploadFile";
import { addProductCategory } from "@/services/productService";
import { toast } from "sonner";

interface ProductFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    FetchProductCategory: () => void;
}

interface IFormData {
    name: string,
    image: string,
    description: string,
    isActive: boolean,
}

export function CategoryForm({ open, onOpenChange, FetchProductCategory }: ProductFormProps) {
    const [formData, setFormData] = useState<IFormData>({
        name: "",
        image: "",
        description: "",
        isActive: true,
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    }

    const removeImageHandler = (e) => {
        e.preventDefault();
        setImagePreview(null);
        setImageFile(null);
        setFormData((prev) => ({
            ...prev,
            image: ""
        }))
    }

    const clearForm = () => {
        setFormData(() => ({
            name: "",
            image: "",
            description: "",
            isActive: true,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payLoad = { ...formData };

            if (imageFile) {
                const mediaResponse = await UploadSingleFile({ file: imageFile });

                if (mediaResponse?.data?.data?.key) {
                    payLoad.image = mediaResponse.data.data.key;
                }
            }

            const response = await addProductCategory(payLoad);

            if (response) {
                FetchProductCategory();
                clearForm();
                toast.success("Product category added successfully");
                onOpenChange(false);
            }

        } catch (error) {
            console.log("Category post error", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <Label htmlFor="name">Category Name *</Label>
                        <Input
                            id="name"
                            placeholder="Enter category name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">

                        <Label htmlFor="image">Upload Image *</Label>

                        <label
                            htmlFor="image"
                            className="relative w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden hover:border-indigo-500 transition group"
                        >

                            {/* Preview */}
                            {(imagePreview || formData?.image) ? (
                                <>
                                    <img
                                        src={imagePreview || formData?.image}
                                        alt="category-image"
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Change Image Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition">
                                        Change Image
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        type="button"
                                        onClick={removeImageHandler}
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


                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter Category description..."
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Switch
                            id="isActive"
                            checked={formData.isActive}
                            onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                        />
                        <Label htmlFor="isActive">Active Category</Label>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Category</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}