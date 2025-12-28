import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as XLSX from 'xlsx'
import type { CartItem, Product, size } from '@/types'

interface ProductFromFile {
  ID: number
  Name: string
  Price: number
  'Image Name': string
  Category: 'Apparel' | 'Accessory'
  Size: string
  XS: boolean
  S: boolean
  M: boolean
  L: boolean
  XL: boolean
  XXL: boolean
}

export interface CartItemWithDetails extends CartItem {
  product: Product | undefined
}

export const useShopStore = defineStore('shop', () => {
  // State
  const products = ref<Product[]>([])
  const cartItems = ref<CartItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const cartItemsWithDetails = computed<CartItemWithDetails[]>(() => {
    return cartItems.value.map((item) => ({
      ...item,
      product: products.value.find((p) => p.id === item.id),
    }))
  })

  const cartTotal = computed(() => {
    return cartItemsWithDetails.value.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity
    }, 0)
  })

  const cartItemCount = computed(() =>
    cartItems.value.reduce((count, item) => count + item.quantity, 0),
  )

  // Actions
  const loadProductsFromExcel = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('/data.xlsx')
      if (!response.ok) throw new Error('Failed to load data.xlsx')

      const arrayBuffer = await response.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })

      if (!workbook.SheetNames.includes('Shop')) {
        throw new Error('Shop sheet not found in Excel file')
      }

      const worksheet = workbook.Sheets['Shop']
      const rawData = XLSX.utils.sheet_to_json(worksheet) as ProductFromFile[]

      products.value = rawData.map((row) => ({
        id: row.ID,
        name: row.Name || '',
        price: Number(row.Price) || 0,
        image: row['Image Name'] ? `/shop/${row['Image Name']}` : '',
        category: row.Category?.toUpperCase() || 'APPAREL',
        sizes: { xs: row.XS, s: row.S, m: row.M, l: row.L, xl: row.XL, xxl: row.XXL },
      }))
      loading.value = false
    } catch (err) {
      console.error('Error loading Excel file:', err)
      error.value = 'Failed to load products data'
      loading.value = false
      throw err
    }
  }

  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('shopping-cart')
      if (savedCart) cartItems.value = JSON.parse(savedCart)
    } catch (err) {
      console.error('Error loading cart from localStorage:', err)
    }
  }

  const saveCartToStorage = () => {
    try {
      localStorage.setItem('shopping-cart', JSON.stringify(cartItems.value))
    } catch (err) {
      console.error('Error saving cart:', err)
    }
  }

  const addToCart = (productId: number, size: size) => {
    const existingItemIndex = cartItems.value.findIndex(
      (item) => item.id === productId && item.size === size,
    )

    if (existingItemIndex !== -1) {
      cartItems.value[existingItemIndex].quantity += 1
    } else {
      cartItems.value.push({
        id: productId,
        quantity: 1,
        size: size,
      })
    }

    saveCartToStorage()
  }

  const updateQuantity = (productId: number, size: string, newQuantity: number) => {
    const itemIndex = cartItems.value.findIndex(
      (item) => item.id === productId && item.size === size,
    )

    if (itemIndex !== -1) {
      if (newQuantity <= 0) cartItems.value.splice(itemIndex, 1)
      else cartItems.value[itemIndex].quantity = newQuantity

      saveCartToStorage()
    }
  }

  const removeFromCart = (productId: number, size: string | null) => {
    const itemIndex = cartItems.value.findIndex(
      (item) => item.id === productId && item.size === size,
    )

    if (itemIndex !== -1) {
      cartItems.value.splice(itemIndex, 1)
      saveCartToStorage()
    }
  }

  const clearCart = () => {
    cartItems.value = []
    saveCartToStorage()
  }

  const getProductById = (id: number): Product | undefined =>
    products.value.find((p) => p.id === id)

  const getProductsByCategory = (category: string): Product[] => {
    if (category === 'ALL') return products.value
    return products.value.filter((p) => p.category === category)
  }

  // Initialize store
  const initialize = async () => {
    loadCartFromStorage()
    await loadProductsFromExcel()
  }
  initialize()
  return {
    // State
    products,
    cartItems,
    loading,
    error,
    // Getters
    cartItemsWithDetails,
    cartTotal,
    cartItemCount,
    // Actions
    loadProductsFromExcel,
    saveCartToStorage,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getProductById,
    getProductsByCategory,
  }
})
