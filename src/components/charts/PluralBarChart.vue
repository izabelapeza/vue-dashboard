<script lang="ts" setup>
import BaseChart from "@/components/charts/BaseChart.vue";
import { ref, defineProps, computed } from "vue";
import type { Ref } from "vue";
import { pluralBarChart } from "@/utils/chartConfigs";
import DataServices from "@/services/dataService";
import {
  ExcessiveDrinkingResponse,
  ExcessiveDrinkingData,
  AlcoholDrivingDeathsResponse,
  AlcoholDrivingDeathsData,
} from "@/types/ResponseData";
import getYearsLabel from "@/utils/getYearsLabel";

// props
const props = defineProps<{
  state: string;
}>();

// years
const yearsLabels = getYearsLabel(2014, 2021);

// excessive drinking
let excessiveDrinkingData: Ref<ExcessiveDrinkingData["data"]> = ref([]);

const getExcessiveDrinking = () => {
  DataServices.getExcessiveDrinking().then(
    (response: ExcessiveDrinkingResponse) => {
      excessiveDrinkingData.value = response.data.data;
    }
  );
};

getExcessiveDrinking();

const stateExcessiveDrinkingData = computed(() => {
  let data: number[] = [];
  let stateData = excessiveDrinkingData.value.filter((state) => {
    return state["ID State"] === props.state;
  });
  yearsLabels.forEach((year) => {
    data.push(
      stateData.find((state) => {
        return state.Year === year;
      })?.["Excessive Drinking"] || 0
    );
  });
  return data;
});

// alcohol impaired driving deaths
let alcoholDrivingDeathsData: Ref<AlcoholDrivingDeathsData["data"]> = ref([]);

const getAlcoholDrivingDeaths = () => {
  DataServices.getAlcoholDrivingDeaths().then(
    (response: AlcoholDrivingDeathsResponse) => {
      alcoholDrivingDeathsData.value = response.data.data;
    }
  );
};

getAlcoholDrivingDeaths();

const stateAlcoholDrivingDeaths = computed(() => {
  let data: number[] = [];
  let stateData = alcoholDrivingDeathsData.value.filter((state) => {
    return state["ID State"] === props.state;
  });
  yearsLabels.forEach((year) => {
    data.push(
      stateData.find((state) => {
        return state.Year === year;
      })?.["Alcohol-Impaired Driving Deaths"] || 0
    );
  });
  return data;
});

// chart config
const pluralBarChartConfig = computed(() => {
  return pluralBarChart(yearsLabels, [
    {
      label: "Excessive Drinking",
      data: stateExcessiveDrinkingData.value,
      borderColor: "#f26b38",
      backgroundColor: "#f26b38CC",
    },
    {
      label: "Alcohol Impaired Driving Deaths",
      data: stateAlcoholDrivingDeaths.value,
      borderColor: "#8122a7",
      backgroundColor: "#8122a7CC",
    },
  ]);
});
</script>

<template>
  <BaseChart :config="pluralBarChartConfig" :id="'plural-bar-chart'" />
</template>
