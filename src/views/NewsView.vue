<template>
  <div class="news-page">
    <!-- Sezione Notizie -->
    <div class="container my-5">
      <h1 class="text-center mb-5 display-4">Parlano di noi!</h1>
      
      <!-- Grid Bootstrap per le news -->
      <div class="row g-4">
        <div v-for="articolo in news" :key="articolo.id" class="col-12 col-md-6 col-lg-4">
          <!-- Card delle news con Vuetify -->
          <v-card class="h-100 shadow-sm" elevation="2">
            <v-card-text class="pb-0">
              <h2 class="h5 fw-bold text-primary mb-3" style="font-style: italic;">
                {{ articolo.titolo }}
              </h2>
              <p class="text-muted border-top pt-3">
                {{ articolo.contenuto }}
              </p>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn 
                :href="articolo.link" 
                target="_blank" 
                color="primary" 
                variant="text"
                class="fw-bold"
              >
                Continua a leggere
                <v-icon end>mdi-open-in-new</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>

    <!-- Sezione Social Wall -->
    <div class="container my-5">
      <div class="social-wall bg-white rounded shadow-sm p-4">
        <h1 class="text-center mb-4 display-4">Social Wall</h1>
        
        <!-- Video Section -->
        <div class="video-container text-center mb-5">
          <video 
            controls 
            poster="/immagini/copertinayoutube.jpg" 
            muted 
            class="video-responsive rounded"
          >
            <source src="/video/video.mp4" type="video/mp4">
            Il tuo browser non supporta il tag video.
          </video>
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
      loading: true,
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
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* Mantieni il tuo stile personalizzato */
.news-page {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 2rem;
}

.social-wall {
  max-width: 80%;
  margin: 0 auto;
}

.video-responsive {
  width: 100%;
  max-width: 640px;
  height: auto;
}

.hover-shadow:hover {
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: box-shadow 0.3s ease;
}

/* Media queries per responsive */
@media (max-width: 768px) {
  .social-wall {
    max-width: 95%;
  }
}
</style>