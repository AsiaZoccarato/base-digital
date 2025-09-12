<template>
  <div class="container py-4" v-if="service">
    <div class="row g-4">
      <div class="col-12 col-lg-6">
        <img :src="service.img" :alt="service.title" class="img-fluid rounded shadow-sm" />
      </div>
      <div class="col-12 col-lg-6">
        <h1 class="h4 mb-3">{{ service.title }}</h1>
        <p>{{ service.body }}</p>
        <RouterLink class="btn btn-outline-primary mt-3" to="/servizi">← Torna ai servizi</RouterLink>
      </div>
    </div>
  </div>
  <div v-else class="container py-4">
    <p>Servizio non trovato.</p>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'   // per accedere allo store globale
import { computed } from 'vue'    // per creare proprietà reattive calcolate
import { useRoute } from 'vue-router' // per leggere i parametri dalla URL

// accedo allo store
const store = useStore()
// leggo la route corrente
const route = useRoute()

// computed service:
// prende lo slug dalla URL (es. /servizi/social → "social")
// usa il getter getService dello store per restituire il servizio corrispondente
// se non lo trova, restituisce undefined → attiva il v-else nel template
const service = computed(() => store.getters.getService(route.params.slug))
</script>

<!--cosa fa il template 
Se esiste un servizio con lo slug richiesto, mostra immagine + titolo + descrizione.
Se non esiste, mostra il messaggio “Servizio non trovato”.

cosa fa lo script 
la pagina di dettaglio di un servizio.

Funziona insieme a router/index.js, che ha la rotta:
{ path: '/servizi/:slug', name: 'service-detail', component: ServiceDetailView, props: true }
Quando vai su /servizi/social → mostra il dettaglio del servizio “Social Media Marketing”.
Quando vai su /servizi/webmarketing → mostra il dettaglio del servizio “Web Marketing”.
Se scrivi un URL sbagliato tipo /servizi/altro → appare “Servizio non trovato”.

che cos'è SLUG
un'applicazione Vue.js (come nel web in generale), uno slug è la parte finale di un URL che identifica in
 modo univoco una pagina o una risorsa, ad esempio mio-articolo-su-vuejs in
  www.miosito.it/mio-articolo-su-vuejs/mio-articolo-su-vuejs. 
  È una stringa di testo leggibile, composta da parole minuscole e
   separate da trattini, utilizzata per creare URL più "amichevoli" per l'utente e i motori di ricerca (SEO). -->


