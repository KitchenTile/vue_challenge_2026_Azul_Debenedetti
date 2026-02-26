import { ref, computed } from "vue";

//composable to modify array based on filter and sort values
export const useSortAndFilter = (data) => {
  const sort = ref({});
  const filters = ref({});

  // ref setters
  const setSort = (sortingValue) => {
    sort.value = sortingValue;
  };

  const setFilters = (filterObj) => {
    filters.value = filterObj;
  };

  // computed array with the result of sorting and filtering the data emited from filter component
  const sortAndFilterData = computed(() => {
    if (!data.value) return [];

    let dataCopy = [...data.value];
    // filter logic
    // Loop through each key in the filter obj, if filters are selected and the
    // row's value isnt in the filter obj list, reject the row
    // otherwise return that user Obj
    dataCopy = dataCopy.filter((row) => {
      for (const key in filters.value) {
        if (filters.value[key].length > 0 && !filters.value[key].includes(row[key])) {
          return false;
        }
      }
      return true;
    });

    // sorting logic
    // if it's a string value like lastName, sort alphabetically
    // otherwise, sort by numeric value
    if (sort.value.criteria) {
      dataCopy.sort((a, b) => {
        if (typeof a[sort.value.criteria] === "string") {
          if (a[sort.value.criteria] < b[sort.value.criteria]) {
            return sort.value.ascending ? -1 : 1;
          }
          if (a[sort.value.criteria] > b[sort.value.criteria]) {
            return sort.value.ascending ? 1 : -1;
          }
        } else {
          return sort.value.ascending
            ? a[sort.value.criteria] - b[sort.value.criteria]
            : b[sort.value.criteria] - a[sort.value.criteria];
        }
      });
    }

    return dataCopy;
  });

  return { sort, filters, sortAndFilterData, setSort, setFilters };
};
