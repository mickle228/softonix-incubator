<template>
  <el-card>
    <div class="flex-grow p-5 pb-3">
      <div class="flex">
        <div class="flex-grow text-sm truncate" @click.stop>
          <template v-if="editMode">
            <input
              ref="inputRef"
              v-model="localContact.name"
              type="text"
              class="block font-medium w-full"
            >
            <input
              v-model="localContact.description"
              type="text"
              class="block mt-1 text-gray w-full"
            >
          </template>
          <template v-else>
            <p class="font-medium cursor-text">{{ contact.name }}</p>
            <p class="text-gray cursor-text mt-1 truncate">
              {{ contact.description }}
            </p>
          </template>
        </div>

        <div
          class="flex items-center justify-center w-[40px] h-[40px] ml-2
          rounded-full shrink-0 overflow-hidden border border-gray-medium bg-gray-ultra-light"
        >
          <span v-if="imageHasError || !contact.image" class="font-medium uppercase">{{ nameAbbrv }}</span>
          <img
            v-else
            class="object-cover"
            :src="contact.image"
            alt="contact-logo"
            @error="imageHasError = true"
            @load="imageHasError = false"
          >
        </div>
      </div>

      <div class="flex justify-end mt-2 gap-2">
        <template v-if="editMode">
          <span
            class="text-blue-500 font-medium text-xs cursor-pointer hover:underline"
            @click.stop="cancelEdit"
          >Cancel</span>
          <span
            class="text-blue-500 font-medium text-xs cursor-pointer hover:underline"
            @click.stop="onSave"
          >Save</span>
        </template>
        <template v-else>
          <span
            class="text-blue-500 font-medium text-xs cursor-pointer hover:underline"
            @click.stop="triggerEditMode"
          >Edit</span>
          <span
            class="text-red-500 font-medium text-xs cursor-pointer hover:underline"
            @click.stop="deleteContact"
          >Delete</span>
        </template>
      </div>
    </div>

    <template #footer>
      <div class="flex text-sm font-medium text-gray-dark border-gray-ultra-light" @click.stop>
        <div class="flex items-center justify-center flex-1 py-4 cursor-pointer hover:text-gray">
          <IconEnvelope />
          <span class="ml-3">Email</span>
        </div>
        <div
          class="flex items-center justify-center flex-1 py-4 border-l
           border-gray-ultra-light cursor-pointer hover:text-gray"
        >
          <IconPhone />
          <span class="ml-3">Call</span>
        </div>
      </div>
    </template>
  </el-card>
</template>

<script lang="ts" setup>

const props = defineProps<{ contact: IContact }>()
const emit = defineEmits(['delete', 'save'])

const {
  editMode,
  localContact,
  nameAbbrv,
  imageHasError,
  triggerEditMode,
  onSave,
  deleteContact,
  cancelEdit
} = useContactActions(props.contact, emit)

watch(() => props.contact, (newContact) => {
  localContact.value = { ...newContact }
}, { immediate: true })
</script>
