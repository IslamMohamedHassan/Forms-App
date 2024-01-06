import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css';



// bootstrap & fontAwesome
import "bootstrap/dist/css/bootstrap.min.css"
import '@fortawesome/fontawesome-free/css/all.min.css';




const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueTippy, {
    defaultProps: { placement: 'right' },
  })

app.mount('#app')



import 'bootstrap'; // ✅ happy days

