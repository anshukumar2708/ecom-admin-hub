import { IColorFormData, IColorParams } from "@/types/color.type";
import axiosInstance from "./axiosInstance";

// Product Colors
export const addColors = (payLoad: IColorFormData) => {
    return axiosInstance.post("/color/add", payLoad);
}

export const getColors = (params?: IColorParams) => {
    return axiosInstance.get("/color/list", {
        params: params
    });
}

export const updateColor = (id: string, payLoad: IColorFormData) => {
    return axiosInstance.patch(`/color/update/${id}`, payLoad);
}

export const deleteColor = (id: string) => {
    return axiosInstance.delete(`/color/delete/${id}`);
}
