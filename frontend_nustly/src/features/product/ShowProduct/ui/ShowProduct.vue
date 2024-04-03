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
        <button-elem
          :clName="null"
          :title="'В корзину'"
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
import { ProductModel } from '@/entities/product-item';
import { storeToRefs } from 'pinia';

const productsStore = ProductModel.useProductsStore();
const { product } = storeToRefs(productsStore);
</script>

<style src="./ShowProduct.style.scss" lang="scss" scoped></style>