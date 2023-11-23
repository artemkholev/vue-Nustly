<template>
  <input 
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="input"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineOptions({
  name: 'input-elem',
})
</script>

<style src="./InputElem.style.scss" lang="scss" scoped></style>