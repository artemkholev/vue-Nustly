<template>
  <div class="product-container">
    <div class="product-container__title">Общая информация о товаре</div>
    <div class="product-container__header">
      <div class="product-container__header__image">
        <img :src="product?.photo" style="max-width: 400px; max-height: 400px;" alt="Фотография товара">
      </div>
      <div class="product-container__header__general-info">
        <p><strong>Цена:</strong> {{ product?.price }} ₽</p>
        <p><strong>Название:</strong> {{ product?.title }}</p>
        <p><strong>Производитель:</strong> {{ product?.manufacturer }}</p>
        <div v-if="isAuth && route.name !== 'BucketPage'">
          <button-elem
            :clName="null"
            :title="product?.isProductInBucket ? 'Убрать из корзины' : 'В корзину'"
            :handler="handlerActionBucketProduct"
            :width="'100%'"
            :height="'40px'"
            :background="'#70C05B'"
            :textColor="null"
            :fontSize="null"
            :fontWeight="null"
            :margin="'15px 0 0 0'"
            :borderRadius="'5px'"
            :icon="null"
          />
          <button-elem
            :clName="null"
            :title="product?.isProductInFavorites ? 'Убрать из избранного' : 'В избранное'"
            :handler="handlerActionFavoritesProduct"
            :width="'100%'"
            :height="'40px'"
            :background="'#70C05B'"
            :textColor="null"
            :fontSize="null"
            :fontWeight="null"
            :margin="'15px 0 0 0'"
            :borderRadius="'5px'"
            :icon="null"
          />
        </div>
      </div>
    </div>
    <div class="product-container__body">
      <div class="product-container__body__discription">
        <p><strong>Описание:</strong> {{ product?.description }}</p>
      </div>
      <button-elem
        :clName="null"
        :title="'Купить'"
        :handler="buyProduct"
        :width="'40%'"
        :height="'48px'"
        :background="'orangered'"
        :textColor="null"
        :fontSize="null"
        :fontWeight="null"
        :margin="'24px 0 0 auto'"
        :borderRadius="'5px'"
        :icon="null"
      />      
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlacingOrderModel } from '@/entities/placing-order';
import { BucketModel } from '@/entities/bucket-item';
import { FavoritesModel } from '@/entities/favorites-item';
import { ProductModel } from '@/entities/product-item';
import { useAuthStore } from '@/shared/stores/auth';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const productsStore = ProductModel.useProductsStore();
const { product, products } = storeToRefs(productsStore);

//auth store
const authStore = useAuthStore();
const { isAuth } = storeToRefs(authStore);

//bucket store
const bucketStore = BucketModel.useBucketStore();
const { postCreateBucketObject, postRemoveBucketObject } = bucketStore;

//favorites store
const favoritesStore = FavoritesModel.useFavoritesStore();
const { postCreateFavoritesObject, postRemoveFavoritesObject } = favoritesStore;

//placing order store 
const placingOrderStore = PlacingOrderModel.usePlacingOrderStore();
const { addToPlacingPrders } = placingOrderStore;

const findProductChangeInBucket = (productId: string, isProductInBucket: boolean) => {
  const index = products.value.findIndex((product) => product.id == productId);
  products.value[index].isProductInBucket = isProductInBucket;
}

const findProductChangeInFavorites = (productId: string, isProductInFavorites: boolean) => {
  const index = products.value.findIndex((product) => product.id == productId);
  products.value[index].isProductInFavorites = isProductInFavorites;
}

const buyProduct = () => {
  addToPlacingPrders(product.value!);
  router.push('/placing-order');
}

const handlerActionBucketProduct = async () => {
  let isActionWasGood = false;
  if (product.value?.isProductInBucket) {
    isActionWasGood = await postRemoveBucketObject(product.value.id, '');
    if (isActionWasGood) {
      product.value.isProductInBucket = false;
      findProductChangeInBucket(product.value.id, false);
    }
    return;
  }
  isActionWasGood = await postCreateBucketObject(product.value!.id, 1);
  if (isActionWasGood) {
    product.value!.isProductInBucket = true;
    findProductChangeInBucket(product.value!.id, true);
  }
}

const handlerActionFavoritesProduct = async () => {
  let isActionWasGood = false;
  if (product.value?.isProductInFavorites) {
    isActionWasGood = await postRemoveFavoritesObject(product.value.id, '');
    if (isActionWasGood) {
      product.value.isProductInFavorites = false;
      findProductChangeInFavorites(product.value.id, false);
    }
    return;
  }
  isActionWasGood = await postCreateFavoritesObject(product.value!.id, 1);
  if (isActionWasGood) {
    product.value!.isProductInFavorites = true;
    findProductChangeInFavorites(product.value!.id, true);
  }
}
</script>

<style src="./ShowProduct.style.scss" lang="scss" scoped></style>