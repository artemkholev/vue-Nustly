<template>
  <div class="side-bar">
    <div class="side-bar__header">
      <p class="side-bar__header__title">
        Фильтр
      </p>
      <span @click="$emit('close', $event)">×</span>
    </div>
    <div class="side-bar__container">

    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style src="./FinderSidebarProduct.style.scss" lang="scss" scoped></style>