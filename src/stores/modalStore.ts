// stores/modalStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const show = ref(false)
  const openModal = () => {
    show.value = true
  }
  const closeModal = () => {
    show.value = false
  }

  return { show, openModal, closeModal }
})
