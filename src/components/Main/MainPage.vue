<template>
  <div class="container">
      <div class="generalInfo">
        <img src="../../assets/photo/photoProduct.png" alt="фон" class="fon">
        <p>Бесплатная доставка от 1000 рублей</p>
      </div>
    <dialog-window v-model:show="dialogVisible">
      <button-elem
        :clName="null"
        :title="'Войти'"
        :handler="handlerButton"
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
    </dialog-window>
    <button-elem
      :clName="null"
      :title="'Войти'"
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

const handlerButton = () => {
  console.log("Click");
}

const handlerButtonShowDialog = () => {
  dialogVisible.value = true;
}
</script>

<style src="./MainPage.style.scss" lang="scss" scoped></style>