<template>
  <sidebar-elem>
    <div :class="sidebarClasses">
      <h1>Menu</h1>
      <div 
        v-if="isAuth" 
        class="forUser"
      >
        <div 
          class="user" 
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="#FF6633" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <circle cx="20" cy="20" r="20" fill="#FF6633"/>
          </svg>
          <p class="name">{{ userName }}</p>
        </div>

        <router-link to="/catalog" 
          class="catalog-button"
          @click="closeSidebarPanel" 
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 12C2.5 11.7239 2.72386 11.5 3 11.5H21C21.2761 11.5 21.5 11.7239 21.5 12C21.5 12.2761 21.2761 12.5 21 12.5H3C2.72386 12.5 2.5 12.2761 2.5 12Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 6C2.5 5.72386 2.72386 5.5 3 5.5H21C21.2761 5.5 21.5 5.72386 21.5 6C21.5 6.27614 21.2761 6.5 21 6.5H3C2.72386 6.5 2.5 6.27614 2.5 6Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 18C2.5 17.7239 2.72386 17.5 3 17.5H21C21.2761 17.5 21.5 17.7239 21.5 18C21.5 18.2761 21.2761 18.5 21 18.5H3C2.72386 18.5 2.5 18.2761 2.5 18Z" fill="white"/>
            </svg>
            <p>Каталог</p>
        </router-link>

        <ul 
          class="sidebar-panel-nav"
          @click="closeSidebarPanel" 
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
        class="login"
        @click="closeSidebarPanel"
      >
          <router-link to="/auth" :style="{ marginBottom: '10px'}">Вход</router-link>
          <router-link to="/reg" :style="{ marginBottom: '10px'}">Регистрация</router-link>
      </div>
    </div>
  </sidebar-elem>

  <div :class="contentClasses">
      {{ $route.meta.title }}
      <!-- <v-divider v-if="$route.meta.title"></v-divider> -->
      <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMedia } from '@/composables/useMedia';
import store from '@/store';
import { computed } from '@vue/reactivity';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/theme';
import router from '@/router';
import BurgerIcon from '../../assets/svg/BurgerIcon.vue';

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const contentClasses = computed(() => {
  return { content: true, ['dark-content']: isDarkTheme.value };
});

const sidebarClasses = computed(() => {
  return { sidebar: true, ['dark-sidebar']: isDarkTheme.value };
});

const { device } = useMedia();

const closeSidebarPanel = () => {
  store.commit('toggleNav');
};

const userName = ref('none');

const isDarkStyle = computed(() => {
  return store.state.isDark ? 'black' : 'white';
});

const authStore = useAuthStore();
const { isAuth } = storeToRefs(authStore);

const handleChangeIsAuth = () => {
  isAuth.value = !isAuth.value;
  closeSidebarPanel();
  router.push('/');
}
</script>

<style src="./ContentPage.style.scss" lang="scss" scoped />