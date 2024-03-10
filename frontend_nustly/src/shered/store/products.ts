import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { ICreateProduct, IProducts } from '@/shered/api/productsApi/productsApi.types';
import apiAxios from '@/shered/api'
import type { AxiosError } from 'axios';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

const API_URL_PRODUCTS = '/categories/products';
const API_URL_PRODUCT = '/categories/product';

export const useProductsStore = defineStore('products', () => {
  const router = useRouter();
  const route = useRoute();

  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string>('');

  const products = ref<IProducts[]>([]);
  const product = ref<IProducts>();

  const page = ref(1);
  const limit = ref(10);
  const totalPages = ref(0);

  const selected = ref<string>('');
  const selectOptions = reactive([
    {
      name: 'Обычный порядок',
      value:  'general'
    },
    {
      name: 'По названию',
      value:  'title'
    },
  ]);

  const sortedPlans = computed(() => {
    return [...products.value].sort((product_1: any, product_2: any) => product_1[selected.value]?.localeCompare(product_2[selected.value]))
  });

  const postRemoveProduct = async () => {
    try {
      await apiAxios.delete('/workplaces/' + route.params.id_w);
      router.go(-1);
      errorMessage.value = '';
    } catch (error: any) {
      errorMessage.value = error;
      console.error(error);
    } 
  }

  const postCreateProduct = async (data: ICreateProduct, file: any) => {
     try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('data', JSON.stringify(data));
      const response = await apiAxios.post(`${API_URL_PRODUCTS}/createProduct`, formData, {
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
  }

  const getProducts = async (categoryId: string | string[]) => {
    isLoading.value = true;
    try {
      const responce = await apiAxios.get(`${API_URL_PRODUCTS}/${categoryId}`, {
        params: {
          _page: page.value,
          _limit: limit.value
        }
      });
      products.value = responce.data;
      totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit.value);
      errorMessage.value = '';
    } catch (error: any) {
      errorMessage.value = error;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }


  const getProduct = async (productId: string) => {
    isLoading.value = true;
    try {
      const responce = await apiAxios.get(`${API_URL_PRODUCT}/${productId}`);
      product.value = responce.data;
      errorMessage.value = '';
    } catch (error: any) {
      errorMessage.value = error;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {sortedPlans, postRemoveProduct, postCreateProduct, getProducts, getProduct, isLoading, errorMessage, products, product, totalPages, page}
});