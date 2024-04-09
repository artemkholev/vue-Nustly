import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { IBucketModel } from './types'

import { apiAxios } from '@/shared/api';
import type { AxiosError } from 'axios';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

const API_URL_BUCKET = '/bucket';

export const useBucketStore = defineStore('bucket', () => {
  const router = useRouter();
  const route = useRoute();

  const isLoading = ref<boolean>(false);
  const errorMessageBucketPage = ref<string>('');

  const bucketObjects = ref<IBucketModel[]>([]);
  const bucketObject = ref<IBucketModel>();

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

  const findProducts = computed(() => {

  })

  const sortedPlans = computed(() => {
    return [...bucketObjects.value].sort((bucketObject_1: any, bucketObject_2: any) => bucketObject_1[selected.value]?.localeCompare(bucketObject_2[selected.value]))
  });

  const postRemoveBucketObject = async (productId: string) => {
     try {
      const response = await apiAxios.post(`${API_URL_BUCKET}/remove`, {
        productId: productId,
        quantity: 0,
      });
      errorMessageBucketPage.value = '';
      return response.data ?? false;
    } catch (err: any) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessageBucketPage.value = error.response.data.message;
    } 
  }

  const postCreateBucketObject = async (productId: string, quantity: number) => {
    try {
      const response = await apiAxios.post(`${API_URL_BUCKET}/add`, {
        productId: productId,
        quantity: quantity,
      });
      errorMessageBucketPage.value = '';
      return response.data ?? false;
    } catch (err: any) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessageBucketPage.value = error.response.data.message;
    }
  }

  const getBucketObjects = async () => {
    isLoading.value = true;
    try {
      const responce = await apiAxios.get(`${API_URL_BUCKET}`, {
        params: {
          _page: page.value,
          _limit: limit.value
        }
      });
      bucketObjects.value = responce.data;
      totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit.value);
      errorMessageBucketPage.value = '';
    } catch (error: any) {
      errorMessageBucketPage.value = error;
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
  //     errorMessageBucketPage.value = '';
  //   } catch (error: any) {
  //     errorMessageBucketPage.value = error;
  //     console.error(error);
  //   } finally {
  //     isLoading.value = false;
  //   }
  // };

  watch(errorMessageBucketPage, () => {
    setTimeout(function () {
      errorMessageBucketPage.value = '';
    }, 2000)
  })

  return {
    postCreateBucketObject, postRemoveBucketObject, getBucketObjects,
    errorMessageBucketPage, page, limit, totalPages, bucketObjects, isLoading
  }
});