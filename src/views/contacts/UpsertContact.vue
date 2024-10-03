<template>
  <div class="max-w-[500px] m-auto">
    <el-card body-style="padding: 20px">
      <template #header>
        <p class="font-semibold text-xl p-5">{{ cardTitle }}</p>
      </template>

      <el-form
        ref="formRef"
        label-position="top"
        :rules="formRules"
        :model="contactForm"
        @submit.prevent="submit"
      >
        <el-form-item label="Name" prop="name">
          <AppInput v-model.trim="contactForm.name" placeholder="Name" />
        </el-form-item>

        <el-form-item label="Description" prop="description">
          <AppInput v-model.trim="contactForm.description" placeholder="Description" />
        </el-form-item>

        <el-form-item label="Image Link" prop="image">
          <AppInput v-model.trim="contactForm.image" placeholder="Image Link" />
        </el-form-item>

        <div class="flex space-x-4 mt-4 justify-around">
          <el-button type="primary" @click="$router.back">Cancel</el-button>

          <el-button v-if="currentContact" type="danger" @click="onDelete">
            Delete
          </el-button>

          <el-button native-type="submit" type="primary">
            <template #icon>
              <IconPlus class="w-5 h-5" />
            </template>
            Save
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const route = useRoute()

const { $routeNames } = useGlobalProperties()

const contactsStore = useContactsStore()
const { contacts } = storeToRefs(contactsStore)
const { addContact, updateContact, deleteContact } = contactsStore

const currentContact = computed(() => contacts.value.find(c => c.id === +route.params.contactId))

const cardTitle = computed(() => {
  return currentContact.value ? 'Edit Contact' : 'New Contact'
})

const formRef = useElFormRef()

const contactForm = reactive<IContact>(currentContact.value
  ? { ...currentContact.value }
  : {
    id: contacts.value.length + 1,
    name: '',
    description: '',
    image: ''
  })

const formRules = {
  name: [{ required: true, message: 'Please input the name', trigger: 'blur' }],
  description: [{ required: true, message: 'Please input the description', trigger: 'blur' }],
  image: [{ required: false, message: 'Please input the image link', trigger: 'blur' }]
}

function submit () {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (currentContact.value) {
        updateContact(contactForm)
      } else {
        addContact(contactForm)
      }
      router.push({ name: 'contacts' })
    }
  })
}

function onDelete () {
  if (currentContact.value) {
    deleteContact(currentContact.value as IContact)
    router.replace({ name: $routeNames.contacts })
  }
}

</script>
