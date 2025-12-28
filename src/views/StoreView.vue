<template>
  <div v-if="shop.loading" class="min-h-screen flex items-center justify-center">
    <p class="text-lg">Loading products...</p>
  </div>
  <div v-else class="min-h-screen">
    <Header />
    <div class="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      <div class="absolute inset-0">
        <img src="/crew.jpg" alt="Breakdancer in action" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>
      <div
        class="relative h-full flex flex-col items-center justify-center text-center px-4 text-white"
      >
        <h1
          class="font-heading text-6xl md:text-8xl uppercase tracking-tighter mb-6"
          data-testid="text-hero-title"
        >
          ELEVATE YOUR STYLE
        </h1>
        <p class="text-lg md:text-xl mb-8 max-w-2xl text-white/90" data-testid="text-hero-subtitle">
          Premium gear for breakers who demand excellence
        </p>
        <Button
          size="lg"
          class="text-lg px-8 py-6 bg-primary/90 backdrop-blur-sm hover:bg-primary border border-primary-border"
          @click="scrollToProducts"
          data-testid="button-shop-now"
        >
          SHOP NOW
        </Button>
      </div>
    </div>

    <section id="products" class="container mx-auto px-4 py-12">
      <div
        class="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 -mx-4 px-4 py-4 mb-8 border-b"
      >
        <div class="flex gap-2 overflow-x-auto">
          <Button
            v-for="category in categories"
            :key="category"
            :variant="activeCategory === category ? 'default' : 'outline'"
            @click="activeCategory = category"
            :data-testid="`button-category-${category.toLowerCase()}`"
          >
            {{ category }}
          </Button>
        </div>
      </div>

      <div>
        <h2
          class="font-heading text-4xl uppercase tracking-tight mb-8"
          data-testid="text-all-products-title"
        >
          PRODUCTS
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="handleAddToCart"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Header from '@/components/HeaderComp.vue'
import ProductCard from '@/components/ProductCard.vue'
import { toast } from '@/utils'
import Button from '@/components/ui/ButtonEl.vue'
import { useShopStore } from '@/stores/shop'
import type { size } from '@/types'

const shop = useShopStore()
const activeCategory = ref('ALL')

const categories = ['ALL', 'APPAREL', 'ACCESSORIES']

const scrollToProducts = () => {
  const productsSection = document.getElementById('products')
  if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' })
}

const filteredProducts = computed(() => shop.getProductsByCategory(activeCategory.value))

const handleAddToCart = async (productId: number, size: size) => {
  const product = shop.getProductById(productId)
  if (!product) return

  try {
    shop.addToCart(productId, size)
    toast({
      description: `${product.name} has been added to your cart.`,
    })
  } catch (error: unknown) {
    console.log(error)
    toast({
      title: 'Error',
      description: 'Failed to add item to cart.',
      variant: 'destructive',
    })
  }
}
</script>
