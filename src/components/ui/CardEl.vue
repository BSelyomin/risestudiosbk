<script setup lang="ts">
import { cn } from '@/utils'

interface CardProps {
  class?: string
  dataTestid?: string
}

const props = defineProps<CardProps>()
</script>

<template>
  <div
    :class="
      cn(
        'shadcn-card rounded-xl border bg-card border-card-border text-card-foreground shadow-sm',
        props.class,
      )
    "
    :data-testid="dataTestid"
  >
    <slot />
  </div>
</template>
