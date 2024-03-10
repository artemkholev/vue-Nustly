<template>
  <form @submit.prevent :style="{padding: '10px'}">
    <h1 :style="{marginBottom: '30px'}">Создать новый товар</h1>
    <input-elem    
      v-model="productInfo.title"
      :typeInput="'text'"
      :placeholderInput="'Название'"
    />
    <text-area 
      v-model="productInfo.description" 
      :placeholderInput="'Описание'"
    />
    <input-elem    
      v-model="productInfo.manufacturer"
      :typeInput="'text'"
      :placeholderInput="'Производитель'"
    />
    <input-elem    
      v-model="productInfo.price"
      :typeInput="'number'"
      :placeholderInput="'Цена'"
    />
    <input 
      type="file" 
      @change="onFileChange" 
      :style="{margin: '15px 0'}"
    >
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
import { computed, reactive, ref } from 'vue';

const props = defineProps({
  categoryId: {
    required: true,
  },
  postCreateProduct: {
    type: Function,
    required: true,
  },
  getProducts: {
    type: Function,
    required: true,
  },
  handlerCreateProductDialogVisible: {
    type: Function,
    required: true,
  }
})

const productInfo = reactive({
  id_categories: props.categoryId,
  title: '',
  description: '',
  manufacturer: '',
  price: null,
});
const fileImg = ref(null);


const productForm = computed(() => {
  return {
    id_categories: props.categoryId,
    title: productInfo.title,
    description: productInfo.description,
    manufacturer: productInfo.manufacturer,
    price: productInfo.price
  };
});

const onFileChange = (event: any) => {
  fileImg.value = event.target.files[0];
};

const submit = async () => {
  if (!fileImg.value) {
    alert('Фотография не прекреплена');
  } else {
    await props.postCreateProduct(productForm.value, fileImg.value);
    props.getProducts(props.categoryId);
    props.handlerCreateProductDialogVisible();
    fileImg.value = null;
    productInfo.title = '';
    productInfo.description = '';
    productInfo.manufacturer = '';
    productInfo.price = null;
  }
};
</script>

<style scoped>

</style>