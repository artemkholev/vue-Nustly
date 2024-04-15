<template>
  <div class="burger-theme">
    <button 
      class="burger-theme__theme" 
      @click="toggleTheme"
    >
      <icon-base v-if="!isDarkTheme" width="35" height="35"><theme_night-icon/></icon-base>
      <icon-base v-else width="35" height="35" iconColor="white"><theme_day-icon/></icon-base>
    </button>
    <burger-elem class="burger-theme__burger"/>
  </div> 
</template>

<script setup lang="ts">
import { computed, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/shared/stores/theme';

import Theme_nightIcon from '@/app/assets/images/icons/Theme_nightIcon.vue';
import Theme_dayIcon from '@/app/assets/images/icons/Theme_dayIcon.vue';

defineComponent({
  Theme_nightIcon,
  Theme_dayIcon,
})

//theme
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);
const { toggleTheme } = themeStore;

const headerClasses = computed(() => {
  return { 'burger-theme': true, ['burger-theme_dark']: isDarkTheme.value };
});
</script>

<style src="./BurgerTheme.scss" lang="scss" scoped></style>