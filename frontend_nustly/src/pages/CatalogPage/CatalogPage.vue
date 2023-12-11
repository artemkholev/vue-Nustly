<template>
  <div :class="catalogClasses">
    <h1>Каталог</h1>
    <div class="catalog__cards" 
      v-if="catalogElems.length > 0"
    >
      <div name="catalog__elem">
        <CatalogItem v-for="elem in catalogElems"
          :elemCatalog="elem"
          :key="elem.id"
        />
      </div>
    </div>
    <h2 v-else>
      Данных нет
    </h2>
    <p v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
  </div>
</template>

<script setup lang="ts">
import CatalogItem from '../../components/CatalogItem/CatalogItem.vue';
import { useCatalogStore } from '@/store/catalog';
import { useThemeStore } from '@/store/theme';
import { storeToRefs } from 'pinia';
import { onMounted, computed } from 'vue';

const catalogStore = useCatalogStore();
const { isLoading, isError, catalogElems  } = storeToRefs(catalogStore);
const { getCatalog } = catalogStore;

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const catalogClasses = computed(() => {
  return { catalog: true, ['dark-catalog']: isDarkTheme.value };
});

onMounted(() => {
  getCatalog()
});
</script>

<style src="./CatalogPage.style.scss" lang="scss" scoped></style>../../entities/CatalogItem/CatalogItem.vue