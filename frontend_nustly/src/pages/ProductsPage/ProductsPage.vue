<template>
  <div 
    class="products-container" 
  >
    {{ categoryId }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const categoryId = route.params.products_id;
</script>

<style src="./ProductsPage.style.scss" lang="scss" scoped>

</style>