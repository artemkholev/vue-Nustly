<template>
  <div :class="dialogClasses" v-if="props.show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/shered/store/theme';
import { storeToRefs } from 'pinia';
import { computed, defineEmits } from 'vue';

const props = defineProps < {show: boolean} >();
const emit = defineEmits(['update:show']);

const hideDialog = () => {
  emit('update:show', false);
}

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const dialogClasses = computed(() => {
  return { dialog: true, ['dark-dialog']: isDarkTheme.value };
});

defineOptions({
  name: 'dialog-window',
})
</script>

<style src="./DialogWindow.style.scss" lang="scss" scoped></style>