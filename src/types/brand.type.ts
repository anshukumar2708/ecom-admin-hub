export interface IBrand {
    _id: string;
    name: string;
    slug: string;
    image: string;
    category: ICategory;
    subCategory: ICategory;
    description: string;
    isActive: boolean;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
    _v: number;
}

export interface ICategory {
    _id: string;
    name: string;
    slug: string;
}

export interface IBrandFormData {
    name: string;
    slug: string;
    image: string;
    category: string;        
    subCategory: string;  
    description: string;
    isActive: boolean;
    displayOrder: number | null;
}

export interface IBrandParams {
    search?: string,
    page?: number,
    limit?: number,
    isActive?: boolean
    categoryId?: string
}