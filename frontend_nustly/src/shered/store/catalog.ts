import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ICatalog, ICreateCatalog } from '@/shered/api/catalogApi/catalogApi';
import { AxiosError } from 'axios';
import apiAxios from '../api';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

export const useCatalogStore = defineStore('catalog', () => {
  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);
  const errorMessage = ref<string>('');
  const catalogElems = ref<ICatalog[]>([]);

  //methods
  const getCatalog = async () => {
    isLoading.value = true;
    try {
      const response = await apiAxios.get('/categories');
      catalogElems.value = response.data;
      isError.value = false;
      errorMessage.value = '';
    } catch (err: any) {
      isError.value = true
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessage.value = error.response.data.message;
    } finally {
      isLoading.value = false;
    }
  };

  const createCatalog = async (data: ICreateCatalog, file: any) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('data', JSON.stringify(data));
      const response = await apiAxios.post('/categories', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      }); 
      console.log(response.data);
      isError.value = false;
      errorMessage.value = '';
    } catch (err: any) {
      isError.value = true;
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessage.value = error.response.data.message;
    }
  };

  return { getCatalog, createCatalog, isLoading, isError, errorMessage, catalogElems };
});