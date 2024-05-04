import { apiAxios } from '@/shared/api';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

const API_URL_ORDERS = '/orders';
const API_URL_PRODUCT = '/categories/product';

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref([]);
  const order = ref();

  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string>('');

  const selectOptions = reactive([
    {
      name: 'ожидание',
      value:  'ожидание'
    },
    {
      name: 'сборка',
      value:  'сборка'
    },
    {
      name: 'доставка',
      value: 'доставка'
    },
    {
      name: 'доставлено',
      value: 'доставлено'
    }
  ]);

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

  const getProduct = async (productId: string) => {
    try {
      const responce = await apiAxios.get(`${API_URL_PRODUCT}/${productId}`);
      errorMessage.value = '';
      return responce.data;
    } catch (error: any) {
      errorMessage.value = error;
      console.error(error);
    }
  }

  const postEditStatusOrder = async (order_id: string, status: string) => {
    try {
      const responce = await apiAxios.post(`${API_URL_ORDERS}/changeStatus`, {
        order_id: order_id,
        status: status,
      });
      errorMessage.value = '';
      return responce.data;
    } catch (error: any) {
      errorMessage.value = error;
      console.error(error);
    }
  }

  return { getOrders, postEditStatusOrder, getProduct, orders, isLoading, errorMessage, selectOptions}
});