<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :width="width" 
    :height="height" 
    viewBox="0 0 35 35" 
    :aria-labelledby="iconName" 
    role="presentation"
  >
    <title :id="iconName" lang="en">{{iconName}}</title>
    <g :fill="iconColor">
      <slot/>
    </g>
  </svg>
</template>

<script setup lang="ts">
  defineProps({
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  })
  defineOptions({
    name: 'icon-base',
  })
</script>

<style scoped>
  svg {
    display: inline-block;
    vertical-align: baseline;
    /* margin-bottom: -10px; */
  }
</style>