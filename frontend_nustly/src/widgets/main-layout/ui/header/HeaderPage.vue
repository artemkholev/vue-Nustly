<template>
  <div :class="headerClasses">
    <router-link to="/" class="header-container__logo">
      <icon-base><logo-icon/></icon-base>
      <p class="nameCompany">Nustly</p>
    </router-link>

    <div class="header-container__functional">
      <router-link v-if="$route.path !== '/catalog'" to="/catalog" class="header-container__functional__catalog">
        <icon-base  width="30" height="30" iconName="Каталог"><catalog-icon/></icon-base>
        <p>Каталог</p>
      </router-link>
    </div>
    <UserAreaNav/>
    <BurgerTheme/>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/shared/stores/theme';
import { UserAreaNav } from '@/features/main-header/user-area-nav'
import { BurgerTheme } from '@/features/main-header/burger-theme';

import LogoIcon from '@/app/assets/images/icons/LogoIcon.vue';
import CatalogIcon from '@/app/assets/images/icons/CatalogIcon.vue';
import Theme_nightIcon from '@/app/assets/images/icons/Theme_nightIcon.vue';
import Theme_dayIcon from '@/app/assets/images/icons/Theme_dayIcon.vue';

defineComponent({
  LogoIcon,
  CatalogIcon,
  Theme_nightIcon,
  Theme_dayIcon,
})

//theme
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);
const { toggleTheme } = themeStore;

const headerClasses = computed(() => {
  return { 'header-container': true, ['header-container_dark']: isDarkTheme.value };
});
</script>

<style src="./HeaderPage.style.scss" lang="scss" scoped></style>