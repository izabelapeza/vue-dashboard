<script setup lang="ts">
// imports
import { ref, onMounted } from "vue";
import ChangeThemeButton from "@/components/layout/ChangeThemeButton.vue";
import { useRoute } from "vue-router";

const route = useRoute();

// dark and light mode
const darkMode = "weatherNight";
const lightMode = "weatherSunny";
const modeIcon = ref(lightMode);

onMounted(() => {
  const localStorageMode = localStorage.getItem("darkMode");
  if (localStorageMode === "true") modeIcon.value = darkMode;
});

// change theme icon
const changeTheme = (isDarkMode: boolean) => {
  if (isDarkMode) modeIcon.value = darkMode;
  else modeIcon.value = lightMode;
};
</script>

<template>
  <nav class="navbar">
    <div class="navbar__items">
      <div class="logo">
        <div class="logo__title">USA Health</div>
        <mdicon class="logo__icon" name="chevronDoubleRight" size="46" />
      </div>
      <router-link to="/" class="navbar__item">
        <mdicon name="mapSearch" size="46" class="navbar__icon top-icon" />
        <span class="text">US Map</span>
      </router-link>
      <router-link
        to="/state/NY"
        class="navbar__item"
        :class="route.name === 'state' ? 'active' : ''"
      >
        <mdicon name="starCircle" size="46" class="navbar__icon top-icon" />
        <span class="text">State</span>
      </router-link>
      <div class="navbar__item settings">
        <mdicon name="cog" size="46" class="navbar__icon cog" />
        <mdicon
          :name="modeIcon"
          size="46"
          class="navbar__icon mode"
          :class="modeIcon === 'weatherNight' ? 'moon-icon' : 'sun-icon'"
        />
        <span class="text"><ChangeThemeButton @newTheme="changeTheme" /></span>
      </div>
    </div>
  </nav>
</template>
