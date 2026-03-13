import axiosInstance from "./axiosInstance"

export const UploadSingleFile = (file) => {
    return axiosInstance.post("upload-single-file", file, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export const DeleteSingleFile = (payLoad) => {
    return axiosInstance.post("delete-single-file", payLoad);
}