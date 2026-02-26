<script setup lang="ts">
import { ref, watch } from "vue";
import { FilterCriteria, FilterPayload, SortCriteria, SortPayload } from "@/types";
import BaseButton from "./BaseComponents/BaseButton.vue";

const props = defineProps<{
  sortCriteria: SortCriteria[];
  filterCriteria: FilterCriteria[];
}>();
const emits = defineEmits<{
  (e: "sort", payload: SortPayload): void;
  (e: "filter", payload: FilterPayload): void;
}>();

const sortOpen = ref(false);
const filtersOpen = ref(false);
const sortValues = ref({ criteria: null, ascending: false });
const appliedFilters = ref({
  eyeColor: [],
  petPreference: [],
  fruitPreference: [],
});

const clearFilters = () => {
  appliedFilters.value = {
    eyeColor: [],
    petPreference: [],
    fruitPreference: [],
  };
};

// watch variables and emit when they change
watch(
  appliedFilters,
  (newFilters) => {
    emits("filter", newFilters);
  },
  { deep: true },
);

watch(
  sortValues,
  (newSortingValues) => {
    emits("sort", newSortingValues);
  },
  { deep: true },
);

// option toggles
const toggleFilters = () => {
  filtersOpen.value = !filtersOpen.value;
  if (filtersOpen.value) {
    sortOpen.value = false;
  }
};

const toggleSort = () => {
  sortOpen.value = !sortOpen.value;
  if (sortOpen.value) {
    filtersOpen.value = false;
  }
};
</script>

<template>
  <div class="filter-container">
    <div class="button-filters-container">
      <BaseButton @click="toggleFilters"
        >Filter <span id="icon"> <font-awesome-icon icon="filter" /> </span
      ></BaseButton>
      <div class="filter-options-container" v-if="filtersOpen">
        <div class="clear-all-button">
          <BaseButton @click="clearFilters">Clear All</BaseButton>
        </div>
        <div
          v-for="filterCriteria in props.filterCriteria"
          :key="filterCriteria.key"
          class="filter-column"
        >
          <h3>{{ filterCriteria.label }}</h3>
          <div
            v-for="(filterValue, index) in filterCriteria.values"
            :key="index"
            class="filter-input-container"
          >
            <label>
              <input
                type="checkbox"
                :value="filterValue"
                v-model="appliedFilters[filterCriteria.key]"
              />
              <span>{{ filterValue }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="button-sort-container">
      <BaseButton @click="toggleSort"
        >Sort<span id="icon"> <font-awesome-icon icon="sort" /> </span
      ></BaseButton>
      <div v-if="sortOpen" class="sort-container">
        <div class="sort-title">
          <h3>Sort by</h3>
          <div v-if="sortValues.criteria" class="ascending-input-container">
            <span @click="sortValues.ascending = !sortValues.ascending">
              <font-awesome-icon v-if="sortValues.ascending" icon="arrow-down-wide-short" />
              <font-awesome-icon v-else icon="arrow-up-wide-short" />
            </span>
          </div>
        </div>
        <div
          v-for="sortCriteria in props.sortCriteria"
          :key="sortCriteria.key"
          class="sorting-input-container"
        >
          <label>
            <input
              type="radio"
              name="sortButton"
              v-model="sortValues.criteria"
              :value="sortCriteria.key"
            />
            <span>{{ sortCriteria.label }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.button-filters-container,
.button-sort-container {
  position: relative;

  & #icon {
    font-size: 12px;
    color: var(--primary-c);
  }
}
.filter-options-container,
.sort-container {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 40px;
  background-color: white;
  padding: 2rem 2.5rem;
  gap: 40px;
  border-radius: 10px;
  border: 1px solid #2c3e50;
  box-shadow: 0 10px 25px -5px rgba(44, 62, 80, 0.1);
  z-index: 10;
}

.filter-input-container {
  & label {
    display: flex;
    gap: 5px;
    width: 150px;

    & input {
      &:checked + span {
        font-weight: 600;
        color: var(--primary-c);
      }
    }
    & span {
      cursor: pointer;
    }
  }
}

.clear-all-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.filter-column {
  display: flex;
  flex-direction: column;
  gap: 5px;

  & h3 {
    font-weight: 600;
    border-bottom: 2px solid black;
  }
}

.sort-container {
  flex-direction: column;
  gap: 5px;
  padding: 1rem 1.5rem;
  width: 150px;
}

.sort-title {
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 2px solid black;
  & h3 {
    font-weight: 600;
  }
}

.sorting-input-container {
  & span {
    cursor: pointer;
  }
  & input {
    display: none;

    &:checked + span {
      font-weight: 600;
      color: var(--primary-c);
    }
  }
}

.ascending-input-container {
  & span {
    cursor: pointer;
  }
  & input {
    display: none;
  }
}

@media (max-width: 768px) {
  .filter-options-container {
    flex-direction: column;
    gap: 20px;
    padding: 1.5rem;
    width: max-content;
    max-width: 50vw;
    max-height: 60vh;
    overflow-y: auto;
    left: -30px;
    z-index: 10;
  }

  .sort-container {
    left: -52px;
    z-index: 10;
    max-width: 40vw;
    max-height: 60vh;
    width: max-content;
  }

  .clear-all-button {
    position: relative;
    align-self: flex-start;
    bottom: auto;
    right: auto;
  }
}
</style>
