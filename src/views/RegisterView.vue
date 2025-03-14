<script setup lang="ts">
import { ref } from 'vue'
import { useNavigation } from '../router'
import { useToast } from 'primevue/usetoast'

const { goToLoginView } = useNavigation()

const showRegisterlert = () => {
  toast.add({
    severity: 'error',
    summary: 'Error!',
    detail: 'Both password shoud be match.',
    life: 3000,
  })
}
const toast = useToast()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const register = () => {
  if (password.value === confirmPassword.value) {
    console.log('Registration atttempt', 'Email:', email.value, 'Passowrd:', password.value)
    localStorage.setItem('email', email.value)
    localStorage.setItem('password', password.value)
    goToLoginView()
  } else {
    showRegisterlert()
  }
}
</script>

<template>
  <Toast />
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 shadow-lg bg-white rounded-lg">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-gray-800 text-center w-full">Register</h1>
        <i @click="goToLoginView()" class="pi pi-times cursor-pointer text-gray-600"></i>
      </div>
      <form id="myRegisterForm" @submit.prevent="register" class="flex flex-col gap-4">
        <div>
          <InputText
            v-model="email"
            type="email"
            placeholder="Email@email.com"
            required
            class="w-full p-2 border rounded !bg-white !text-black"
          />
        </div>

        <div class="flex gap-4">
          <InputText
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="w-1/2 p-2 border rounded !bg-white !text-black"
          />
          <InputText
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            class="w-1/2 p-2 border rounded !bg-white !text-black"
          />
        </div>

        <div class="flex justify-center mt-4">
          <Button
            type="submit"
            form="myRegisterForm"
            severity="primary"
            label="Confirm"
            class="w-1/2"
          />
        </div>
      </form>
    </div>
  </div>
</template>
