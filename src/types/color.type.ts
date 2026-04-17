export interface IColor {
    _id: string;
    name: string;
    slug: string;
    image: string;
    description: string;
    isActive: boolean;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
    _v: number;
}

export interface IColorFormData {
    name: string;
    slug: string;
    image: string;
    description: string;
    isActive: boolean;
    displayOrder: number | null;
}

export interface IColorParams {
    search?: string,
    page?: number,
    limit?: number,
    isActive?: boolean
    categoryId?: string
}