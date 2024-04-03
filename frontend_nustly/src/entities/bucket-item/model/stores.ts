import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { apiAxios } from '@/shared/api';
import type { AxiosError } from 'axios';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

const API_URL_PRODUCTS = '/bucket/products';
const API_URL_PRODUCT = '/categories/product';

export const useBucketStore = defineStore('bucket', () => {
  const router = useRouter();
  const route = useRoute();

  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string>('');

  const bucketObjects = ref([]);
  const bucketObject = ref();

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
    return [...bucketObjects.value].sort((bucketObject_1: any, bucketObject_2: any) => bucketObject_1[selected.value]?.localeCompare(bucketObject_2[selected.value]))
  });

  const postRemoveObject = async () => {
    try {
      await apiAxios.delete('/workplaces/' + route.params.id_w);
      router.go(-1);
      errorMessage.value = '';
    } catch (error: any) {
      errorMessage.value = error;
      console.error(error);
    } 
  }

  const postCreateBucketObject = async () => {
    //  try {
    //   const response = await apiAxios.post(`${API_URL_PRODUCTS}/createProduct`, data);
    //   errorMessage.value = '';
    // } catch (err: any) {
    //   const error: AxiosError<ValidationErrors> = err;
    //   if (!error.response) {
    //     throw err;
    //   }
    //   errorMessage.value = error.response.data.message;
    // }
    console.log('create bucket elem')
  }

  const getBucketObjects = async (categoryId: string | string[]) => {
    isLoading.value = true;
    try {
      const responce = await apiAxios.get(`${API_URL_PRODUCTS}/${categoryId}`, {
        params: {
          _page: page.value,
          _limit: limit.value
        }
      });
      bucketObjects.value = responce.data;
      totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit.value);
      errorMessage.value = '';
    } catch (error: any) {
      errorMessage.value = error;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }


  // const getProduct = async (productId: string) => {
  //   isLoading.value = true;
  //   try {
  //     const responce = await apiAxios.get(`${API_URL_PRODUCT}/${productId}`);
  //     product.value = responce.data;
  //     errorMessage.value = '';
  //   } catch (error: any) {
  //     errorMessage.value = error;
  //     console.error(error);
  //   } finally {
  //     isLoading.value = false;
  //   }
  // };

  return { postCreateBucketObject }
});