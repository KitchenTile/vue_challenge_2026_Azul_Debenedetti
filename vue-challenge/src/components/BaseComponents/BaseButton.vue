<script setup>
const props = defineProps(["onClick"]);
</script>

<template>
  <button class="btn" @click="onClick">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid var(--primary-c);
  background-color: white;
  gap: 8px;
}
.btn:hover {
  background-color: #f8f9fa;
  box-shadow: 0 4px 12px rgba(44, 62, 80, 0.15);
}

@media (max-width: 768px) {
  .btn {
    padding: 0.3rem 0.5rem;
    transition: none;
  }
}
</style>
