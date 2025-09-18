import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Importa CSS di Bootstrap e icone
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Importa JS di Bootstrap (per dropdown, modali, ecc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


// Importa Vuetify (per struttura delle news in NewsView.vue)
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(store).use(router).use(vuetify).mount('#app')
