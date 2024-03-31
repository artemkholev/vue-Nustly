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
import { useProductsStore } from '@/shared/store/products';
import { storeToRefs } from 'pinia';

// {
//     "id": "ca85ea42-f3ac-4dd9-9958-aafe97a2776f",
//     "title": "Хлеб",
//     "description": "Вкусный хлеб",
//     "manufacturer": "Сосновское",
//     "price": 100,
//     "photo": "http://localhost:5000/dist/files/products/img (1)-925d.jpg",
//     "id_model": null,
//     "id_provider": null,
//     "id_categories": "b5b481f1-b83b-4323-becb-84fc8a67c8b1",
//     "createdAt": "2024-03-10T14:34:38.221Z",
//     "updatedAt": "2024-03-10T14:34:38.221Z",
//     "categories": {
//         "id": "b5b481f1-b83b-4323-becb-84fc8a67c8b1",
//         "title": "Products",
//         "visibility": true,
//         "photo": "http://localhost:5000/dist/files/categories/img (1)-da77.jpg",
//         "createdAt": "2024-03-10T14:06:59.579Z",
//         "updatedAt": "2024-03-10T14:06:59.579Z"
//     }
// }

const productsStore = useProductsStore();
const { product } = storeToRefs(productsStore);
</script>

<style src="./ShowProduct.style.scss" lang="scss" scoped></style>@/shared/store/products