import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getBooleanValueFromLs, setBooleanValueFromLs } from '@/shered/utils/ls.utils';
import { LocalStorageConstants } from '@/shered/constants/ls.constants';

export const useThemeStore = defineStore('theme', () => {
  const isDarkTheme = ref(getBooleanValueFromLs(LocalStorageConstants.THEME) || false);

  //methods
  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
    setBooleanValueFromLs(LocalStorageConstants.THEME, isDarkTheme.value);
  };

  return { isDarkTheme, toggleTheme };
});