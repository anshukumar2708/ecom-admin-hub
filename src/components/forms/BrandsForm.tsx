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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";

interface BrandsFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function BrandsForm({ open, onOpenChange }: BrandsFormProps) {

    const [brandData, setBrandData] = useState({
        /* Basic Info */
        brandName: "",
        slug: "",
        brandCategory: "",

        /* Media */
        logoUrl: "",
        bannerUrl: "",

        /* Status */
        isActive: true,
        isTopBrand: false,

    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Brand Submitted:", brandData);

        onOpenChange(false);
    };

    return (

        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">

                <DialogHeader>
                    <DialogTitle>Add Grocery Brand</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Brand Name + Slug */}
                    <div className="grid grid-cols-2 gap-4">

                        <div className="space-y-1">
                            <Label>Brand Name *</Label>
                            <Input
                                placeholder="e.g. Amul"
                                value={brandData.brandName}
                                onChange={(e) =>
                                    setBrandData({
                                        ...brandData,
                                        brandName: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Slug *</Label>
                            <Input
                                placeholder="amul"
                                value={brandData.slug}
                                onChange={(e) =>
                                    setBrandData({
                                        ...brandData,
                                        slug: e.target.value
                                    })
                                }
                                required
                            />
                        </div>

                    </div>

                    {/* Brand Category */}
                    <div className="space-y-1">

                        <Label>Brand Category *</Label>

                        <Select
                            value={brandData.brandCategory}
                            onValueChange={(value) =>
                                setBrandData({
                                    ...brandData,
                                    brandCategory: value
                                })
                            }
                        >

                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>

                            <SelectContent>

                                <SelectItem value="dairy">Dairy</SelectItem>
                                <SelectItem value="grains">Grains</SelectItem>
                                <SelectItem value="oil">Oil</SelectItem>
                                <SelectItem value="meat">Meat</SelectItem>
                                <SelectItem value="eggs">Eggs</SelectItem>
                                <SelectItem value="snacks">Snacks</SelectItem>
                                <SelectItem value="beverages">Beverages</SelectItem>
                                <SelectItem value="cleaning">Cleaning</SelectItem>
                                <SelectItem value="personalCare">Personal Care</SelectItem>

                            </SelectContent>

                        </Select>

                    </div>

                    {/* Media */}
                    <div className="grid grid-cols-2 gap-4">

                        <div className="space-y-1">
                            <Label>Logo URL</Label>
                            <Input
                                placeholder="Logo image URL"
                                value={brandData.logoUrl}
                                onChange={(e) =>
                                    setBrandData({
                                        ...brandData,
                                        logoUrl: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Banner URL</Label>
                            <Input
                                placeholder="Banner image URL"
                                value={brandData.bannerUrl}
                                onChange={(e) =>
                                    setBrandData({
                                        ...brandData,
                                        bannerUrl: e.target.value
                                    })
                                }
                            />
                        </div>

                    </div>

                    {/* Switch */}
                    <div className="flex gap-6">

                        <div className="flex items-center gap-2">

                            <Switch
                                checked={brandData.isActive}
                                onCheckedChange={(checked) =>
                                    setBrandData({
                                        ...brandData,
                                        isActive: checked
                                    })
                                }
                            />

                            <Label>Active</Label>

                        </div>

                        <div className="flex items-center gap-2">

                            <Switch
                                checked={brandData.isTopBrand}
                                onCheckedChange={(checked) =>
                                    setBrandData({
                                        ...brandData,
                                        isTopBrand: checked
                                    })
                                }
                            />

                            <Label>Top Brand</Label>

                        </div>

                    </div>

                    <DialogFooter>

                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button type="submit">
                            Add Brand
                        </Button>

                    </DialogFooter>

                </form>

            </DialogContent>

        </Dialog>

    );

}