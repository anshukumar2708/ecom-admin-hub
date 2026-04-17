export interface ISubCategoryFilter {
    search: string,
    page: number,
    limit: number,
    isActive: boolean
}
export interface ISubCategoryParams {
    search?: string,
    page?: number,
    limit?: number,
    isActive?: boolean
    categoryId?: string
}

export interface ISubCategoryFormData {
    name: string,
    slug: string,
    image: string,
    categoryId: string,
    subCategoryId: string,
    description: string,
    isActive: boolean,
    displayOrder: number | null
}

export interface ISubCategory {
    _id: string;
    name: string;
    slug: string,
    category: ICategory | null;
    image: string;
    description: string;
    categoryId: string;
    subCategoryId: string;
    isActive: boolean;
    displayOrder: number | null
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ICategory {
    _id: string;
    name: string;
}