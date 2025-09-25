<template>
    <!-- Sezione Notizie -->
    <div class="container my-5">
      <h1 class="text-center mb-5 display-4">Parlano di noi!</h1>
      
      <!-- Grid Bootstrap per le news -->
      <div class="row g-4">
        <div v-for="articolo in news" :key="articolo.id" class="col-12 col-md-6 col-lg-4">
          <!-- Card delle news con Vuetify -->
          <v-card class="h-100" elevation="2">
            <v-card-text class="pb-0">
              <h2 class="h5 fw-bold text-primary mb-3 fst-italic">
                {{ articolo.titolo }}
              </h2>
              <p class="text-muted border-top pt-3">
                {{ articolo.contenuto }}
              </p>
            </v-card-text>
            <v-card-actions class="justify-end">
              <a :href="articolo.link" 
                  target="_blank" 
                  class="btn btn-primary btn-sm">
                Continua a leggere
                <i class="bi bi-arrow-up-right ms-1"></i>
              </a>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>

    <!-- Sezione Social Wall -->
    <div class="container my-5">
    <!-- Card Bootstrap -->
      <div class="card shadow-sm mx-auto" style="max-width: 80%;">
        <div class="card-body p-4">
          <h1 class="text-center mb-4 display-4">Social Wall</h1>
        
        <!-- Video Section -->
        <div class="text-center mb-5">
        <div class="ratio ratio-16x9" style="max-width: 640px; margin: 0 auto;">
          <video
              controls
              poster="/immagini/copertinayoutube.jpg"
              muted
              class="rounded"
          >
            <source src="/video/video.mp4" type="video/mp4">
            Il tuo browser non supporta il tag video.
          </video>
        </div>
        </div>

        <!-- Post Grid -->
        <div class="row g-3">
          <div v-for="(post, index) in socialPosts" :key="index" class="col-12 col-md-4">
            <a :href="post.link" target="_blank" class="d-block">
              <img 
                :src="post.image" 
                :alt="`Post ${index + 1}`" 
                class="img-fluid rounded hover-shadow"
              >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsView',
  data() {
    return {
      news: [],
      socialPosts: [
        {
          image: '/immagini/post1.jpg',
          link: 'https://www.instagram.com/'
        },
        {
          image: '/immagini/post2.jpg',
          link: 'https://www.facebook.com/'
        },
        {
          image: '/immagini/post3.jpg',
          link: 'https://www.linkedin.com/'
        }
      ]
    }
  },
  async mounted() {
    await this.caricaNews()
  },
  /* Carichiamo il file json */
  methods: {
    async caricaNews() {
      try {
        const response = await fetch('/news.json')
        this.news = await response.json()
      } catch (error) {
        console.error('Errore nel caricamento delle news:', error)
      }
    }
  }
}
</script>

<style scoped>
/* Solo gli stili personalizzati non disponibili in Bootstrap */
.hover-shadow:hover {
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: box-shadow 0.3s ease;
}

/* Media query per gestire la larghezza personalizzata del social wall, che non è possibile con Bootstrap*/
@media (max-width: 768px) {
  .card.mx-auto {
    max-width: 95% !important;
  }
}
</style>