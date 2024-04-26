<template>
  <div class="side-bar">
    <div class="side-bar__header">
      <p class="side-bar__header__title">
        Фильтр
      </p>
      <span @click="$emit('close', $event)">×</span>
    </div>
    <div class="side-bar__container">
      <div style="display: flex; justify-content: space-between;">
        <p style="font-size: 30px;">Цена:</p>
        <button style="border: none; border-radius: 5px; padding: 10px; cursor: pointer;">Очистить</button>
      </div>
      
      <div style="display: flex; padding: 20px 0; align-items: center;">
        <input style="width: 40%; height: 40px; border-radius: 5px;" type="number">
        <span style="width: 5%; height: 1px; color: black; border: 1px solid black; margin: 0 20px;"></span>
        <input style="width: 40%; height: 40px; border-radius: 5px;" type="number">
      </div>
    </div>
    <div class="side-bar__footer">
      <button-elem
        :clName="null"
        :title="'Применить'"
        :handler="() => {}"
        :width="'350px'"
        :height="'55px'"
        :background="'orangered'"
        :textColor="null"
        :fontSize="null"
        :fontWeight="null"
        :margin="'0 0 0 0'"
        :borderRadius="'1px'"
        :icon="null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style src="./FinderSidebarProduct.style.scss" lang="scss" scoped></style>