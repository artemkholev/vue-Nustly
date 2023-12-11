<template>
  <div class="post">
    <div class="post__info">
      <p>{{ post.id }}</p>
      <div class="post__info-elem">
        <p><strong>Название:</strong> {{ post.title }}</p>
        <p><strong>Описание:</strong> {{ post.body }}</p>
      </div>
    </div>
    <div class="post__button" @click="removePost(post)">
      <button-elem
        :clName="'post__button'"
        :title="'Удалить'"
        :handler="() => null"
        :width="'100px'"
        :height="'48px'"
        :background="'#70C05B'"
        :textColor="null"
        :fontSize="null"
        :fontWeight="null"
        :margin="'10px'"
        :borderRadius="'10px'"
        :icon="null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/shered/store/posts';

defineProps({
  post: {
    type: Object,
    required: true,
  }
})

const postsStore = usePostsStore();
const { removePost } = postsStore;
</script>

<style src="./PostItem.style.scss" lang="scss" scoped></style>