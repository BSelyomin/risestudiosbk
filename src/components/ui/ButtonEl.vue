<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils'

interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  class?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  dataTestid?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default',
  type: 'button',
  disabled: false,
})

const buttonClass = computed(() => {
  const baseClass =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover-elevate active-elevate-2'

  const variantClasses = {
    default: 'bg-primary text-primary-foreground border border-primary-border',
    destructive: 'bg-destructive text-destructive-foreground border border-destructive-border',
    outline: 'border [border-color:var(--button-outline)] shadow-xs active:shadow-none',
    secondary: 'border bg-secondary text-secondary-foreground border border-secondary-border',
    ghost: 'border border-transparent',
  }

  const sizeClasses = {
    default: 'min-h-9 px-4 py-2',
    sm: 'min-h-8 rounded-md px-3 text-xs',
    lg: 'min-h-10 rounded-md px-8',
    icon: 'h-9 w-9',
  }

  return cn(baseClass, variantClasses[props.variant], sizeClasses[props.size], props.class)
})
</script>

<template>
  <button :class="buttonClass" :disabled="disabled" :type="type" :data-testid="dataTestid">
    <slot />
  </button>
</template>
