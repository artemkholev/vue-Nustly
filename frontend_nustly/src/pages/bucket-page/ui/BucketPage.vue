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
      </div>  
    </div>
    <div v-if="bucketObjects.length" class="bucket__input-finder">
      <input type="text" placeholder="Найти товар..." v-model="findBucketObject"> 
      <button>
        <icon-base width="30" height="30" iconName="find"><magnifier-icon/></icon-base>
      </button>
    </div>
    <div class="bucket__cards" 
      v-if="bucketObjects.length"
    >
      <template v-for="bucketElem in bucketObjects" :key="bucketElem.id">
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
import { computed, defineComponent, onMounted, ref } from 'vue';
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
const { getBucketObjects, selectAllProducts } = bucketStore;
const { errorMessageBucketPage, page, totalPages, bucketObjects, isLoading, selectedObjectsBucket } = storeToRefs(bucketStore);

//theme store
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const catalogClasses = computed(() => {
  return { bucket: true, ['bucket_dark']: isDarkTheme.value };
});

const findBucketObject = ref('');

//auth store 
const authStore = useAuthStore();
const { role } = storeToRefs(authStore);

//dialog window
const showProductDialogVisible = ref(false);

const handlerShowProductDialogVisible = () => {
  showProductDialogVisible.value = !showProductDialogVisible.value;
}

onMounted(() => {
  getBucketObjects();
})
</script>

<style src="./BucketPage.style.scss" lang="scss" scoped></style>