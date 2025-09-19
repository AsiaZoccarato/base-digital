<template>
  <!-- se il servizio è stato trovato, mostro il dettaglio 
   legge slug dal router, recupera il servizio dallo store e renderizza immagine, titolo, testo ecc. -->
  <div class="container py-4" v-if="position">
    <div class="row g-4">
      <!-- colonna immagine -->
  
      <!-- colonna contenuti -->
      <div class="col-12 col-lg-6">
        <h1 class="h4 mb-2">{{ position.title }}</h1>
        </div>
    </div>

    <!-- servizi correlati -->
   
  </div>

  <!-- altrimenti mostro un messaggio d'errore gentile -->
  <div v-else class="container py-4">
    <p>Posizione non trovata.</p>
    <RouterLink class="btn btn-outline-secondary mt-3" to="/positions">
      Torna alla lista
    </RouterLink>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'                    // per accedere allo store globale
import { computed } from 'vue'                     // per creare proprietà reattive calcolate
import { useRoute, RouterLink } from 'vue-router'  // importo anche RouterLink

// accedo allo store
const store = useStore()
// leggo la route corrente
const route = useRoute()

// computed service:
// prende lo slug dalla URL (es. /servizi/social → "social")
// usa il getter getService dello store per restituire il servizio corrispondente
// se non lo trova, restituisce undefined → attiva il v-else nel template
const position = computed(() => store.getters['position/getPositionBySlug'](route.params.slug))

</script>
