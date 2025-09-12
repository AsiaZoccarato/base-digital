<template>
  <main>
    <HeroCompact />
    <ServicesGrid />
    <LogoStrip />
    <TestimonialCarousel />

    <div class="container my-4 text-center">
      <RouterLink to="/contatti" class="btn btn-primary rounded-pill px-4 py-2">
        Contattaci
      </RouterLink>
    </div>
  </main>
</template>

<script setup>
import HeroCompact from '@/components/HeroCompact.vue'
import ServicesGrid from '@/components/ServicesGrid.vue'
import LogoStrip from '@/components/LogoStrip.vue'
import TestimonialCarousel from '@/components/TestimonialCarousel.vue'
</script>
