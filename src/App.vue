<script setup lang="ts">
// imports
import NavbarElement from "@/components/layout/NavbarElement.vue";
import LoaderElement from "@/components/layout/LoaderElement.vue";
import useGlobalLoader from "@/utils/useGlobalLoader";
import useGlobalErrorDialog from "@/utils/useGlobalErrorDialog";
import BaseErrorDialog from "@/components/layout/BaseErrorDialog.vue";

// loader
let { globalLoader } = useGlobalLoader();

// error dialog
let { globalErrorDialog } = useGlobalErrorDialog();
</script>

<template>
  <NavbarElement />
  <div class="main">
    <LoaderElement v-if="globalLoader" />
    <BaseErrorDialog v-if="globalErrorDialog" />
    <div class="router-view">
      <router-view />
    </div>
  </div>
</template>
