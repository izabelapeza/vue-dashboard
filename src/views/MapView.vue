<script setup lang="ts">
// imports
import { computed } from "vue";
import MapUSA from "@/components/maps/MapUSA.vue";
import BaseChart from "@/components/charts/BaseChart.vue";
import DataServices from "@/services/dataService";

DataServices.getAdultObesityData()
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => console.log(error));

// temp
// const adultObesityConfig = computed(() => {
//   return {
//     type: "bar",
//     data: {
//       labels: adultObesity?.labels,
//       datasets: [
//         {
//           label: "My First dataset",
//           backgroundColor: "rgb(255, 99, 132)",
//           borderColor: "rgb(255, 99, 132)",
//           data: adultObesity?.data,
//         },
//       ],
//     },
//     options: {
//       indexAxis: "y",
//       elements: {
//         bar: {
//           borderWidth: 2,
//         },
//       },
//       responsive: true,
//       plugins: {
//         legend: {
//           position: "right",
//         },
//         title: {
//           display: true,
//           text: "Chart.js Horizontal Bar Chart",
//         },
//       },
//     },
//   };
// });
</script>

<template>
  <div class="card" style="height: 95vh; width: 100%">
    <MapUSA :isClickable="true" />
  </div>
  <!-- <BaseChart :config="config" /> -->
</template>
