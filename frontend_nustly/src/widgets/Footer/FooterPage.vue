<template>
  <div :class="footerClasses">
    <div class="footer-container__info">
      <div class="footer-container__info__links">
        <router-link to="/" class="logo">
          <icon-base><logo-icon/></icon-base>
        </router-link>

        <router-link to="/about">О компании</router-link>
        <router-link to="/vacancy">Вакансии</router-link>
        <router-link to="/articles">Статьи</router-link>
        <router-link to="/politics">Моё резюме</router-link>
      </div>
      <div class="footer-container__info__contacts">
        <div class="footer-container__info__contacts__messengers">
          <a href="https://t.me/ArtKholev"  target="_blank">
            <icon-base  width="30" height="30"><tg-icon/></icon-base>
          </a>
          <a href="https://vk.com/idart_k"  target="_blank">
            <icon-base  width="30" height="30"><vk-icon/></icon-base>
          </a>
        </div>
        <div class="footer-container__info__contacts__phone">
          <icon-base  width="30" height="30"><phone-icon/></icon-base>
          <p>8 800 777 33 33</p>
        </div>
      </div> 
    </div>
    
    <p class="footer-container__name-company">© Nustly, {{ getYear }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/shared/store/theme';
import LogoIcon from '@/app/assets/images/icons/LogoIcon.vue';
import TgIcon from '@/app/assets/images/icons/TgIcon.vue';
import VkIcon from '@/app/assets/images/icons/VkIcon.vue';
import PhoneIcon from '@/app/assets/images/icons/PhoneIcon.vue'

defineComponent({
  LogoIcon,
  TgIcon,
  VkIcon,
  PhoneIcon,
})

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const getYear = computed(() => {
  return new Date().getFullYear();
});

const footerClasses = computed(() => {
  return { "footer-container": true, ['footer-container_dark']: isDarkTheme.value };
});
</script>


<style src="./FooterPage.style.scss" lang="scss" scoped></style>@/shared/store/theme