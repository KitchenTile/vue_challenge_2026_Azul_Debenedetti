<script setup lang="ts">
import { TableColumn, User } from "@/types";

const props = defineProps<{
  rowData: User;
  columns: TableColumn[];
}>();
</script>

<template>
  <td v-for="col in props.columns" :key="col.key" class="table-row">
    {{ props.rowData[col.key] }}
  </td>
</template>

<style scoped>
.table-row {
  max-width: 136px;
  overflow: scroll;
}
</style>
