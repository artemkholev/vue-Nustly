import type { LocalStorageConstants } from '@/constants/ls.constants';

export const getBooleanValueFromLs = (key: LocalStorageConstants) => {
  return localStorage.getItem(key) === 'true' ? true : false;
};

export const setBooleanValueFromLs = (key: LocalStorageConstants, value: boolean) => {
  localStorage.setItem(key, value.toString());
};