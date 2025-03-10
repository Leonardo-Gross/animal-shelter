<script setup lang="ts">
import AnimalsView from './AnimalsView.vue'
import RegisterModal from '../components/Animals/RegisterModal.vue'
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()
const goToAnimalsView = () => {
  router.push('animals')
}

const email = ref('')
const password = ref('')

const login = () => {
  console.log('Login', 'Email:', email.value, 'Passowrd:', password.value)
  if (
    email.value === localStorage.getItem('email') &&
    password.value === localStorage.getItem('password')
  ) {
    goToAnimalsView()
  } else {
    alert("Login Failed! Email or Password doesn't match.")
  }
}
</script>

<template>
  <div class="flex items-center justify-center bg-white">
    <div class="w-full max-w-md p-6 bg-gray-200 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-semibold text-center text-green-600 mb-6">Login - Animal Shelter</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full mb-4 bg-green-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Sign-in
        </button>
      </form>
      <div class="flex items-center justify-center">
        <p class="inline text-sm text-gray-600 mr-2">Don't have an account yet?</p>
        <RegisterModal />
      </div>
    </div>
  </div>
</template>
