<template>
  <div :class="cardClasses">
    <img
      :src="elemCatalog.photo"
      alt="карточка каталога"
    />
  </div>
</template>

<script setup lang="ts">
import type { ICatalog } from '@/shered/api/catalogApi/catalogApi';
import { useThemeStore } from '@/shered/store/theme';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

defineProps({
  elemCatalog: {
    type: Object,
    required: true,
  }
})

//theme
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const cardClasses = computed(() => {
  return { card: true, ['dark-card']: isDarkTheme.value };
});
</script>

<style src="./CatalogItem.scss" lang="scss" scoped/>