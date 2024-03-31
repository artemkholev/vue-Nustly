<template>
 <form @submit.prevent :style="{padding: '10px'}" :class="createCatalogClasses">
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
</template>

<script setup lang="ts">
import { useThemeStore } from '@/shared/store/theme';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';

const props = defineProps({
  handlerDialogVisible: {
    type: Function,
    required: true,
  },
  getCatalog: {
    type: Function,
    required: true,
  },
  createCatalog: {
    type: Function,
    required: true,
  }
})

//theme store
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const createCatalogClasses = computed(() => {
  return { 'create-catalog': true, ['create-catalog_dark']: isDarkTheme.value };
});

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
    await props.createCatalog(catalogForm.value, fileImg.value);
    props.getCatalog();
    props.handlerDialogVisible();
    fileImg.value = null;
    catalogInfo.title = '';
    catalogInfo.visibility = false;
  }
};
</script>

<style src="./CreateCatalog.style.scss" lang="scss" scoped></style>@/shared/store/theme