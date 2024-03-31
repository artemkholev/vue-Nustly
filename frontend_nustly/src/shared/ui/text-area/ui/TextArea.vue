<template>
  <div :class="inputClasses">
    <textarea 
      :value="modelValue"
      :placeholder="placeholderInput"
      :style="{border: isBorder ? '' : 'none', backgroundColor: 'white'}"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="container-input__text"
    >
    </textarea>
  </div>
</template>

<script setup lang="ts">
import '@/app/styles/vars.scss';
import { useThemeStore } from '@/shared/store/theme';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholderInput: {
    type: String,
    default: ''
  },
  isBorder: {
    type: Boolean,
    default: true,
  }
})

//theme
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const inputClasses = computed(() => {
  return { 'container-input': true, ['container-input_dark']: isDarkTheme.value };
});

defineOptions({
  name: 'text-area',
})
</script>

<style src="./TextArea.style.scss" lang="scss" scoped></style>@/shared/store/theme