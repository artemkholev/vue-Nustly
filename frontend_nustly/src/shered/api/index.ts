import axios, { type AxiosRequestConfig } from 'axios';
import type { IResponseLogin } from './authApi/authApi.types';
import { useAuthStore } from '../store/auth';
import { storeToRefs } from 'pinia';
import { decodeJwt } from '../jwtRequest/decodeJwt';


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

apiAxios.interceptors.response.use((config) => config, async (error) => {
  const originalRequest = error.config;
  const authStore = useAuthStore();
  const { toggleIsAuth } = authStore;
  const { userName, role } = storeToRefs(authStore);

  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<IResponseLogin>(`${API_URL}/refresh`, { withCredentials: true });

      sessionStorage.setItem('accessToken', response.data.accessToken);
      toggleIsAuth()
      const decodeToken = decodeJwt(response.data.accessToken);
      userName.value = decodeToken.email;
      role.value = decodeToken.role;

      return apiAxios.request(originalRequest);
    } catch (e: any) {
      sessionStorage.removeItem('accessToken');
      toggleIsAuth()
      userName.value = '';
      role.value = '';
      console.log(e.message);
    }
  }
  sessionStorage.removeItem('accessToken');
  toggleIsAuth()
  userName.value = '';
  role.value = '';
  throw error;
});

export default apiAxios;