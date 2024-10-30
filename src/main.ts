import { createApp } from 'vue'
import App from '@/app/App.vue'
import '@/app/assets/tailwind.css'
import router from './app/providers/router'

createApp(App).use(router).mount('#app')
