<template>
  <div ref="imgContainer" class="relative w-full overflow-hidden">
    <div v-if="loading" class="w-[600px] h-[400px] bg-gray-200 animate-pulse" />
    <img
      v-if="loadedSrc && !error"
      :src="loadedSrc"
      :alt="alt"
      class="block max-w-full h-auto"
      @load="onLoad"
    >
    <div
      v-if="error"
      :style="{ height: `${imageHeight}px`, width:`${imageWidth}px` }"
      class="flex justify-center items-center bg-slate-400"
    >
      <span class="text-gray-500">No Image Available</span>
    </div>
  </div>
</template>

<script lang="ts" setup>

interface IProps {
  src: string
  alt: string
}

const props = defineProps<IProps>()
const loading = ref(true)
const error = ref(false)
const loadedSrc = ref<string | null>(null)
const observer = ref<IntersectionObserver | null>(null)
const imgContainer = ref<HTMLElement | null>(null)
const imageHeight = ref(0)
const imageWidth = ref(0)

const onLoad = () => {
  loading.value = false
  imageHeight.value = (imgContainer.value as HTMLImageElement).naturalHeight
  imageWidth.value = (imgContainer.value as HTMLImageElement).naturalWidth
}

const loadImage = () => {
  const img = new Image()
  img.src = props.src
  img.onload = () => {
    loadedSrc.value = props.src
    loading.value = false
    imageHeight.value = img.height
  }
  img.onerror = () => {
    loading.value = false
    error.value = true
    imageHeight.value = 400
    imageWidth.value = 600
  }
}

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        loadImage()
        observer.value?.disconnect()
      }
    },
    { rootMargin: '300px' }
  )
  observer.value.observe(imgContainer.value as HTMLElement)
})

onBeforeUnmount(() => {
  observer.value?.disconnect()
})
</script>

<style scoped>
@keyframes pulse {
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}
</style>
