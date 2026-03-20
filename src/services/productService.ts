import { ICategoryFormData, ICategoryParams } from "@/types/product.category.type";
import axiosInstance from "./axiosInstance"

export const addProductCategory = (payLoad: ICategoryFormData) => {
    return axiosInstance.post("/product/category", payLoad);
}

export const getProductCategory = (params: ICategoryParams) => {
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
