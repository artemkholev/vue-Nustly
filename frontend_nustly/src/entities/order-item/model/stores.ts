import { apiAxios } from '@/shared/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

const API_URL_ORDERS = '/orders';

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<any[]>([]);
  const order = ref<any>();

  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string>('');

  const getOrders = async () => {
    isLoading.value = true;
    try {
      const responce = await apiAxios.get(`${API_URL_ORDERS}`);
      orders.value = responce.data;
      errorMessage.value = '';
    } catch (error: any) {
      errorMessage.value = error;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  const postEditStatusOrder = () => {

  }

  return { getOrders, postEditStatusOrder, orders, isLoading, errorMessage}
});