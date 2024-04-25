import { defineStore } from 'pinia';

interface ValidationErrors {
  message: string
  field_errors: Record<string, string>
}

const API_URL_BUCKET = '/bucket';

export const useBucketStore = defineStore('order', () => {
  const buyProducts = async () => {

  }
  return { buyProducts }
});