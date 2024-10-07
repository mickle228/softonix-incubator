<template>
  <div class="max-w-[500px] m-auto">
    <el-card v-loading="loading">
      <template #header>
        <p class="font-semibold text-xl">Register</p>
      </template>

      <el-form
        ref="formRef"
        label-position="top"
        :rules="formRules"
        :model="formModel"
        @submit.prevent="submit"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="formModel.email" type="email" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="formModel.password" type="password" />
        </el-form-item>

        <el-button native-type="submit" :type="$elComponentType.primary">
          Register
        </el-button>
      </el-form>
      <p class="flex justify-center">
        Already have an account?
        <router-link :to="{ name: 'login' }" class="text-blue-500 underline hover:text-blue-700 ml-1">
          Login
        </router-link>
      </p>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const { $routeNames } = useGlobalProperties()
const { register } = useAuthStore()

const formRef = useElFormRef()

const formModel = useElFormModel({
  email: '',
  password: ''
})
const loading = ref(false)

const formRules = useElFormRules({
  email: [useRequiredRule(), useEmailRule()],
  password: [useRequiredRule(), useMinLenRule(6)]
})

function submit () {
  formRef.value?.validate(isValid => {
    if (isValid) {
      loading.value = true

      register(formModel)
        .then(() => router.push({ name: $routeNames.contacts }))
        .then(() => (loading.value = false))
    }
  })
}
</script>
