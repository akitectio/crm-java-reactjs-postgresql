import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';


export const getRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axiosInstance.get<T>(url, config);
};

export const postRequest = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axiosInstance.post<T>(url, data, config);
};

export const putRequest = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axiosInstance.put<T>(url, data, config);
};

export const deleteRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axiosInstance.delete<T>(url, config);
};
