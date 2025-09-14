<template>
  <!-- se il servizio è stato trovato, mostro il dettaglio 
   legge slug dal router, recupera il servizio dallo store e renderizza immagine, titolo, testo ecc. -->
  <div class="container py-4" v-if="service">
    <div class="row g-4">
      <!-- colonna immagine -->
      <div class="col-12 col-lg-6">
        <!-- IMG: uso imageSrc (computed) che prova a risolvere l'URL in modo sicuro -->
        <img
          v-if="imageSrc"
          :src="imageSrc"
          :alt="service.title"
          class="img-fluid rounded shadow-sm w-100"
        />
        <!-- Galleria immagini (opzionale): array di url in service.gallery -->
        <div v-if="service.gallery?.length" class="row g-2 mt-2">
          <div class="col-4" v-for="(g, i) in service.gallery" :key="`g-${i}`">
            <img :src="g" class="img-fluid rounded shadow-sm" alt="anteprima" />
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
const relatedItems = computed(() => {
  if (!service.value?.related?.length) return []
  return service.value.related
    .map(slug => store.getters.getService(slug))
    .filter(Boolean)
})
</script>

<!--cosa fa il template 
Se esiste un servizio con lo slug richiesto, mostra immagine + titolo + descrizione, 
elenca features/deliverable, evidenzia prezzo, mostra tag e servizi correlati.
Se non esiste, mostra il messaggio “Servizio non trovato”.

cosa fa lo script 
pagina di dettaglio di un servizio. 
Legge slug dalla route, prende il servizio dallo store (getter getService),
gestisce l'immagine in modo robusto (imageSrc) e risolve i correlati (relatedItems).

Funziona insieme a router/index.js, che ha la rotta:
{ path: '/servizi/:slug', name: 'service-detail', component: ServiceDetailView, props: true }

Esempi di dati nello store (estendibili):
{
  slug: 'social',
  title: 'Social Media Marketing',
  subtitle: 'Strategia, contenuti e performance',
  body: 'Gestiamo i tuoi social con strategia e creatività...',
  img: '/immagini/social.jpg',
  gallery: ['/immagini/s1.jpg','/immagini/s2.jpg'],
  features: ['Calendario editoriale mensile','Report KPI','Gestione community'],
  deliverables: ['Piano editoriale','Report mensile','Set up tracciamenti'],
  price: 'da 499€/mese',
  duration: '3-6 mesi',
  level: 'Pro',
  tags: ['social','adv','content'],
  related: ['webmarketing','seo'],
  ctaText: 'Parla con un consulente'
}

che cos'è SLUG
uno slug è la parte finale di un URL che identifica in modo univoco una pagina
(es. /servizi/social). È leggibile, in minuscolo, con trattini, utile per SEO e usabilità. -->
