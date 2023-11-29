<template>
  <div :class="contentClasses">
    <ContainerPage :is-full-width="device === 'mobile' ? true : false" :width="deviceWidth">
      {{ $route.meta.title }}
      <!-- <v-divider v-if="$route.meta.title"></v-divider> -->
      <slot></slot>
    </ContainerPage>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ContainerPage from '../Container/ContainerPage.vue';
import { useMedia } from '@/composables/useMedia';
import store from '@/store';


const contentClasses = computed(() => {
  return { content: true, ['dark-content']: store.state.isDark };
});

const { device } = useMedia();

const deviceWidth = computed(() => {
  if (device.value === 'desktop') return 1200;
  if (device.value === 'tablet') return 700;
  return 360;
});
</script>

<style src="./ContentPage.style.scss" lang="scss" scoped />