<script lang="ts" setup>
// imports
import { stateID } from "@/utils/statesID";
import { computed, ref } from "@vue/reactivity";
import { onMounted, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// selected state
const selectedState = ref("");

onMounted(() => {
  const routeId = route.params.id;
  selectedState.value = typeof routeId === "string" ? routeId : "";
});

// selecter options
const stateOptions = computed(() => {
  return Object.entries(stateID).map((state) => {
    return { id: state[0], key: state[1].key, name: state[1].name };
  });
});

// change state action
const emit = defineEmits(["changeState"]);
const changeState = () => {
  router.push(`/state/${selectedState.value}`);
  emit("changeState", stateID[selectedState.value].key);
};
</script>

<template>
  <select v-model="selectedState" @change="changeState">
    <option v-for="state in stateOptions" :key="state.id" :value="state.id">
      {{ state.name }}
    </option>
  </select>
</template>
