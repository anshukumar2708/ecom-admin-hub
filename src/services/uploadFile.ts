import axiosInstance from "./axiosInstance"

export const UploadSingleFile = (file) => {
    return axiosInstance.post("upload-single-file", file, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export const DeleteSingleFile = (payLoad: {fileKey: string}) => {
    return axiosInstance.post("delete-single-file", payLoad);
}