import { ICategoryFormData, ICategoryParams } from "@/types/product.category.type";
import axiosInstance from "./axiosInstance"

// Product Categories
export const addProductCategory = (payLoad: ICategoryFormData) => {
    return axiosInstance.post("/product/category", payLoad);
}

export const getProductCategory = (params?: ICategoryParams) => {
    return axiosInstance.get("/product/category", {
        params: params
    });
}

export const deleteProductCategory = (id:string) => {
    return axiosInstance.delete(`/product/category/${id}`);
}

export const updateProductCategory = (id: string, payLoad: ICategoryFormData) => {
    return axiosInstance.patch(`/product/category/${id}`, payLoad);
}

// Product sub categories
export const addSubCategory = (payLoad) => {
    return axiosInstance.post("/product/sub-category", payLoad);
}

export const getProductSubCategory = (params) => {
    return axiosInstance.get("/product/sub-category", {
        params: params
    });
}

export const deleteProductSubCategory = (id:string) => {
    return axiosInstance.delete(`/product/sub-category/${id}`);
}

export const updateProductSubCategory = (id: string, payLoad: ICategoryFormData) => {
    return axiosInstance.patch(`/product/sub-category/${id}`, payLoad);
}


