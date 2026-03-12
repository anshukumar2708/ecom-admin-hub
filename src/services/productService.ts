import axiosInstance from "./axiosInstance"

export const addProductCategory = (payLoad) => {
    return axiosInstance.post("/product/category", payLoad);
}

export const getProductCategory = () => {
    return axiosInstance.get("/product/category");
}

export const deleteProductCategory = (id:string) => {
    return axiosInstance.delete(`/product/category/${id}`);
}

export const updateProductCategory = (id, payLoad) => {
    return axiosInstance.patch(`/product/category/${id}`, payLoad);
}
