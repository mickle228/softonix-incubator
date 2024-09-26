<template>
  <div class="relative" @mouseenter="openDropdown" @mouseleave="closeDropdown">
    <AppButton @click="toggleDropdown">
      <template #icon>
        <span class="ml-2">&#9662;</span>
      </template>
      Roles
    </AppButton>
    <div v-if="isOpen" class="absolute left-0 z-10 bg-white border border-gray-300 rounded shadow-lg">
      <div class="flex items-center p-2 pb-0">
        <input
          id="check-all"
          v-model="checkAll"
          type="checkbox"
          :indeterminate="isIndeterminate"
          class="mr-2"
          @change="handleCheckAllChange"
        >
        <label for="check-all" class="cursor-pointer">{{ checkAll ? 'Clear' : 'All roles' }}</label>
      </div>
      <div class="flex flex-col p-2 pt-0">
        <label
          v-for="role in roles"
          :key="role"
          class="flex items-center cursor-pointer"
        >
          <input
            v-model="selectedRoles"
            type="checkbox"
            :value="role"
            class="mr-2"
            @change="handleRoleChange"
          >
          {{ role }}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import AppButton from './AppButton.vue'

const props = defineProps<{
  roles: string[]
  modelValue: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const selectedRoles = ref<string[]>(props.modelValue || [])
const checkAll = ref(false)
const isIndeterminate = ref(false)
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const openDropdown = () => {
  isOpen.value = true
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleRoleChange = () => {
  const selectedCount = selectedRoles.value.length
  checkAll.value = selectedCount === props.roles.length
  isIndeterminate.value = selectedCount > 0 && selectedCount < props.roles.length
  emit('update:modelValue', selectedRoles.value)
}

const handleCheckAllChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const isChecked = target.checked
  selectedRoles.value = isChecked ? [...props.roles] : []
  isIndeterminate.value = false
  checkAll.value = isChecked
  emit('update:modelValue', selectedRoles.value)
}
</script>
