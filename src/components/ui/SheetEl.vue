<script setup lang="ts">
import { ref, provide, inject } from 'vue'
import { SheetKey } from '@/assets/keys' // <-- Import the single key

const isOpen = ref(false)

provide(SheetKey, {
  isOpen,
  toggle: () => {
    isOpen.value = !isOpen.value
  },
})

function useSheet() {
  const context = inject(SheetKey)
  if (!context) {
    throw new Error('useSheet must be used within Sheet')
  }
  return context
}
</script>

<template>
  <div>
    <slot />
  </div>
</template>
