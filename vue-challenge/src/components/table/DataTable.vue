<script setup lang="ts">
import { toRef } from "vue";
import TableRow from "./TableRow.vue";
import { FilterCriteria, SortCriteria, TableColumn, User } from "@/types";
import LoadingComponent from "../LoadingComponent.vue";
import FilterComponent from "../FIlterComponent.vue";
import { useSortAndFilter } from "@/composables/useSortAndFilter";

const props = defineProps<{
  tableData: User[];
  isLoading: boolean;
  title: string;
  sortCriteria: SortCriteria[];
  filterCriteria: FilterCriteria[];
  tableColumns: TableColumn[];
  error?: string;
}>();

// calculate new sorted/filtered data array
const { sortAndFilterData, setSort, setFilters } = useSortAndFilter(toRef(() => props.tableData));
</script>

<template>
  <div class="table-filters-container">
    <div class="title-filters-container">
      <h1>{{ props.title }}</h1>
      <FilterComponent
        :sort-criteria="sortCriteria"
        :filter-criteria="filterCriteria"
        @sort="setSort"
        @filter="setFilters"
      />
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th v-for="column in props.tableColumns" :key="column.key" class="header-row">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="props.isLoading">
            <td :colspan="props.tableColumns.length">
              <LoadingComponent />
            </td>
          </tr>
          <tr v-else-if="props.error">
            <td :colspan="props.tableColumns.length" class="error-message">
              {{ error }}
            </td>
          </tr>
          <template v-else>
            <template v-if="sortAndFilterData.length > 0">
              <tr v-for="dataElement in sortAndFilterData" :key="dataElement.id" class="body-row">
                <TableRow :row-data="dataElement" :columns="tableColumns" />
              </tr>
            </template>

            <tr v-else>
              <td :colspan="props.tableColumns.length" class="no-data-warning-row">
                No data to be shown with this specific filter configuration
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-filters-container {
  border-radius: 10px;
  border: 2px solid #2e5881;
  box-shadow: 0 10px 25px -5px rgba(44, 62, 80, 0.1);
  position: relative;
  background-color: white;
  padding: 10px;
}

.title-filters-container {
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
  gap: 20px;
  border-bottom: 1px solid var(--primary-c);
  align-items: center;
  padding-bottom: 5px;

  & h1 {
    font-size: clamp(1.6rem, 2.5vw, 2rem);
    font-weight: 600;
  }
}

.table-container {
  overflow: scroll;
  max-height: 400px;
}

table {
  border-collapse: collapse;
}

.header-row {
  font-weight: 600;
  padding: 10px;
  min-width: 136px;
  max-width: 136px;
  background-color: #f8fafc;
  top: 0;
  z-index: 1;
  position: sticky;
  border-bottom: 2px solid #e2e8f0;
}

.body-row {
  text-align: center;
  height: 35px;
  font-weight: 600;
  min-width: 136px;
  color: #383f4a;
  border-bottom: 2px solid #e2e8f0;
}

td {
  padding: 14px 16px;
  color: #2d3748;
  border-bottom: 1px solid #edf2f7;
}

.no-data-warning-row,
.error-message {
  text-align: center;
  color: #718096;
  padding: 3rem;
  font-weight: 600;
}
.error-message {
  color: rgb(255, 106, 106);
}
</style>
