<template>
  <div class="container">
      <div class="generalInfo">
        <img src="../../assets/photo/photoProduct.png" alt="фон" class="fon">
        <p>Бесплатная доставка от 1000 рублей</p>
      </div>
    <dialog-window v-model:show="dialogVisible">
      <div>
        <p>Запросы можно посмотреть в разделе корзина</p>
        <p>Авторизация находится в рядом с оранжевым кружком, стрелка вниз</p>
        <input-elem    
          v-model="firstName"
        />
        <p>{{ firstName }}</p>
      </div>
    </dialog-window>
    <button-elem
      :clName="null"
      :title="'Показать информацию'"
      :handler="handlerButtonShowDialog"
      :width="'100%'"
      :height="'48px'"
      :background="'#70C05B'"
      :textColor="null"
      :fontSize="null"
      :fontWeight="null"
      :margin="'24px 0 0 0'"
      :borderRadius="'0'"
      :icon="null"
    />
   
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialogVisible = ref(false);
const firstName = ref('');

const handlerButton = () => {
  console.log("Click");
}

const handlerButtonShowDialog = () => {
  dialogVisible.value = true;
}
</script>

<style src="./MainPage.style.scss" lang="scss" scoped></style>