<template>
  <header class="flex items-center gap-4 justify-between">
    <h3 class="font-medium m-0">Contact list</h3>

    <div class="flex space-x-2">
      <SearchInput v-model="searchQuery" placeholder="Search contacts by name or description" />
      <RoleDropDown v-model="selectedRoles" :roles="roles" />
      <FilterDropDown @sortChange="handleSortChange" />

      <AppButton @click="createNewContact">
        <template #icon>
          <IconPlus class="w-5 h-5" />
        </template>
        Add Contact
      </AppButton>
    </div>
  </header>
  <div class="grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid gap-5 my-5 justify-center">
    <ContactItem
      v-for="contact in sortedContacts"
      :key="contact.id"
      class="cursor-pointer"
      :contact="contact"
      @click="editContact(contact.id)"
      @delete="deleteContact"
      @save="updateContact"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useContactsStore } from '@/store'

import ContactItem from '@/components/ContactItem.vue'
import AppButton from '@/components/AppButton.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import SearchInput from '@/components/SearchInput.vue'
import RoleDropDown from '@/components/RoleDropDown.vue'
import FilterDropDown from '@/components/FilterDropDown.vue'

const router = useRouter()

const contactsStore = useContactsStore()
const { contacts, roles } = storeToRefs(contactsStore)
const { updateContact, deleteContact } = contactsStore

const searchQuery = ref('')
const selectedRoles = ref<string[]>([])
const selectedSortOption = ref('default')

const filteredContacts = computed(() => {
  return contacts.value.filter(contact => {
    const searchTerm = searchQuery.value.toLowerCase()
    const matchesSearch = contact.name
      .toLowerCase()
      .includes(searchTerm) || contact.description
      .toLowerCase()
      .includes(searchTerm)
    const matchesRole = selectedRoles.value.length ? selectedRoles.value.includes(contact.role) : true

    return matchesSearch && matchesRole
  })
})

const sortedContacts = computed(() => {
  const contactsToSort = [...filteredContacts.value]
  if (selectedSortOption.value === 'ascending') {
    return contactsToSort.sort((a, b) => a.name.localeCompare(b.name))
  } else if (selectedSortOption.value === 'descending') {
    return contactsToSort.sort((a, b) => b.name.localeCompare(a.name))
  }
  return contactsToSort
})

function handleSortChange (sortOption: string) {
  selectedSortOption.value = sortOption
}

function createNewContact () {
  router.push({ name: 'upsertContact', params: { contactId: 'new' } })
}

function editContact (contactId: number) {
  router.push({ name: 'upsertContact', params: { contactId } })
}
</script>
