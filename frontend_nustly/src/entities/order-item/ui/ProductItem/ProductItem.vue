<template>
  <div 
    class="container__product"
  >
    <div>
      <p style="font-size: xx-large; font-weight: 600;">{{ product?.title }}</p>
      <div>
        <p><strong>Цена: </strong>{{ product?.price }}₽</p>
        <p><strong>Количество: </strong>{{ product?.quantity }}</p>
      </div>
    </div>
    <img style="border-radius: 5px;" :src="productInfo?.photo" height="80" alt="Фото продукта">
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { OrderModel } from '@/entities/order-item';

const props = defineProps({
  product: {
    type: Object,
  }
})


//products store
const ordersStore = OrderModel.useOrdersStore();
const { getProduct } = ordersStore;

const productInfo = ref();

const id_product = ref(props.product?.id_product)
onMounted(async () => {
  if (id_product)
    productInfo.value = await getProduct(id_product.value)
})
</script>

<style src="./ProductItem.style.scss" lang="scss" scoped />