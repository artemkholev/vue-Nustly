import axios, { type AxiosRequestConfig } from 'axios';


export const API_URL = import.meta.env.VITE_BASE_URL;

const apiAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000
});

apiAxios.interceptors.request.use((config: AxiosRequestConfig | any) => {
  config.headers!.Authorization = `Bearer ${sessionStorage.getItem('accessToken')}`;
  return config;
});

export default apiAxios;