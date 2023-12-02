<template>
  <div class="dialog" v-if="props.show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const props = defineProps < {show: boolean} >();
const emit = defineEmits(['update:show']);

const hideDialog = () => {
  emit('update:show', false);
}

defineOptions({
  name: 'dialog-window',
})
</script>

<style src="./DialogWindow.style.scss" lang="scss" scoped></style>