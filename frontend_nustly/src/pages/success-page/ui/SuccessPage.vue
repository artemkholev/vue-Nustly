<template>
  <div class="container">
    <div class="content">
      <div class="svg">
        <svg style="enable-background:new 0 0 36 36;" version="1.1" viewBox="0 0 36 36" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Layer_1"/>
          <g id="icons">
            <path class="st0" d="M12.8,28.7l-9.5-9.5c-0.4-0.4-0.4-1.1,0-1.6l1.5-1.5c0.4-0.4,1.1-0.4,1.6,0l7.2,7.2   l16-16c0.4-0.4,1.1-0.4,1.6,0l1.5,1.5c0.4,0.4,0.4,1.1,0,1.6L14.4,28.7C13.9,29.1,13.2,29.1,12.8,28.7z" id="check_x5F_mark_1_"/>
          </g>
        </svg>
      </div>
      <span class="message">
        Покупка прошла успешно
      </span>  
    </div>
     
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

setTimeout(function () {
  router.push('/');
}, 1000);
</script>

<style src="./SuccessPage.style.scss" lang="scss" scoped />