<script setup lang="ts">
// imports
import { computed, ref } from "vue";
import type { Ref } from "vue";
import MapUSA from "@/components/maps/MapUSA.vue";
import BaseChart from "@/components/charts/BaseChart.vue";
import DataServices from "@/services/dataService";
import AdultObesityData from "@/types/AdultObesityData";
import { barChart } from "@/utils/chartConfigs";

// adult obesity
let adultObesityLabels: Ref<string[]> = ref([]);
let adultObesityData: Ref<number[]> = ref([]);

DataServices.getAdultObesityData()
  .then((response: AdultObesityData) => {
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
    "Adult Obesity",
    "#d83e96",
    adultObesityData.value
  );
});
</script>

<template>
  <div class="card" style="height: 95vh; width: 100%">
    <MapUSA :isClickable="true" />
  </div>
  <BaseChart :config="adultObesityConfig" />
</template>
