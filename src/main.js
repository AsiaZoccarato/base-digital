import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Importa CSS di Bootstrap e icone
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Importa JS di Bootstrap (per dropdown, modali, ecc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App).use(store).use(router).mount('#app')
