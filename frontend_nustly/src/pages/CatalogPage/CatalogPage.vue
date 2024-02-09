<template>
  <div :class="catalogClasses">
    <h1>Каталог</h1>
    <button-elem
      v-if="role == 'ADMIN'"
      :clName="null"
      :title="'Добавить категорию'"
      :handler="() => {console.log('!!!')}"
      :width="'30vw'"
      :height="'48px'"
      :background="'#70C05B'"
      :textColor="null"
      :fontSize="null"
      :fontWeight="null"
      :margin="'24px 0 0 0'"
      :borderRadius="'10px'"
      :icon="null"
    />
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
    <p v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
    <h2 class="catalog__error" v-else>
      Данных нет
    </h2>
  </div>
</template>

<script setup lang="ts">
import CatalogItem from '@/entities/CatalogItem/CatalogItem.vue';
import { useAuthStore } from '@/shered/store/auth';
import { useCatalogStore } from '@/shered/store/catalog';
import { useThemeStore } from '@/shered/store/theme';
import { storeToRefs } from 'pinia';
import { onMounted, computed } from 'vue';

//catalog store
const catalogStore = useCatalogStore();
const { isLoading, isError, catalogElems  } = storeToRefs(catalogStore);
const { getCatalog } = catalogStore;

//theme store
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const catalogClasses = computed(() => {
  return { catalog: true, ['catalog_dark']: isDarkTheme.value };
});

//auth store 
const authStore = useAuthStore();
const { role } = storeToRefs(authStore);

onMounted(() => {
  getCatalog()
});
</script>

<style src="./CatalogPage.style.scss" lang="scss" scoped></style>