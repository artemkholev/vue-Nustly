<template>
  <div class="containerBucket">
    <div class="sortOption">
      <select-elem
        v-model="selected"
        :options="selectOptions"
      />
    </div>
    <div>
      <BucketList :posts="posts"/>
      <p v-if="isLoading">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import BucketList from '../../components/BucketList/BucketList.vue';
import { reactive, onMounted, ref, computed } from 'vue';
import type {BucketElem} from './BucketPage.types.ts'

let posts = reactive([]);
const isLoading = ref(false);
const selected = ref('');
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

const fetchPosts = async() => {
  try {
    isLoading.value = true;
    const responce = await axios.get('https://jsonplaceholder.typicode.com/posts');
    posts = responce.data;
  } catch(e) {
    console.log('Error get Posts');
  } finally {
    isLoading.value = false;
  }
}

const sortedPost = computed(() => {
  return posts
  // return [...posts].sort((post1: BucketElem, post2: BucketElem) => post1[selected.value]?.localeCompare(post2[selected.value]))
})

onMounted(() => {
  fetchPosts()
})
</script>

<style src="./BucketPage.style.scss" lang="scss" scoped></style>