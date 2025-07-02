"use client"
import axios from "axios";
import { toast } from "sonner";
const apiBaseUrl = process.env.API_BASE_URL;
const AxiosInstance = axios.create({
  baseURL: "/api",
});

interface Options {
    showToast ?: boolean
}
export const doPost = async (endPoint: string, data : any, options: Options = {showToast: true} ) => {
    try {
        const response = await AxiosInstance.post(endPoint, data);
        console.log("doPost: ", response)
        if(response?.status == 201){
            toast.success(response?.data?.message)
        }
        return response?.data;
    } catch (error :  any) {
        toast.error(error?.response?.data?.message)
    }
}

export const doGet = async (endpoint : string, query : any = {}) => {
    try {
        const response = await AxiosInstance.get(endpoint, { params: query })
        console.log("doGet: ", response)
        return response?.data;
    } catch (error) {
        return null;
    }
}
export const doPut = async (endPoint: string, data : any, options: Options = {showToast: true} ) => {
    try {
        const response = await AxiosInstance.put(endPoint, data);
        console.log("doPut: ", response)
        toast.success(response?.data?.message)
        return response?.data;
    } catch (error :  any) {
        toast.error(error?.response?.data?.message)
    }
}

export const doDelete = async (endPoint: string, options: Options = {showToast: true} ) => {
    try {
        const response = await AxiosInstance.delete(endPoint);
        console.log("doDelete: ", response)
        toast.success(response?.data?.message)
        return response?.data;
    } catch (error :  any) {
        toast.error(error?.response?.data?.message)
    }
}