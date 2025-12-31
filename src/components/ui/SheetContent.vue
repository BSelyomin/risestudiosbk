<script setup lang="ts">
import { inject } from 'vue'
import { cn } from '@/utils'
import { SheetKey } from '@/assets/keys' // <-- Import the single key

interface SheetContentProps {
  class?: string
  dataTestid?: string
}

const props = defineProps<SheetContentProps>()

const context = inject(SheetKey)
if (!context) {
  throw new Error('SheetContent must be used within Sheet')
}

const { isOpen, toggle } = context
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet-overlay">
      <div v-if="isOpen" class="fixed inset-0 z-50 bg-black/80" @click="toggle" />
    </Transition>
    <Transition name="sheet-content">
      <div
        v-if="isOpen"
        :class="
          cn(
            'fixed z-50 gap-4 bg-background  shadow-lg transition ease-in-out inset-y-0 right-0 h-full border-l',
            props.class,
          )
        "
        :data-testid="dataTestid"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet-overlay-enter-active,
.sheet-overlay-leave-active {
  transition: opacity 0.2s ease;
}

.sheet-overlay-enter-from,
.sheet-overlay-leave-to {
  opacity: 0;
}

.sheet-content-enter-active,
.sheet-content-leave-active {
  transition: transform 0.3s ease;
}

.sheet-content-enter-from,
.sheet-content-leave-to {
  transform: translateX(100%);
}
</style>
