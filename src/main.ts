import '@/styles/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/router'
import Pinia from '@/store'
import RegisterGlobComp from '@/components'

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import '@/styles/reset.scss'
import '@/styles/index.scss'

const app = createApp(App)

import 'virtual:svg-icons-register'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(Router)
app.use(Pinia)
app.use(RegisterGlobComp)
app.use(ElementPlus)

app.mount('#app')
