<template>
  <nav class="navbar navbar-expand-lg bg-white border-bottom sticky-top">
    <div class="container">
      <!-- Logo con attribute building dinamici
       attribute binding che permette di collegare dinamicamente 
       gli attributi html ai dati js
       class e to sono statici
       aria label e title sono dinamici (cambiano in basei ai dati) -->
      <RouterLink 
        class="navbar-brand d-flex align-items-center gap-2" 
        to="/"
        :aria-label="logoAriaLabel"
        :title="logoTitle"
      > 
      <!--img con tutti gli attributi abbiamo in ordine
      url dell'immagine
      testo alternativo
      altezza in pixel
      larghezza che può essere null
      strategia di caricamento
      modalità decodifica
      classi css dinamiche
      stili inline dinamici 
      event listener per gli errori 
      event listener per caricamento-->
        <img 
          :src="logoSrc" 
          :alt="logoAlt"
          :height="logoHeight"
          :width="logoWidth"
          :loading="logoLoading"
          :decoding="logoDecoding"
          :class="logoClasses"
          :style="logoStyles"
          @error="handleLogoError"
          @load="handleLogoLoad"
        />

        <!--importante qui usare il binding per
        flessibilità: posso cambiare il logo in base al tema
        reattività: gli attributi si aggiornano automaticamente
        controllo: posso gestire stati-->
        <span :class="brandTextClasses">{{ brandName }}</span>
      </RouterLink>

      <!-- Resto della navbar... -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="mainNav" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">Chi siamo</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/servizi">Servizi</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/clienti">Clienti</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/positions">Lavora con noi</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/news">News</RouterLink>
          </li>
          <li class="nav-item ms-lg-3">
            <RouterLink class="btn btn-sm btn-primary rounded-pill px-3" to="/contatti">
              Contattaci
            </RouterLink>
          </li>
          <li class="nav-item ms-lg-3">
            <RouterLink class="btn btn-sm btn-outline-primary rounded-pill px-3 me-2" to="/login">
              <i class="bi bi-person-circle me-1"></i>
              Area riservata
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Collapse from 'bootstrap/js/dist/collapse'

const router = useRouter()
let collapse
let unreg

// Props per personalizzare il logo 
// cosa fa questa props: definisce i parametri che il logo può ricevere
// theme: determina il tema, cioè quale versione del logo usare
// size: determina la dimensione del logo
// validator: assicura valori corretti 
const props = defineProps({
  theme: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'dark', 'light', 'compact'].includes(value)
  },
  size: {
    type: String,
    default: 'normal',
    validator: (value) => ['small', 'normal', 'large'].includes(value)
  }
})

// Stati reattivi
const logoLoaded = ref(false) //stato: logo caricato??
const logoError = ref(false) // stato: errore nel caricamento??
const isScrolled = ref(false) // stato: pagina scrollata?? 

// Configurazione del logo basata sui props e stato
const logoConfig = computed(() => {
  const configs = {
    default: {
      src: '/immagini/logo.png',
      alt: 'Base Digital - Logo aziendale',
      height: props.size === 'small' ? 24 : props.size === 'large' ? 32 : 28,
      width: null, // auto-calcolato
      classes: ['logo-default'],
      brandClasses: ['fw-semibold']
    },
    dark: {
      src: '/immagini/logo-dark.png',
      alt: 'Base Digital - Logo versione scura',
      height: props.size === 'small' ? 24 : props.size === 'large' ? 32 : 28,
      width: null,
      classes: ['logo-dark'],
      brandClasses: ['fw-semibold', 'text-white']
    },
    light: {
      src: '/immagini/logo-light.png',
      alt: 'Base Digital - Logo versione chiara',
      height: props.size === 'small' ? 24 : props.size === 'large' ? 32 : 28,
      width: null,
      classes: ['logo-light'],
      brandClasses: ['fw-semibold', 'text-dark']
    },
    compact: {
      src: '/immagini/logo-compact.png',
      alt: 'BD - Logo compatto',
      height: 24,
      width: 24,
      classes: ['logo-compact'],
      brandClasses: ['d-none', 'd-md-inline'] // Nasconde testo su mobile
    }
  }
  
  return configs[props.theme] || configs.default
})

// Computed properties per gli attributi del logo
const logoSrc = computed(() => logoConfig.value.src)
const logoAlt = computed(() => logoConfig.value.alt)
const logoHeight = computed(() => logoConfig.value.height)
const logoWidth = computed(() => logoConfig.value.width)
const logoLoading = computed(() => 'eager') // o 'lazy' per lazy loading
const logoDecoding = computed(() => 'async')

const logoClasses = computed(() => {
  const classes = [...logoConfig.value.classes]
  
  if (logoError.value) classes.push('logo-error')
  if (logoLoaded.value) classes.push('logo-loaded')
  if (isScrolled.value) classes.push('logo-scrolled')
  
  return classes.join(' ')
})

const logoStyles = computed(() => {
  const styles = {}
  
  // Esempio di stili dinamici
  if (isScrolled.value && props.size !== 'compact') {
    styles.transform = 'scale(0.9)'
    styles.transition = 'transform 0.2s ease'
  }
  
  return styles
})

const brandTextClasses = computed(() => {
  const classes = [...logoConfig.value.brandClasses]
  
  if (isScrolled.value) classes.push('brand-scrolled')
  
  return classes.join(' ')
})

// Attributi aggiuntivi
const logoAriaLabel = computed(() => `${logoConfig.value.alt} - Vai alla homepage`)
const logoTitle = computed(() => 'Clicca per tornare alla homepage')
const brandName = computed(() => props.theme === 'compact' ? 'BD' : 'Base Digital')

// Event handlers
const handleLogoError = () => {
  logoError.value = true
  console.warn('Errore nel caricamento del logo')
}

const handleLogoLoad = () => {
  logoLoaded.value = true
}

// Gestione scroll per effetti dinamici
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  const el = document.getElementById('mainNav')
  if (el) {
    collapse = new Collapse(el, { toggle: false })
  }

  const off = router.afterEach(() => {
    try { collapse?.hide() } catch (_) {}
  })
  unreg = () => off()

  // Aggiungi listener per scroll
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  unreg?.()
  collapse = null
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Stili base per il logo */
.logo-default,
.logo-dark,
.logo-light,
.logo-compact {
  transition: all 0.2s ease;
}

.logo-error {
  opacity: 0.5;
  filter: grayscale(100%);
}

.logo-loaded {
  opacity: 1;
}

.logo-scrolled {
  transform: scale(0.9);
}

.brand-scrolled {
  font-size: 0.9em;
}

/* Hover effects */
.navbar-brand:hover .logo-default,
.navbar-brand:hover .logo-dark,
.navbar-brand:hover .logo-light {
  transform: scale(1.05);
}

.navbar-brand:hover .logo-compact {
  transform: rotate(5deg);
}

/* Evidenzia la voce attiva */
.nav-link.router-link-active {
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .logo-default,
  .logo-dark,
  .logo-light {
    height: 24px;
  }
}
</style>