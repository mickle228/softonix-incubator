<template>
  <div class="rounded-lg bg-white shadow relative">
    <div class="p-6 pb-2">
      <div class="flex">
        <div class="flex-grow text-sm truncate">
          <template v-if="editMode">
            <input
              ref="inputRef"
              v-model="localContact.name"
              type="text"
              class="block font-medium w-full border border-gray-300 p-2 rounded
              mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter contact name"
            >
            <input
              v-model="localContact.description"
              type="text"
              class="block mt-1 text-gray w-full border border-gray-300 p-2 rounded
              mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter contact description"
            >
            <template v-if="props.isNew">
              <input
                v-model="localContact.image"
                type="text"
                class="block mt-1 text-gray w-full border border-gray-300 p-2 rounded
                mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter image URL"
              >
            </template>

            <p v-if="!isNameValid && localContact.name.length > 0" class="text-red-500 text-xs mt-1 whitespace-normal">
              Name must be at least 5 characters long and contain at least one uppercase letter.
            </p>
            <p
              v-if="!isDescriptionValid && localContact.description.length > 0" class="text-red-500
              text-xs mt-1 whitespace-normal"
            >
              Description must be at least 20 characters long and contain at least two words.
            </p>
          </template>

          <template v-else>
            <p class="font-medium">{{ contact.name }}</p>
            <p class="text-gray mt-1 truncate">{{ contact.description }}</p>
          </template>
        </div>

        <img
          v-if="contact.image"
          class="w-[40px] h-[40px] object-cover ml-2 rounded-full shrink-0"
          :src="contact.image"
          alt="contact-logo"
        >
        <img
          v-else
          class="w-[40px] h-[40px] object-cover ml-2 rounded-full shrink-0"
          src="https://img.icons8.com/pulsar-line/48/no-image-gallery.png"
          alt="no-image"
        >
      </div>

      <div class="flex justify-end mt-2 gap-2">
        <template v-if="editMode">
          <span class="text-blue-500 font-medium text-xs cursor-pointer hover:underline" @click="onCancel">Cancel</span>
          <span
            :class="{'text-gray-400': !isFormValid, 'text-blue-500 cursor-pointer hover:underline': isFormValid}"
            class="font-medium text-xs"
            :style="{ cursor: isFormValid ? 'pointer' : 'not-allowed' }"
            :disabled="!isFormValid"
            @click="onSave"
          >Save</span>
        </template>

        <template v-else>
          <span
            class="text-blue-500 font-medium text-xs cursor-pointer hover:underline" @click="triggerEditMode"
          >
            Edit
          </span>
          <span
            class="text-red-500 font-medium text-xs cursor-pointer hover:underline" @click="confirmDelete"
          >
            Delete
          </span>
        </template>
      </div>
    </div>

    <div class="flex text-sm font-medium text-gray-dark border-t border-gray-ultra-light">
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
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'
import type { IContact } from '@/types'
import IconEnvelope from '@/components/icons/IconEnvelope.vue'
import IconPhone from '@/components/icons/IconPhone.vue'

const props = defineProps<{
  contact: IContact
  isNew?: boolean
}>()

const emit = defineEmits(['delete', 'save'])

const inputRef = ref<HTMLInputElement>()

const localContact = ref<Omit<IContact, 'id'>>({
  name: '',
  description: '',
  image: ''
})

const editMode = ref(props.isNew || false)

const isNameValid = computed(() => {
  const name = localContact.value.name
  return name.length >= 5 && /[A-Z]/.test(name)
})

const isDescriptionValid = computed(() => {
  const description = localContact.value.description
  return description.length >= 20 && description.split(' ').length >= 2
})

const isFormValid = computed(() => {
  return isNameValid.value && isDescriptionValid.value
})

async function triggerEditMode () {
  editMode.value = true
  localContact.value = { ...props.contact }
  await nextTick()
  inputRef.value?.focus()
}

function onSave () {
  if (!isFormValid.value) return
  if (!localContact.value.image) {
    localContact.value.image = 'https://img.icons8.com/pulsar-line/48/no-image-gallery.png'
  }
  emit('save', localContact.value)
  editMode.value = false
}

function onCancel () {
  if (props.isNew) {
    emit('delete')
  } else {
    editMode.value = false
  }
}

function confirmDelete () {
  const isConfirmed = window.confirm('Are you sure you want to delete this contact?')
  if (isConfirmed) {
    emit('delete')
  }
}
</script>
