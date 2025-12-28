<script setup lang="ts">
import { useToast } from 'vue-toastification'
import Toast from './ToastEl.vue'

const toasts = useToast()
console.log(toasts)
</script>

<template>
  <div
    class="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
  >
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :title="toast.title"
      :description="toast.description"
      :variant="toast.variant"
    />
  </div>
</template>
