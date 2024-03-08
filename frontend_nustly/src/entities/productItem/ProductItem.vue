<template>
  <div :class="cardClasses">
    <div class="card__top">
      <div class="card__image">
        <img
          :src="elemProduct.photo"
          alt="товар"
        />
      </div>
      <!-- <div class="card__label">-{{ elemProduct.discountPercentage }}%</div> -->
    </div>
    <div class="card__bottom">
      <div class="card__prices">
        <!-- <div class="card__price card__price--discount">{{ (elemProduct.price - elemProduct.price / 100 * elemProduct.discountPercentage).toFixed(2) }}</div> -->
        <div class="card__price card__price--common">{{elemProduct.price}}</div>
      </div>
      <p class="card__title">
        {{ elemProduct.title }}
      </p>
       <button-elem
          :clName="null"
          :title="'В карзину'"
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
import { useProductsStore } from '@/shered/store/products';
import { useThemeStore } from '@/shered/store/theme';
import { storeToRefs, type Store, type _UnwrapAll } from 'pinia';
import { computed } from 'vue';

defineProps({
  elemProduct: {
    type: Object,
    required: true,
  }
})

const productsStore = useProductsStore();
const { } = storeToRefs(productsStore);
const { } = productsStore;

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const cardClasses = computed(() => {
  return { card: true, ['dark-card']: isDarkTheme.value };
});
</script>

<style src="./ProductItem.style.scss" lang="scss" scoped></style>