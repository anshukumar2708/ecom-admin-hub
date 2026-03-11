import axiosInstance from "./axiosInstance"

export const addProductCategory = (payLoad) => {
    return axiosInstance.post("/product/add-category", payLoad);
}

export const getProductCategory = () => {
    return axiosInstance.get("/product/category");
}

export const deleteProductCategory = (id:string) => {
    return axiosInstance.delete(`/product/category/${id}`);
}