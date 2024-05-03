import type { IProducts } from '@/entities/product-item/model/types';
import { apiAxios } from '@/shared/api';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/shared/stores/auth';
import { storeToRefs } from 'pinia';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

const API_URL_ORDERS = '/orders';

const userStore = useAuthStore();
const { userName } = storeToRefs(userStore);

export const usePlacingOrderStore = defineStore('placingOrder', () => {
  const orders = ref<IProducts[]>([]);
  const price = ref<number>(0);
  const errorMessage = ref<string>('');
  const successURL = ref<string>('/placing-order/success');
  const cancelURL = ref<string>('/');

  const router = useRouter();

  const addToPlacingPrders = (product: IProducts) => {
    orders.value.push(product);
  }

  const getPrice = () => {
    price.value = orders.value.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
  }

  watch(orders, () => {
    getPrice();
  })
  
  const postBuyProducts = async () => {
    try {
      const order = {
        order_date: new Date(),
        ready_pay: true,
        payment_status: 'оплачено',
        day_payment: new Date(),
        phone: '',
        address: '',
        city: '',
        region: '',
        index: '',
        name: userName.value,
        orderDetails: orders.value
      }
      const responce = await apiAxios.post(`${API_URL_ORDERS}`, order);
      orders.value = responce.data;
      errorMessage.value = '';
      router.push(successURL.value);
      return true;
    } catch (error: any) {
      errorMessage.value = error;
      console.error(error);
      router.push(cancelURL.value);
      return false;
    } finally {
      orders.value = [];
    }
  }

  return { postBuyProducts, addToPlacingPrders, getPrice , orders, price}
})