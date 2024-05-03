<template>
  <div :class="catalogClasses">
    <div class="products__header">
      <h1>Товары {{ role }} | {{ nameCategory }}</h1>
      <div class=products__header__error>
        <p v-if="errorMessageBucketPage.length" >{{ errorMessageBucketPage }}</p>
        <p  v-if="errorMessage.length">{{ errorMessage }}</p>
      </div>
      <button-elem
        v-if="role == 'ADMIN'"
        :clName="null"
        :title="'Добавить товар'"
        :handler="handlerCreateProductDialogVisible"
        :width="'150px'"
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

    <div style="position: relative;" class="products__container">
      <div class="container__products-cards">
        <div v-if="products.length" class="filters">
          <button @click="togleFinderPanel" class="button-filter">+</button>
          <Transition name="sidebar">
            <FinderSidebarProduct 
              v-if="openFinder" 
              @close="togleFinderPanel"
              @actionFilter="((minPrice: number, maxPrice: number) => {
                paramsFilter.price.min = minPrice;
                paramsFilter.price.max = maxPrice;
              })"
              style="position: absolute;"
            />
          </Transition>
      
          <div v-if="products.length" class="input-finder">
            <input type="text" placeholder="Найти товар..." v-model="paramsFilter.input" @keydown.enter="filterProducts(paramsFilter.input)"> 
            <button @click="filterProducts(paramsFilter.input)" >
              <icon-base width="30" height="30" iconName="find"><magnifier-icon/></icon-base>
            </button>
          </div>
        </div>
        
        <div class="cards" 
          v-if="products.length"
        >
          <template v-for="elem in productsFilter" :key="elem.id">
            <ProductItem 
              :elemProduct="elem"
              :handlerShowProductDialogVisible="handlerShowProductDialogVisible"
              :getProduct="getProduct"
            />
          </template>
        </div>
        <p  v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
        <h2 v-if="!isLoading && !products.length" class="container__products-cards__info-product-request">
          Данных нет
        </h2>
        <Pagination
          v-if="products.length"
          style="width: 100%; display: flex; justify-content: center; margin: 0, auto;"
          @change-page="(newPage) => page = newPage"
          :totalPages="totalPages"
          :page="page"
        />
      </div>
    </div>

    
    <dialog-window v-model:show="createProductDialogVisible">
      <CreateProduct
        :categoryId="categoryId"
        :postCreateProduct="postCreateProduct"
        :getProducts="getProducts"
        :handlerCreateProductDialogVisible="handlerCreateProductDialogVisible"
      />
    </dialog-window>
    <dialog-window v-model:show="showProductDialogVisible">
      <ShowProduct/>
    </dialog-window>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/shared/stores/auth';
import Pagination from '@/features/pagination';
import { ProductModel } from '@/entities/product-item';
import { BucketModel } from '@/entities/bucket-item';
import { useThemeStore } from '@/shared/stores/theme';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue';
import { ProductItem } from '@/entities/product-item';
import { useRoute } from 'vue-router';
import { CreateProduct } from '@/features/product/CreateProduct';
import { ShowProduct } from '@/features/product/ShowProduct';
import FinderSidebarProduct from '@/widgets/finder-sidebar-product';


import MagnifierIcon from '@/app/assets/images/icons/MagnifierIcon.vue';

defineComponent({
  MagnifierIcon,
})

const openFinder = ref(false);

const togleFinderPanel = () => {
  openFinder.value = !openFinder.value;
}

const route = useRoute();
const categoryId = route.params.category_id;

//products store
const productsStore = ProductModel.useProductsStore();
const { isLoading, errorMessage, products, totalPages, page, nameCategory, productsFilter, paramsFilter } = storeToRefs(productsStore);
const { getProducts, getProduct, postCreateProduct, filterProducts } = productsStore;

//bucket store
const bucketStore = BucketModel.useBucketStore();
const { errorMessageBucketPage } = storeToRefs(bucketStore);

//theme store
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const catalogClasses = computed(() => {
  return { products: true, ['products_dark']: isDarkTheme.value };
});

//auth store 
const authStore = useAuthStore();
const { role } = storeToRefs(authStore);

//dialog window
const createProductDialogVisible = ref(false);
const showProductDialogVisible = ref(false);

const handlerCreateProductDialogVisible = () => {
  createProductDialogVisible.value = !createProductDialogVisible.value;
};

const handlerShowProductDialogVisible = () => {
  showProductDialogVisible.value = !showProductDialogVisible.value;
}

watch(products, () => {
  filterProducts(paramsFilter.value.input);
})

onBeforeMount(async () => {
  await getProducts(categoryId);
  if (products.value.length)
    productsFilter.value = [...products.value];
})
</script>

<style src="./ProductsPage.style.scss" lang="scss" scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: opacity 0.5s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}
</style>