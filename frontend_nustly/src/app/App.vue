<template>
  <component :is="$route.meta.layout || 'div'" v-cloak>
    <router-view />
  </component>
</template>


<script setup lang="ts">
import { useAuthStore } from '@/shared/store/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const { refresh } = authStore;

onMounted(() => {
  refresh()
})
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
</style>@/shared/store/auth