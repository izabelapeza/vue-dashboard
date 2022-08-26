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
  HaventSeenDoctorResponse,
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

// adults who haven't seen a doctor in the past 12 months due to cost
let seenDoctorLabels: Ref<string[]> = ref([]);
let seenDoctorData: Ref<number[]> = ref([]);
let seenDoctorLatestYear: Ref<number> = ref(0);

DataServices.getHaventSeenDoctor()
  .then((response: HaventSeenDoctorResponse) => {
    0;
    seenDoctorLatestYear.value = response.data.data[0]["ID Year"];
    seenDoctorLabels.value = ["Adults", "Other"];
    let adultNumber =
      response.data.data[0][
        "Adults Who Haven't Seen a Doctor in the Past 12 Months Due to Cost"
      ];
    seenDoctorData.value = [adultNumber, 100 - adultNumber];
  })
  .catch((error) => console.log(error));

const seenDoctorConfig = computed(() => {
  return doughnutChart(
    seenDoctorLabels.value,
    "Temp",
    ["#8122a7", "#888"],
    seenDoctorData.value
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
      <div class="doughnuts-contener">
        <div class="doughnut-contener">
          <BaseChart :config="seenDoctorConfig" :id="'seen-doctor-1'" />
        </div>
        <div class="doughnut-contener">
          <BaseChart :config="seenDoctorConfig" :id="'seen-doctor-2'" />
        </div>
        <div class="doughnut-contener">
          <BaseChart :config="seenDoctorConfig" :id="'seen-doctor-3'" />
        </div>
      </div>
    </div>
    <div class="card card3">
      <div class="map-chart">
        <BaseChart :config="adultObesityConfig" :id="'obesity'" />
      </div>
    </div>
    <div class="card card4">
      <div class="map-chart">
        <BaseChart :config="diabetesConfig" :id="'diabetes'" />
      </div>
    </div>
    <div class="card card5">
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
    grid-template-columns: 60vw auto;
    grid-template-rows: repeat(3, 30vh);

    grid-template-areas:
      "card1 card3"
      "card1 card4"
      "card2 card5";

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
    .map-chart {
      width: 27vw;
    }

    .doughnut-contener {
      height: 13vw;
      width: 13vw;
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

.doughnuts-contener {
  display: flex;
  min-height: 30vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 3vw;
}

.doughnut-contener {
  position: relative;
  height: 20vw;
  width: 20vw;
}
</style>
