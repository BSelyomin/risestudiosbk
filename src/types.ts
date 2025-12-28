export interface CustomEvent {
  title: string
  date: string
  description: string
  location: string
  location_link: string
  image_name: string
}

export type size = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  sizes: { xs: boolean; s: boolean; m: boolean; l: boolean; xl: boolean; xxl: boolean }
}

export interface CartItem {
  id: number
  quantity: number
  size: size
}

export interface Order {
  id: string
  customerName: string
  email: string
  address: string
  city: string
  postalCode: string
  items: string
  total: string
}
