<template>
  <div 
    :class="cardClasses"
    @mousedown.left="$router.push({
      name: PathNames.PRODUCTS,
      params: {
        id: elemCatalog.id
      },
      query: $route.query
    })"
  >
    <figure class="overlay">
      <img
        class="card__photo"
        :src="elemCatalog.photo"
        alt="карточка каталога"
      />
      <span class="card__title">{{ elemCatalog.title }}</span>
    </figure>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/shered/store/theme';
import { PathNames } from '@/shered/constants/route.constants'
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