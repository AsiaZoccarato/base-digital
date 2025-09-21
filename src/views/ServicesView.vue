<template>
  <!-- è la pagina che legge i servizi dallo store vuex, gestisce ui della pagina 
   può avere ricerca, filtri, ordinamenti ecc
   passa i dati filtrati a servicesgrid-->
  <main class="container py-4">
    <h1 class="h3 mb-4">I nostri servizi</h1>

    <!-- barra di ricerca -->
    <!-- input group bootstrap: icona + campo testo -->
    <div class="input-group mb-4">
      <span class="input-group-text">🔍</span>
      <!-- v-model lega l'input alla variabile q -->
      <!-- ogni volta che scrivo q cambia, e la computed filtered si aggiorna -->
      <input
        v-model.trim="q"
        type="search"
        class="form-control"
        placeholder="Cerca per titolo, descrizione o tag…"
        aria-label="Cerca servizi"
      />
    </div>

    <!-- info sui risultati -->
    <!-- mostra il numero di risultati trovati -->
    <p class="text-muted small mb-4">
      {{ filtered.length }} risultato{{ filtered.length === 1 ? '' : 'i' }}
    </p>

    <!-- griglia responsive Bootstrap:
         - mobile: 1 colonna (col-12)
         - da md: 2 colonne (col-md-6)
         - da lg: 3 colonne (col-lg-4) -->
    <div class="row g-4">
      <!-- v-for: creo una card per ogni servizio filtrato -->
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="s in filtered"
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

    <!-- messaggio se nessun risultato -->
    <div v-if="filtered.length === 0" class="alert alert-light border mt-4">
      Nessun servizio trovato per "<strong>{{ q }}</strong>".
      Prova con parole chiave diverse (es. <em>seo</em>, <em>social</em>, <em>ecommerce</em>…)
    </div>
  </main>
</template>

<script setup>
/* pagina MASTER (lista):
   - legge i servizi dallo store Vuex
   - aggiunge una barra di ricerca
   - mostra una card per ciascun servizio filtrato
   - ogni card ha un link che porta alla pagina di DETTAGLIO (/servizi/:slug) */

import { ref, computed } from 'vue'          // ref per la query di ricerca, computed per i risultati
import { useStore } from 'vuex'             // per accedere allo store globale
import { RouterLink } from 'vue-router'     // per link interni senza ricaricare la pagina

// accedo allo store
const store = useStore()

// variabile reattiva per la query di ricerca
const q = ref('')

// computed filtered:
// usa il getter searchServices dello store e gli passa la query q
// N.B. Assicurati che nello store esista:
// getters: { searchServices: (state) => (query) => { ... } }
const filtered = computed(() => store.getters.searchServices(q.value))
</script>

<!-- come funziona questo file (sintesi)
- È la pagina "master" dei servizi (/servizi).
- Mostra una barra di ricerca + una griglia di card, una per ogni servizio filtrato.
- La ricerca sfrutta un getter nello store che filtra i servizi per titolo, descrizione o tag.
- Ogni card ha un bottone "Dettagli" che porta a /servizi/:slug (es. /servizi/social).

dipendenze lato router:
- in src/router/index.js servono queste rotte:
  { path: '/servizi', name: 'services', component: ServicesView },
  { path: '/servizi/:slug', name: 'service-detail', component: ServiceDetailView, props: true }

dipendenze lato store:
- in src/store/index.js servono i dati e i getters, ad esempio:
  state: { services: [ { slug, title, desc, body, img }, ... ] }
  getters: {
    allServices:    (state) => state.services,
    getService:     (state) => (slug) => state.services.find(s => s.slug === slug),
    searchServices: (state) => (query) => { ... filtro ... }
  }
-->
