<template>
  <div class="container">
    <div class="finctionsHeader">
      <router-link to="/" class="logo">
        <LogoIcon/>
        <p>Nustly</p>
      </router-link>
      <button class="catalogButton">
        <BurgerIcon/>
        <p>Каталог</p>
      </button>
      <div class="search">
        <input type="text" placeholder="Найти товар"> 
        <button>
          <MagnifierIcon/>
        </button>
      </div>
    </div>
    <div class="generalInfo">
      <router-link to="/favorites" class="favorites">
        <FavoritesIcon/>
        <p>Избранное</p>
      </router-link>
      <router-link to="/orders" class="orders">
        <OrdersIcon/>
        <p>Заказы</p>
      </router-link>
      <router-link to="/bucket" class="bucket">
        <BucketIcon/>
        <p>Корзина</p>
      </router-link>
      <div class="userMenu">
        <div class="photo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="#FF6633" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <circle cx="20" cy="20" r="20" fill="#FF6633"/>
          </svg>
        </div>
        <p class="name">{{ userName }}</p>
        <div class="dropdown">
          <button @click="dropdown" class="dropbtn">
            <ArrowIcon/>
          </button>
          <div v-if="isDropdown" class="dropdown-content">
            <p @click="">Вход</p>
            <p @click="">Регистрация</p>
          </div>
        </div>
      </div>
    </div>
    <button 
      class="isDark" 
      @click="hendleThemeClick"
    >
      <ThemeIcon/>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LogoIcon from '../../assets/svg/LogoIcon.vue';
import BurgerIcon from '../../assets/svg/BurgerIcon.vue'
import MagnifierIcon from '../../assets/svg/MagnifierIcon.vue'
import FavoritesIcon from '../../assets/svg/FavoritesIcon.vue'
import OrdersIcon from '../../assets/svg/OrdersIcon.vue'
import BucketIcon from '../../assets/svg/BucketIcon.vue'
import ThemeIcon from '../../assets/svg/ThemeIcon.vue'
import ArrowIcon from '../../assets/svg/ArrowIcon.vue'


const userName = ref('none');
const isDark = ref(false);
const isDropdown = ref(false);

const dropdown = () => {
  isDropdown.value = !isDropdown.value;
}

const hendleThemeClick = () => {
  isDark.value = !isDark.value;
  document.body.className =  isDark.value ? 'dark-theme' : 'light-theme';
}


</script>

<style src="./HeaderPage.style.scss" lang="scss" scoped></style>