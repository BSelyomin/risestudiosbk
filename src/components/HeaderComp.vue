<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60"
  >
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <h1 class="font-heading text-3xl tracking-tight uppercase" data-testid="text-logo">
        RISE STUDIOS
      </h1>
      <div class="flex items-center gap-2">
        <CartDrawer />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import CartDrawer from '@/components/CartDrawer.vue'
</script>
