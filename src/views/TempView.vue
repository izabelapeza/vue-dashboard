<script lang="ts" setup>
// imports
import axios from "axios";
import { ref } from "vue";
import type { Ref } from "vue";
import BarChart from "@/components/charts/BarChart.vue";
import { nonEnglishSpeakersFormat } from "@/utils/dataFormatter";

// data formating
const nonEnglishSpeakersData: Ref<{
  labels: string[];
  datasets: { data: number[]; backgroundColor: string }[];
} | null> = ref(null);

// axios
axios
  .get(
    "https://datausa.io/api/data?Geography=16000US3651000&measure=Languages%20Spoken&drilldowns=Language Spoken at Home"
  )
  .then((response) => {
    nonEnglishSpeakersData.value = nonEnglishSpeakersFormat(
      response.data["data"]
    );
  })
  .catch((error) => {
    console.log(error);
  });
</script>

<template>
  <div class="data-container">
    <div class="data-container__card card1"></div>
    <div class="data-container__card card2">
      <BarChart
        :data="nonEnglishSpeakersData"
        :chartTitle="'Non-English Speakers'"
      />
    </div>
    <div class="data-container__card card3"></div>
    <div class="data-container__card card4"></div>
  </div>
</template>

<style lang="scss" scoped>
.data-container {
  display: grid;

  @media only screen and (min-width: 600px) {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(3, 30vh);

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
  grid-template-rows: repeat(4, 30vh);

  gap: 1rem;

  &__card {
    background-color: var(--card-bg);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
