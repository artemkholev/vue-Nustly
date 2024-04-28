import type { IProducts } from '@/entities/product-item/model/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

const API_URL_BUCKET = '/';

export const usePlacingOrderStore = defineStore('placingOrder', () => {
  const orders = ref<IProducts[]>([]);

  const addToPlacingPrders = (product: IProducts) => {
    orders.value.push(product);
  }

  return { addToPlacingPrders, orders}
})