import WujieVue from 'wujie-vue3';

const { bus } = WujieVue;

export const useLayoutStore = defineStore('layout', () => {
  const showSide = ref(true);
  const isSideOpen = ref(true);
  const updateSideOpenState = (val?: boolean) => {
    isSideOpen.value = val ?? !isSideOpen.value;
  };

  const { width } = useWindowSize();
  watch(
    () => width.value,
    (e) => {
      isSideOpen.value = e >= window.screen.width * 0.6;
    },
  );

  watch(
    () => isSideOpen.value,
    (e) => {
      bus.$emit('updateSideState', e);
    },
  );

  return {
    showSide,
    isSideOpen,
    updateSideOpenState,
  };
});
