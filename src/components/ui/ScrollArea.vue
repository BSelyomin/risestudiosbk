<script setup lang="ts">
import { cn } from '@/utils'

interface ScrollAreaProps {
  class?: string
}

const props = defineProps<ScrollAreaProps>()
</script>

<template>
  <div :class="cn('relative overflow-auto', props.class)">
    <slot />
  </div>
</template>
