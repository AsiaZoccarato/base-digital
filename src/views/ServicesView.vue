<template>
  <!-- è la pagina che legge i servizi dallo store vuex, gestisce ui della pagina 
   può avere ricerca, filtri, ordinamenti ecc
   passa i dati filtrati a servicesgrid-->
  <main class="container py-4">
    <h1 class="h3 mb-4">I nostri servizi</h1>

    <!-- griglia responsive Bootstrap:
         - mobile: 1 colonna (col-12)
         - da md: 2 colonne (col-md-6)
         - da lg: 3 colonne (col-lg-4) -->
    <div class="row g-4">
      <!-- v-for: creo una card per ogni servizio nello store -->
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="s in services"
        :key="s.slug"
      >
        <div class="card h-100 shadow-sm">
          <!-- immagine card: mostrata solo se presente -->
          <img
            v-if="s.img"
            :src="s.img"
            :alt="s.title"
            class="card-img-top"
          />

          <div class="card-body d-flex flex-column">
            <!-- titolo del servizio -->
            <h2 class="h5">{{ s.title }}</h2>

            <!-- descrizione breve (teaser) -->
            <p class="text-muted mb-3">{{ s.desc }}</p>

            <!-- link al dettaglio:
                 costruisco l'URL con lo slug (es. /servizi/social) -->
            <RouterLink
              class="btn btn-outline-primary mt-auto"
              :to="`/servizi/${s.slug}`"
            >
              Dettagli
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
/* pagina MASTER (lista):
   - legge tutti i servizi dallo store Vuex (getter allServices)
   - mostra una card per ciascun servizio
   - ogni card ha un link che porta alla pagina di DETTAGLIO (/servizi/:slug) */

import { computed } from 'vue'     // per creare proprietà reattive calcolate
import { useStore } from 'vuex'    // per accedere allo store globale
import { RouterLink } from 'vue-router' // per link interni senza ricaricare la pagina

// accedo allo store
const store = useStore()

// computed services:
// legge dal getter allServices l'elenco di tutti i servizi
// N.B. Assicurati che nello store esista:
// getters: { allServices: (state) => state.services }
const services = computed(() => store.getters.allServices)
</script>

<!-- come funziona questo file (sintesi)
- È la pagina "master" dei servizi (/servizi).
- Mostra una griglia di card, una per ogni servizio definito nello store Vuex.
- Ogni card ha un bottone "Dettagli" che porta a /servizi/:slug (es. /servizi/social).

dipendenze lato router:
- in src/router/index.js servono queste rotte:
  { path: '/servizi', name: 'services', component: ServicesView },
  { path: '/servizi/:slug', name: 'service-detail', component: ServiceDetailView, props: true }

dipendenze lato store:
- in src/store/index.js servono i dati e i getters, ad esempio:
  state: { services: [ { slug, title, desc, body, img }, ... ] }
  getters: {
    allServices: (state) => state.services,
    getService:  (state) => (slug) => state.services.find(s => s.slug === slug)
  }
-->
