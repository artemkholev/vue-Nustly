<template>
  <button
    class="[style.wrapper, clName].join(' ')"
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
// import {ref} from 'vue' 
import type { ButtonPropsType } from './ButtonElem.types'
const props = defineProps<ButtonPropsType>();

// const name = ref('ButtonElem')
</script>

<style src="./ButtonElem.style.scss" lang="scss" scoped></style>