<template>
  <div class="containerBucket">
    <div class="sortOption">
      <!-- <button-elem
        :clName="null"
        :title="'Сортировать'"
        :handler="fetchPosts"
        :width="'100%'"
        :height="'48px'"
        :background="'#70C05B'"
        :textColor="null"
        :fontSize="null"
        :fontWeight="null"
        :margin="'24px 0 0 0'"
        :borderRadius="'10px'"
        :icon="null"
      /> -->
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
import { reactive, onMounted, ref } from 'vue';

let posts = reactive([]);
const isLoading = ref(false);
const selected = ref('');
const selectOptions = reactive([
  {
    name: 'Название',
    value:  'title'
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

onMounted(() => {
  fetchPosts()
})
</script>

<style src="./BucketPage.style.scss" lang="scss" scoped></style>