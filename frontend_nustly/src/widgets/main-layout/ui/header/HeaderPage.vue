<template>
  <div :class="headerClasses">
    <router-link to="/" class="header-container__logo">
      <icon-base><logo-icon/></icon-base>
      <p class="nameCompany">Nustly</p>
    </router-link>

    <div class="header-container__functional">
      <router-link v-if="$route.path !== '/catalog'" to="/catalog" class="header-container__functional__catalog">
        <icon-base  width="30" height="30" iconName="catalog"><catalog-icon/></icon-base>
        <p>Каталог</p>
      </router-link>
    </div>

    <nav class="header-container__navigation">
      <router-link to="/user/favorites" class="navigation-container">
        <icon-base width="35" height="35"><favorites-icon/></icon-base>
        <p>Избранное</p>
      </router-link>
      <router-link to="/user/orders" class="navigation-container">
        <icon-base width="35" height="35"><orders-icon/></icon-base>
        <p>Заказы</p>
      </router-link>
      <router-link to="/user/bucket" class="navigation-container">
        <icon-base width="35" height="35"><bucket-icon/></icon-base>
        <p>Корзина</p>
      </router-link>

      <div class="navigation-container__user-menu user-menu">
        <div class="user-menu__photo">
        </div>
        <p class="user-menu__name">{{ userName }}</p>
        <div v-if="!isAuth" class="user-menu__dropdown">
          <button @click="dropdown" :class="{['user-menu__dropdown_active']: isDropdown}">
            <icon-base width="30" height="30" iconName="menu"><arrow-icon/></icon-base>
          </button>
          <div v-if="isDropdown" @click="isDropdown = !isDropdown" class="user-menu__dropdown__content">
            <router-link to="/auth">Вход</router-link>
            <router-link to="/reg">Регистрация</router-link>
          </div>
        </div>
        <div v-else class="logout" @click="logout">
           <icon-base width="30" height="30"><logout-icon/></icon-base>
        </div>
      </div>
    </nav>
    <div class="header-container__burger-theme">
      <button 
        class="header-container__burger-theme__theme" 
        @click="toggleTheme"
      >
        <icon-base v-if="!isDarkTheme" width="35" height="35"><theme_night-icon/></icon-base>
        <icon-base v-else width="35" height="35" iconColor="white"><theme_day-icon/></icon-base>
      </button>
      <burger-elem class="header-container__burger-theme__burger"/>
    </div> 
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineComponent } from 'vue';
import { useAuthStore } from '@/shared/stores/auth';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/shared/stores/theme';

import LogoIcon from '@/app/assets/images/icons/LogoIcon.vue';
import CatalogIcon from '@/app/assets/images/icons/CatalogIcon.vue';
import MagnifierIcon from '@/app/assets/images/icons/MagnifierIcon.vue';
import Theme_nightIcon from '@/app/assets/images/icons/Theme_nightIcon.vue';
import Theme_dayIcon from '@/app/assets/images/icons/Theme_dayIcon.vue';
import FavoritesIcon from '@/app/assets/images/icons/FavoritesIcon.vue';
import OrdersIcon from '@/app/assets/images/icons/OrdersIcon.vue';
import BucketIcon from '@/app/assets/images/icons/BucketIcon.vue';
import LogoutIcon from '@/app/assets/images/icons/LogoutIcon.vue';
import ArrowIcon from '@/app/assets/images/icons/ArrowIcon.vue';

defineComponent({
  LogoIcon,
  CatalogIcon,
  MagnifierIcon,
  Theme_nightIcon,
  Theme_dayIcon,
  FavoritesIcon,
  OrdersIcon,
  BucketIcon,
  LogoutIcon,
  ArrowIcon,
})

//auth
const authStore = useAuthStore();
const { isAuth, userName } = storeToRefs(authStore);
const { logout } = authStore;

//dropdown
const isDropdown = ref(false);
const dropdown = () => {
  isDropdown.value = !isDropdown.value;
};

//find info string
const findInfo = ref('');

//theme
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);
const { toggleTheme } = themeStore;

const headerClasses = computed(() => {
  return { 'header-container': true, ['header-container_dark']: isDarkTheme.value };
});
</script>

<style src="./HeaderPage.style.scss" lang="scss" scoped></style>