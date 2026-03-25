export interface ICategoryFilter {
    search: string,
    page: number,
    limit: number,
    isActive: boolean
}
export interface ICategoryParams {
    search?: string,
    page?: number,
    limit?: number,
    isActive?: boolean
}

export interface ICategoryFormData {
    name: string,
    slug: string,
    image: string,
    description: string,
    isActive: boolean,
    displayOrder: number | null
}

export interface IProductCategory {
    _id: string;
    name: string;
    image: string;
    slug: string;
    description: string;
    isActive: boolean;
    displayOrder: number | null
    createdAt: string;
    updatedAt: string;
    __v: number;
}