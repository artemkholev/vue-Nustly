<template>
  <sidebar-elem>
    <div :class="sidebarClasses">
      <h1>Menu</h1>
      <div 
        v-if="isAuth" 
        class="sidebar__for-user"
      >
        <div class="user">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="#FF6633" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <circle cx="20" cy="20" r="20" fill="#FF6633"/>
          </svg>
          <p class="name">{{ userName }}</p>
        </div>

        <router-link to="/catalog" 
          class="sidebar__for-user__catalog-button"
          @click="toggleSidebar" 
        >
            <icon-base  width="35" height="35" iconName="catalog"><catalog-icon/></icon-base>
            <p>Каталог</p>
        </router-link>

        <ul 
          class="sidebar__for-user__nav"
          @click="toggleSidebar" 
        >
          <li>
            <router-link to="/user/favorites">
              Избранное
            </router-link>
          </li>
          <li>
            <router-link to="/user/orders">
              Заказы
            </router-link>
          </li>
          <li>
            <router-link to="/user/bucket">
              Корзина
            </router-link>
          </li>
        </ul>

        <router-link 
          to="/" 
          @click="handleChangeIsAuth"
          class="logout"
        >
          <p className={style.dropDownMenuText}>Выход</p>
        </router-link>
      </div> 
      <div v-else
        class="sidebar__login"
        @click="toggleSidebar"
      >
        <router-link to="/catalog" :style="{ marginBottom: '10px'}">Каталог</router-link>
        <router-link to="/auth" :style="{ marginBottom: '10px'}">Вход</router-link>
        <router-link to="/reg" :style="{ marginBottom: '10px'}">Регистрация</router-link>
      </div>
    </div>
  </sidebar-elem>

  <div :class="contentClasses">
      <!-- {{ $route.meta.title }} -->
      <!-- <v-divider v-if="$route.meta.title"></v-divider> -->
      <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useAuthStore } from '@/shared/store/auth';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/shared/store/theme';
import { defineComponent } from 'vue';

import CatalogIcon from '@/app/assets/images/icons/CatalogIcon.vue';
import { useSidebarStore } from '@/shared/store/sidebar';


defineComponent({
  CatalogIcon,
})

//theme
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const contentClasses = computed(() => {
  return { content: true, ['content_dark']: isDarkTheme.value };
});

const sidebarClasses = computed(() => {
  return { sidebar: true, ['sidebar_dark']: isDarkTheme.value };
});

//sidebar
const sidebarStore = useSidebarStore();
const { toggleSidebar } = sidebarStore

//auth
const authStore = useAuthStore();
const { isAuth, userName } = storeToRefs(authStore);
const { logout } = authStore

const handleChangeIsAuth = () => {
  toggleSidebar();
  logout();
}
</script>

<style src="./ContentPage.style.scss" lang="scss" scoped />@/shared/store/auth@/shared/store/theme@/shared/store/sidebar