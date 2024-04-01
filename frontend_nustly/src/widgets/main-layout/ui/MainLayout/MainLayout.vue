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
import HeaderPage from '../header/HeaderPage.vue';
import FooterPage from '../footer/FooterPage.vue';
import ContentPage from '../content/ContentPage.vue';
</script>

<style src="./MainLayout.style.scss" lang="scss" scoped></style>