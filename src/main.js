import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from "./store";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component('Datepicker', Datepicker)
  .mount('#app')
