import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default function (app) {
  app.use(ElementPlus)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
