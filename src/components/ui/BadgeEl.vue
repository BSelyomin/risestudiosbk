<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils'

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  class?: string
  dataTestid?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
})

const badgeClass = computed(() => {
  const baseClass =
    'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap overflow-hidden hover-elevate active-elevate-2'

  const variantClasses = {
    default: 'border-transparent bg-primary text-primary-foreground border-primary-border',
    secondary: 'border-transparent bg-secondary text-secondary-foreground border-secondary-border',
    destructive:
      'border-transparent bg-destructive text-destructive-foreground border-destructive-border',
    outline: 'text-foreground border [border-color:var(--badge-outline)]',
  }

  return cn(baseClass, variantClasses[props.variant], props.class)
})
</script>

<template>
  <div :class="badgeClass" :data-testid="dataTestid">
    <slot />
  </div>
</template>
