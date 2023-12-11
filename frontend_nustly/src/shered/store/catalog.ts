import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ICatalog } from '@/shered/api/catalogApi/catalogApi';
import axios from 'axios';


export const useCatalogStore = defineStore('catalog', () => {
  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);
  const catalogElems = ref<ICatalog[]>([]);

  const getCatalog = async () => {
    isLoading.value = true;
    try {
      const responce = await axios.get('https://dummyjson.com/products/category/smartphones');
      catalogElems.value = responce.data.products;
      isError.value = false;
    } catch (error) {
      isError.value = true;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };
  return { getCatalog, isLoading, isError, catalogElems };
});