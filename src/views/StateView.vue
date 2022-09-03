<script lang="ts" setup>
// imports
import { onMounted, ref, computed } from "vue";
import type { Ref } from "vue";
import StateSelector from "@/components/layout/StatesSelector.vue";
import { useRoute } from "vue-router";
import { stateID, isState } from "@/utils/statesID";
import MapUSA from "@/components/maps/MapUSA.vue";
import LineChart from "@/components/charts/LineChart.vue";
import PluralBarChart from "@/components/charts/PluralBarChart.vue";
import CountingAnimation from "@/components/layout/CountingAnimation.vue";
import DataServices from "@/services/dataService";
import {
  ViolentCrimeResponse,
  ViolentCrimeData,
  HomicidesResponse,
  HomicidesData,
} from "@/types/ResponseData";
import useGlobalLoader from "@/utils/useGlobalLoader";
import useGlobalErrorDialog from "@/utils/useGlobalErrorDialog";

let { setGlobalLoader } = useGlobalLoader();
let { setGlobalErrorDialog } = useGlobalErrorDialog();

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

// violent crimes
let violentCrimeData: Ref<ViolentCrimeData["data"]> = ref([]);
let violentCrimeYear = ref("");

const getViolentCrimeData = () => {
  setGlobalLoader(true);
  DataServices.getViolentCrime("latest")
    .then((response: ViolentCrimeResponse) => {
      setGlobalLoader(false);
      violentCrimeData.value = response.data.data;
    })
    .catch((error) => {
      setGlobalLoader(false);
      setGlobalErrorDialog(error);
    });
};

getViolentCrimeData();

const stateViolentCrimeData = computed(() => {
  let stateData = violentCrimeData.value.filter((state) => {
    return state["ID State"] === stateId.value;
  });
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  violentCrimeYear.value = stateData[0]?.Year || "";
  return Math.floor(stateData[0]?.["Violent Crime"]) || 0;
});

// homicides
let homicidesData: Ref<HomicidesData["data"]> = ref([]);
let homicidesYear = ref("");

const getHomicidesData = () => {
  setGlobalLoader(true);
  DataServices.getHomicides("latest")
    .then((response: HomicidesResponse) => {
      setGlobalLoader(false);
      homicidesData.value = response.data.data;
    })
    .catch((error) => {
      setGlobalLoader(false);
      setGlobalErrorDialog(error);
    });
};

getHomicidesData();

const stateHomicidesData = computed(() => {
  let stateData = homicidesData.value.filter((state) => {
    return state["ID State"] === stateId.value;
  });
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  homicidesYear.value = stateData[0]?.Year || "";
  return Math.floor(stateData[0]?.Homicides) || 0;
});

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
    <div class="card card1">
      <div class="inside-card">
        <LineChart :state="stateId" />
      </div>
    </div>
    <div class="card card2">
      <MapUSA :isClickable="false" :state="stateAbbre" />
    </div>
    <div class="card card3">
      <CountingAnimation
        :endValue="stateViolentCrimeData"
        :text="`Crimes per 100,000 People (${violentCrimeYear})`"
        :withPlus="true"
        :duration="10"
      />
    </div>
    <div class="card card4">
      <CountingAnimation
        :endValue="stateHomicidesData"
        :text="`Homicides per 100,000 People (${homicidesYear})`"
        :withPlus="true"
        :duration="250"
      />
    </div>
    <div class="card card5">
      <div class="inside-card">
        <PluralBarChart :state="stateId" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.data-container {
  display: grid;

  @media only screen and (min-width: 1120px) {
    grid-template-columns: 27vw 27vw auto;
    grid-template-rows: repeat(4, 19.5vh);

    grid-template-areas:
      "card1 card1 card2"
      "card1 card1 card2"
      "card1 card1 card5"
      "card3 card4 card5";

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
    & .card5 {
      grid-area: card5;
    }
  }

  grid-template-columns: calc(100vw - 7.5rem);
  grid-template-rows: 47vw 30vw repeat(2, 28vh) 47vw;

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
.inside-card {
  width: 95%;
}
</style>
