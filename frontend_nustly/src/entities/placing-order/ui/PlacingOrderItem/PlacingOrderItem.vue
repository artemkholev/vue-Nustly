<template>
  <div class="container">
    <div>
      <h3>{{ product?.title }}</h3>
      <div>
        <p><strong>Цена: </strong>{{ product?.price }}₽</p>
        <p><strong>Количество: </strong>1</p>
      </div>
    </div>
   
    <img style="border-radius: 5px;" :src="product?.photo" height="80" alt="Фото продукта">
  </div>
</template>

<script setup lang="ts">

defineProps({
  product: {
    type: Object,
  }
})
</script>

<style src="./PlacingOrderItem.style.scss" lang="scss" scoped />