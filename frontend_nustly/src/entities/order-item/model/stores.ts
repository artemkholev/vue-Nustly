import { apiAxios } from '@/shared/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

const API_URL_ORDERS = '/orders';

export const useOrdersStore = defineStore('order', () => {
  const orders = ref<any[]>([]);
  const order = ref<any>();

  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string>('');

  const page = ref(1);
  const limit = ref(10);
  const totalPages = ref(0);

  const getOrders = async () => {
    console.log('!!!')
    // isLoading.value = true;
    // try {
    //   const responce = await apiAxios.get(`${API_URL_ORDERS}}`, {
    //     params: {
    //       _page: page.value,
    //       _limit: limit.value
    //     }
    //   });
    //   orders.value = responce.data;
    //   totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit.value);
    //   errorMessage.value = '';
    // } catch (error: any) {
    //   errorMessage.value = error;
    //   console.error(error);
    // } finally {
    //   isLoading.value = false;
    // }
  }

  const postEditStatusOrder = () => {

  }

  return { getOrders, postEditStatusOrder, orders, isLoading, errorMessage, totalPages, page }
});