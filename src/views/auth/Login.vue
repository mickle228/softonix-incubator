<template>
  <div class="max-w-[500px] m-auto">
    <el-card>
      <template #header>
        <p class="font-semibold text-xl">Login</p>
      </template>

      <el-form
        ref="formRef"
        label-position="top"
        :rules="formRules"
        :model="formModel"
        @submit.prevent="submit"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="formModel.email" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="formModel.password" type="password" />
        </el-form-item>

        <el-button native-type="submit" :type="$elComponentType.primary">
          Login
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const { $routeNames } = useGlobalProperties()

const formRef = useElFormRef()

const formModel = useElFormModel({
  email: '',
  password: ''
})

const formRules = useElFormRules({
  email: [useRequiredRule(), useEmailRule()],
  password: [useRequiredRule(), useMinLenRule(6)]
})

function submit () {
  formRef.value?.validate(isValid => {
    if (isValid) {
      router.push({ name: $routeNames.contacts })
    }
  })
}
</script>
