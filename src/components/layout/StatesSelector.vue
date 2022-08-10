<script lang="ts" setup>
// imports
import { stateID } from "@/utils/statesID";
import { computed, ref } from "@vue/reactivity";
import { onMounted, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// selected state
const selectedState = ref("");

onMounted(() => {
  const routeId = route.params.id;
  selectedState.value = typeof routeId === "string" ? routeId : "";
});

// change state action
const emit = defineEmits(["changeState"]);
const changeState = (state: string) => {
  selectedState.value = state;
  router.push(`/state/${selectedState.value}`);
  emit("changeState", stateID[selectedState.value].key);
};

// shown options
const shownOptions = ref(false);

// selecter options with searching
let searchState = ref("");

const stateOptions = computed(() => {
  let options = Object.entries(stateID).map((state) => {
    return { id: state[0], key: state[1].key, name: state[1].name };
  });
  if (searchState.value.trim().length) {
    return options.filter((state) => {
      return (
        state.name
          .slice(0, searchState.value.trim().length)
          .toLocaleLowerCase() === searchState.value.toLocaleLowerCase()
      );
    });
  }
  return options;
});
</script>

<template>
  <div class="select">
    <div class="select__selected" @click="shownOptions = !shownOptions">
      <div>
        <p v-if="!shownOptions">{{ stateID[selectedState]?.name }}</p>
        <p v-else @click.stop>
          <input
            type="text"
            v-model="searchState"
            :placeholder="stateID[selectedState]?.name"
          />
        </p>
      </div>
      <div class="select__icon">
        <mdicon
          v-if="shownOptions && searchState.length"
          name="close"
          size="22"
          class="x-icon"
        /><mdicon v-else name="arrowUp" size="22" class="arrow-icon" />
      </div>
    </div>

    <div class="select__options" :class="shownOptions ? 'shown-options' : ''">
      <div
        v-for="state in stateOptions"
        :key="state.id"
        @click="changeState(state.id)"
        class="select__option"
        :class="selectedState === state.id ? 'active-select' : ''"
      >
        <input type="radio" class="radio" :id="state.id" name="state" />
        <label :for="state.id">{{ state.name }}</label>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.select {
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  width: 14rem;
  z-index: 2;

  & p {
    margin: 0;
    padding: 0 !important;
  }

  &__options {
    background-color: var(--bg);
    max-height: 0;
    opacity: 0;
    transition: var(--transition-slow);
    overflow: hidden;

    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--card-bg-contrast);
    }
  }

  &__selected {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__option,
  &__selected {
    padding: 0.85rem 1rem;
    background: var(--bg);
    cursor: pointer;
    transition: var(--transition-fast);

    & input {
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      -o-appearance: none;
      appearance: none;
      background: rgba(0, 0, 0, 0);
      outline: none;
      border: none;
      color: var(--card-bg-contrast);
    }
  }

  &__option:hover {
    background: var(--base-turquoise);
  }

  &__option .radio {
    display: none;
  }

  & label {
    cursor: pointer;
  }

  & .active-select {
    background: var(--base-turquoise);
  }

  &__icon .x-icon {
    opacity: 0.7;
    transition: var(--transition-fast);

    &:hover {
      opacity: 1;
    }
  }
}

.shown-options {
  max-height: 200px;
  opacity: 1;
  overflow-y: scroll;
}
</style>
