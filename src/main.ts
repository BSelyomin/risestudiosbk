import 'vue-toastification/dist/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Toast from 'vue-toastification'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Toast, { position: 'top-right', timeout: 3000 })

app.use(createPinia())
app.use(router)

app.mount('#app')
