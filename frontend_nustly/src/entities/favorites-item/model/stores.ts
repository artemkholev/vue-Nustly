import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { IFavoritesModel } from './types'

import { apiAxios } from '@/shared/api';
import type { AxiosError } from 'axios';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

const API_URL_FAVORITES = '/favorites';

export const useFavoritesStore = defineStore('favorites', () => {
  const router = useRouter();
  const route = useRoute();

  const isLoading = ref<boolean>(false);
  const errorMessageFavoritesPage = ref<string>('');

  const favoritesObjects = ref<IFavoritesModel[]>([]);
  const favoritesObject = ref<IFavoritesModel>();

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

  const deleteFavoritesObject = (idFavoritesElem: string) => {
    favoritesObjects.value = favoritesObjects.value.filter((elemFavorites) => elemFavorites.id !== idFavoritesElem);
  } 

  const postRemoveFavoritesObject = async (productId: string, idFavoritesElem: string = '') => {
     try {
      const response = await apiAxios.post(`${API_URL_FAVORITES}/remove`, {
        productId: productId,
        quantity: 0,
      });
      errorMessageFavoritesPage.value = '';
      
      if (idFavoritesElem.length)
        deleteFavoritesObject(idFavoritesElem);
      return response.data ?? false;
    } catch (err: any) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessageFavoritesPage.value = error.response.data.message;
    } 
  }

  const postCreateFavoritesObject = async (productId: string, quantity: number) => {
    try {
      const response = await apiAxios.post(`${API_URL_FAVORITES}/add`, {
        productId: productId,
        quantity: quantity,
      });
      errorMessageFavoritesPage.value = '';
      return response.data ?? false;
    } catch (err: any) {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      errorMessageFavoritesPage.value = error.response.data.message;
    }
  }

  const getFavoritesObjects = async () => {
    isLoading.value = true;
    try {
      const responce = await apiAxios.get(`${API_URL_FAVORITES}`, {
        params: {
          _page: page.value,
          _limit: limit.value
        }
      });
      favoritesObjects.value = responce.data;
      totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit.value);
      errorMessageFavoritesPage.value = '';
    } catch (error: any) {
      errorMessageFavoritesPage.value = error;
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

  watch(errorMessageFavoritesPage, () => {
    setTimeout(function () {
      errorMessageFavoritesPage.value = '';
    }, 2000)
  })

  return {
    postCreateFavoritesObject, postRemoveFavoritesObject, getFavoritesObjects, errorMessageFavoritesPage, page, limit, totalPages, favoritesObjects, isLoading
  }
});