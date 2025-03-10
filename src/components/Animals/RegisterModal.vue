<script setup lang="ts">
import Modal from './Modal.vue'
import { ref } from 'vue'
import { useModalStore } from '../../stores/modalStore'
const modalStore = useModalStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const register = () => {
  if (password.value === confirmPassword.value) {
    console.log('Registration atttempt', 'Email:', email.value, 'Passowrd:', password.value)
    localStorage.setItem('email', email.value)
    localStorage.setItem('password', password.value)
    modalStore.closeModal()
  } else {
    alert('Both password should be match')
  }
}
</script>

<template>
  <!-- Botão para abrir o modal -->
  <button
    @click="modalStore.openModal"
    class="px-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
  >
    Register here
  </button>

  <!-- Modal com Teleport -->
  <Teleport to="body">
    <Modal v-if="modalStore.show" :show="modalStore.show" @close="modalStore.closeModal">
      <template #header>
        <h2 class="mb-4 text-center text-xl">Modal Register</h2>
      </template>

      <template #body>
        <form id="myRegisterForm" @submit.prevent="register">
          <div>
            <div class="mb-4">
              <input v-model="email" type="email" placeholder="Email@email.com" required />
            </div>
            <div class="flex justify-between">
              <input v-model="password" type="password" placeholder="Password" required />
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>
        </form>
      </template>

      <template #footer>
        <div class="flex justify-end">
          <button type="submit" form="myRegisterForm">Confirm</button>
        </div>
      </template>
    </Modal>
  </Teleport>
</template>
