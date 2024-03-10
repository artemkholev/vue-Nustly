<template>
  <div>{{ product }}</div>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/shered/store/products';
import { storeToRefs } from 'pinia';

const productsStore = useProductsStore();
const { product } = storeToRefs(productsStore);
</script>

<style src="./ShowProduct.style.scss" lang="scss" scoped></style>