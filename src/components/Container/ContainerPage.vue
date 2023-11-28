<template>
  <div :style="style" class="page-container"> 
    <sidebar-elem>
      <ul class="sidebar-panel-nav">
        <li>
          <router-link to="/" :style="{color: isDarkStyle}">Home</router-link>
        </li>
        <li>
          <router-link to="/" :style="{color: isDarkStyle}">About</router-link>
        </li>
        <li>
          <router-link to="/" :style="{color: isDarkStyle}">Contact</router-link>
        </li>
      </ul>
    </sidebar-elem>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import store from '@/store'
import type { IContainerProps } from './ContainerPage.types';

const props = defineProps<IContainerProps>();
const { width, isFullWidth } = toRefs(props);

const style = computed(() => {
  return {
    ['--width-container']: isFullWidth.value ? '100%' : width.value + 'px'
  };
});

const isDarkStyle = computed(() => {
  return store.state.isDark ? 'black' : 'white';
});
</script>

<style src="./ContainerPage.style.scss" lang="scss" scoped></style>