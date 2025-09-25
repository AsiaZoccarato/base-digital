<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">Le Nostre Storie di Successo</h1>
        <p class="hero-subtitle">
          Scopri come abbiamo aiutato i nostri clienti a raggiungere i loro obiettivi, 
          attraverso strategie digitali su misura.
        </p>
      </div>
    </section>

    <!-- Portfolio Grid -->
    <section class="portfolio-section">
      <div class="container-fluid px-4">
        <div class="portfolio-grid">
          <div 
            v-for="(story, index) in clientStories" 
            :key="story.id"
            class="portfolio-item"
            @click="openModal(story)"
          >
            <div class="portfolio-card">
              <div class="portfolio-image-container">
                <img :src="story.image" :alt="story.name" class="portfolio-image">
                <div class="portfolio-overlay">
                  <div class="portfolio-overlay-content">
                    <h3 class="portfolio-title">{{ story.name }}</h3>
                    <p class="portfolio-category">{{ story.category }}</p>
                    <div class="portfolio-results">
                      <span 
                        v-for="(result, rIdx) in story.keyResults" 
                        :key="story.id + '-kr-' + rIdx" 
                        class="result-tag"
                      >
                        {{ result }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div 
      v-if="selectedStory" 
      class="modal-backdrop" 
      @click="closeModal"
      role="dialog"
      aria-modal="true"
      aria-label="Dettagli case study"
    >
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal" aria-label="Chiudi">&times;</button>
        <div class="modal-body">
          <div class="modal-image-container">
            <img :src="selectedStory.image" :alt="selectedStory.name" class="modal-image">
          </div>
          <div class="modal-details">
            <h2 class="modal-title">{{ selectedStory.name }}</h2>
            <p class="modal-category">{{ selectedStory.category }}</p>
            
            <div class="detail-section">
              <h4>La sfida</h4>
              <p>{{ selectedStory.problem }}</p>
            </div>
            
            <div class="detail-section">
              <h4>La soluzione</h4>
              <p>{{ selectedStory.solution }}</p>
            </div>
            
            <div class="detail-section">
              <h4>I risultati</h4>
              <ul class="results-list">
                <li 
                  v-for="(result, idx) in selectedStory.results" 
                  :key="selectedStory.id + '-res-' + idx"
                >
                  {{ result }}
                </li>
              </ul>
            </div>

            <div class="detail-section" v-if="selectedStory.services">
              <h4>Servizi utilizzati</h4>
              <div class="services-tags">
                <span 
                  v-for="(service, sIdx) in selectedStory.services" 
                  :key="selectedStory.id + '-svc-' + sIdx" 
                  class="service-tag"
                >
                  {{ service }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2 class="cta-title">Vuoi essere il nostro prossimo caso di successo?</h2>
        <p class="cta-text">
          Raccontaci la tua sfida e scopri come possiamo aiutarti a raggiungere 
          i tuoi obiettivi digitali.
        </p>
        <div class="cta-buttons">
          <RouterLink to="/contatti" class="btn-primary">
            Richiedi una consulenza
          </RouterLink>
          <RouterLink to="/servizi" class="btn-secondary">
            Scopri i servizi
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'

const selectedStory = ref(null)

const clientStories = ref([
  {
    id: 1,
    name: "EcoGreen Srl",
    category: "E-Commerce & SEO",
    image: "/immagini/immagine_cliente1.png",
    problem: "L'azienda faticava a ottenere visibilità online...",
    solution: "Abbiamo sviluppato una strategia integrata...",
    results: [
      "+180% traffico organico in 6 mesi",
      "+60% conversioni online",
      "ROI campagne pubblicitarie del 340%",
      "Posizionamento #1 per 15 keyword strategiche"
    ],
    keyResults: ["+180% traffico", "+60% conversioni"],
    services: ["SEO", "Google Ads", "E-commerce", "Content Marketing"]
  },
  {
    id: 2,
    name: "Studio Legale Verdi e Associati",
    category: "Restyling & Social Media",
    image: "/immagini/studiolegale_wm.png",
    problem: "Lo studio aveva un sito obsoleto e nessuna presenza social significativa.",
    solution: "Restyling del sito con blog informativo, apertura canali social, e newsletter mensile.",
    results: [
      "+75% contatti tramite sito",
      "Community su Facebook attiva con oltre 2000 follower"
    ],
    keyResults: ["+75% contatti", "+2000 follower"],
    services: ["Web Design", "Social Media", "Content Marketing"]
  },
  {
    id: 3,
    name: "FashionStyle Boutique",
    category: "Branding & Marketing",
    image: "/immagini/cliente3.jpg",
    problem: "Il brand non riusciva a distinguersi in un mercato competitivo e a raggiungere il pubblico giusto.",
    solution: "Restyling completo del brand, strategia marketing visivo sui social media e campagna influencer mirata.",
    results: [
      "+150% engagement sui social",
      "+45% vendite online in 2 mesi"
    ],
    keyResults: ["+150% engagement", "+45% vendite"],
    services: ["Branding", "Social Media", "Influencer Marketing"]
  },
  {
    id: 4,
    name: "TechSolutions Inc.",
    category: "Web Design & Conversion",
    image: "/immagini/clientenum4.webp",
    problem: "Il sito web aziendale non era user-friendly e non riusciva a generare richieste di preventivo.",
    solution: "Rinnovato design del sito, migliorata usabilità e implementata sezione preventivi online.",
    results: [
      "+120% richieste di preventivo",
      "+80% miglioramento tasso di conversione"
    ],
    keyResults: ["+120% preventivi", "+80% conversioni"],
    services: ["Web Design", "UX/UI", "Conversion Optimization"]
  },
 {
    id: 5,
    name: "HealthyLife Spa",
    category: "Social Media & Content",
    image: "/immagini/cliente5.jpg",
    problem: "Il centro benessere non riusciva ad attirare nuovi clienti tramite i canali digitali.",
    solution: "Abbiamo creato una strategia social multicanale con contenuti video e campagne mirate.",
    results: [
      "+200% follower su Instagram",
      "Triplicato il numero di prenotazioni online"
    ],
    keyResults: ["+200% follower", "x3 prenotazioni"],
    services: ["Social Media", "Video Marketing", "Adv Campaigns"]
  },
  {
    id: 6,
    name: "GlobalConsulting",
    category: "Digital Strategy & SEO",
    image: "/immagini/cliente6.jpg",
    problem: "L'azienda non aveva una presenza strutturata online e riceveva poche richieste B2B.",
    solution: "Creazione di un nuovo sito corporate multilingua con SEO internazionale.",
    results: [
      "+300% lead B2B in 6 mesi",
      "Posizionamento in 5 mercati europei"
    ],
    keyResults: ["+300% lead", "SEO internazionale"],
    services: ["SEO", "Web Design", "International Marketing"]
  }
])

const openModal = (story) => {
  selectedStory.value = story
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedStory.value = null
  document.body.style.overflow = ''
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && selectedStory.value) {
    closeModal()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
  display: block;
}

.hero-section {
  padding: 3rem 1rem;
  text-align: center;
}

.hero-title {
  font-size: 1.8rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1rem;
  margin-top: 1rem;
  color: #555;
}

@media (min-width: 768px) {
  .hero-title { font-size: 2.5rem; }
  .hero-subtitle { font-size: 1.2rem; }
}

.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.portfolio-card {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
}

.portfolio-image-container {
  height: 250px;
  overflow: hidden;
}

.portfolio-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.portfolio-card:hover .portfolio-image {
  transform: scale(1.05);
}

.portfolio-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.portfolio-card:hover .portfolio-overlay {
  opacity: 1;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 900px;
  width: 100%;
  overflow-y: auto;
  max-height: 90vh;
  position: relative;
  padding: 1rem;
}

.modal-close {
  position: absolute;
  top: 0.5rem;    /* distanza dal bordo superiore */
  right: 0.5rem;  /* distanza dal bordo destro */
  background: transparent;
  border: none;
  font-size: 2rem;
  font-weight: 700;
  cursor: pointer;
  z-index: 10;    /* assicurati che sia sopra tutto */
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .modal-body { flex-direction: row; gap: 2rem; }
}

.modal-image-container {
  flex: 1;
}

.modal-image {
  width: 100%;
  border-radius: 8px;
}

.modal-details {
  flex: 2;
}

.detail-section h4 {
  margin-top: 1rem;
  font-weight: 600;
}

.results-list {
  list-style-type: disc;
  margin-left: 1rem;
}

.services-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.result-tag, .service-tag {
  background: #eee;
  color: #000;        /* testo nero */
  padding: 0.5rem 1rem; /* spazio interno maggiore */
  border-radius: 4px;
  margin: 0.5rem 0.5rem 0 0; /* margine in alto/dx/basso/sx */
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
}

.cta-section {
  text-align: center;
  padding: 3rem 1rem;
  background: #f9f9f9;
}

.cta-title { font-size: 1.8rem; margin-bottom: 1rem; }
.cta-text { font-size: 1rem; margin-bottom: 2rem; }

.cta-buttons .btn-primary,
.cta-buttons .btn-secondary {
  margin: 0 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
}

.btn-primary { background: #007bff; color: white; }
.btn-primary:hover { background: #0056b3; }

.btn-secondary { background: #6c757d; color: white; }
.btn-secondary:hover { background: #5a6268; }
</style>
