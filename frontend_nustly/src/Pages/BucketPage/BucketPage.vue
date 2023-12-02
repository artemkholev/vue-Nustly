<template>
  <div class="containerBucket">
    <div class="sortOption">
      <select-elem
        v-model="selected"
        :options="selectOptions"
      />
    </div>
    <BucketList :posts="posts"/>
    <p v-if="isLoading" :style="{margin: '10px'}">Loading...</p>
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
import axios from 'axios';
import BucketList from '../../components/BucketList/BucketList.vue';
import { reactive, onMounted, ref, computed, watch } from 'vue';
import type {BucketElem} from './BucketPage.types.ts'

let posts = reactive([]);
const isLoading = ref(false);
const selected = ref('');
const page = ref(1);
const limit = ref(10);
const totalPages = ref(0);
const selectOptions = reactive([
  {
    name: 'По названию',
    value:  'title'
  },
  {
    name: 'По содержанию',
    value: 'body'
  }
]);

const fetchPosts = async () => {
  try {
    isLoading.value = true;
    const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        _page: page.value,
        _limit: limit.value
      }
    });
    totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit.value);
    posts = responce.data;
  } catch (e) {
    console.log('Error get Posts');
  } finally {
    isLoading.value = false;
  }
};

const changePage = (currentPage: number) => {
  page.value = currentPage;
};

watch(page, () => {
  fetchPosts();
});

const sortedPost = computed(() => {
  return posts
  // return [...posts].sort((post1: BucketElem, post2: BucketElem) => post1[selected.value]?.localeCompare(post2[selected.value]))
});

onMounted(() => {
  fetchPosts()
});
</script>

<style src="./BucketPage.style.scss" lang="scss" scoped></style>