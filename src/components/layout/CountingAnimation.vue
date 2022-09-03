<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { onMounted, ref, defineProps, watch } from "vue";

// props
const props = defineProps<{
  endValue: number;
  text: string;
  duration: number;
  flexDirection?: string;
  withPlus?: boolean;
  withPercentage?: boolean;
  color?: string;
}>();

let currentNumber = ref(0);
let counter: number;

const displayedNumber = computed(() => {
  if (currentNumber.value < 10)
    return (
      "0".repeat(props.endValue.toString().length - 1) + currentNumber.value
    );
  if (currentNumber.value < 100)
    return (
      "0".repeat(props.endValue.toString().length - 2) + currentNumber.value
    );
  return currentNumber.value;
});

const setCounterInterval = () => {
  counter = setInterval(() => {
    if (currentNumber.value === props.endValue || props.endValue < 0) {
      clearInterval(counter);
    }
    currentNumber.value++;
  }, props.duration);
};

watch(
  () => props.endValue,
  () => {
    clearInterval(counter);
    currentNumber.value = 0;
    setCounterInterval();
  }
);

onMounted(() => {
  setCounterInterval();
});
</script>

<template>
  <div class="counting-animation">
    <div
      :class="flexDirection === 'column' ? 'counting-animation__vertical' : ''"
      :style="color ? `color: ${color}` : ''"
    >
      <mdicon class="counter-icon" name="information" size="55" />
      <p class="counter">
        {{ displayedNumber }}<template v-if="withPlus">+</template
        ><template v-if="withPercentage">%</template>
      </p>
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
    opacity: 0.6;
  }

  & .desc {
    font-weight: lighter;
    text-align: center;
  }

  &__vertical {
    display: flex;
    flex-direction: column;
    gap: 0 !important;
    max-height: 10rem !important;

    & .counter {
      font-size: 6rem;
    }

    & .counter-icon {
      transform: translateY(0.5rem);
    }
  }
}
</style>
