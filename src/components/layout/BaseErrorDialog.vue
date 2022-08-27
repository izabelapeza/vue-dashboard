<script setup lang="ts">
import useGlobalErrorDialog from "@/utils/useGlobalErrorDialog";
import { vOnClickOutside } from "@vueuse/components";

let { globalErrorDialog, setGlobalErrorDialog } = useGlobalErrorDialog();

const closeErrorDialog = () => {
  setGlobalErrorDialog(null);
};
</script>

<template>
  <div class="error-dialog-wrapper">
    <div class="error-dialog" v-on-click-outside="closeErrorDialog">
      <div @click="closeErrorDialog" class="close-dialog-icon">
        <mdicon name="close" size="24" />
      </div>
      <div class="error-title">
        <mdicon name="alertCircle" class="error-title__icon" />
        Error
      </div>
      <div class="error-text">{{ globalErrorDialog }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.error-dialog-wrapper {
  background-color: rgba(0, 0, 0, 0.75);
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-dialog {
  min-width: 28vw;
  background-color: var(--card-bg);
  border-radius: var(--base-border-radius);
  display: grid;
  padding: 2rem;
  position: relative;
}

.close-dialog-icon {
  position: absolute;
  top: 2rem;
  right: 2rem;
  cursor: pointer;
  opacity: 0.6;
  transition: var(--transition-fast);

  &:hover {
    opacity: 1;
  }
}

.error-title {
  display: flex;
  font-size: 1.6rem;
  font-weight: bold;
  padding-bottom: 1rem;
  height: 1.8rem;
  color: tomato;

  &__icon {
    padding-right: 0.25rem;
    transform: translateY(-0.1rem);
  }
}

.error-text {
  padding-left: 2.2rem;
  padding-right: 2.2rem;
}
</style>
