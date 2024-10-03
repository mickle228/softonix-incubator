<template>
  <el-table :data="[contact]">
    <el-table-column label="Image" width="80">
      <template #default>
        <div class="flex items-center justify-center">
          <div
            class="w-[40px] h-[40px] rounded-full overflow-hidden border
           border-gray-medium bg-gray-ultra-light flex items-center justify-center"
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
      </template>
    </el-table-column>

    <el-table-column label="Name">
      <template #header>
        <div class="text-center">Name</div>
      </template>
      <template #default>
        <div class="flex justify-center" @click.stop>
          <template v-if="editMode">
            <input
              ref="inputRef"
              v-model="localContact.name"
              type="text"
              class="block font-medium w-full text-center"
            >
          </template>
          <template v-else>
            <p class="font-medium cursor-text text-center">{{ localContact.name }}</p>
          </template>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Description">
      <template #header>
        <div class="text-center">Description</div>
      </template>
      <template #default>
        <div class="flex justify-center" @click.stop>
          <template v-if="editMode">
            <input
              v-model="localContact.description"
              type="text"
              class="block mt-1 text-gray w-full text-center"
            >
          </template>
          <template v-else>
            <p class="text-gray cursor-text mt-1 truncate text-center">{{ localContact.description }}</p>
          </template>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Actions" width="150">
      <template #header>
        <div class="text-center">Actions</div>
      </template>
      <template #default>
        <div class="flex justify-center mt-2 gap-2">
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
      </template>
    </el-table-column>
  </el-table>
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
</script>
