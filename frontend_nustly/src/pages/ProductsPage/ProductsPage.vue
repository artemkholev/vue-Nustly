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
        <ProductItem :elemProduct="elem"/>
      </template>
    </div>
    <div 
      v-for="pagePath in totalPages" 
      :key="pagePath"
      class="products__navigation-pages"
      :class="{
        'carrent-page': page === pagePath
      }"
      @click="changePage(pagePath)"
    >
      {{ pagePath }}
    </div>

    <p  v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
    <p  v-if="errorMessage.length" :style="{margin: '10px', color: 'red'}">{{ errorMessage }}</p>
    <h2 v-if="!isLoading && (products.length === 0)" class="products__error">
      Данных нет
    </h2>
    <dialog-window v-model:show="creatProductDialogVisible">
      <form @submit.prevent :style="{padding: '10px'}">
        <h1 :style="{marginBottom: '30px'}">Создать новый товар</h1>
        <input-elem    
          v-model="productInfo.title"
          :typeInput="'text'"
          :placeholderInput="'Название'"
        />
        <text-area 
          v-model="productInfo.description" 
          :placeholderInput="'Описание'"
        />
        <input-elem    
          v-model="productInfo.manufacturer"
          :typeInput="'text'"
          :placeholderInput="'Производитель'"
        />
        <input-elem    
          v-model="productInfo.price"
          :typeInput="'number'"
          :placeholderInput="'Цена'"
        />
        <input 
          type="file" 
          @change="onFileChange" 
          :style="{margin: '15px 0'}"
        >
        <button-elem
          :clName="null"
          :title="'Отправить'"
          :handler="submit"
          :width="'100%'"
          :height="'48px'"
          :background="'#70C05B'"
          :textColor="null"
          :fontSize="null"
          :fontWeight="null"
          :margin="'20px 0 0 0'"
          :borderRadius="'10px'"
          :icon="null"
        />
      </form>
    </dialog-window>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/shered/store/auth';
import { useProductsStore } from '@/shered/store/products';
import { useThemeStore } from '@/shered/store/theme';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, ref } from 'vue';
import ProductItem from '@/entities/productItem/ProductItem.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const categoryId = route.params.products_id;


//catalog store
const productsStore = useProductsStore();
const { isLoading, errorMessage, products, product, totalPages, page  } = storeToRefs(productsStore);
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
const creatProductDialogVisible = ref(false);
const showProductDialogVisible = ref(false);

const productInfo = reactive({
  id_categories: categoryId,
  title: '',
  description: '',
  manufacturer: '',
  price: null,
});
const fileImg = ref(null);


const productForm = computed(() => {
  return {
    id_categories: categoryId,
    title: productInfo.title,
    description: productInfo.description,
    manufacturer: productInfo.manufacturer,
    price: productInfo.price
  };
});

const handlerCreateProductDialogVisible = () => {
  creatProductDialogVisible.value = !creatProductDialogVisible.value;
};

const handlerShowProductDialogVisible = () => {
  showProductDialogVisible.value = !showProductDialogVisible.value;
}

//methods
const changePage = (currentPage: number) => {
  page.value = currentPage;
};

const onFileChange = (event: any) => {
  fileImg.value = event.target.files[0];
};

const submit = async () => {
  if (!fileImg.value) {
    alert('Фотография не прекреплена');
  } else {
    await postCreateProduct(productForm.value, fileImg.value);
    getProducts(categoryId);
    handlerCreateProductDialogVisible();
    fileImg.value = null;
    productInfo.title = '';
    productInfo.description = '';
    productInfo.manufacturer = '';
    productInfo.price = null;
  }
};

onMounted(() => {
  getProducts(categoryId);
})
</script>

<style src="./ProductsPage.style.scss" lang="scss" scoped></style>