<script setup lang="ts">
// imports
import { computed, onMounted, ref } from "vue";
import type { Ref } from "vue";
import MapUSA from "@/components/maps/MapUSA.vue";
import BaseChart from "@/components/charts/BaseChart.vue";
import DataServices from "@/services/dataService";
import {
  AdultObesityResponse,
  DiabetesResponse,
  AdultSmokingResponse,
  DrugOverdoseResponse,
  OpioidOverdoseResponse,
} from "@/types/ResponseData";
import { barChart, doughnutChart } from "@/utils/chartConfigs";
import { stateID, isState } from "@/utils/statesID";

// adult obesity
let adultObesityLabels: Ref<string[]> = ref([]);
let adultObesityData: Ref<number[]> = ref([]);
let adultObesityLatestYear: Ref<number> = ref(0);

DataServices.getAdultObesityData()
  .then((response: AdultObesityResponse) => {
    adultObesityLatestYear.value = response.data.data[0]["ID Year"];
    let sortedData = response.data.data.sort((a, b) => {
      return b["Adult Obesity"] - a["Adult Obesity"];
    });
    adultObesityLabels.value = sortedData.map((state) => {
      return state.State;
    });
    adultObesityData.value = sortedData.map((state) => {
      return state["Adult Obesity"];
    });
  })
  .catch((error) => console.log(error));

const adultObesityConfig = computed(() => {
  return barChart(
    adultObesityLabels.value,
    `Adult Obesity (${adultObesityLatestYear.value})`,
    "#d83e96",
    adultObesityData.value
  );
});

// diabetes
let diabetesLabels: Ref<string[]> = ref([]);
let diabetesData: Ref<number[]> = ref([]);
let diabetesLatestYear: Ref<number> = ref(0);

DataServices.getDiabetesData()
  .then((response: DiabetesResponse) => {
    diabetesLatestYear.value = response.data.data[0]["ID Year"];
    let sortedData = response.data.data.sort((a, b) => {
      return b["Diabetes Prevalence"] - a["Diabetes Prevalence"];
    });
    diabetesLabels.value = sortedData.map((state) => {
      return state.State;
    });
    diabetesData.value = sortedData.map((state) => {
      return state["Diabetes Prevalence"];
    });
  })
  .catch((error) => console.log(error));

const diabetesConfig = computed(() => {
  return barChart(
    diabetesLabels.value,
    `Diabetes (${diabetesLatestYear.value})`,
    "#e2bf11",
    diabetesData.value
  );
});

// adult smoking
let adultSmokingLabels: Ref<string[]> = ref([]);
let adultSmokingData: Ref<number[]> = ref([]);
let adultSmokingLatestYear: Ref<number> = ref(0);

DataServices.getAdultSmokingData()
  .then((response: AdultSmokingResponse) => {
    adultSmokingLatestYear.value = response.data.data[0]["ID Year"];
    let sortedData = response.data.data.sort((a, b) => {
      return b["Adult Smoking"] - a["Adult Smoking"];
    });
    adultSmokingLabels.value = sortedData.map((state) => {
      return state.State;
    });
    adultSmokingData.value = sortedData.map((state) => {
      return state["Adult Smoking"];
    });
  })
  .catch((error) => console.log(error));

const adultSmokingConfig = computed(() => {
  return barChart(
    adultSmokingLabels.value,
    `Adult Smoking (${adultSmokingLatestYear.value})`,
    "#8122a7",
    adultSmokingData.value
  );
});

// drug overdose reath rate
let drugOverdoseLabels: Ref<string[]> = ref([]);
let drugOverdoseData: Ref<number[]> = ref([]);
let drugOverdoseLatestYear: Ref<number> = ref(0);

DataServices.getDrugOverdose()
  .then((response: DrugOverdoseResponse) => {
    drugOverdoseLatestYear.value = response.data.data[0]["ID Year"];
    drugOverdoseLabels.value = [
      `Drug Overdose Death Rate (${drugOverdoseLatestYear.value})`,
      "Other",
    ];
    let adultNumber =
      response.data.data[0][
        "Drug Overdose Death Rate Per 100,000 Age-Adjusted"
      ];
    drugOverdoseData.value = [adultNumber, 100 - adultNumber];
  })
  .catch((error) => console.log(error));

