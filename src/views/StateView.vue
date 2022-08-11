<script lang="ts" setup>
// imports
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import type { Ref } from "vue";
import BarChart from "@/components/charts/BarChart.vue";
import StateSelector from "@/components/layout/StatesSelector.vue";
import { nonEnglishSpeakersFormat } from "@/utils/dataFormatter";
import { useRoute } from "vue-router";
import { stateID } from "@/utils/statesID";

// state id
const route = useRoute();
let state: string | string[];
const stateId = ref("");

const getStateId = () => {
  state = route.params.id;
  if (typeof state === "string" && Object.keys(stateID).includes(state)) {
    //@ts-ignore
    stateId.value = stateID[state].key;
  }
};

// non English speakers
const nonEnglishSpeakersData: Ref<{
  labels: string[];
  datasets: { data: number[]; backgroundColor: string }[];
} | null> = ref(null);

const nonEnglishSpeakersRequest = () => {
  axios
    .get(
      `https://datausa.io/api/data?Geography=${stateId.value}&measure=Languages%20Spoken&drilldowns=Language Spoken at Home`
    )
    .then((response) => {
      nonEnglishSpeakersData.value = nonEnglishSpeakersFormat(
        response.data["data"]
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

// change state
const changeState = (key: string) => {
  stateId.value = key;
  nonEnglishSpeakersRequest();
};

// on mounted
onMounted(() => {
  getStateId();
  nonEnglishSpeakersRequest();
});
</script>

<template>
  <div class="card selector-card">
    <StateSelector @changeState="changeState" />
  </div>
  <div class="data-container">
    <div class="data-container card card1"></div>
    <div class="data-container card card2">
      <BarChart
        :data="nonEnglishSpeakersData"
        :chartTitle="'Non-English Speakers'"
      />
    </div>
    <div class="data-container card card3"></div>
    <div class="data-container card card4"></div>
  </div>
</template>

<style lang="scss" scoped>
.data-container {
  display: grid;

  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(3, 27vh);

    grid-template-areas:
      "card1 card1"
      "card2 card3"
      "card2 card4";

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
