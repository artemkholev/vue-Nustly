<template>
  <div :class="ordersClasses">
    <div class="orders__header">
      <h1>Заказы {{ role }}</h1>
      <div class=orders__header__error>
        <p v-if="errorMessage.length" >{{ errorMessage }}</p>
      </div> 
    </div>
    <div class="orders__cards" 
      v-if="orders.length"
    >
      <template v-for="product in orders" :key="product.id">
        <OrderItem 
          :productOrder="product"
        />
      </template>
    </div>
    <p  v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
    <h2 v-if="!isLoading && !orders.length" class="orders__info-product-request">
      Данных нет
    </h2>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/shared/stores/auth';
import { OrderModel } from '@/entities/order-item';
import { useThemeStore } from '@/shared/stores/theme';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, onMounted } from 'vue';
import { OrderItem } from '@/entities/order-item';

import MagnifierIcon from '@/app/assets/images/icons/MagnifierIcon.vue';

defineComponent({
  MagnifierIcon,
})

//orders store
const ordersStore = OrderModel.useOrdersStore();
const { getOrders } = ordersStore;
const { orders, isLoading, errorMessage } = storeToRefs(ordersStore);

//theme store
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const ordersClasses = computed(() => {
  return { orders: true, ['orders_dark']: isDarkTheme.value };
});

//auth store 
const authStore = useAuthStore();
const { role } = storeToRefs(authStore);

onMounted(async () => {
  await getOrders();
})
</script>

<style src="./OrdersPage.style.scss" lang="scss" scoped />