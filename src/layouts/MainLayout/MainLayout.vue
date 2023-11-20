<template>
  <div class="page_wrapper" >
    <HeaderPage/>
     <ContentPage>
      <slot></slot>
    </ContentPage>
    <FooterPage/>
  </div>
</template>

<script setup lang="ts">
import MainPage from '@/components/Main/MainPage.vue';
import HeaderPage from '@/components/Header/HeaderPage.vue';
import FooterPage from '@/components/Footer/FooterPage.vue';
import ContentPage from '@/components/content/ContentPage.vue';
</script>

<style src="./MainLayout.style.scss" lang="scss" scoped></style>