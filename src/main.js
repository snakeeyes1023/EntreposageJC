import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import i18n from './i18n'

const myV3App = createApp(App)

myV3App
.use(naive)
.use(router)
.use(i18n)

myV3App.mount('#app')