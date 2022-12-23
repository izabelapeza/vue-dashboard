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
import { barChart } from "@/utils/chartConfigs";
import { stateID, isState } from "@/utils/statesID";
import CountingAnimation from "@/components/layout/CountingAnimation.vue";
import BarLineChart from "../components/charts/BarLineChart.vue";

// adult obesity
let adultObesityLabels: Ref<string[]> = ref([]);
let adultObesityData: Ref<number[]> = ref([]);
let adultObesityLatestYear: Ref<number> = ref(0);

const getAdultObesityData = () => {
  DataServices.getAdultObesityData("latest").then(
    (response: AdultObesityResponse) => {
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
    }
  );
};

getAdultObesityData();

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

const getDiabetesData = () => {
  DataServices.getDiabetesData("latest").then((response: DiabetesResponse) => {
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
  });
};

getDiabetesData();

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

const getAdultSmokingData = () => {
  DataServices.getAdultSmokingData("latest").then(
    (response: AdultSmokingResponse) => {
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
    }
  );
};

getAdultSmokingData();

const adultSmokingConfig = computed(() => {
  return barChart(
    adultSmokingLabels.value,
    `Adult Smoking (${adultSmokingLatestYear.value})`,
    "#8122a7",
    adultSmokingData.value
  );
});

// drug overdose death rate
let drugOverdoseLabel: Ref<string> = ref("");
let drugOverdoseData: Ref<number> = ref(0);

const getDrugOverdose = () => {
  DataServices.getDrugOverdose("latest").then(
    (response: DrugOverdoseResponse) => {
      drugOverdoseLabel.value = `Drug Overdose Death Rate (${response.data.data[0]["ID Year"]})`;
      drugOverdoseData.value = Math.floor(
        response.data.data[0][
          "Drug Overdose Death Rate Per 100,000 Age-Adjusted"
        ]
      );
    }
  );
};

getDrugOverdose();

// opioid overdose death rate
let opioidOverdoseLabel: Ref<string> = ref("");
let opioidOverdoseData: Ref<number> = ref(0);

const getOpioidOverdose = () => {
  DataServices.getOpioidOverdose("latest").then(
    (response: OpioidOverdoseResponse) => {
      opioidOverdoseLabel.value = `Opioid Overdose Death Rate (${response.data.data[0]["ID Year"]})`;
      opioidOverdoseData.value = Math.floor(
        response.data.data[0][
          "Opioid Overdose Death Rate Per 100,000 Age-Adjusted"
        ]
      );
    }
  );
};

getOpioidOverdose();

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
      <CountingAnimation
        :endValue="opioidOverdoseData"
        :text="opioidOverdoseLabel"
        :flexDirection="'column'"
        :color="'#f26b38'"
        :withPercentage="true"
        :duration="100"
      />
    </div>
    <div class="card card3">
      <CountingAnimation
        :endValue="drugOverdoseData"
        :text="drugOverdoseLabel"
        :flexDirection="'column'"
        :color="'#8122a7'"
        :withPercentage="true"
        :duration="100"
      />
    </div>
    <div class="card card4"><BarLineChart /></div>
    <div class="card card5">
      <div class="map-chart">
        <BaseChart :config="adultObesityConfig" :id="'obesity'" />
      </div>
    </div>
    <div class="card card6">
      <div class="map-chart">
        <BaseChart :config="diabetesConfig" :id="'diabetes'" />
      </div>
    </div>
    <div class="card card7">
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
    grid-template-columns: 20vw 20vw 20vw auto;
    grid-template-rows: repeat(6, 14.5vh);

    grid-template-areas:
      "card1 card1 card2 card5"
      "card1 card1 card2 card5"
      "card1 card1 card2 card6"
      "card3 card4 card4 card6"
      "card3 card4 card4 card7"
      "card3 card4 card4 card7";

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
    & .card7 {
      grid-area: card7;
    }
    .map-chart {
      width: 27vw;
    }
    .card1 {
      height: 47vh;
    }
  }

  gap: 1rem;

  .map-chart {
    width: 90%;
    padding: 1rem 0;
  }

  grid-template-columns: calc(100vw - 7.5rem);
  grid-template-rows: 47vw repeat(2 8rem) repeat(4, 28vh);
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

.card2,
.card3,
.card4 {
  padding: 1rem;
}
</style>
