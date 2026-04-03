import axiosInstance from "./axiosInstance"

export const UploadSingleFile = (formData: FormData) => {
    return axiosInstance.post("upload-single-file", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

export const DeleteSingleFile = (payLoad: {fileKey: string}) => {
    return axiosInstance.post("delete-single-file", payLoad);
}