
import axiosInstance from "./axiosInstance";
import { IBrandFormData, IBrandParams } from "@/types/brand.type";

// Product sub categories
export const addBrands = (payLoad: IBrandFormData) => {
    return axiosInstance.post("/brand/add", payLoad);
}

export const getBrands = (params?: IBrandParams) => {
    return axiosInstance.get("/brand/list", {
        params: params
    });
}

export const updateBrand = (id: string, payLoad: IBrandFormData) => {
    return axiosInstance.patch(`/brand/update/${id}`, payLoad);
}

export const deleteBrand = (id: string) => {
    return axiosInstance.delete(`/brand/delete/${id}`);
}
