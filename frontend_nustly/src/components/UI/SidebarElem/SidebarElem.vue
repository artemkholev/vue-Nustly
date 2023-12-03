<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen"
                 class="sidebar-panel" :style="{backgroundColor: isDarkStyle ? 'white' : '#444444'}">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import store from '@/store'
import { useThemeStore } from '@/store/theme';
import { computed } from '@vue/reactivity';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);


const closeSidebarPanel = () => {
    store.commit('toggleNav');
};

const isPanelOpen = computed(() => {
  return store.state.isNavOpen;
});

const isDarkStyle = computed(() => {
  return isDarkTheme.value;
});

defineOptions({
    name: 'sidebar-elem',
})
</script>

<style src="./SidebarElem.style.scss" lang="scss" scoped></style>