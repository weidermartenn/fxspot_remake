import { createApp } from 'vue'
import App from '@/app/App.vue'
import '@/app/assets/tailwind.css'
import router from './app/providers/router'
import { createPinia } from 'pinia'

createApp(App).use(router).use(createPinia()).mount('#app')
