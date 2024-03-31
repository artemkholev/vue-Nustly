import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { IResponseLogin } from './authApi/authApi.types';
import { useAuthStore } from '@/shared/store/auth';
import { storeToRefs } from 'pinia';
import { decodeJwt } from '../jwtRequest/decodeJwt';
import { useRouter } from 'vue-router';
import { PathNames } from '../constants/route.constants';


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
  const { loginIsAuth, logoutIsAuth, deleteRole, saveRole } = authStore;
  const { userName } = storeToRefs(authStore);
  // const router = useRouter();

  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response: AxiosResponse<IResponseLogin | any> = await axios.post(`${API_URL}/refresh`, { withCredentials: true });

      console.log(response.data.accessToken);
      sessionStorage.setItem('accessToken', response.data.accessToken);
      loginIsAuth()
      const decodeToken = decodeJwt(response.data.accessToken);
      userName.value = decodeToken.email;
      saveRole(decodeToken.roles);

      return apiAxios.request(originalRequest);
    } catch (e: any) {
      // router.push({ name: PathNames.HOME });
      sessionStorage.removeItem('accessToken');
      logoutIsAuth();
      deleteRole();
      userName.value = '';
      console.log(e.message);
    }
  }
  // router.push({ name: PathNames.HOME });
  // sessionStorage.removeItem('accessToken');
  // toggleIsAuth()
  // deleteRole();
  // userName.value = '';
  throw error;
});

export { apiAxios };