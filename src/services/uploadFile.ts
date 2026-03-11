import axiosInstance from "./axiosInstance"

export const UploadSingleFile = (file) => {
    return axiosInstance.post("upload-single-image", file, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}