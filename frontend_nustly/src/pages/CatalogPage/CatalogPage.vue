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
      v-if="catalogElems.length > 0"
    >
      <template v-for="elem in catalogElems" :key="elem.id">
        <CatalogItem
          v-if="elem.visibility"
          :elemCatalog="elem"
        />
      </template>
    </div>
    <p  v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
    <h2 v-if="!isLoading && (catalogElems.length === 0)" class="catalog__error">
      Данных нет
    </h2>
    <dialog-window v-model:show="dialogVisible">
      <form @submit.prevent :style="{padding: '10px'}">
        <h1 :style="{marginBottom: '30px'}">Создать новую категорию</h1>
        <input-elem    
          v-model="catalogInfo.title"
          :typeInput="'text'"
          :placeholderInput="'Название'"
        />
        <input 
          type="file" 
          @change="onFileChange" 
          :style="{margin: '15px 0'}"
        >
        <checkbox-elem
          :id="1"
          :text="'Видимость категории'"
          :textLink="''"
          :checked="false"
          :handlerErMessage="() => null"
          :trackAgreement="handlerStatusAgreement"
          :handlerFilterValue="() => null"
          :handlerCheckedFlag="() => null"
          :deleteValue="() => null"
          :selectedFilters="null"
        />
        <button-elem
          :clName="null"
          :title="'Отправить'"
          :handler="submit"
          :width="'100%'"
          :height="'48px'"
          :background="'#70C05B'"
          :textColor="null"
          :fontSize="null"
          :fontWeight="null"
          :margin="'20px 0 0 0'"
          :borderRadius="'10px'"
          :icon="null"
        />
      </form>
    </dialog-window>
  </div>
</template>

<script setup lang="ts">
import CatalogItem from '@/entities/CatalogItem/CatalogItem.vue';
import { useAuthStore } from '@/shered/store/auth';
import { useCatalogStore } from '@/shered/store/catalog';
import { useThemeStore } from '@/shered/store/theme';
import apiAxios from '@/shered/api';
import { storeToRefs } from 'pinia';
import { onMounted, computed, ref, reactive } from 'vue';

//catalog store
const catalogStore = useCatalogStore();
const { isLoading, isError, catalogElems  } = storeToRefs(catalogStore);
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

const catalogInfo = reactive({
  title: '',
  visibility: false,
});
const fileImg = ref(null);


const catalogForm = computed(() => {
  return {
    title: catalogInfo.title,
    visibility: catalogInfo.visibility,
  };
});

const handlerDialogVisible = () => {
  dialogVisible.value = !dialogVisible.value;
}

const handlerStatusAgreement = (status: boolean) => {
  catalogInfo.visibility = status;
};

const onFileChange = (event: any) => {
  fileImg.value = event.target.files[0];
};

const submit = async () => {
  if (!fileImg.value) {
    alert('Фотография не прекреплена');
  } else {
    await createCatalog(catalogForm.value, fileImg.value);
    getCatalog();
    handlerDialogVisible();
    fileImg.value = null;
    catalogInfo.title = '';
    catalogInfo.visibility = false;
  }
};

onMounted(() => {
  getCatalog()
});
</script>

<style src="./CatalogPage.style.scss" lang="scss" scoped></style>