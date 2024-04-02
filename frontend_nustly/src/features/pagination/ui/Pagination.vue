<template>
  <div class="pages"> 
    <div class="pages__name">Страницы:</div>
    <div 
      v-for="pagePath in totalPages" 
      :key="pagePath"
      class="pages__navigation-pages"
      :class="{
        'pages__carrent-page': page === pagePath
      }"
      @click="changePage(pagePath)"
    >
      {{ pagePath }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
const props = defineProps({
  totalPages: {
    type: Number,
    default: 1
  },
  page: {
    type: Number,
    default: 1,
  }
})

const emit = defineEmits(['changePage'])

const changePage = (currentPage: number) => {
  emit('changePage', currentPage)
};
</script>

<style src="./Pagination.style.scss" lang="scss" scoped></style>