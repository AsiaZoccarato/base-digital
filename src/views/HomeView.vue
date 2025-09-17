<template>
  <main>
    <!-- HERO principale: impatto visivo + messaggio chiave + CTA brevi -->
    <HeroCompact />

    <!-- INTRO BREVE all'azienda: mini-sintesi con link a /about -->
    <AboutIntro />

    <!-- IL NOSTRO METODO IN 4 STEP: processo sintetico, niente dettagli da "Chi siamo" -->
    <ProcessSteps />

    <!-- Carosello con le recensioni dei clienti -->
    <TestimonialCarousel />

    <!-- CTA FINALE verso i contatti -->
    <section class="container my-4 text-center">
      <RouterLink to="/contatti" class="btn btn-primary rounded-pill px-4 py-2">
        Contattaci
      </RouterLink>
    </section>
  </main>
</template>

<script setup>
// RouterLink è usato nel template per il bottone "Contattaci"
import { RouterLink } from "vue-router";

// Componenti usati nella home:
// - HeroCompact: header con carousel (Bootstrap)
// - AboutIntro: micro-presentazione dell'agenzia con link a /about
// - ProcessSteps: i 4 step del nostro approccio (brief → strategia → go-live → optimize)
// - TestimonialCarousel: carosello delle recensioni
import HeroCompact from "@/components/HeroCompact.vue";
import AboutIntro from "@/components/AboutIntro.vue";
import ProcessSteps from "@/components/ProcessSteps.vue";
import TestimonialCarousel from "@/components/TestimonialCarousel.vue";
</script>
<!--homeview è la vista principale del sito, cioè la "homepage"
in vuerouter ogni "pagina" è una view che viene montata in base all'URL:
- / mostra homeview.vue
- /about mostra about.view
- /shop mostra shopview.vue ecc.

quindi homeview è il punto di ingresso per chi apre il sito su httplocalhost-->