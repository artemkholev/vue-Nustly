import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ICatalog } from '@/shered/api/catalogApi/catalogApi';
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

  const getCatalog = async () => {
    isLoading.value = true;
    // try {
    //   const responce = await axios.get('https://dummyjson.com/products/category/smartphones');
    //   catalogElems.value = responce.data.products;
    //   isError.value = false;
    // } catch (error) {
    //   isError.value = true;
    //   console.error(error);
    // } finally {
    //   isLoading.value = false;
    // }
    try {
      const response = await apiAxios.get('/categories/');
      console.log(response)
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
  return { getCatalog, isLoading, isError, errorMessage, catalogElems };
});