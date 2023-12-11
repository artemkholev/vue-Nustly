import { ref } from 'vue';
import { defineStore } from 'pinia';
import { apiAxios } from '../api';
import type { ILogin } from '@/shered/api/authApi/authApi.types';
import { useRouter } from 'vue-router';
import { PathNames } from '@/shered/constants/route.constants';

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref(false);
  const isError = ref<boolean>(false);
  const router = useRouter();

  const login = async (data: ILogin) => {
    try {
      const response = await apiAxios.post<ILogin>('/posts', { data });
      if (response) isAuth.value = true;
      router.push({ name: PathNames.HOME });
      isError.value = false;
    } catch (error) {
      isError.value = true;
      console.error(error);
    }
  };

  const registration = async (data: ILogin) => {
    try {
      const response = await apiAxios.post<ILogin>('/posts', { data });
      if (response) isAuth.value = true;
      router.push({ name: PathNames.HOME });
      isError.value = false;
    } catch (error) {
      isError.value = true;
      console.error(error);
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

  return { isAuth, isError, login, registration, logout };
});