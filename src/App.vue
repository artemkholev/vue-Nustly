<!-- <template>
  <div class="page_wrapper" >
    <HeaderPage/>
    <MainPage
      class="content"
    />
    <FooterPage/>
  </div>
</template> -->

<template>
  <component :is="$route.meta.layout || 'div'">
    <router-view />
  </component>
</template>


<script setup lang="ts">
// import FooterPage from './components/Footer/FooterPage.vue';
// import HeaderPage from './components/Header/HeaderPage.vue';
// import MainPage from './components/Main/MainPage.vue';

</script>

<style lang="scss" scoped>
// .page_wrapper {
//   display: grid;
//   grid-template-areas:
//     'header'
//     'content'
//     'footer';
//   grid-template-rows: 75px 750px 120px;
//   width: 100vw;
//   height: 100vh;

//   @media(max-width:768px) {
//     grid-template-rows: 56px auto 108px;
//   }
// }
</style>