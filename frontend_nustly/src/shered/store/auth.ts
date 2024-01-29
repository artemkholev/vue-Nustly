import { ref } from 'vue';
import { defineStore } from 'pinia';
import apiAxios from '../api';
import type { ILogin, IResponseLogin } from '@/shered/api/authApi/authApi.types';
import { useRouter } from 'vue-router';
import { PathNames } from '@/shered/constants/route.constants';
import type { AxiosError, AxiosResponse } from 'axios';
import { getBooleanValueFromLs, setBooleanValueFromLs } from '../utils/ls.utils';
import { LocalStorageConstants } from '../constants/ls.constants';
import { decodeJwt } from '../jwtRequest/decodeJwt';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

export const useAuthStore = defineStore('auth', () => {
  const userName = ref<string>('')
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
        toggleIsAuth()
      };
  
      userName.value = decodeJwt(response.data.accessToken)?.email;
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
        toggleIsAuth();
      };

      userName.value = decodeJwt(response.data.accessToken).email;
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
        toggleIsAuth();
      };
      userName.value = '';
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

  const toggleIsAuth = () => {
    isAuth.value = !isAuth.value;
    setBooleanValueFromLs(LocalStorageConstants.ISAUTH, isAuth.value);
  };

  return { isAuth, isError, errorMessage, userName, login, registration, logout, toggleIsAuth };
});