<template>
  <div class="page_wrapper" >
    <HeaderPage
      @isDark="(value) => {
        emitDataIsDark = value; 
      }"
    />
    <MainPage
      class="content"
    />
    <FooterPage/>
  </div>
</template>


<script setup lang="ts">
import FooterPage from './components/Footer/FooterPage.vue';
import HeaderPage from './components/Header/HeaderPage.vue';
import MainPage from './components/Main/MainPage.vue';

import { ref } from 'vue';

const emitDataIsDark = ref<boolean>(false);

</script>

<style lang="scss" scoped>
.page_wrapper {
  display: grid;
  grid-template-areas:
    'header'
    'content'
    'footer';
  grid-template-rows: 60px auto 60px;
  width: 100vw;
  height: 100vh;

  @media(max-width:768px) {
    grid-template-rows: 56px auto 108px;
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>