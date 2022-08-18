<script lang="ts" setup>
import Chart from "chart.js/auto";
import type { ChartItem } from "chart.js/auto";
import { onMounted, defineProps, watch } from "vue";

// props
const props = defineProps(["config"]);

// add chart to DOM
let myChart: Chart;

const addChartToDOM = () => {
  const canvas = document.getElementById("myChart");
  if (canvas) {
    myChart = new Chart(canvas as ChartItem, props.config);
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
  <canvas id="myChart"></canvas>
</template>
