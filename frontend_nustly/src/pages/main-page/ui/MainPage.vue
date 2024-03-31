<template>
  <div class="container">
      <div class="generalInfo">
        <img src="@/app/assets/photo/photoProduct.png" alt="фон" class="fon">
        <p>Бесплатная доставка от 1000 рублей</p>
      </div>
    <dialog-window v-model:show="dialogVisible">
      <div>
        <p>Данный сайт находится на стадии разработки, извините, но функцианал ограничен.</p>
        <p>Вы можете написать отзыв и отправить нам, пожелания и недочёты</p>
        <input-elem    
          v-model="info"
        />
        <p>{{ info }}</p>
        <button-elem
          :clName="null"
          :title="'Отправить'"
          :handler="handleSend"
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
      </div>
    </dialog-window>
    <button-elem
      :clName="null"
      :title="'Показать информацию'"
      :handler="handlerButtonShowDialog"
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
   
  </div>
</template>

<script setup lang="ts">
import { apiAxios } from '@/shared/api';
import { ref } from 'vue';

const dialogVisible = ref(false);
const info = ref('');

const handlerButtonShowDialog = async () => {
  await apiAxios.post('/auth/refresh')
  // dialogVisible.value = true;
}

const handleSend = () => {
  info.value = '';
  dialogVisible.value = false;
}
</script>

<style src="./MainPage.style.scss" lang="scss" scoped></style>@/shared/api