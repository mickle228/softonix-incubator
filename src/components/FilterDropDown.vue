<template>
  <div class="relative" @mouseenter="openDropdown" @mouseleave="closeDropdown">
    <AppButton class="w-full" @click="toggleDropdown">
      <template #icon>
        <span class="ml-2">&#9662;</span>
      </template>
      Sort by: {{ selectedSortOption }}
    </AppButton>
    <div v-if="isOpen" class="absolute left-0 z-10 bg-white border border-gray-300 rounded shadow-lg">
      <ul>
        <li
          v-for="option in sortOptions"
          :key="option.value"
          class="p-1 cursor-pointer hover:bg-gray-200"
          @click="updateSort(option.value)"
        >
          {{ option.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import AppButton from './AppButton.vue'

const props = defineProps<{
  onSortChange: (sortOption: string) => void
}>()

const sortOptions = [
  { value: 'default', text: 'Default' },
  { value: 'ascending', text: 'Ascending' },
  { value: 'descending', text: 'Descending' }
]

const selectedSortOption = ref('default')
const isOpen = ref(false)

function openDropdown () {
  isOpen.value = true
}

function closeDropdown () {
  isOpen.value = false
}

function toggleDropdown () {
  isOpen.value = !isOpen.value
}

function updateSort (sortOption: string) {
  selectedSortOption.value = sortOption
  props.onSortChange(sortOption)
  closeDropdown()
}
</script>
