import { ref } from 'vue';
import { defineStore } from 'pinia';
import { apiAxios } from '../api';
import type { ILogin } from '@/shered/api/authApi/authApi.types';
import { useRouter } from 'vue-router';
import { PathNames } from '@/shered/constants/route.constants';
import type { AxiosError } from 'axios';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false);
  const isError = ref<boolean>(false);
  const errorMessage = ref<string>('');
  const router = useRouter();

  const login = async (data: ILogin) => {
    try {
      const response = await apiAxios.post<ILogin>('/auth/login', data); 
      isError.value = false;
      errorMessage.value = '';

      if (response) isAuth.value = true;
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
      const response = await apiAxios.post<ILogin>('/auth/registration', data);
      isError.value = false;
      errorMessage.value = '';

      if (response) isAuth.value = true;
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
      const response = await apiAxios.post('/logout');
      if (response) isAuth.value = false;
      await router.push({ name: PathNames.HOME });
      isError.value = false;
    } catch (error) {
      isError.value = true;
      console.error(error);
    }
  };

  return { isAuth, isError, errorMessage, login, registration, logout };
});