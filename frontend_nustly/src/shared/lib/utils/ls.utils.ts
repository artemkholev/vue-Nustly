import type { LocalStorageConstants } from '@/shared/constants/ls.constants';

export const getBooleanValueFromLs = (key: LocalStorageConstants) => {
  return localStorage.getItem(key) === 'true' ? true : false;
};

export const setBooleanValueFromLs = (key: LocalStorageConstants, value: boolean) => {
  localStorage.setItem(key, value.toString());
};

export const getStringValueFromLs = (key: LocalStorageConstants) => {
  return localStorage.getItem(key);
};

export const setStringValueFromLs = (key: LocalStorageConstants, value: string) => {
  localStorage.setItem(key, value);
};