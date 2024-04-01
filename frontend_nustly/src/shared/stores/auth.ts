import { ref } from 'vue';
import { defineStore } from 'pinia';
import { apiAxios } from '@/shared/api';
import type { ILogin, IResponseLogin } from '@/shared/api/authApi/authApi.types';
import { useRouter } from 'vue-router';
import { PathNames } from '@/shared/constants/route.constants';
import type { AxiosError, AxiosResponse } from 'axios';
import { getBooleanValueFromLs, getStringValueFromLs, setBooleanValueFromLs, setStringValueFromLs } from '../lib/utils/ls.utils';
import { LocalStorageConstants } from '../constants/ls.constants';
import { decodeJwt } from '../jwtRequest/decodeJwt';
import { useAppRoutes } from '@/app/providers';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

export const useAuthStore = defineStore('auth', () => {
  const userName = ref<string>('');
  const role = ref<string>(getStringValueFromLs(LocalStorageConstants.ROLE) || 'USER');
  const isAuth = ref(getBooleanValueFromLs(LocalStorageConstants.ISAUTH) || false);
  const isError = ref<boolean>(false);
  const errorMessage = ref<string>('');
  const router = useRouter();

  //methods
  const login = async (data: ILogin) => {
    try {
      const response: AxiosResponse<IResponseLogin | any> = await apiAxios.post<ILogin>('/auth/login', data); 
      isError.value = false;
      errorMessage.value = '';

      if (response) {
        sessionStorage.setItem('accessToken', response.data.accessToken);
        loginIsAuth()
      };
  
      const decodeToken = decodeJwt(response.data.accessToken);
      userName.value = decodeToken.email;
      saveRole(decodeToken.roles);
      router.push({ name: PathNames.HOME });
    } catch (err: any) {
      isError.value = true;
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessage.value = error.response.data.message;
    }
  };

  const registration = async (data: ILogin) => {
    try {
      const response: AxiosResponse<IResponseLogin | any> = await apiAxios.post<ILogin>('/auth/registration', data);
      isError.value = false;
      errorMessage.value = '';

      if (response) {
        sessionStorage.setItem('accessToken', response.data.accessToken);
        loginIsAuth();
      };

      const decodeToken = decodeJwt(response.data.accessToken);
      userName.value = decodeToken.email;
      saveRole(decodeToken.roles);
      router.push({ name: PathNames.HOME });
    } catch (err: any) {
      isError.value = true
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessage.value = error.response.data.message;
    }
  };

  const logout = async () => {
    try {
      const response = await apiAxios.post('/auth/logout');
      console.log(response)
      isError.value = false;
      errorMessage.value = '';

      if (response) {
        sessionStorage.removeItem('accessToken');
        userName.value = '';
        deleteRole();
        logoutIsAuth();
        router.push({ name: PathNames.HOME });
      };
    } catch (err: any) {
      isError.value = true
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessage.value = error.response.data.message;
    }
  };

  const refresh = async () => {
    try {
      const response: AxiosResponse<IResponseLogin | any> = await apiAxios.post('/auth/refresh', { withCredentials: true }); 
      isError.value = false;
      errorMessage.value = '';

      if (response) {
        sessionStorage.setItem('accessToken', response.data.accessToken);
        loginIsAuth()
      };
  
      const decodeToken = decodeJwt(response.data.accessToken);
      userName.value = decodeToken.email;
      saveRole(decodeToken.roles);
      router.push({ name: PathNames.HOME });
    } catch (err: any) {
      isError.value = true;
      router.push({ name: PathNames.HOME });
      sessionStorage.removeItem('accessToken');
      logoutIsAuth();
      deleteRole();
      userName.value = '';

      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessage.value = error.response.data.message;
    }
  }

  const logoutIsAuth = () => {
    if (isAuth.value == false)
      return
    isAuth.value = !isAuth.value;
    setBooleanValueFromLs(LocalStorageConstants.ISAUTH, isAuth.value);
  };
  const loginIsAuth = () => {
    if (isAuth.value == true)
      return
    isAuth.value = !isAuth.value;
    setBooleanValueFromLs(LocalStorageConstants.ISAUTH, isAuth.value);
  };

  const saveRole = (value: string) => {
    role.value = value;
    setStringValueFromLs(LocalStorageConstants.ROLE, role.value);
  };
  const deleteRole = () => {
    role.value = '';
    setStringValueFromLs(LocalStorageConstants.ROLE, role.value);
  };

  return { isAuth, isError, errorMessage, userName, role, login, registration, logout, loginIsAuth, logoutIsAuth, saveRole, deleteRole, refresh };
});