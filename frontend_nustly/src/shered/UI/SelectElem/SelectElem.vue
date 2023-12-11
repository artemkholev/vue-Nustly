<template>
  <select 
    :value="modelValue" 
    @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" 
    class="selectElem"
  >
    <option disabled value="">
      Выберите сортировку
    </option>
    <option v-for="option in options" 
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { selectOption } from './SelectElem.types'

defineProps({
  modelValue: {
    type: String,
  },
  options: {
    type: Array<selectOption>,
    default: () => [],
  }
})

defineOptions({
  name: 'select-elem',
})
</script>

<style src="./SelectElem.style.scss" lang="scss" scoped></style>