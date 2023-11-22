<template>
  <component :is="$route.meta.layout || 'div'" v-cloak>
    <router-view />
  </component>
</template>


<script setup lang="ts">

</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
</style>