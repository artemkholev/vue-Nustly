<template>
  <div class="side-bar">
    <div class="side-bar__header">
      <p class="side-bar__header__title">
        Фильтр
      </p>
      <span @click="closeComponent($event)">×</span>
    </div>
    <div class="side-bar__container">
      <div style="display: flex; justify-content: space-between;">
        <p style="font-size: 30px;">Цена:</p>
        <button 
          style="border: none; border-radius: 5px; padding: 10px; cursor: pointer;"
          @click="handlerCleanValues"
        >
          Очистить
        </button>
      </div>
      
      <div style="display: flex; padding: 20px 0; align-items: center; justify-content: space-between">
        <input 
          style="width: 40%; height: 40px; border-radius: 5px;" 
          type="number"
          v-model="minPrice"
          min="0"
        >
        <span style="width: 5%; height: 1px; color: black; border: 1px solid black; margin: 0 20px;"></span>
        <input 
          style="width: 40%; height: 40px; border-radius: 5px;" 
          type="number"
          v-model="maxPrice"
          min="0"
        >
      </div>
    </div>
    <div class="side-bar__footer">
      <button-elem
        :clName="null"
        :title="'Применить'"
        :handler="actionFilter"
        :width="'350px'"
        :height="'55px'"
        :background="'orangered'"
        :textColor="null"
        :fontSize="null"
        :fontWeight="null"
        :margin="'0 0 0 0'"
        :borderRadius="'1px'"
        :icon="null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const minPrice = ref(0);
const maxPrice = ref(0);

const handlerCleanValues = () => {
  minPrice.value = 0;
  maxPrice.value = 0;
  actionFilter();
}

const emit = defineEmits(['close', 'actionFilter'])

const handleClickOutside = (event: any) => {
  const componentElement = document.querySelector('.filters');
  if (componentElement && !componentElement.contains(event.target)) {
    closeComponent(event);
  }
};

const actionFilter = () => {
  emit('actionFilter', minPrice.value, maxPrice.value);
}

const closeComponent = (event: any) => {
  emit('close', event)
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
})
</script>

<style src="./FinderSidebarProduct.style.scss" lang="scss" scoped></style>