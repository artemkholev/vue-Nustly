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
import { computed } from '@vue/reactivity';


const closeSidebarPanel = () => {
    store.commit('toggleNav');
};

const isPanelOpen = computed(() => {
  return store.state.isNavOpen;
});

const isDarkStyle = computed(() => {
  return store.state.isDark;
});

defineOptions({
    name: 'sidebar-elem',
})
</script>

<style src="./SidebarElem.style.scss" lang="scss" scoped></style>