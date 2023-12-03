<template>
  <div class="card">
    <div class="card__top">
      <div class="card__image">
        <img
          :src="elemCatalog.thumbnail"
          alt="товар"
        />
      </div>
      <div class="card__label">-{{ elemCatalog.discountPercentage }}%</div>
    </div>
    <div class="card__bottom">
      <div class="card__prices">
        <div class="card__price card__price--discount">{{ elemCatalog.price - elemCatalog.price / 100 * elemCatalog.discountPercentage  }}</div>
        <div class="card__price card__price--common">{{elemCatalog.price}}</div>
      </div>
      <!-- Ссылка-название товара -->
      <p class="card__title">
        {{ elemCatalog.title }}
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

defineProps({
  elemCatalog: {
    type: Object,
    required: true,
  }
})

</script>

<style src="./CatalogItem.style.scss" lang="scss" scoped></style>