<script lang="ts" setup>
// imports
import { onMounted, ref, computed } from "vue";
import StateSelector from "@/components/layout/StatesSelector.vue";
import { useRoute } from "vue-router";
import { stateID, isState } from "@/utils/statesID";
import MapUSA from "@/components/maps/MapUSA.vue";

// state id
const route = useRoute();
let state: string | string[];
const stateId = ref("");

const getStateId = () => {
  state = route.params.id;
  if (typeof state === "string" && isState(state)) {
    stateId.value = stateID[state].key;
  }
};

// state abbreviations
const stateAbbre = computed(() => {
  state = route.params.id;
  if (typeof state === "string" && isState(state)) {
    return state;
  } else return "";
});

// change state
const changeState = (key: string) => {
  stateId.value = key;
};

// on mounted
onMounted(() => {
  getStateId();
});
</script>

<template>
  <div class="card selector-card">
    <StateSelector @changeState="changeState" />
  </div>
  <div class="data-container">
    <div class="data-container card card1"></div>
    <div class="data-container card card2">
      <MapUSA :isClickable="false" :state="stateAbbre" />
    </div>
    <div class="data-container card card3"></div>
    <div class="data-container card card4"></div>
    <div class="data-container card card5"></div>
  </div>
</template>

<style lang="scss">
.data-container {
  display: grid;

  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(3, 27vh);

    grid-template-areas:
      "card1 card2"
      "card3 card4"
      "card3 card5";

    & .card1 {
      grid-area: card1;
    }
    & .card2 {
      grid-area: card2;
    }
    & .card3 {
      grid-area: card3;
    }
    & .card4 {
      grid-area: card4;
    }
  }

  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 27vh);

  gap: 1rem;
}
.card {
  background-color: var(--card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--base-border-radius);
}
.selector-card {
  height: 4rem;
  margin-bottom: 1rem;
  justify-content: right;
  padding: 0 1rem;
  align-items: flex-start;
  padding-top: 1.3rem;

  background-image: url(../assets/img/nelson-ndongala-gDRHfyeOq58-unsplash.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0% 55%;
}
</style>
