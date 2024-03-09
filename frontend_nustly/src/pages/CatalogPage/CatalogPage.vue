<template>
  <div :class="catalogClasses">
    <div class="catalog__header">
      <h1>Каталог {{ role }}</h1>
      <button-elem
        v-if="role == 'ADMIN'"
        :clName="null"
        :title="'Добавить категорию'"
        :handler="handlerDialogVisible"
        :width="'35vw'"
        :height="'55px'"
        :background="'#70C05B'"
        :textColor="null"
        :fontSize="null"
        :fontWeight="null"
        :margin="'0 0 0 0'"
        :borderRadius="'5px'"
        :icon="null"
      />
    </div>

    <div class="catalog__cards" 
      v-if="catalogElems.length"
    >
      <template v-for="elem in catalogElems" :key="elem.id">
        <CatalogItem :elemCatalog="elem"/>
      </template>
    </div>
    <p  v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
    <p  v-if="errorMessage.length" :style="{margin: '10px', color: 'red'}">{{ errorMessage }}</p>
    <h2 v-if="!isLoading && (catalogElems.length === 0)" class="catalog__error">
      Данных нет
    </h2>
    <dialog-window v-model:show="dialogVisible">
      <CreateCatalog
        :handlerDialogVisible="handlerDialogVisible"
        :getCatalog="getCatalog"
        :createCatalog="createCatalog"
      />
    </dialog-window>
  </div>
</template>

<script setup lang="ts">
import CatalogItem from '@/entities/CatalogItem/CatalogItem.vue';
import { useAuthStore } from '@/shered/store/auth';
import { useCatalogStore } from '@/shered/store/catalog';
import { useThemeStore } from '@/shered/store/theme';
import { storeToRefs } from 'pinia';
import { onMounted, computed, ref, reactive } from 'vue';
import { CreateCatalog } from '@/features/Catalog/CreateCatalog';

//catalog store
const catalogStore = useCatalogStore();
const { isLoading, catalogElems, errorMessage  } = storeToRefs(catalogStore);
const { getCatalog, createCatalog } = catalogStore;

//theme store
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const catalogClasses = computed(() => {
  return { catalog: true, ['catalog_dark']: isDarkTheme.value };
});

//auth store 
const authStore = useAuthStore();
const { role } = storeToRefs(authStore);

//dialog window
const dialogVisible = ref(false);


const handlerDialogVisible = () => {
  dialogVisible.value = !dialogVisible.value;
}

onMounted(() => {
  getCatalog()
});
</script>

<style src="./CatalogPage.style.scss" lang="scss" scoped></style>