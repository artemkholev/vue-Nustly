<template>
  <div :style="style" class="page-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import type { IContainerProps } from './ContainerPage.types';

const props = defineProps<IContainerProps>();
const { width, isFullWidth } = toRefs(props);

const style = computed(() => {
  return {
    ['--width-container']: isFullWidth.value ? '100%' : width.value + 'px'
  };
});
</script>

<style src="./ContainerPage.style.scss" lang="scss" scoped></style>