import { ILogin } from "@/interface/auth.type"
import axiosInstance from "./axiosInstance"

export const LoginUser = (payLoad: ILogin) => {
    return axiosInstance.post("/auth/login", payLoad)
} 