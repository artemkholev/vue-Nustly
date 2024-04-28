<template>
  <div class="pages"> 
    <button 
      style="padding-right: 10px; border: none; cursor: pointer; background-color: transparent;"
      @click="emit('changePage', page - 2 > 0 ? page - 2 : page)"
    >
      {{ '<<' }}
    </button>
    <button 
      style="padding: 0 10px; border: none; cursor: pointer; background-color: transparent;"
      @click="emit('changePage', page - 1 > 0 ? page - 1 : page)"
    >
      {{ '<' }}
    </button>
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
    <button 
      style="padding: 0 10px; border: none; cursor: pointer; background-color: transparent"
      @click="emit('changePage', page + 1 <= totalPages ? page + 1 : page)"
    >
      {{ '>' }}
    </button>
    <button 
      style="padding-left: 10px; border: none; cursor: pointer; background-color: transparent"
      @click="emit('changePage', page + 2 <= totalPages ? page + 2 : page)"
    >
      {{ '>>' }}
    </button>
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