import { createApp } from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'

// 样式
import 'normalize.css/normalize.css'
import style from './style/main.scss'

// 全局
import { globalRegister } from './global'

// svg处理
import 'virtual:svg-icons-register'

// 路由刷新
import { useMenus } from '@/store'

// 创建vue实例
const app = createApp(App)

// 挂载pinia
app.use(store)
app.use(router)
useMenus()
app.use(globalRegister)
// 挂载实例
app.mount('#app')
