<script setup lang="ts">
// imports
import MapUSA from "@/components/maps/MapUSA.vue";
</script>

<template>
  <div class="card" style="height: 95vh; width: 100%">
    <MapUSA :isClickable="true" />
  </div>
</template>
