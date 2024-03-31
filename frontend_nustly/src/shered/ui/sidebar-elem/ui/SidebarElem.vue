<template>
    <div class="sidebar-backdrop" @click="toggleSidebar" v-if="isOpenSidebar"></div>
    <transition name="slide">
        <div v-if="isOpenSidebar"
                :class="contentClasses">
            <slot></slot>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { useSidebarStore } from '@/shered/store/sidebar';
import { useThemeStore } from '@/shered/store/theme';
import { computed } from '@vue/reactivity';
import { storeToRefs } from 'pinia';

//theme
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const contentClasses = computed(() => {
  return { 'sidebar-panel': true, ['dark-sidebar']: isDarkTheme.value };
});

//sidebar
const sidebarStore = useSidebarStore();
const { isOpenSidebar } = storeToRefs(sidebarStore);
const { toggleSidebar } = sidebarStore

defineOptions({
    name: 'sidebar-elem',
})
</script>

<style src="./SidebarElem.style.scss" lang="scss" scoped></style>