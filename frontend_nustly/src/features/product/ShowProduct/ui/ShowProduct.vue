<template>
  <div class="product-container">
    <div class="product-container__title">Общая информация о товаре</div>
    <div class="product-container__header">
      <div class="product-container__header__image">
        <img :src="product?.photo" alt="Фотография товара">
      </div>
      <div class="product-container__header__general-info">
        <p><strong>Название:</strong> {{ product?.title }}</p>
        <p><strong>Производитель:</strong> {{ product?.manufacturer }}</p>
        <div v-if="isAuth">
          <button-elem
            :clName="null"
            :title="product?.isProductInBucket ? 'Убрать из корзины' : 'В корзину'"
            :handler="handlerActionBucketProduct"
            :width="'80%'"
            :height="'40px'"
            :background="'#70C05B'"
            :textColor="null"
            :fontSize="null"
            :fontWeight="null"
            :margin="'15px 0 0 0'"
            :borderRadius="'10px'"
            :icon="null"
          />
          <button-elem
            :clName="null"
            :title="'В избранное'"
            :handler="() => null"
            :width="'80%'"
            :height="'40px'"
            :background="'#70C05B'"
            :textColor="null"
            :fontSize="null"
            :fontWeight="null"
            :margin="'15px 0 0 0'"
            :borderRadius="'10px'"
            :icon="null"
          />
        </div>
      </div>
    </div>
    <div class="product-container__body">
      <div class="product-container__body__discription">
        <p><strong>Описание:</strong> {{ product?.description }}</p>
        <p><strong>Цена:</strong> {{ product?.price }}</p>
      </div>
        <button-elem
          :clName="null"
          :title="'Купить'"
          :handler="() => null"
          :width="'80%'"
          :height="'48px'"
          :background="'#70C05B'"
          :textColor="null"
          :fontSize="null"
          :fontWeight="null"
          :margin="'24px 0 0 0'"
          :borderRadius="'10px'"
          :icon="null"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BucketModel } from '@/entities/bucket-item';
import { ProductModel } from '@/entities/product-item';
import { useAuthStore } from '@/shared/stores/auth';
import { storeToRefs } from 'pinia';

const productsStore = ProductModel.useProductsStore();
const { product, products } = storeToRefs(productsStore);

const authStore = useAuthStore();
const { isAuth } = storeToRefs(authStore);

const bucketStore = BucketModel.useBucketStore();
const { postCreateBucketObject, postRemoveBucketObject } = bucketStore;

const findProductChangeInBucket = (productId: string, isProductInBucket: boolean) => {
  const index = products.value.findIndex((product) => product.id == productId);
  products.value[index].isProductInBucket = isProductInBucket;
}

const handlerActionBucketProduct = async () => {
  let isActionWasGood = false;
  if (product.value?.isProductInBucket) {
    isActionWasGood = await postRemoveBucketObject(product.value.id);
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
</script>

<style src="./ShowProduct.style.scss" lang="scss" scoped></style>