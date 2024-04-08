<template>
  <div :class="cardClasses">
    <div class="card__top">
      <div class="card__top__image">
        <img
          @click="handlerShowProduct"
          :src="elemProduct.photo"
          alt="товар"
        />
      </div>
      <!-- <div class="card__top__label">-{{ elemProduct.discountPercentage }}%</div> -->
    </div>
    <div class="card__bottom">
      <div class="card__bottom__prices">
        <!-- <div class="card__bottom__prices__price card__bottom__prices__price--discount">{{ (elemProduct.price - elemProduct.price / 100 * elemProduct.discountPercentage).toFixed(2) }}</div> -->
        <div class="card__bottom__prices__price card__bottom__prices__price--common">{{elemProduct.price}}</div>
      </div>
      <p class="card__bottom__title">
        {{ elemProduct.title }}
      </p>
      <div v-if="isAuth" class="card__bottom__bucket_add">
        <button-elem
          :clName="null"
          :title="elemProduct?.isProductInBucket ? 'Убрать из корзины' : 'В корзину'"
          :handler="handlerActionBucketProduct"
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
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/shared/stores/theme';
import { useAuthStore } from '@/shared/stores/auth';
import { BucketModel } from '@/entities/bucket-item'
import { storeToRefs, type Store, type _UnwrapAll } from 'pinia';
import { computed, ref } from 'vue';

const props = defineProps({
  elemProduct: {
    type: Object,
    required: true,
  },
  handlerShowProductDialogVisible: {
    type: Function,
    required: true,
  },
  getProduct: {
    type: Function,
    required: true,
  }
})

const quantityProducts = ref<number>(1);

const bucketStore = BucketModel.useBucketStore();
const { postCreateBucketObject, postRemoveBucketObject } = bucketStore;

const handlerActionBucketProduct = async () => {
  let isActionWasGood = false;
  if (props.elemProduct.isProductInBucket) {
    isActionWasGood = await postRemoveBucketObject(props.elemProduct.id);
    if (isActionWasGood) {
      props.elemProduct.isProductInBucket = false;
    }
    return;
  }
  isActionWasGood = await postCreateBucketObject(props.elemProduct.id, quantityProducts.value);
  if (isActionWasGood) {
    props.elemProduct.isProductInBucket = true;
  }
}

const handlerShowProduct = () => {
  props.getProduct(props.elemProduct.id);
  props.handlerShowProductDialogVisible()
}

const authStore = useAuthStore();
const { isAuth } = storeToRefs(authStore);

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const cardClasses = computed(() => {
  return { card: true, ['card_dark']: isDarkTheme.value };
});
</script>

<style src="./ProductItem.style.scss" lang="scss" scoped></style>