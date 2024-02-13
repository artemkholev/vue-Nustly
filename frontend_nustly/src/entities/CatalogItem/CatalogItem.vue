<template>
  <div 
    :class="cardClasses"
  >
    <button 
      type="button" 
      class="card__delete"
      @click.self="() => { 
        deleteCatalog(elemCatalog.id)
        getCatalog()
      }"
      >×
    </button>
    <figure class="overlay"
      @mousedown.left="$router.push({
        name: PathNames.PRODUCTS,
        params: {
          id: elemCatalog.id
        },
        query: $route.query
      })"
    >
      <img
        class="card__photo"
        :src="elemCatalog.photo"
        alt="карточка каталога"
      />
      <p class="card__title">{{ elemCatalog.title }}</p>
    </figure>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/shered/store/theme';
import { PathNames } from '@/shered/constants/route.constants'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useCatalogStore } from '@/shered/store/catalog';

defineProps({
  elemCatalog: {
    type: Object,
    required: true,
  }
})

//catalog store
const catalogStore = useCatalogStore();
const { deleteCatalog, getCatalog } = catalogStore;

//theme store
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const cardClasses = computed(() => {
  return { card: true, ['dark-card']: isDarkTheme.value };
});
</script>

<style src="./CatalogItem.scss" lang="scss" scoped/>