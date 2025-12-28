<script setup lang="ts">
import { ref, provide } from 'vue'
import { SheetKey } from '@/assets/keys' // <-- Import the single key

const isOpen = ref(false)

provide(SheetKey, {
  isOpen,
  toggle: () => {
    isOpen.value = !isOpen.value
  },
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
