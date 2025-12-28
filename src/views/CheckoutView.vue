<template>
  <div class="min-h-screen">
    <Header />

    <div class="container mx-auto px-4 py-12">
      <Button variant="ghost" class="mb-6" @click="router.push('/')" data-testid="button-back">
        <ArrowLeft class="h-4 w-4 mr-2" />
        Back to Store
      </Button>

      <h1
        class="font-heading text-5xl uppercase tracking-tight mb-8"
        data-testid="text-checkout-title"
      >
        CHECKOUT
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-3">
          <form @submit="handleSubmit" class="space-y-8">
            <Card class="p-6">
              <h2 class="font-heading text-2xl uppercase tracking-tight mb-6">
                Contact Information
              </h2>
              <div class="space-y-4">
                <div>
                  <Label for="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    v-model="formData.name"
                    required
                    class="mt-2"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    v-model="formData.email"
                    required
                    class="mt-2"
                    data-testid="input-email"
                  />
                </div>
              </div>
            </Card>

            <Card class="p-6">
              <h2 class="font-heading text-2xl uppercase tracking-tight mb-6">Shipping Address</h2>
              <div class="space-y-4">
                <div>
                  <Label for="address">Street Address</Label>
                  <Input
                    id="address"
                    name="address"
                    v-model="formData.address"
                    required
                    class="mt-2"
                    data-testid="input-address"
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <Label for="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      v-model="formData.city"
                      required
                      class="mt-2"
                      data-testid="input-city"
                    />
                  </div>
                  <div>
                    <Label for="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      v-model="formData.postalCode"
                      required
                      class="mt-2"
                      data-testid="input-postal"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card class="p-6">
              <h2 class="font-heading text-2xl uppercase tracking-tight mb-6">Payment</h2>
              <p class="text-sm text-muted-foreground mb-4">
                You'll be redirected to Stripe's secure payment page to complete your purchase.
              </p>
            </Card>

            <Button
              type="submit"
              size="lg"
              class="w-full"
              :disabled="isProcessing || shop.cartItemCount === 0"
              data-testid="button-place-order"
            >
              {{ isProcessing ? 'REDIRECTING TO PAYMENT...' : 'PROCEED TO PAYMENT' }}
            </Button>
          </form>
        </div>

        <div class="lg:col-span-2">
          <Card class="p-6 sticky top-24">
            <h2 class="font-heading text-2xl uppercase tracking-tight mb-6">Order Summary</h2>
            <div class="space-y-4">
              <div v-if="shop.cartItemCount === 0" class="text-center py-8 text-muted-foreground">
                Your cart is empty
              </div>
              <div v-else>
                <div class="space-y-4 mb-4">
                  <div
                    v-for="item in shop.cartItemsWithDetails"
                    :key="`${item.id}-${item.size}`"
                    class="flex justify-between text-sm"
                  >
                    <span class="flex-1">
                      {{ item.product?.name }}
                      <span v-if="item.size" class="text-muted-foreground">({{ item.size }})</span>
                      × {{ item.quantity }}
                    </span>
                    <span class="font-semibold">
                      ${{ ((item.product?.price || 0) * item.quantity).toFixed(2) }}
                    </span>
                  </div>
                </div>
                <Separator class="my-4" />
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Subtotal</span>
                    <span class="font-semibold">${{ shop.cartTotal.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-muted-foreground">Tax (8%)</span>
                    <span class="font-semibold">${{ tax.toFixed(2) }}</span>
                  </div>
                  <Separator class="my-2" />
                  <div class="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${{ total.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'
import { useShopStore } from '@/stores/shop'
import Header from '@/components/HeaderComp.vue'
import Card from '@/components/ui/CardEl.vue'
import Input from '@/components/ui/InputEl.vue'
import Label from '@/components/ui/LabelEl.vue'
import Button from '@/components/ui/ButtonEl.vue'
import Separator from '@/components/ui/SeparatorEl.vue'
import { useToast } from 'vue-toastification'
import ArrowLeft from '@/components/svgs/ArrowLeft.vue'

const router = useRouter()
const toast = useToast()
const shop = useShopStore()

const formData = ref({
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
})

const stripe = ref<any>(null)
const isProcessing = ref(false)

const tax = computed(() => shop.cartTotal * 0.08)
const total = computed(() => shop.cartTotal + tax.value)

// Initialize Stripe
onMounted(async () => {
  try {
    // Replace with your Stripe publishable key
    stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    if (!stripe.value) {
      throw new Error('Failed to load Stripe')
    }
  } catch (error) {
    console.error('Error initializing Stripe:', error)
    toast({
      title: 'Error',
      description: 'Failed to initialize payment system',
      variant: 'destructive',
    })
  }
})

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  if (shop.cartItemCount === 0) {
    toast({
      title: 'Cart is empty',
      description: 'Please add items to your cart before checking out.',
      variant: 'destructive',
    })
    return
  }

  if (!stripe.value) {
    toast({
      title: 'Error',
      description: 'Payment system not ready. Please try again.',
      variant: 'destructive',
    })
    return
  }

  isProcessing.value = true

  try {
    // Prepare line items for Stripe Checkout
    const lineItems = shop.cartItemsWithDetails.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product?.name || 'Product',
          description: item.size ? `Size: ${item.size}` : undefined,
          images: item.product?.image ? [item.product.image] : undefined,
        },
        unit_amount: Math.round((item.product?.price || 0) * 100), // Convert to cents
      },
      quantity: item.quantity,
    }))

    // Add tax as a separate line item
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Tax (8%)',
        },
        unit_amount: Math.round(tax.value * 100), // Convert to cents
      },
      quantity: 1,
    })

    // Store customer info in localStorage for success page
    localStorage.setItem(
      'checkout-customer-info',
      JSON.stringify({
        name: formData.value.name,
        email: formData.value.email,
        address: formData.value.address,
        city: formData.value.city,
        postalCode: formData.value.postalCode,
      }),
    )

    // Redirect to Stripe Checkout
    const { error } = await stripe.value.redirectToCheckout({
      lineItems: lineItems,
      mode: 'payment',
      successUrl: `${window.location.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/checkout`,
      customerEmail: formData.value.email,
      shippingAddressCollection: {
        allowedCountries: ['US', 'CA'],
      },
      billingAddressCollection: 'required',
    })

    if (error) {
      console.error('Stripe Checkout error:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to redirect to payment',
        variant: 'destructive',
      })
      isProcessing.value = false
    }
  } catch (error: unknown) {
    console.error('Checkout error:', error)
    toast({
      title: 'Error',
      description: 'Failed to process checkout. Please try again.',
      variant: 'destructive',
    })
    isProcessing.value = false
  }
}
</script>
