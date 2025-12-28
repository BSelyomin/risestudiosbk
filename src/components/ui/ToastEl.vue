<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils'

interface ToastProps {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

const props = withDefaults(defineProps<ToastProps>(), {
  variant: 'default',
})

const toastClass = computed(() => {
  const baseClass =
    'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all'

  const variantClasses = {
    default: 'border bg-background text-foreground',
    destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
  }

  return cn(baseClass, variantClasses[props.variant])
})
</script>

<template>
  <div :class="toastClass">
    <div class="grid gap-1">
      <div v-if="title" class="text-sm font-semibold">{{ title }}</div>
      <div v-if="description" class="text-sm opacity-90">{{ description }}</div>
    </div>
  </div>
</template>
