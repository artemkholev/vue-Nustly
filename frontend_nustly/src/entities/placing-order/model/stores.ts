import type { IProducts } from '@/entities/product-item/model/types';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

export const usePlacingOrderStore = defineStore('placingOrder', () => {
  const orders = ref<IProducts[]>([]);
  const price = ref<number>(0);

  const addToPlacingPrders = (product: IProducts) => {
    orders.value.push(product);
  }

  const getPrice = () => {
    price.value = orders.value.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
  }

  watch(orders, () => {
    getPrice();
  })
  
  return { addToPlacingPrders, getPrice , orders, price}
})