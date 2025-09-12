<template>
  <!-- wrapper principale con padding -->
  <!-- v-if="service" → mostra il dettaglio solo se il servizio esiste -->
  <div class="container py-4" v-if="service">
    <div class="row g-4">
      <!-- colonna immagine (50% da lg in su, 100% su mobile) -->
      <div class="col-12 col-lg-6">
        <!-- img responsive con angoli arrotondati e ombra -->
        <!-- :src e :alt sono "binding" dinamici dalle proprietà del servizio -->
        <img :src="service.img" :alt="service.title" class="img-fluid rounded shadow-sm" loading="lazy" />
      </div>

      <!-- colonna testo -->
      <div class="col-12 col-lg-6">
        <!-- titolo del servizio -->
        <h1 class="h4 mb-3">{{ service.title }}</h1>

        <!-- body: descrizione estesa del servizio -->
        <p>{{ service.body }}</p>

        <!-- link di ritorno alla lista servizi -->
        <!-- RouterLink usa vue-router, quindi la navigazione è "SPA" -->
        <RouterLink class="btn btn-outline-primary mt-3" to="/servizi">
          ← Torna ai servizi
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- fallback quando lo slug non corrisponde a nessun servizio -->
  <div v-else class="container py-4">
    <p>Servizio non trovato.</p>
    <RouterLink class="btn btn-primary mt-2" to="/servizi">
      Vai all’elenco servizi
    </RouterLink>
  </div>
</template>

<script setup>
// useStore: per accedere allo store Vuex (stato globale)
import { useStore } from 'vuex'
// computed: crea proprietà reattive calcolate
import { computed, watch } from 'vue'
// useRoute: per leggere i parametri della rotta (es: /servizi/:slug)
import { useRoute } from 'vue-router'

// 1) prendo store e route
const store = useStore()
const route = useRoute()

// 2) computed "service":
//    - legge il parametro dinamico "slug" dall'URL
//    - usa il getter "getService" dello store per trovare il record corrispondente
//    - se non trova nulla → undefined (gestito dal v-if nel template)
const service = computed(() => store.getters.getService(route.params.slug))

// 3) (Opzionale) Aggiorno il <title> della pagina quando cambia lo slug
watch(
  () => route.params.slug,
  () => {
    document.title = service.value
      ? `${service.value.title} — Base Digital`
      : 'Servizio non trovato — Base Digital'
  },
  { immediate: true } // esegue subito al primo montaggio
)
</script>
