<!--servicegrid mostra solo la griglia di card dei servizi-->
<template> 
    <!-- sezione con padding verticale -->
  <section class="py-3">
        <!-- titolo della sezione -->
    <h2 class="h4 mb-3">Cosa possiamo fare per te</h2>

    <div class="row g-3">

        <!-- ciclo v-for sui servizi -->
    
      <div class="col-12 col-md-6 col-xl-4" v-for="s in services" :key="s.slug">
        
        <!-- card Bootstrap -->
    
        <div class="card h-100 border-0 shadow-sm">
          
            <!-- immagine di copertina del servizio -->
          <!-- v-if="s.img" → la mostra solo se esiste -->
          <!-- :src="s.img" → binding dinamico, prende dal campo img nello store -->
          <!-- :alt="s.title" → testo alternativo per accessibilità -->
          <!-- stile inline → altezza fissa e crop -->
          <img v-if="s.img" :src="s.img" :alt="s.title" class="card-img-top" style="height:160px;object-fit:cover;">
          
            <!-- corpo della card -->
          <div class="card-body">

              <!-- titolo del servizio riprende le info da store -->
            <h3 class="h6 mb-1">{{ s.title }}</h3>

             <!-- descrizione breve riprende le info da store -->
            <p class="text-secondary mb-3">{{ s.desc }}</p>

              <!-- bottone che porta al dettaglio -->
           
            <!-- /servizi/:slug → pagina dettaglio -->
            <RouterLink class="btn btn-sm btn-primary" :to="`/servizi/${s.slug}`">Dettagli</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/* importiamo i dati gobali dallo store di vue */
import { useStore } from 'vuex'
import { computed } from 'vue'

/* accediamo allo store */
const store = useStore()

/* definiamo una proprietà reattiva services
   che legge i servizi dallo store */
const services = computed(() => store.getters.allServices)

/*questo componente userà sempre i dati
   centralizzati nello store (state.services). */
</script>



