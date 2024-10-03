<template>
  <div class="flex items-center gap-4 justify-between">
    <h3 class="font-medium m-0">Contact list</h3>

    <div class="flex gap-2">
      <el-button :type="$elComponentType.primary" @click="createNewContact">
        <template #icon>
          <IconPlus class="w-5 h-5" />
        </template>
        Add Contact
      </el-button>

      <el-button
        class="!ml-0"
        :type="$elComponentType.danger"
        @click="$router.replace({ name: $routeNames.login })"
      >
        Logout
      </el-button>
    </div>
  </div>

  <el-tabs v-model="activeTab" class="my-5">
    <el-tab-pane label="Card View" name="card">
      <div class="grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid gap-5 mb-3">
        <ContactItem
          v-for="contact in contacts"
          :key="contact.id"
          class="cursor-pointer"
          :contact="contact"
          @click="editContact(contact.id)"
        />
      </div>
    </el-tab-pane>

    <el-tab-pane label="Table View" name="table">
      <ContactTable
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
        @click="editContact(contact.id)"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
const router = useRouter()
const { $routeNames } = useGlobalProperties()

const contactsStore = useContactsStore()
const { contacts, activeTab } = storeToRefs(contactsStore)

watch(activeTab, (newTab) => {
  contactsStore.setActiveTab(newTab)
})

function createNewContact () {
  router.push({ name: $routeNames.upsertContact, params: { contactId: 'new' } })
}

function editContact (contactId: number) {
  router.push({ name: $routeNames.upsertContact, params: { contactId } })
}
</script>

<style scoped>
.tabs-inline {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

:deep(.el-tabs__item) {
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: background-color 0.3s, border-color 0.3s;
  font-weight: 500;
  cursor: pointer;
}

:deep(.el-tabs__item.is-active) {
  background-color: #409EFF;
  color: #fff;
  border-color: #409EFF;
  font-weight: bold;
}

:deep(.el-tabs__item:not(.is-active):hover) {
  background-color: #f0f0f0;
  border-color: #dcdcdc;
}
</style>
