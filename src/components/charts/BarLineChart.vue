<script setup lang="ts">
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { pluralBarChart } from "@/utils/chartConfigs";
import BaseChart from "@/components/charts/BaseChart.vue";
import DataServices from "@/services/dataService";
import {
  DrugOverdoseResponse,
  DrugOverdoseData,
  OpioidOverdoseResponse,
  OpioidOverdoseData,
} from "@/types/ResponseData";
import useGlobalLoader from "@/utils/useGlobalLoader";
import useGlobalErrorDialog from "@/utils/useGlobalErrorDialog";
import getYearsLabel from "@/utils/getYearsLabel";

let { setGlobalLoader } = useGlobalLoader();
let { setGlobalErrorDialog } = useGlobalErrorDialog();

// years
const yearsLabels = getYearsLabel(1999, 2016);

// drug overdose death rate
let drugOverdoseData: Ref<DrugOverdoseData["data"]> = ref([]);

const getDrugOverdose = () => {
  setGlobalLoader(true);
  DataServices.getDrugOverdose()
    .then((response: DrugOverdoseResponse) => {
      setGlobalLoader(false);
      drugOverdoseData.value = response.data.data;
    })
    .catch((error) => {
      setGlobalLoader(false);
      setGlobalErrorDialog(error);
    });
};

getDrugOverdose();

const nationDrugOverdoseData = computed(() => {
  let data: number[] = [];
  yearsLabels.forEach((year) => {
    data.push(
      drugOverdoseData.value.find((state) => {
        return state.Year === year;
      })?.["Drug Overdose Death Rate Per 100,000 Age-Adjusted"] || 0
    );
  });
  return data;
});

// opioid overdose death rate
let opioidOverdoseData: Ref<OpioidOverdoseData["data"]> = ref([]);

const getOpioidOverdose = () => {
  setGlobalLoader(true);
  DataServices.getOpioidOverdose()
    .then((response: OpioidOverdoseResponse) => {
      setGlobalLoader(false);
      opioidOverdoseData.value = response.data.data;
    })
    .catch((error) => {
      setGlobalLoader(false);
      setGlobalErrorDialog(error);
    });
};

getOpioidOverdose();

const nationOpioidOverdoseData = computed(() => {
  let data: number[] = [];
  yearsLabels.forEach((year) => {
    data.push(
      opioidOverdoseData.value.find((state) => {
        return state.Year === year;
      })?.["Opioid Overdose Death Rate Per 100,000 Age-Adjusted"] || 0
    );
  });
  return data;
});

// config
const config = computed(() => {
  return pluralBarChart(yearsLabels, [
    {
      label: "Opioid Overdose Death Rate Per 100,000 Age-Adjusted",
      data: nationOpioidOverdoseData.value,
      borderColor: "#f26b38",
      backgroundColor: "#f26b38CC",
      order: 1,
    },
    {
      label: "Drug Overdose Death Rate Per 100,000 Age-Adjusted",
      data: nationDrugOverdoseData.value,
      borderColor: "#8122a7",
      backgroundColor: "#8122a7CC",
      type: "line",
      order: 0,
    },
  ]);
});
</script>

<template>
  <BaseChart :config="config" :id="'bar-line-chart'" />
</template>
