<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    class="inline w-6 h-6"
    :class="{'transform rotate-180': isExpanded}"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ isExpanded: boolean }>()
</script>
