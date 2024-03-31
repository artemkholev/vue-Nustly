<template>
  <div id="burger" :class="{ 'active' : isOpenSidebar }" @click.prevent="toggleSidebar">
    <slot>
      <button type="button" class="burger-button" title="Menu">
        <span class="hidden">Toggle menu</span>
        <span class="burger-bar burger-bar--1" :style="{backgroundColor: isDarkStyle}"></span>
        <span class="burger-bar burger-bar--2" :style="{backgroundColor: isDarkStyle}"></span>
        <span class="burger-bar burger-bar--3" :style="{backgroundColor: isDarkStyle}"></span>
      </button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import store from '@/shared/store';
import { useSidebarStore } from '@/shared/store/sidebar';
import { useThemeStore } from '@/shared/store/theme';
import { computed } from '@vue/reactivity';
import { storeToRefs } from 'pinia';

//theme
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

//sidebar
const sidebarStore = useSidebarStore();
const { isOpenSidebar } = storeToRefs(sidebarStore);
const { toggleSidebar } = sidebarStore

//
const isDarkStyle = computed(() => {
  return isDarkTheme.value ? 'white' : 'black';
});

defineOptions({
    name: 'burger-elem',
})
</script>

<style src="./BurgerElem.style.scss" lang="scss" scoped></style>@/shared/store/sidebar@/shared/store/theme