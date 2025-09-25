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


import HeroCompact from "@/components/HeroCompact.vue"; // HeroCompact: header con carousel (Bootstrap)
import AboutIntro from "@/components/AboutIntro.vue"; // AboutIntro: micro-presentazione dell'agenzia con link a /about
import ProcessSteps from "@/components/ProcessSteps.vue"; // ProcessSteps: i 4 step del nostro approccio 
import TestimonialCarousel from "@/components/TestimonialCarousel.vue"; //  carosello delle recensioni
</script>
