import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/:catchAll(.*)', redirect: '/' },
    { path: '/store', name: 'store', component: () => import('../views/StoreView.vue') },
    { path: '/checkout', name: 'cart', component: () => import('../views/CheckoutView.vue') },
    { path: '/rental', name: 'rental', component: () => import('../views/RentalView.vue') },
  ],
})

export default router
