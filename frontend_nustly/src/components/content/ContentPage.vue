<template>
  <div :class="contentClasses">
      <sidebar-elem>
        <h1
          :style="{display: 'flex', justifyContent: 'center', marginBottom: '30px', color: isDarkStyle}"
        >Menu</h1>

        <div 
          v-if="isAuth" 
          class="forUser"
          :style="{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column'}"
        >
          <div 
            class="user" 
            :style="{marginBottom:'20px'}"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="#FF6633" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <circle cx="20" cy="20" r="20" fill="#FF6633"/>
            </svg>
            <p class="name">{{ userName }}</p>
          </div>
          <ul 
            class="sidebar-panel-nav"
            @click="closeSidebarPanel" 
          >
            <li :style="{marginBottom: '5px'}">
              <router-link to="/user/favorites" :style="{color: isDarkStyle}">
                Избранное
              </router-link>
            </li>
            <li :style="{marginBottom: '5px'}">
              <router-link to="/user/orders" :style="{color: isDarkStyle}">
                Заказы
              </router-link>
            </li>
            <li :style="{marginBottom: '5px'}">
              <router-link to="/user/bucket" :style="{color: isDarkStyle}">
                Корзина
              </router-link>
            </li>
          </ul>

          <router-link 
            to="/" 
            @click="handleChangeIsAuth"
            :style="{display: 'flex', justifyContent: 'flex-end', marginBottom: '30px', color: isDarkStyle, marginTop: '50vh'}"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 10.8333V15.8333C15 16.2754 14.8244 16.6993 14.5118 17.0118C14.1993 17.3244 13.7754 17.5 13.3333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V6.66667C2.5 6.22464 2.67559 5.80072 2.98816 5.48816C3.30072 5.17559 3.72464 5 4.16667 5H9.16667" stroke="#2A2F37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.5 2.5H17.5V7.5" stroke="#2A2F37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.33334 11.6667L17.5 2.5" stroke="#2A2F37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className={style.dropDownMenuText}>Выход</p>
          </router-link>
        </div> 
        <div v-else
          :style="{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column'}"
          @click="closeSidebarPanel"
        >
            <router-link to="/auth" :style="{color: isDarkStyle, marginBottom: '10px'}">Вход</router-link>
            <router-link to="/reg" :style="{color: isDarkStyle, marginBottom: '10px'}">Регистрация</router-link>
        </div>
      </sidebar-elem>

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

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const contentClasses = computed(() => {
  return { content: true, ['dark-content']: isDarkTheme.value };
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