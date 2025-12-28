<script setup lang="ts">
import { ref, computed } from 'vue'
import ShoppingCart from './svgs/ShoppingCart.vue'
import Card from '@/components/ui/CardEl.vue'
import Button from '@/components/ui/ButtonEl.vue'
import type { Product, size } from '@/types'

const props = withDefaults(defineProps<{ product: Product }>(), {})

const emit = defineEmits<{ addToCart: [id: number, size: size] }>()

const selectedSize = ref<size>('' as size)
const showSizeError = ref(false)

const availableSizes = computed(() => {
  const sizes: string[] = []
  if (props.product.sizes.xs) sizes.push('XS')
  if (props.product.sizes.s) sizes.push('S')
  if (props.product.sizes.m) sizes.push('M')
  if (props.product.sizes.l) sizes.push('L')
  if (props.product.sizes.xl) sizes.push('XL')
  if (props.product.sizes.xxl) sizes.push('XXL')
  return sizes
})

const handleAddToCart = () => {
  if (availableSizes.value.length > 0 && !selectedSize.value) {
    showSizeError.value = true
    setTimeout(() => (showSizeError.value = false), 2000)
    return
  }

  emit('addToCart', props.product.id, selectedSize.value)
  //@ts-expect-error Just resetting the value
  selectedSize.value = '' // Reset after adding
}
</script>

<template>
  <Card
    class="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-300"
    :data-testid="`card-product-${product.id}`"
  >
    <div class="relative aspect-square overflow-hidden bg-card">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        :data-testid="`img-product-${product.id}`"
      />
    </div>
    <div class="p-6 space-y-4">
      <div class="space-y-2">
        <p
          class="text-xs uppercase tracking-wide text-muted-foreground"
          :data-testid="`text-category-${product.id}`"
        >
          {{ product.category }}
        </p>
        <h3 class="font-bold text-xl line-clamp-2" :data-testid="`text-name-${product.id}`">
          {{ product.name }}
        </h3>
      </div>

      <!-- Size Selection -->
      <div v-if="availableSizes.length > 0" class="space-y-2">
        <p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">Size</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="size in availableSizes"
            :key="size"
            @click="() => (selectedSize = size as size)"
            :class="[
              'px-3 py-1.5 text-sm font-medium rounded border transition-all',
              selectedSize === size
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background hover:bg-muted border-input',
              showSizeError && !selectedSize ? 'border-destructive animate-pulse' : '',
            ]"
            :data-testid="`button-size-${size}-${product.id}`"
          >
            {{ size }}
          </button>
        </div>
        <p
          v-if="showSizeError"
          class="text-xs text-destructive"
          :data-testid="`text-size-error-${product.id}`"
        >
          Please select a size
        </p>
      </div>

      <div class="flex items-center justify-between gap-4">
        <p class="text-2xl font-bold" :data-testid="`text-price-${product.id}`">
          ${{ product.price }}
        </p>
        <Button
          @click="handleAddToCart"
          class="gap-2"
          :data-testid="`button-add-to-cart-${product.id}`"
        >
          <ShoppingCart class="h-4 w-4" />
          ADD
        </Button>
      </div>
    </div>
  </Card>
</template>
