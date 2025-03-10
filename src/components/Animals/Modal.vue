<script setup lang="ts">
import { useModalStore } from '../../stores/modalStore'
const modalStore = useModalStore()
</script>

<template id="modal">
  <Transition
    enter-from-class="opacity-0 scale-125"
    enter-to-class="opacity-100 scale-100"
    enter-active-class="transition duration-300"
    leave-active-class="transiton duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modalStore.show"
      class="fixed inset-0 bg-black/60 grid place-items-center"
      @click.self="$emit('close')"
    >
      <div class="bg-white p-4 w-4/5 max-w-[500px] rounded-lg">
        <slot name="header"></slot>
        <slot name="body"></slot>
        <slot name="footer"> </slot>
      </div>
    </div>
  </Transition>
</template>
