import { ref } from "vue";
import type { Ref } from "vue";

const globalErrorDialog: Ref<string | null> = ref(null);

export default function useGlobalErrorDialog() {
  function setGlobalErrorDialog(val: string | null) {
    globalErrorDialog.value = val;
  }

  return { globalErrorDialog, setGlobalErrorDialog };
}
