import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'virtual:svg-icons-register'

import 'element-plus/theme-chalk/index.css'

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')
