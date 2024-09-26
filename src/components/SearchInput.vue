<template>
  <input
    v-model="searchValue"
    type="text"
    :placeholder="placeholder"
    class="border border-gray-300 rounded p-[5px] w-[400px]"
    @input="updateValue"
  >
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emits = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const searchValue = ref(props.modelValue)

function updateValue () {
  emits('update:modelValue', searchValue.value)
}

watch(() => props.modelValue, (newValue) => {
  searchValue.value = newValue
})

</script>
