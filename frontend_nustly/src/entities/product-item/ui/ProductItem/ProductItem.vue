<template>
  <div :class="cardClasses">
    <div class="card__top"> 
      <button 
        v-if="role == 'ADMIN'" 
        type="button" 
        class="card__top__delete"
        @click="handlerDeleteProduct"
      >
        ×
      </button>
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
      <div style="display: flex; justify-content: space-between">
        <div>
          <div class="card__bottom__prices">
            <!-- <div class="card__bottom__prices__price card__bottom__prices__price--discount">{{ (elemProduct.price - elemProduct.price / 100 * elemProduct.discountPercentage).toFixed(2) }}</div> -->
            <div class="card__bottom__prices__price card__bottom__prices__price--common">{{elemProduct.price}}</div>
          </div>
          <p class="card__bottom__title">
            {{ elemProduct.title }}
          </p>
        </div>
        <div>
          <icon-base 
            @click="handlerActionFavoritesProduct"
            style="cursor: pointer;" 
            width="30" 
            height="30" 
            :iconColor="elemProduct.isProductInFavorites ? 'red' : 'gray'" 
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
import { useProductsStore } from '../../model';
import { BucketModel } from '@/entities/bucket-item'
import { FavoritesModel } from '@/entities/favorites-item';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, ref } from 'vue';

import HeartIcon from '@/app/assets/images/icons/HeartIcon.vue';

defineComponent({
  HeartIcon
})

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

//bucket store
const bucketStore = BucketModel.useBucketStore();
const { postCreateBucketObject, postRemoveBucketObject } = bucketStore;

//favorites store
const favoritesStore = FavoritesModel.useFavoritesStore();
const { postCreateFavoritesObject, postRemoveFavoritesObject } = favoritesStore;

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

const handlerActionFavoritesProduct = async () => {
  let isActionWasGood = false;
  if (props.elemProduct.isProductInFavorites) {
    isActionWasGood = await postRemoveFavoritesObject(props.elemProduct.id);
    if (isActionWasGood) {
      props.elemProduct.isProductInFavorites = false;
    }
    return;
  }
  isActionWasGood = await postCreateFavoritesObject(props.elemProduct.id, quantityProducts.value);
  if (isActionWasGood) {
    props.elemProduct.isProductInFavorites = true;
  }
}

const productsStore = useProductsStore();
const { products } = storeToRefs(productsStore);
const { postRemoveProduct } = productsStore;

const handlerDeleteProduct = () => {
  postRemoveProduct(props.elemProduct.id);
  products.value = products.value.filter(elem => elem.id !== props.elemProduct.id);
}

const handlerShowProduct = () => {
  props.getProduct(props.elemProduct.id);
  props.handlerShowProductDialogVisible()
}

const authStore = useAuthStore();
const { isAuth, role } = storeToRefs(authStore);

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const cardClasses = computed(() => {
  return { card: true, ['card_dark']: isDarkTheme.value };
});
</script>

<style src="./ProductItem.style.scss" lang="scss" scoped></style>