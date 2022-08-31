<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { onMounted, ref, defineProps, watch } from "vue";

// props
const props = defineProps<{
  endValue: number;
  text: string;
  state: string;
}>();

let currentNumber = ref(0);
let interval = 5000;
let duration = Math.floor(interval / props.endValue);

let counter: number;

const displayedNumber = computed(() => {
  if (currentNumber.value < 10) return "00" + currentNumber.value;
  if (currentNumber.value < 100) return "0" + currentNumber.value;
  return currentNumber.value;
});

const setCounterInterval = () => {
  counter = setInterval(() => {
    currentNumber.value++;
    if (currentNumber.value === props.endValue) {
      clearInterval(counter);
    }
  }, duration);
};

watch(
  () => props.state,
  () => {
    currentNumber.value = 0;
    clearInterval(counter);
    setCounterInterval();
  }
);

onMounted(() => {
  setCounterInterval();
});
</script>

<template>
  <div class="counting-animation">
    <div>
      <mdicon class="counter-icon" name="information" size="55" />
      <p class="counter">{{ displayedNumber }}+</p>
    </div>
    <p class="desc">{{ text }}</p>
  </div>
</template>

<style lang="scss" scoped>
.counting-animation {
  width: 100%;
  display: grid;
  justify-content: center;
  gap: 0.75rem;

  & div {
    display: flex;
    gap: 0.5rem;
    margin: 0;
    max-height: 4.5rem;
    align-items: center;
    justify-content: center;
  }

  & p {
    margin: 0;
  }
  & .counter {
    font-size: 4rem;
    font-weight: 600;
  }

  & .counter-icon {
    transform: translateY(0.1rem);
  }

  & .desc {
    font-weight: lighter;
    text-align: center;
  }
}
</style>
