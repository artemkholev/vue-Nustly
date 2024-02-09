<template>
  <button
    :class="{wrapper: true}"
    type="button"
    :style="{
      width: `${props.width}`,
      height: `${height}`,
      background: `${background}`,
      color: `${props.textColor}`,
      fontSize: `${fontSize}`,
      fontWeight: `${fontWeight}`,
      margin: `${margin}`,
      borderRadius: `${borderRadius}`,
    }"
    @click="props.handler"
  >
    {{ title }}
    {{ icon }}
  </button>
</template>

<script setup lang="ts"> 
import type { ButtonPropsType } from './ButtonElem.types';

const props = defineProps<ButtonPropsType>();

defineOptions({
    name: 'button-elem',
})
</script>

<style src="./ButtonElem.style.scss" lang="scss" scoped></style>