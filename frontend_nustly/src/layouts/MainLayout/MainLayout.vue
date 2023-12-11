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
import HeaderPage from '@/widgets/Header/HeaderPage.vue';
import FooterPage from '@/widgets/Footer/FooterPage.vue';
import ContentPage from '@/widgets/content/ContentPage.vue';
</script>

<style src="./MainLayout.style.scss" lang="scss" scoped></style>