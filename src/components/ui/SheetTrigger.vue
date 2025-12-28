<script setup lang="ts">
import { inject } from 'vue'
import { SheetKey } from '@/assets/keys' // <-- Import the single key

const context = inject(SheetKey)
if (!context) {
  throw new Error('SheetTrigger must be used within Sheet')
}

const { toggle } = context
</script>

<template>
  <div @click="toggle">
    <slot />
  </div>
</template>
