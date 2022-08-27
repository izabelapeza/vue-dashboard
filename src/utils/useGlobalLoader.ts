import { ref } from "vue";

const globalLoader = ref(false);

export default function useGlobalLoader() {
  function setGlobalLoader(val: boolean) {
    globalLoader.value = val;
  }

  return { globalLoader, setGlobalLoader };
}
