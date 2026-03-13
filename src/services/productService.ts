import axiosInstance from "./axiosInstance"

export const addProductCategory = (payLoad) => {
    return axiosInstance.post("/product/category", payLoad);
}

export const getProductCategory = (query) => {
    return axiosInstance.get(`/product/category${query}`);
}

export const deleteProductCategory = (id:string) => {
    return axiosInstance.delete(`/product/category/${id}`);
}

export const updateProductCategory = (id: string, payLoad) => {
    return axiosInstance.patch(`/product/category/${id}`, payLoad);
}
