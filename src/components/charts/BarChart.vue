<script lang="ts" setup>
import Chart from "chart.js/auto";
import type { ChartItem } from "chart.js/auto";
import { onMounted, defineProps, watch, computed } from "vue";

// props
const props = defineProps(["data", "chartTitle"]);

// config
const config = computed(() => {
  return {
    type: "bar",
    data: props.data,
    options: {
      plugins: {
        title: {
          display: true,
          text: props.chartTitle,
        },
        legend: {
          display: false,
        },
      },
      responsive: true,
    },
  };
});

// add chart to DOM
let myChart: Chart;

const addChartToDOM = () => {
  const canvas = document.getElementById("myChart");
  if (canvas) {
    myChart = new Chart(canvas as ChartItem, config.value);
  }
};

// watch
watch(
  () => props.data,
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
  <div style="width: 800px">
    <canvas id="myChart"></canvas>
  </div>
</template>
