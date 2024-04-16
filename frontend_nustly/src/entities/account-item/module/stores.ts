import { defineStore } from 'pinia';
import { ref } from 'vue';
import { apiAxios } from '@/shared/api';
import type { IUser } from './types';
import type { AxiosError } from 'axios';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

const API_URL_BUCKET = '/users';

export const useAccountStore = defineStore('account', () => {
  const errorMessage = ref<string>('')
  const user = ref<IUser>();

  const getUser = async () => {
    try {
      const response = await apiAxios.get(`${API_URL_BUCKET}`);
      user.value = response.data;
      errorMessage.value = '';
    } catch(err: any) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessage.value = error.response.data.message;
    }
  }

  return { getUser, user };
})