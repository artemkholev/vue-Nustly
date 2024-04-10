<template>
  <nav :class="headerClasses">
    <router-link to="/user/favorites" class="navigation-container">
      <icon-base width="35" height="35" iconName="Избранное"><favorites-icon/></icon-base>
      <p>Избранное</p>
    </router-link>
    <router-link to="/user/orders" class="navigation-container">
      <icon-base width="35" height="35" iconName="Заказы"><orders-icon/></icon-base>
      <p>Заказы</p>
    </router-link>
    <router-link to="/user/bucket" class="navigation-container">
      <icon-base width="35" height="35" iconName="Корзина"><bucket-icon/></icon-base>
      <p>Корзина</p>
    </router-link>

    <div class="navigation-container__user-menu user-menu">
      <router-link to="/user/account" class="user-menu__photo">
        <icon-base width="35" height="35" iconName="Акаунт"><user-photo/></icon-base>
      </router-link>
      <p class="user-menu__name">{{ getUserName }}</p>
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
</template>

<script setup lang="ts">
import { ref, computed, defineComponent } from 'vue';
import { useAuthStore } from '@/shared/stores/auth';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/shared/stores/theme';
import { useAppRoutes } from '@/app/providers';

import MagnifierIcon from '@/app/assets/images/icons/MagnifierIcon.vue';
import FavoritesIcon from '@/app/assets/images/icons/FavoritesIcon.vue';
import OrdersIcon from '@/app/assets/images/icons/OrdersIcon.vue';
import BucketIcon from '@/app/assets/images/icons/BucketIcon.vue';
import LogoutIcon from '@/app/assets/images/icons/LogoutIcon.vue';
import ArrowIcon from '@/app/assets/images/icons/ArrowIcon.vue';
import UserPhoto from '@/app/assets/images/icons/UserPhoto.vue';

defineComponent({
  UserPhoto,
  MagnifierIcon,
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

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const headerClasses = computed(() => {
  return { 'navigation': true, ['navigation_dark']: isDarkTheme.value };
});

//dropdown
const isDropdown = ref(false);
const dropdown = () => {
  isDropdown.value = !isDropdown.value;
};

const getUserName = computed(() => {
  return userName.value.split('@')[0];
})
</script>

<style src="./UserAreaNav.style.scss" lang="scss" scoped></style>