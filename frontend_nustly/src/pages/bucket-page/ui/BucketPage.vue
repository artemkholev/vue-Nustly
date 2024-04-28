<template>
  <div :class="catalogClasses">
    <div class="bucket__header">
      <h1>Корзина {{ role }}</h1>
      <div class=bucket__header__error>
        <p v-if="errorMessageBucketPage.length" >{{ errorMessageBucketPage }}</p>
        <p  v-if="errorMessageBucketPage.length">{{ errorMessageBucketPage }}</p>
      </div>
      <div class="bucket__header__buttons-actions">
        <button-elem
          :clName="null"
          :title="'Выбрать все'"
          :handler="selectAllProducts"
          :width="'200px'"
          :height="'55px'"
          :background="'#70C05B'"
          :textColor="null"
          :fontSize="null"
          :fontWeight="null"
          :margin="'0 0 0 0'"
          :borderRadius="'5px'"
          :icon="null"
        />
        <router-link to="/placing-order">
          <button-elem
            :clName="null"
            :title="'Купить выбранные товары'"
            :handler="() => {}"
            :width="'200px'"
            :height="'55px'"
            :background="'#70C05B'"
            :textColor="null"
            :fontSize="null"
            :fontWeight="null"
            :margin="'0 0 0 0'"
            :borderRadius="'5px'"
            :icon="null"
          />
        </router-link>
        
      </div>  
    </div>
    <div v-if="bucketObjects.length" class="bucket__input-finder">
      <input type="text" placeholder="Найти товар..." v-model="findProductElemString" @keydown.enter="filterProducts"> 
      <button @click="filterProducts" >
        <icon-base width="30" height="30" iconName="find"><magnifier-icon/></icon-base>
      </button>
    </div>
    <div class="bucket__cards" 
      v-if="bucketObjects.length"
    >
      <template v-for="bucketElem in productsFilter" :key="bucketElem.id">
        <BucketItem 
          :idBucketElem="bucketElem.id"
          :elemProduct="bucketElem.products"
          :handlerShowProductDialogVisible="handlerShowProductDialogVisible"
          :getProduct="getProduct"
        />
      </template>
    </div>
    <p  v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
    <h2 v-if="!isLoading && !bucketObjects.length" class="bucket__info-product-request">
      Данных нет
    </h2>
    <Pagination
      v-if="bucketObjects.length"
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
import { BucketModel } from '@/entities/bucket-item';
import { useThemeStore } from '@/shared/stores/theme';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { BucketItem } from '@/entities/bucket-item';
import { ShowProduct } from '@/features/product/ShowProduct';
import { ProductModel } from '@/entities/product-item';

import MagnifierIcon from '@/app/assets/images/icons/MagnifierIcon.vue';

defineComponent({
  MagnifierIcon,
})

//product store
const productsStore = ProductModel.useProductsStore();
const { getProduct } = productsStore;

//bucket store
const bucketStore = BucketModel.useBucketStore();
const { getBucketObjects } = bucketStore;
const { errorMessageBucketPage, page, totalPages, bucketObjects, isLoading } = storeToRefs(bucketStore);

//theme store
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const catalogClasses = computed(() => {
  return { bucket: true, ['bucket_dark']: isDarkTheme.value };
});

const findProductElemString = ref('');
const productsFilter = ref<any>([]);

//auth store 
const authStore = useAuthStore();
const { role } = storeToRefs(authStore);

//dialog window
const showProductDialogVisible = ref(false);

const handlerShowProductDialogVisible = () => {
  showProductDialogVisible.value = !showProductDialogVisible.value;
}

const filterProducts = () => {
  if (!bucketObjects.value.length) return
  if (!findProductElemString.value.length)
    productsFilter.value = [...bucketObjects.value]
  productsFilter.value = [];
  findProductElemString.value = findProductElemString.value.toLowerCase();
  for (const product of bucketObjects.value) {
    if (product.products.title.toLowerCase().indexOf(findProductElemString.value) != -1)
      productsFilter.value.push(product);
  }     
};

const selectAllProducts = () => {
  
}

watch([bucketObjects, findProductElemString], () => {
  filterProducts();
})

onMounted(async () => {
  await getBucketObjects();
  if (bucketObjects.value.length)
    productsFilter.value = [...bucketObjects.value];
})
</script>

<style src="./BucketPage.style.scss" lang="scss" scoped></style>