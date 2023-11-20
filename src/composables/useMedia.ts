import { computed, onMounted, onUnmounted, ref, type ComputedRef } from 'vue';

type TDeviceType = 'mobile' | 'tablet' | 'desktop';

interface IUseMedia {
  device: ComputedRef<TDeviceType>;
}

export const useMedia = (): IUseMedia => {
  const screenWidth = ref<number>(1920);

  const changeSizeWindow = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    screenWidth.value = window.innerWidth;

    window.addEventListener('resize', changeSizeWindow);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', changeSizeWindow);
  });

  const device = computed<TDeviceType>(() => {
    if (screenWidth.value >= 1280) return 'desktop';
    if (screenWidth.value < 1280 && screenWidth.value >= 768) return 'tablet';
    return 'mobile';
  });

  return {
    device
  };
};