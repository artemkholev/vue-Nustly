<template>
  <div :class="cardClasses">
    <div class="card__top">
      <div class="card__top__image">
        <img
          @click="handlerShowProduct"
          :src="elemProduct.products.photo"
          alt="товар"
        />
      </div>
      <!-- <div class="card__top__label">-{{ elemProduct.discountPercentage }}%</div> -->
    </div>
    <div class="card__bottom">
      <div style="display: flex; justify-content: space-between">
        <div>
          <div class="card__bottom__prices">
            <!-- <div class="card__bottom__prices__price card__bottom__prices__price--discount">{{ (elemProduct.price - elemProduct.price / 100 * elemProduct.discountPercentage).toFixed(2) }}</div> -->
            <div class="card__bottom__prices__price card__bottom__prices__price--common">{{elemProduct.products.price}}</div>
          </div>
          <p class="card__bottom__title">
            {{ elemProduct.products.title }}
          </p>
        </div>
        <div>
          <icon-base 
            @click="handlerActionFavoritesProduct"
            style="cursor: pointer;" 
            width="30" 
            height="30" 
            iconColor="red" 
            iconName="понравилось"
          >
            <heart-icon/>
          </icon-base>
        </div>
      </div>
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
import { FavoritesModel } from '@/entities/favorites-item';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, ref } from 'vue';

import HeartIcon from '@/app/assets/images/icons/HeartIcon.vue';

defineComponent({
  HeartIcon
})

const props = defineProps({
  idFavoritesElem: {
    type: String,
    required: true,
  },
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

//bucket store
const bucketStore = BucketModel.useBucketStore();
const { postCreateBucketObject, postRemoveBucketObject } = bucketStore;

//favorites store
const favoritesStore = FavoritesModel.useFavoritesStore();
const { postRemoveFavoritesObject } = favoritesStore;

const handlerActionBucketProduct = async () => {
  let isActionWasGood = false;
  if (props.elemProduct.isProductInBucket) {
    isActionWasGood = await postRemoveBucketObject(props.elemProduct.products.id);
    if (isActionWasGood) {
      props.elemProduct.isProductInBucket = false;
    }
    return;
  }
  isActionWasGood = await postCreateBucketObject(props.elemProduct.products.id, quantityProducts.value);
  if (isActionWasGood) {
    props.elemProduct.isProductInBucket = true;
  }
}

const handlerActionFavoritesProduct = async () => {
  let isActionWasGood = false;
  isActionWasGood = await postRemoveFavoritesObject(props.elemProduct.products.id, props.idFavoritesElem);
}

const handlerShowProduct = () => {
  props.getProduct(props.elemProduct.products.id);
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

<style src="./FavoritesItem.style.scss" lang="scss" scoped></style>