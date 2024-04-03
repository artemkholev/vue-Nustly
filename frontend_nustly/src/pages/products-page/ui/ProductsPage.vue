<template>
  <div :class="catalogClasses">
    <div class="products__header">
      <h1>Товары {{ role }}</h1>
      <button-elem
        v-if="role == 'ADMIN'"
        :clName="null"
        :title="'Добавить товар'"
        :handler="handlerCreateProductDialogVisible"
        :width="'35vw'"
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

    <div class="products__cards" 
      v-if="products.length"
    >
      <template v-for="elem in products" :key="elem.id">
        <ProductItem 
          :elemProduct="elem"
          :handlerShowProductDialogVisible="handlerShowProductDialogVisible"
          :getProduct="getProduct"
        />
      </template>
    </div>
    <p  v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
    <p  v-if="errorMessage.length" :style="{margin: '10px', color: 'red'}">{{ errorMessage }}</p>
    <h2 v-if="!isLoading && !products.length" class="products__error">
      Данных нет
    </h2>
    <Pagination
      v-if="products.length"
      @change-page="(newPage) => page = newPage"
      :totalPages="totalPages"
      :page="page"
    />
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
import { useThemeStore } from '@/shared/stores/theme';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { ProductItem } from '@/entities/product-item';
import { useRoute } from 'vue-router';
import { CreateProduct } from '@/features/product/CreateProduct';
import { ShowProduct } from '@/features/product/ShowProduct';

const route = useRoute();
const categoryId = route.params.category_id;

//catalog store
const productsStore = ProductModel.useProductsStore();
const { isLoading, errorMessage, products, totalPages, page  } = storeToRefs(productsStore);
const { getProducts, getProduct, postCreateProduct } = productsStore;

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

onMounted(() => {
  getProducts(categoryId);
})
</script>

<style src="./ProductsPage.style.scss" lang="scss" scoped></style>