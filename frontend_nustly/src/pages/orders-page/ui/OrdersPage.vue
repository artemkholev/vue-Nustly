<template>
  <div :class="ordersClasses">
    <div class="bucket__header">
      <h1>Заказы {{ role }}</h1>
      <div class=bucket__header__error>
        <p v-if="errorMessage.length" >{{ errorMessage }}</p>
      </div> 
    </div>
    <div class="bucket__cards" 
      v-if="orders.length"
    >
      <template v-for="bucketElem in productsFilter" :key="bucketElem.id">
        <OrderItem 
          :idBucketElem="bucketElem.id"
          :elemProduct="bucketElem.products"
          :handlerShowProductDialogVisible="handlerShowProductDialogVisible"
          :getProduct="getProduct"
        />
      </template>
    </div>
    <p  v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
    <h2 v-if="!isLoading && !orders.length" class="bucket__info-product-request">
      Данных нет
    </h2>
    <Pagination
      v-if="orders.length"
      style="width: 100%; display: flex; justify-content: center; margin: 0, auto;"
      @change-page="(newPage) => page = newPage"
      :totalPages="totalPages"
      :page="page"
    />
    <dialog-window v-model:show="showProductDialogVisible">
      <ShowProduct/>
    </dialog-window>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/shared/stores/auth';
import Pagination from '@/features/pagination';
import { OrderModel } from '@/entities/order-item';
import { useThemeStore } from '@/shared/stores/theme';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { OrderItem } from '@/entities/order-item';
import { ShowProduct } from '@/features/product/ShowProduct';
import { ProductModel } from '@/entities/product-item';

import MagnifierIcon from '@/app/assets/images/icons/MagnifierIcon.vue';

defineComponent({
  MagnifierIcon,
})

//orders store
const ordersStore = OrderModel.useOrdersStore();
const { getOrders } = ordersStore;
const { orders, isLoading, errorMessage, totalPages, page } = storeToRefs(ordersStore);

//product store
const productsStore = ProductModel.useProductsStore();
const { getProduct } = productsStore;

//theme store
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const ordersClasses = computed(() => {
  return { bucket: true, ['bucket_dark']: isDarkTheme.value };
});

const findProductElemString = ref<string>('');
const productsFilter = ref<any>([]);
const selectedAll = ref<boolean>(false);

//auth store 
const authStore = useAuthStore();
const { role } = storeToRefs(authStore);

//dialog window
const showProductDialogVisible = ref(false);

const handlerShowProductDialogVisible = () => {
  showProductDialogVisible.value = !showProductDialogVisible.value;
}

onMounted(async () => {
  orders.value = [];
  await getOrders();
})
</script>

<style src="./OrdersPage.style.scss" lang="scss" scoped></style>