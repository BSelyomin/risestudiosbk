<script setup lang="ts">
import { cn } from '@/utils'

interface SeparatorProps {
  class?: string
  orientation?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
})
</script>

<template>
  <div
    :class="
      cn(
        'shrink-0 bg-border',
        props.orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        props.class,
      )
    "
  />
</template>
