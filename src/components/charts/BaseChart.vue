<script lang="ts" setup>
import Chart from "chart.js/auto";
import type { ChartItem } from "chart.js/auto";
import { onMounted, defineProps, watch } from "vue";
import { ChartConfiguration } from "chart.js";

// props
const props = defineProps<{
  config: {
    type: string;
    data: {
      labels: string[];
      datasets: {
        label: string;
        backgroundColor: string | string[];
        data: number[];
      }[];
    };
    options: {
      [key: string]: any;
    };
  };
  id: string;
}>();

// add chart to DOM
let myChart: Chart;

const addChartToDOM = () => {
  const canvas = document.getElementById(`myChart-${props.id}`);
  if (canvas) {
    myChart = new Chart(
      canvas as ChartItem,
      props.config as ChartConfiguration
    );
  }
};

// watch
watch(
  () => props.config,
  () => {
    myChart.destroy();
    addChartToDOM();
  }
);

// on mounted
onMounted(() => {
  addChartToDOM();
});
</script>

<template>
  <canvas :id="`myChart-${id}`"></canvas>
</template>
