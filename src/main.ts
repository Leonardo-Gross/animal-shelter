import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Material from '@primeuix/themes/material'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'
import { ConfirmationService } from 'primevue'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Material,
  },
})
app.use(ToastService)
app.use(ConfirmationService)
app.mount('#app')
