<template>
  <div>
    buy
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { PlacingOrderModel } from '@/entities/placing-order';
import { storeToRefs } from 'pinia';

const placingOrderStore = PlacingOrderModel.usePlacingOrderStore();
const { orders } = storeToRefs(placingOrderStore);

onMounted(() => {
  console.log(orders.value);
})
</script>

<style scoped>

</style>