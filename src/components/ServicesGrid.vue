<template> <!--pagina che vediamo con i servizi che proponiamo, subito sotto la sezione hero-->
    <!-- sezione con padding verticale -->
  <section class="py-3">
        <!-- titolo della sezione -->
    <h2 class="h4 mb-3">Cosa possiamo fare per te</h2>
     <!-- griglia bootstrap -->
    <!-- row → riga -->
    <!-- g-3 → spazio (gutter) tra le colonne -->
    <div class="row g-3">

        <!-- ciclo v-for sui servizi -->
      <!-- col-12 → mobile: colonna intera -->
      <!-- col-md-6 → tablet: metà pagina -->
      <!-- col-xl-4 → desktop grande: un terzo -->
      <!-- :key="s.slug" → chiave univoca per Vue -->
      <div class="col-12 col-md-6 col-xl-4" v-for="s in services" :key="s.slug">
        
        <!-- card Bootstrap -->
        <!-- h-100 → altezza piena per uniformare le colonne -->
        <!-- border-0 → nessun bordo -->
        <!-- shadow-sm → piccola ombra -->
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
            <!-- RouterLink → navigazione interna senza refresh -->
            <!-- /servizi/:slug → pagina dettaglio -->
            <RouterLink class="btn btn-sm btn-primary" :to="`/servizi/${s.slug}`">Dettagli</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/* Invece di definire l’array localmente,
   importiamo i dati globali dallo store Vuex */
import { useStore } from 'vuex'
import { computed } from 'vue'

/* 1) accediamo allo store */
const store = useStore()

/* 2) definiamo una proprietà reattiva services
   che legge i servizi dallo store */
const services = computed(() => store.getters.allServices)

/* Così questo componente userà sempre i dati
   centralizzati nello store (state.services).
   Se aggiungi/modifichi i servizi nello store,
   la lista qui si aggiornerà automaticamente. */
</script>

<!--A cosa serve
È la sezione servizi del sito: mostra le card dei servizi offerti.
Ogni card ha: immagine, titolo, descrizione, bottone “Dettagli”.
Cliccando “Dettagli” → l’utente viene portato alla pagina /servizi/:slug (es. /servizi/social).

È responsive:
su mobile → i servizi si vedono uno sotto l’altro,
su tablet → due colonne,
su desktop → tre colonne.

La differenza rispetto a prima:
ora i dati vengono presi dallo store Vuex,
non più da un array scritto dentro al componente.-->
