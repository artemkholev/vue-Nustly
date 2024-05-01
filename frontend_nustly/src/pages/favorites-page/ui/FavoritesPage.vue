<template>
  <div :class="catalogClasses">
    <div class="favorites__header">
      <h1>Избранное {{ role }}</h1>
      <div class=favorites__header__error>
        <p v-if="errorMessageFavoritesPage.length" >{{ errorMessageFavoritesPage }}</p>
        <p  v-if="errorMessageFavoritesPage.length">{{ errorMessageFavoritesPage }}</p>
      </div> 
    </div>
    <div v-if="favoritesObjects.length" class="favorites__input-finder">
      <input type="text" placeholder="Найти товар..." v-model="findProductElemString" @keydown.enter="filterProducts"> 
      <button @click="filterProducts" >
        <icon-base width="30" height="30" iconName="find"><magnifier-icon/></icon-base>
      </button>
    </div>
    <div class="favorites__cards" 
      v-if="favoritesObjects.length"
    >
      <template v-for="favoritesElem in productsFilter" :key="favoritesElem.id">
        <FavoritesItem 
          :idFavoritesElem="favoritesElem.id"
          :elemProduct="favoritesElem"
          :handlerShowProductDialogVisible="handlerShowProductDialogVisible"
          :getProduct="getProduct"
        />
      </template>
    </div>
    <p  v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
    <h2 v-if="!isLoading && !favoritesObjects.length" class="favorites__info-product-request">
      Данных нет
    </h2>
    <Pagination
      v-if="favoritesObjects.length"
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
import { FavoritesModel } from '@/entities/favorites-item';
import { useThemeStore } from '@/shared/stores/theme';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { FavoritesItem } from '@/entities/favorites-item';
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
// const { getBucketObjects } = bucketStore;
// const { errorMessageBucketPage, page, totalPages, bucketObjects, isLoading } = storeToRefs(bucketStore);

//favorites store 
const favoritesStore = FavoritesModel.useFavoritesStore();
const { getFavoritesObjects } = favoritesStore;
const { errorMessageFavoritesPage, page, totalPages, favoritesObjects, isLoading } = storeToRefs(favoritesStore)

//theme store
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const catalogClasses = computed(() => {
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

const filterProducts = () => {
  if (!favoritesObjects.value.length) return
  if (!findProductElemString.value.length)
    productsFilter.value = [...favoritesObjects.value]
  productsFilter.value = [];
  findProductElemString.value = findProductElemString.value.toLowerCase();
  for (const product of favoritesObjects.value) {
    if (product.products.title.toLowerCase().indexOf(findProductElemString.value) != -1)
      productsFilter.value.push(product);
  }     
};

watch([favoritesObjects, findProductElemString], () => {
  filterProducts();
})

onMounted(async () => {
  await getFavoritesObjects();
  if (favoritesObjects.value.length)
    productsFilter.value = [...favoritesObjects.value];
})
</script>

<style src="./FavoritesPage.style.scss" lang="scss" scoped></style>