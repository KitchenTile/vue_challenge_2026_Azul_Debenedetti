import { ref, watchEffect, toValue } from "vue";

// Composable hook to fetch data
export const useFetch = (url) => {
  const data = ref([]);
  const err = ref(null);
  const isLoading = ref(false);

  watchEffect(() => {
    data.value = null;
    err.value = null;
    isLoading.value = true;

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((error) => (err.value = error))
      .finally(() => (isLoading.value = false));
  });

  return { data, err, isLoading };
};
