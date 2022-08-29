<script lang="ts" setup>
import BaseChart from "@/components/charts/BaseChart.vue";
import { ref, defineProps, computed } from "vue";
import type { Ref } from "vue";
import { pluralBarChart } from "@/utils/chartConfigs";
import DataServices from "@/services/dataService";
import {
  ExcessiveDrinkingResponse,
  ExcessiveDrinkingData,
  ViolentCrimeResponse,
  ViolentCrimeData,
  HomicidesResponse,
  HomicidesData,
} from "@/types/ResponseData";
import useGlobalLoader from "@/utils/useGlobalLoader";
import useGlobalErrorDialog from "@/utils/useGlobalErrorDialog";

let { setGlobalLoader } = useGlobalLoader();
let { setGlobalErrorDialog } = useGlobalErrorDialog();

// props
const props = defineProps<{
  state: string;
}>();

// years
const yearsLabels = [
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
];

// excessive drinking
let excessiveDrinkingData: Ref<ExcessiveDrinkingData["data"]> = ref([]);

const getExcessiveDrinking = () => {
  setGlobalLoader(true);
  DataServices.getExcessiveDrinking()
    .then((response: ExcessiveDrinkingResponse) => {
      setGlobalLoader(false);
      excessiveDrinkingData.value = response.data.data;
    })
    .catch((error) => {
      setGlobalLoader(false);
      setGlobalErrorDialog(error);
    });
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

// chart config
const pluralBarChartConfig = computed(() => {
  return pluralBarChart(yearsLabels, [
    {
      label: "Excessive Drinking",
      data: stateExcessiveDrinkingData.value,
      borderColor: "#d83e96",
      backgroundColor: "#d83e96CC",
    },
  ]);
});
</script>

<template>
  <BaseChart :config="pluralBarChartConfig" :id="'plural-bar-chart'" />
</template>
