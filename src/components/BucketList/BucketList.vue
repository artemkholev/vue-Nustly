<template>
  <div v-if="posts.length > 0">
    <h3>Корзина</h3>
    <transition-group name="bucket-list">
      <PostItem v-for="post in posts"
        :post="post"
        :key="post.id"
      />
    </transition-group>
  </div>
  <h2 v-else>
    Данных нет
  </h2>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import PostItem from '../PostItem/PostItem.vue';
import type { postItem } from './BucketList.types'

defineProps({
  posts: {
    type: Array<postItem>,
    required: true
  }
})
</script>

<style src="./BucketList.style.scss" lang="scss" scoped></style>