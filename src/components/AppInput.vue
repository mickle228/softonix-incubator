<template>
  <el-input
    v-model="inputValue"
    type="text"
    :placeholder="placeholder"
    size="large"
    class="font-medium text-black"
  />
</template>

<script lang="ts" setup>

const props = defineProps<{
  placeholder?: string
  modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])
const inputValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue
})

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