const drugOverdoseConfig = computed(() => {
  return doughnutChart(
    drugOverdoseLabels.value,
    "",
    ["#8122a7", "#c7c7c777"],
    drugOverdoseData.value
  );
});

// opioid overdose reath rate
let opioidOverdoseLabels: Ref<string[]> = ref([]);
let opioidOverdoseData: Ref<number[]> = ref([]);
let opioidOverdoseLatestYear: Ref<number> = ref(0);

DataServices.getOpioidOverdose()
  .then((response: OpioidOverdoseResponse) => {
    opioidOverdoseLatestYear.value = response.data.data[0]["ID Year"];
    opioidOverdoseLabels.value = [
      `Opioid Overdose Death Rate (${opioidOverdoseLatestYear.value})`,
      "Other",
    ];
    let adultNumber =
      response.data.data[0][
        "Opioid Overdose Death Rate Per 100,000 Age-Adjusted"
      ];
    opioidOverdoseData.value = [adultNumber, 100 - adultNumber];
  })
  .catch((error) => console.log(error));

const opioidOverdoseConfig = computed(() => {
  return doughnutChart(
    opioidOverdoseLabels.value,
    "",
    ["#e2bf11", "#c7c7c777"],
    opioidOverdoseData.value
  );
});

// add tooltip to map (with mouseover state)
const mouseoverState: Ref<string | null> = ref(null);

const getMouseoverState = (state: string | null) => {
  if (state) {
    if (typeof state === "string" && isState(state)) {
      mouseoverState.value = stateID[state].name;
    }
  } else mouseoverState.value = state;
};

const mousemoved = (event: any) => {
  var state = document.querySelector(".map-hover") as HTMLElement;
  if (state) {
    state.style.top = event.pageY + state.scrollTop - 24 + "px";
    state.style.left = event.pageX - 80 + "px";
  }
};

onMounted(() => {
  document
    ?.querySelector(".map-container")
    ?.addEventListener("mousemove", mousemoved);
});
</script>

<template>
  <div class="map-container">
    <div class="card card1">
      <MapUSA :isClickable="true" @emitMouseoverState="getMouseoverState" />
      <div
        class="map-hover"
        :class="mouseoverState ? 'map-hover__visible' : ''"
      >
        {{ mouseoverState }}
      </div>
    </div>
    <div class="card card2">
      <div class="doughnut-contener">
        <BaseChart :config="drugOverdoseConfig" :id="'drug-overdose'" />
      </div>
    </div>
    <div class="card card3">
      <div class="doughnut-contener">
        <BaseChart :config="opioidOverdoseConfig" :id="'opioid-overdose'" />
      </div>
    </div>
    <div class="card card4">
      <div class="map-chart">
        <BaseChart :config="adultObesityConfig" :id="'obesity'" />
      </div>
    </div>
    <div class="card card5">
      <div class="map-chart">
        <BaseChart :config="diabetesConfig" :id="'diabetes'" />
      </div>
    </div>
    <div class="card card6">
      <div class="map-chart">
        <BaseChart :config="adultSmokingConfig" :id="'smoking'" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.map-container {
  position: relative;
  display: grid;

  @media only screen and (min-width: 1120px) {
    grid-template-columns: 30vw 30vw auto;
    grid-template-rows: repeat(3, 30vh);

    grid-template-areas:
      "card1 card1 card4"
      "card1 card1 card5"
      "card2 card3 card6";

    & .card1 {
      grid-area: card1;
      height: 90vh;
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
    & .card6 {
      grid-area: card6;
    }
    .map-chart {
      width: 27vw;
    }
  }

  gap: 1rem;

  .card1 {
    height: 62vh;
  }

  .map-chart {
    width: 90%;
    padding: 1rem 0;
  }
}

.map-hover {
  background-color: var(--tooltip-bg);
  padding: 0.35rem 0.75rem;
  border-radius: 0.2rem;
  position: absolute;
  display: none;

  &__visible {
    display: block;
  }
}

.doughnut-contener {
  position: relative;
  height: 240px;
  width: 240px;
  padding: 1rem;
}
</style>
