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
    <router-view class="router-view" />
  </div>
</template>

<style lang="scss"></style>
