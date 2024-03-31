import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getBooleanValueFromLs, setBooleanValueFromLs } from '@/shered/lib/utils/ls.utils';
import { LocalStorageConstants } from '@/shered/constants/ls.constants';

export const useSidebarStore = defineStore('sidebar', () => {
  const isOpenSidebar = ref<boolean>(false);

  //methods
  const toggleSidebar = () => {
    isOpenSidebar.value = !isOpenSidebar.value;
  };

  return { isOpenSidebar, toggleSidebar };
});