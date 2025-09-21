<template>
  <!-- se il servizio è stato trovato, mostro il dettaglio 
   legge slug dal router, recupera il servizio dallo store e renderizza immagine, titolo, testo ecc. -->
  <div class="container py-4" v-if="service">
    <div class="row g-4">
      <!-- colonna immagine -->
      <div class="col-12 col-lg-6">
<!-- immagine principale LAYOUT CON BOOSTRAP CHE SFRUTTA GIA' CLASSI RESPONSIVE -->
<img :src="service.img" class="img-fluid rounded shadow-sm mb-3" alt="principale" />

<!-- galleria -->
<div v-if="service.gallery?.length" class="row g-2">
  <div class="col-4 col-sm-4 col-md-4"
       v-for="(g, i) in service.gallery" :key="`g-${i}`">
    <div class="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
      <img :src="g" class="w-100 h-100 object-fit-cover" alt="anteprima" />
    </div>
  </div>
</div>




      </div>

      <!-- colonna contenuti -->
      <div class="col-12 col-lg-6">
        <h1 class="h4 mb-2">{{ service.title }}</h1>

        <!-- sottotitolo/strapline opzionale -->
        <p v-if="service.subtitle" class="text-muted mb-2">{{ service.subtitle }}</p>

        <!-- descrizione lunga -->
        <p class="mb-3">{{ service.body }}</p>

        <!-- bullet principali: features -->
        <div v-if="service.features?.length" class="mb-3">
          <h2 class="h6 mb-2">Cosa include</h2>
          <ul class="list-unstyled mb-0">
            <li v-for="f in service.features" :key="f" class="mb-1">✅ {{ f }}</li>
          </ul>
        </div>

        <!-- deliverables (opzionale): consegne tangibili -->
        <div v-if="service.deliverables?.length" class="mb-3">
          <h2 class="h6 mb-2">Deliverable</h2>
          <ul class="list-unstyled mb-0">
            <li v-for="d in service.deliverables" :key="d" class="mb-1">📦 {{ d }}</li>
          </ul>
        </div>

        <!-- info rapide: durata / livello / tag -->
        <div class="d-flex flex-wrap gap-2 mb-3">
          <span v-if="service.duration" class="badge text-bg-light">
            ⏱️ Durata tipica: {{ service.duration }}
          </span>
          <span v-if="service.level" class="badge text-bg-light">
            🎯 Livello: {{ service.level }}
          </span>
          <span v-for="t in service.tags || []" :key="t" class="badge text-bg-secondary">
            #{{ t }}
          </span>
        </div>

        <!-- prezzo (testo libero) -->
        <div v-if="service.price" class="alert alert-info py-2">
          <strong>Prezzo:</strong> {{ service.price }}
        </div>

        <!-- CTA principali -->
        <div class="d-flex flex-wrap gap-2 mt-3">
          <RouterLink to="/contatti" class="btn btn-primary">
            {{ service.ctaText || 'Richiedi un preventivo' }}
          </RouterLink>
          <RouterLink class="btn btn-outline-primary" to="/servizi">
            ← Torna ai servizi
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- servizi correlati -->
    <section v-if="relatedItems.length" class="mt-5">
      <h2 class="h6 mb-3">Potrebbe interessarti anche</h2>
      <div class="row g-3">
        <div class="col-12 col-sm-6 col-lg-4" v-for="r in relatedItems" :key="r.slug">
          <div class="card h-100 shadow-sm">
            <img v-if="r.img" :src="r.img" :alt="r.title" class="card-img-top" />
            <div class="card-body d-flex flex-column">
              <h3 class="h6 mb-2">{{ r.title }}</h3>
              <p class="text-muted mb-3">{{ r.desc }}</p>
              <RouterLink :to="`/servizi/${r.slug}`" class="btn btn-sm btn-outline-primary mt-auto">
                Vai al dettaglio
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- altrimenti mostro un messaggio d'errore gentile -->
  <div v-else class="container py-4">
    <p>Servizio non trovato.</p>
    <RouterLink class="btn btn-outline-secondary mt-3" to="/servizi">
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
const service = computed(() => store.getters.getService(route.params.slug))

// computed imageSrc
// prova a risolvere l'immagine in modo robusto:
// - se service o service.img non esistono → null (e quindi non mostra l'img)
// - se inizia con "http" → la usa così com'è
// - se inizia con "/" → si assume che il file sia in /public (es. /immagini/xxx.jpg)
// - altrimenti mostra un placeholder (evita <img> rotte)
const imageSrc = computed(() => {
  if (!service.value || !service.value.img) return null
  const src = service.value.img
  if (/^https?:\/\//i.test(src)) return src
  if (src.startsWith('/')) return src
  return 'https://dummyimage.com/800x450/eeeeee/aaaaaa&text=Immagine+non+disponibile'
})

// relatedItems: mappa gli slug in oggetti servizio reali (se esistono)
// consente di mostrare titolo/desc/img dei correlati
//nello store vuex ogni servizio ha un campo related con un array di slug di altri servizi
//nel servicedetail c'è questa parte di script che se il servizio corrente non ha related, 
//restituisce un array vuoto e non mostra nulla
//se invece ha degli slug, fa un map: prende ogni slug e lo passa al getter getservice dallo store
//che restituisce l'oggetto completo del servizio corrispondente 
//filter boolean serve a scartare eventuali valori null 
//nel template mostra i related con un ciclo vfor e mostra le card dei servizi corelati
const relatedItems = computed(() => {
  if (!service.value?.related?.length) return []
  return service.value.related
    .map(slug => store.getters.getService(slug))
    .filter(Boolean)
})
</script>

<style: scoped>
.object-fit-cover {
  object-fit: cover;
  object-position: center;
}


</style:>


