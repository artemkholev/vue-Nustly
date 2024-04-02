<template>
  <div v-if="posts.length > 0">
    <h3>Корзина</h3>
    <div name="bucket-list">
      <PostItem v-for="post in posts"
        :post="post"
        :key="post.id"
      />
    </div>
  </div>
  <h2 v-else>
    Данных нет
  </h2>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import PostItem from '@/entities/PostItem/PostItem.vue';
import type { IPost } from "@/shared/api/postsApi/postsApi.types";

defineProps({
  posts: {
    type: Array<IPost>,
    required: true
  }
})
</script>

<style src="./BucketList.style.scss" lang="scss" scoped></style>@/shared/api/postsApi/postsApi.types