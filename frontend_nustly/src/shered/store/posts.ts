import type { IPost } from '../api/postsApi/postsApi.types';
import { apiAxios } from '../api';
import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

export const usePostsStore = defineStore('posts', () => {
  const isLoading = ref<boolean>(false);
  const isError = ref<boolean>(false);

  let posts = ref<IPost[]>([]);
  const post = ref<IPost>();

  const selected = ref<string>('');
  const page = ref(1);
  const limit = ref(10);
  const totalPages = ref(0);
  const selectOptions = reactive([
    {
      name: 'Обычный порядок',
      value:  'general'
    },
    {
      name: 'По названию',
      value:  'title'
    },
    {
      name: 'По содержанию',
      value: 'body'
    }
  ]);

  const route = useRoute();

  const sortedPost = computed(() => {
    return [...posts.value].sort((post1: any, post2: any) => post1[selected.value]?.localeCompare(post2[selected.value]))
  });

  const removePost = (post: any) => {
    posts.value = posts.value.filter(p => p.id !== post.id)
  }

  const getPosts = async () => {
    isLoading.value = true;
    try {
      const responce = await apiAxios.get('/posts', {
        params: {
          _page: page.value,
          _limit: limit.value
        }
      });
      posts.value = responce.data;
      totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit.value);
      isError.value = false;
    } catch (error) {
      isError.value = true;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };
  return { getPosts, removePost, isError, isLoading, posts, page, limit, selected, totalPages, selectOptions, sortedPost };
});