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
    <SheetContent class="w-[90%] h-full sm:max-w-md flex flex-col py-6" data-testid="drawer-cart">
      <div class="flex flex-col gap-4 flex-1 min-h-0">
        <div>
          <h2 class="font-heading text-2xl uppercase tracking-tight px-6">Shopping Cart</h2>
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
          <div class="space-y-4 py-4 overflow-y-auto flex-1 px-6">
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
                <p v-if="item.size" class="text-xs text-muted-foreground">Size: {{ item.size }}</p>
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

          <div class="space-y-4 pt-4 border-t px-6">
            <div class="space-y-2 text-sm">
              <div class="flex justify-between text-lg">
                <span class="font-bold">Total</span>
                <span class="font-bold" data-testid="text-total"
                  >${{ shop.cartTotal.toFixed(2) }}</span
                >
              </div>
            </div>
            <Button
              class="w-full bg-[#6d1ed1] hover:bg-[#5a19ad] text-white"
              size="lg"
              @click="openPaymentModal"
              data-testid="button-checkout"
            >
              PAY WITH ZELLE ($ {{ shop.cartTotal.toFixed(2) }})
            </Button>
          </div>
        </template>
      </div>
    </SheetContent>
  </Sheet>
  <dialog ref="zelleModal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box bg-base-100 flex flex-col items-center">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>

      <h3 class="font-bold text-lg uppercase mb-4">Zelle Payment</h3>

      <div class="bg-white p-4 rounded-2xl mb-6 shadow-sm">
        <QRCode />
      </div>

      <div class="w-full space-y-4">
        <div class="form-control">
          <label class="label"><span class="label-text">Amount to Send</span></label>
          <div class="join w-full">
            <input
              readonly
              :value="`$${shop.cartTotal.toFixed(2)}`"
              class="input input-bordered join-item w-full font-bold"
            />
            <button
              class="btn join-item bg-[#6d1ed1] text-white"
              @click="copyText(shop.cartTotal.toFixed(2))"
            >
              Copy
            </button>
          </div>
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text">Zelle Email</span></label>
          <div class="join w-full">
            <input
              readonly
              :value="zelleEmail"
              class="input input-bordered join-item w-full text-sm"
            />
            <button class="btn join-item bg-[#6d1ed1] text-white" @click="copyText(zelleEmail)">
              Copy
            </button>
          </div>
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text">Add this Note (Required)</span></label>
          <div class="join w-full">
            <input
              readonly
              :value="memoText"
              class="input input-bordered join-item w-full text-xs"
            />
            <button class="btn join-item bg-[#6d1ed1] text-white" @click="copyText(memoText)">
              Copy
            </button>
          </div>
        </div>
      </div>

      <div class="modal-action w-full">
        <a
          href="https://www.zellepay.com/get-started"
          target="_blank"
          class="btn btn-outline w-full"
        >
          Open Zelle
        </a>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { useShopStore } from '@/stores/shop'
import MinusSVG from './svgs/MinusSVG.vue'
import TrashTwo from './svgs/TrashTwo.vue'
import ShoppingCart from './svgs/ShoppingCart.vue'
import Sheet from '@/components/ui/SheetEl.vue'
import SheetTrigger from '@/components/ui/SheetTrigger.vue'
import SheetContent from '@/components/ui/SheetContent.vue'
import Button from '@/components/ui/ButtonEl.vue'
import Badge from '@/components/ui/BadgeEl.vue'
import PlusSVG from './svgs/PlusSVG.vue'
import QRCode from './svgs/QRCode.vue'
import { getResponsiveImage } from '@/utils'
import { ref, computed } from 'vue'

const shop = useShopStore()
const zelleModal = ref<HTMLDialogElement | null>(null) // Reference to the daisyUI dialog
const zelleEmail = 'risestudiosbk@gmail.com'

const memoText = computed(() => {
  // 1. Group items by product name
  const grouped = shop.cartItemsWithDetails.reduce(
    (acc, item) => {
      const name = item.product?.id || 'Unknown'
      const sizeStr = `${item.quantity}${item.size || ''}`

      if (!acc[name]) {
        acc[name] = []
      }
      acc[name].push(sizeStr)
      return acc
    },
    {} as Record<string, string[]>,
  )

  // 2. Format into "Name: 1L 2M" string
  const summary = Object.entries(grouped)
    .map(([name, sizes]) => `${name}: ${sizes.join(' ')}`)
    .join(' | ') // Using " | " to separate different products

  return summary
})

const openPaymentModal = () => {
  zelleModal.value?.showModal()
}

const copyText = (text: string) => {
  navigator.clipboard.writeText(text)
  alert('Copied to clipboard!')
}
</script>
