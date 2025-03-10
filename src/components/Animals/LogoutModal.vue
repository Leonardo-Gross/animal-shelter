<script setup lang="ts">
import Modal from './Modal.vue'
import { useModalStore } from '../../stores/modalStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToLoginView = () => {
  router.push('/')
}
const modalStore = useModalStore()

function clearLogin() {
  localStorage.removeItem('email')
  localStorage.removeItem('password')
}
</script>

<template>
  <button @click="modalStore.openModal">
    <img
      class="h-5 w-5 justify-self-end cursor-pointer"
      src="https://w7.pngwing.com/pngs/339/876/png-transparent-login-computer-icons-password-login-black-symbol-subscription-business-model-thumbnail.png"
      alt=""
    />
  </button>
  <Teleport to="body">
    <Modal v-if="modalStore.show" :show="modalStore.show" @close="modalStore.closeModal">
      <template #header>
        <h2 class="mb-4 text-center text-xl">Are you sure you want to Logout?</h2>
      </template>

      <template #body>
        <div class="flex justify-around">
          <button
            @click="
              () => {
                goToLoginView()
                modalStore.closeModal()
                clearLogin()
              }
            "
          >
            Yes
          </button>
          <button
            @click="
              () => {
                modalStore.closeModal()
              }
            "
          >
            No
          </button>
        </div>
      </template>
    </Modal>
  </Teleport>
</template>
