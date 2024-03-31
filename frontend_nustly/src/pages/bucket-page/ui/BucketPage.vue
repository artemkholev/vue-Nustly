<template>
  <div class="containerBucket">
    <div class="sortOption">
      <select-elem
        v-model="selected"
        :options="selectOptions"
      />
    </div>
    <BucketList :posts="selected === 'general' ? posts : sortedPost"/>
    <p v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
    <p v-if="isError" :style="{margin: '10px', color: 'red'}">Ошибка: {{ isError }}</p>
    <div class="page__wrapper">
      <div 
        v-for="pagePath in totalPages" 
        :key="pagePath"
        class="navigation-pages"
        :class="{
          'carrent-page': page === pagePath
        }"
        @click="changePage(pagePath)"
      >
        {{ pagePath }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import BucketList from '@/features/BucketList/BucketList.vue';
import { usePostsStore } from '@/shered/store/posts';

const postsStore = usePostsStore();
const { isError, isLoading, posts, page, selected, totalPages, selectOptions, sortedPost } = storeToRefs(postsStore);
const { getPosts } = postsStore;

const changePage = (currentPage: number) => {
  page.value = currentPage;
};

watch(page, () => {
  getPosts();
});

onMounted(() => {
  getPosts()
});
</script>

<style src="./BucketPage.style.scss" lang="scss" scoped></style>