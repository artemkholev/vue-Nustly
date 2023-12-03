<template>
  <div id="burger" :class="{ 'active' : isBurgerActive }" @click.prevent="toggle">
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
import store from '@/store';
import { useThemeStore } from '@/store/theme';
import { computed } from '@vue/reactivity';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const isBurgerActive = computed(() => {
  return store.state.isNavOpen;
});
  
const toggle = () => {
  store.commit('toggleNav');
};

const isDarkStyle = computed(() => {
  return isDarkTheme.value ? 'white' : 'black';
});

defineOptions({
    name: 'burger-elem',
})
</script>

<style src="./BurgerElem.style.scss" lang="scss" scoped></style>