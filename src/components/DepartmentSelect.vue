<template>
  <ElSelect
    v-model="localSelectedDepartments"
    multiple
    collapse-tags
    collapse-tags-tooltip
    placeholder="Select departments"
    class="w-full"
  >
    <ElOption
      v-for="department in filteredDepartments"
      :key="department.value"
      :label="department.name"
      :value="department.value"
    />
  </ElSelect>
</template>

<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'
const props = defineProps<{
  selectedDepartments: string[]
  departments: { value: string; name: string }[]
}>();

const emits = defineEmits(['update:selectedDepartments'])

const localSelectedDepartments = ref([...props.selectedDepartments])

watch(localSelectedDepartments, (newVal) => {
  emits('update:selectedDepartments', newVal)
})

const filteredDepartments = computed(() => {
  return props.departments.sort((a, b) => a.name.localeCompare(b.name))
})
</script>
