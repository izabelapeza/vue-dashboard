<script setup lang="ts">
// imports
import { ref } from "vue";
import NavbarElement from "@/components/layout/NavbarElement.vue";
import LoaderElement from "@/components/layout/LoaderElement.vue";

// loader
const isLoading = ref(false);
</script>

<template>
  <NavbarElement />
  <div class="main">
    <LoaderElement v-if="isLoading" />
    <div class="router-view">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss"></style>
