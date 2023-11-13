<template>
  <div class="Wrapper">
    <HeaderPage/>
    <MainPage/>
    <FooterPage/>
  </div>
</template>


<script setup lang="ts">
import FooterPage from './components/Footer/FooterPage.vue';
import HeaderPage from './components/Header/HeaderPage.vue';
import MainPage from './components/Main/MainPage.vue';
</script>

<style lang="scss" scoped>

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}


</style>