import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ICatalog, ICreateCatalog } from '@/shared/api/catalogApi/catalogApi';
import { AxiosError } from 'axios';
import { apiAxios } from '@/shared/api';

//api request
const API_URL_CATEGORIES = '/categories';

//error validation
interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

export const useCatalogStore = defineStore('catalog', () => {
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string>('');
  const catalogElems = ref<ICatalog[]>([]);

  //methods
  const getCatalog = async () => {
    isLoading.value = true;
    try {
      const response = await apiAxios.get(API_URL_CATEGORIES);
      catalogElems.value = response.data;
      errorMessage.value = '';
    } catch (err: any) {
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
      const response = await apiAxios.post(API_URL_CATEGORIES, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      }); 
      errorMessage.value = '';
    } catch (err: any) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessage.value = error.response.data.message;
    }
  };

  const postDeleteCatalog = async (data: string) => {
    try {
      await apiAxios.post(`${API_URL_CATEGORIES}/delete`, {id: data});
      errorMessage.value = '';
      return true;
    } catch (err: any) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessage.value = error.response.data.message;
    }
  };

  const postVisibilityCategory = async (data: string) => {
    try {
      await apiAxios.post(`${API_URL_CATEGORIES}/visibility`, { id: data });
      errorMessage.value = '';
      return true;
    } catch(err: any) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessage.value = error.response.data.message;
    }
  }

  return { getCatalog, createCatalog, postDeleteCatalog, postVisibilityCategory, isLoading, errorMessage, catalogElems };
});