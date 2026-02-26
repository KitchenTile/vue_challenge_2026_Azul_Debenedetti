<script setup lang="ts">
import { computed, watch } from "vue";
import DataTable from "./components/table/DataTable.vue";
import { useFetch } from "./composables/useFetch";
import type { apiData, FilterCriteria, SortCriteria, TableColumn, User } from "./types";

const {
  data: fetchedData,
  err,
  isLoading,
} = useFetch("https://3ed023bd-e1ae-4fa4-8d74-3482e6112630.mock.pstmn.io/");

watch(isLoading, (newData) => {
  console.log("Data finally arrived:", newData);
});

//format the data to fit my idea of what the table will look like
const modifiedTableData = computed(() => {
  if (!fetchedData.value) return [];
  const copyArray = fetchedData.value;

  const modifiedArray = copyArray.map((user: apiData): User => {
    // to allow for easier sorting, we separate first and last name from name
    const separatedName = user.name.split(" ");
    const lastName = separatedName.pop();
    const firstName = separatedName.join(" ");

    const userLocation = `[${user.location?.latitude}, ${user.location?.longitude}]`;

    return {
      id: user._id,
      firstName: firstName,
      lastName: lastName,
      age: user.age,
      gender: user.gender,
      location: userLocation,
      eyeColor: user.eyeColor,
      petPreference: user.preferences?.pet,
      fruitPreference: user.preferences?.fruit,
    };
  });

  return modifiedArray;
});

//get unique values for filtering logic
const onlyUnique = (value: string, index: number, array: any[]) => {
  return array.indexOf(value) === index;
};

// Point of control for filtering, requires data to be loaded beforehand
const filterCriteria = computed<FilterCriteria[]>(() => {
  if (!modifiedTableData.value || modifiedTableData.value.length === 0) {
    return [
      { key: "eyeColor", label: "Eye Color", values: [] },
      { key: "petPreference", label: "Pet Preference", values: [] },
      { key: "fruitPreference", label: "Fruit Preference", values: [] },
    ];
  }

  const availablePets = modifiedTableData.value
    .map((user) => user.petPreference)
    .filter(onlyUnique);
  const availableEyeColor = modifiedTableData.value.map((user) => user.eyeColor).filter(onlyUnique);
  const availableFruits = modifiedTableData.value
    .map((user) => user.fruitPreference)
    .filter(onlyUnique);

  return [
    { key: "eyeColor", label: "Eye Color", values: availableEyeColor },
    { key: "petPreference", label: "Pet Preference", values: availablePets },
    { key: "fruitPreference", label: "Fruit Preference", values: availableFruits },
  ];
});

//Point of control for sorting criteria
const sortCriteria: SortCriteria[] = [
  { key: "age", label: "Age" },
  { key: "lastName", label: "Last Name" },
];

//Point of control for table headers and body
const tableColumns: TableColumn[] = [
  { key: "id", label: "ID" },
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "age", label: "Age" },
  { key: "gender", label: "Gender" },
  { key: "location", label: "Location" },
  { key: "eyeColor", label: "Eye Color" },
  { key: "petPreference", label: "Pet Preference" },
  { key: "fruitPreference", label: "Fruit Preference" },
];
</script>

<template>
  <main>
    <DataTable
      title="User Table"
      :table-data="modifiedTableData"
      :is-loading="isLoading"
      :table-columns="tableColumns"
      :sort-criteria="sortCriteria"
      :filter-criteria="filterCriteria"
      :error="err"
    />
  </main>
</template>
