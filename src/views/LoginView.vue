<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useNavigation } from '../router/index'

const { goToAnimalsView, goToRegisterView } = useNavigation()

const email = ref('')
const password = ref('')
const toast = useToast()

const showLoginAlert = () => {
  toast.add({
    severity: 'error',
    summary: 'Error!',
    detail: 'E-mail or Password does not match!',
    life: 3000,
  })
}

const handleLogin = () => {
  if (
    email.value === localStorage.getItem('email') &&
    password.value === localStorage.getItem('password')
  ) {
    console.log('Login', 'Email:', email.value, 'Passowrd:', password.value)
    goToAnimalsView()
  } else {
    showLoginAlert()
  }
}
</script>
<template>
  <div class="flex items-center justify-center h-screen w-full bg-gray-100">
    <Toast />
    <div class="w-full max-w-md p-8 shadow-lg bg-white rounded-lg">
      <h1 class="text-2xl font-semibold mb-5 text-center text-gray-800">Login - Animal Shelter</h1>
      <div class="flex justify-center">
        <form @submit.prevent="handleLogin" class="flex flex-col gap-4 w-2/3">
          <div>
            <InputText
              name="email"
              placeholder="E-mail"
              v-model="email"
              class="w-full p-2 border rounded !bg-white !text-black"
            />
          </div>
          <div>
            <InputText
              type="password"
              placeholder="Password"
              v-model="password"
              class="w-full p-2 border rounded !bg-white !text-black"
            />
          </div>
          <div class="flex justify-center">
            <Button type="submit" severity="primary" label="Sign-in" class="w-1/2" />
          </div>
        </form>
      </div>
      <div class="flex flex-col items-center mt-4">
        <p class="text-sm text-gray-600">Don't have an account yet?</p>
        <Button
          severity="secondary"
          label="Register here"
          @click="goToRegisterView()"
          class="mt-2"
        />
      </div>
    </div>
  </div>
</template>
