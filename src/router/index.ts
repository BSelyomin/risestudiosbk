import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StoreView from '@/views/StoreView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import RentalPage from '@/views/RentalPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/:catchAll(.*)', redirect: '/' },
    { path: '/store', name: 'store', component: StoreView },
    { path: '/checkout', name: 'cart', component: CheckoutView },
    { path: '/rental', name: 'rental', component: RentalPage },
  ],
})

export default router
