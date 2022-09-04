<script lang="ts" setup>
import BaseChart from "@/components/charts/BaseChart.vue";
import { ref, defineProps, computed } from "vue";
import type { Ref } from "vue";
import { lineChart } from "@/utils/chartConfigs";
import DataServices from "@/services/dataService";
import {
  AdultObesityResponse,
  ObesityData,
  DiabetesResponse,
  DiabetesData,
  AdultSmokingResponse,
  AdultSmokingData,
} from "@/types/ResponseData";
import useGlobalLoader from "@/utils/useGlobalLoader";
import useGlobalErrorDialog from "@/utils/useGlobalErrorDialog";
import getYearsLabel from "@/utils/getYearsLabel";

let { setGlobalLoader } = useGlobalLoader();
let { setGlobalErrorDialog } = useGlobalErrorDialog();

// props
const props = defineProps<{
  state: string;
}>();

// years
const yearsLabels = getYearsLabel(2014, 2021);

// adult obesity
let adultObesityData: Ref<ObesityData["data"]> = ref([]);

const getAdultObesityData = () => {
  setGlobalLoader(true);
  DataServices.getAdultObesityData()
    .then((response: AdultObesityResponse) => {
      setGlobalLoader(false);
      adultObesityData.value = response.data.data;
    })
    .catch((error) => {
      setGlobalLoader(false);
      setGlobalErrorDialog(error);
    });
};

getAdultObesityData();

const stateAdultObesityData = computed(() => {
  let data: number[] = [];
  let stateData = adultObesityData.value.filter((state) => {
    return state["ID State"] === props.state;
  });
  yearsLabels.forEach((year) => {
    data.push(
      stateData.find((state) => {
        return state.Year === year;
      })?.["Adult Obesity"] || 0
    );
  });
  return data;
});

// diabetes
let diabetesData: Ref<DiabetesData["data"]> = ref([]);

const getDiabetesData = () => {
  setGlobalLoader(true);
  DataServices.getDiabetesData()
    .then((response: DiabetesResponse) => {
      setGlobalLoader(false);
      diabetesData.value = response.data.data;
    })
    .catch((error) => {
      setGlobalLoader(false);
      setGlobalErrorDialog(error);
    });
};

getDiabetesData();

const stateDiabetesData = computed(() => {
  let data: number[] = [];
  let stateData = diabetesData.value.filter((state) => {
    return state["ID State"] === props.state;
  });
  yearsLabels.forEach((year) => {
    data.push(
      stateData.find((state) => {
        return state.Year === year;
      })?.["Diabetes Prevalence"] || 0
    );
  });
  return data;
});

// adult smoking
let adultSmokingData: Ref<AdultSmokingData["data"]> = ref([]);

const getAdultSmokingData = () => {
  setGlobalLoader(true);
  DataServices.getAdultSmokingData()
    .then((response: AdultSmokingResponse) => {
      adultSmokingData.value = response.data.data;
      setGlobalLoader(false);
    })
    .catch((error) => {
      setGlobalLoader(false);
      setGlobalErrorDialog(error);
    });
};

getAdultSmokingData();

const stateAdultSmokingData = computed(() => {
  let data: number[] = [];
  let stateData = adultSmokingData.value.filter((state) => {
    return state["ID State"] === props.state;
  });
  yearsLabels.forEach((year) => {
    data.push(
      stateData.find((state) => {
        return state.Year === year;
      })?.["Adult Smoking"] || 0
    );
  });
  return data;
});

// line chart congif
const lineChartConfig = computed(() => {
  return lineChart(yearsLabels, [
    {
      label: "Adult Obesity",
      data: stateAdultObesityData.value,
      borderColor: "#d83e96",
      backgroundColor: "#d83e96CC",
    },
    {
      label: "Diabetes",
      data: stateDiabetesData.value,
      borderColor: "#e2bf11",
      backgroundColor: "#e2bf11CC",
    },
    {
      label: "Adult Smoking",
      data: stateAdultSmokingData.value,
      borderColor: "#8122a7",
      backgroundColor: "#8122a7CC",
    },
  ]);
});
</script>

<template>
  <BaseChart :config="lineChartConfig" :id="'line-chart'" />
</template>
