<template>
  <Sheet>
    <SheetTrigger>
      <Button variant="ghost" size="icon" class="relative" data-testid="button-cart-toggle">
        <ShoppingCart class="h-5 w-5" />
        <Badge
          v-if="shop.cartItemCount > 0"
          class="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          data-testid="badge-cart-count"
        >
          {{ shop.cartItemCount }}
        </Badge>
      </Button>
    </SheetTrigger>
    <SheetContent class="w-[90%] sm:max-w-md flex flex-col" data-testid="drawer-cart">
      <div class="flex flex-col gap-4">
        <div>
          <h2 class="font-heading text-2xl uppercase tracking-tight">Shopping Cart</h2>
        </div>

        <div
          v-if="shop.cartItemsWithDetails.length === 0"
          class="flex-1 flex flex-col items-center justify-center text-center p-8"
          data-testid="cart-empty-state"
        >
          <ShoppingCart class="h-16 w-16 text-muted-foreground mb-4" />
          <p class="text-lg font-semibold mb-2">Your cart is waiting for some heat</p>
          <p class="text-sm text-muted-foreground">Add some fresh gear to get started</p>
        </div>

        <template v-else>
          <ScrollArea class="flex-1 -mx-6 px-6">
            <div class="space-y-4 py-4">
              <div
                v-for="item in shop.cartItemsWithDetails"
                :key="`${item.id}-${item.size}`"
                class="flex gap-4"
                :data-testid="`cart-item-${item.id}`"
              >
                <div class="w-20 h-20 rounded-md overflow-hidden bg-card flex-shrink-0">
                  <img
                    :src="getResponsiveImage(item.product?.image as string, 0.1)"
                    :alt="item.product?.name"
                    class="w-full h-full object-cover"
                    :data-testid="`img-cart-item-${item.id}`"
                  />
                </div>
                <div class="flex-1 space-y-2">
                  <div class="flex justify-between gap-2">
                    <h4
                      class="font-semibold text-sm line-clamp-2"
                      :data-testid="`text-cart-item-name-${item.id}`"
                    >
                      {{ item.product?.name }}
                    </h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-6 w-6 flex-shrink-0"
                      @click="shop.removeFromCart(item.id, item.size)"
                      :data-testid="`button-remove-${item.id}`"
                    >
                      <TrashTwo class="h-4 w-4" />
                    </Button>
                  </div>
                  <p v-if="item.size" class="text-xs text-muted-foreground">
                    Size: {{ item.size }}
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        class="h-8 w-8"
                        @click="
                          shop.updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))
                        "
                        :data-testid="`button-decrease-${item.id}`"
                      >
                        <MinusSVG class="h-3 w-3" />
                      </Button>
                      <span
                        class="w-8 text-center font-semibold"
                        :data-testid="`text-quantity-${item.id}`"
                      >
                        {{ item.quantity }}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        class="h-8 w-8"
                        @click="shop.updateQuantity(item.id, item.size, item.quantity + 1)"
                        :data-testid="`button-increase-${item.id}`"
                      >
                        <PlusSVG class="h-3 w-3" />
                      </Button>
                    </div>
                    <p class="font-bold" :data-testid="`text-cart-item-price-${item.id}`">
                      ${{ ((item.product?.price || 0) * item.quantity).toFixed(2) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div class="space-y-4 pt-4 border-t">
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Subtotal</span>
                <span class="font-semibold" data-testid="text-subtotal"
                  >${{ shop.cartTotal.toFixed(2) }}</span
                >
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Tax (8%)</span>
                <span class="font-semibold" data-testid="text-tax">${{ tax.toFixed(2) }}</span>
              </div>
              <Separator />
              <div class="flex justify-between text-lg">
                <span class="font-bold">Total</span>
                <span class="font-bold" data-testid="text-total">${{ total.toFixed(2) }}</span>
              </div>
            </div>
            <Button class="w-full" size="lg" @click="handleCheckout" data-testid="button-checkout">
              CHECKOUT
            </Button>
          </div>
        </template>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shop'
import MinusSVG from './svgs/MinusSVG.vue'
import TrashTwo from './svgs/TrashTwo.vue'
import ShoppingCart from './svgs/ShoppingCart.vue'
import Sheet from '@/components/ui/SheetEl.vue'
import SheetTrigger from '@/components/ui/SheetTrigger.vue'
import SheetContent from '@/components/ui/SheetContent.vue'
import Button from '@/components/ui/ButtonEl.vue'
import Badge from '@/components/ui/BadgeEl.vue'
import Separator from '@/components/ui/SeparatorEl.vue'
import ScrollArea from '@/components/ui/ScrollArea.vue'
import PlusSVG from './svgs/PlusSVG.vue'
import { getResponsiveImage } from '@/utils'

const shop = useShopStore()
const router = useRouter()

const tax = computed(() => shop.cartTotal * 0.08)
const total = computed(() => shop.cartTotal + tax.value)

const handleCheckout = () => {
  router.push('/checkout')
}
</script>
