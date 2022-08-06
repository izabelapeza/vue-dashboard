<script lang="ts" setup>
// imports
import axios from "axios";
import { ref } from "vue";

// data
const data = ref([]);

// axios
axios
  .get(
    "https://datausa.io/api/data?measure=Average%20Wage,Rank,Average%20Wage%20Appx%20MOE,Record%20Count&drilldowns=Industry Group&Workforce%20Status=true&Record%20Count>=5"
  )
  .then((response) => {
    data.value = response.data["data"].filter(
      (d: { "ID Year": string; "Slug Industry Group": string }) => {
        return d["ID Year"] == "2019";
      }
    );
  })
  .catch((error) => {
    console.log(error);
  });
</script>

<template>
  <div class="data-container">
    <div class="data-container__card card1"></div>
    <div class="data-container__card card2"></div>
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
  }
}
</style>
