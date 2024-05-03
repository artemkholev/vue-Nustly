import type { IProducts } from '@/entities/product-item/model/types';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

export const usePlacingOrderStore = defineStore('placingOrder', () => {
  const orders = ref<IProducts[]>([]);
  const price = ref<number>(0);
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
    console.log(orders.value);
    orders.value = [];
    router.push(successURL.value);
    return true;
  }

  return { postBuyProducts, addToPlacingPrders, getPrice , orders, price}
})