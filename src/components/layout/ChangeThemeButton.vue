<script setup lang="ts">
// imports
import { onMounted, ref, defineEmits } from "vue";

// dark mode
const darkMode = ref(false);

// emit change theme
const emit = defineEmits<{
  (event: "newTheme", darkMode: boolean): void;
}>();

// change theme
const changeTheme = () => {
  let root = document.documentElement;
  if (darkMode.value) {
    document.body.style.backgroundColor = "var(--main-dark-bg)";
    document.body.style.color = "white";
    root.style.setProperty("--card-bg", "#23232e");
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "var(--main-dark-bg)";
    root.style.setProperty("--card-bg", "#dfdfdf");
  }
  localStorage.setItem("darkMode", `${darkMode.value}`);
  emit("newTheme", darkMode.value);
};

// set dark mode variable on mounted
onMounted(() => {
  darkMode.value = localStorage.getItem("darkMode") === "true" ? true : false;
  if (darkMode.value) changeTheme();
});
</script>

<template>
  <label class="switch">
    <input type="checkbox" v-model="darkMode" @change="changeTheme" />
    <span class="slider"></span>
  </label>
</template>

<style lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 5rem;
  height: 2rem;
  display: flex;
  align-items: center;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--base-yellow);
  transform: var(--transition-slow);
  border-radius: 1rem;
}

.switch input {
  display: none;
}

.slider:before {
  --slider-size: 1.6rem;
  position: absolute;
  content: "";
  height: var(--slider-size);
  width: var(--slider-size);
  left: 0.2rem;
  bottom: 0.2rem;
  background-color: white;
  transition: var(--transition-slow);
  border-radius: var(--slider-size);
}

input:checked + .slider {
  background-color: var(--base-purple);
  filter: brightness(1.5);
}

input:checked + .slider:before {
  transform: translateX(3rem);
}
</style>
