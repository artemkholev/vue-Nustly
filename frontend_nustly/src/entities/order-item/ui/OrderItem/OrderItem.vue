<template>
  <div class="container">
    <div>
      <h3>{{ product?.title }}</h3>
      <div>
        <p><strong>Цена: </strong>{{ product?.price }}₽</p>
        <p><strong>Количество: </strong>{{ productOrder?.order_details?.quantity }}</p>
      </div>
    </div>
    <div>
      <p><strong>Статус: </strong>{{ productOrder?.payment_status }}</p>
    </div>
    <img style="border-radius: 5px;" :src="product?.photo" height="80" alt="Фото продукта">
  </div>
</template>

<script setup lang="ts">
import { ProductModel } from '@/entities/product-item';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

//products store
const productsStore = ProductModel.useProductsStore();
const { product } = storeToRefs(productsStore);
const { getProduct } = productsStore;

const props = defineProps({
  productOrder: {
    type: Object,
  }
})

const id_product = ref(props.productOrder?.order_details?.id_product)

onMounted(() => {
  if (id_product)
    getProduct(id_product.value)
})
</script>

<style src="./OrderItem.style.scss" lang="scss" scoped />