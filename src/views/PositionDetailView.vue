<template>
   <div class="container py-4" v-if="position">
    <div class="row g-4">
      <div class="text-center">
        <div class="h3 mb-1">{{ position.title }}</div>
      </div>
      <ButtonRow />
      <div class="h5 mb-1">Career Opportunities: {{position.title}} </div>
      <div v-html="position.description">
      </div>
      <ButtonRow />
      <JobApplicationForm :role="position.title" />
    </div>
  </div>
  <div v-else class="container py-4">
    <p>Posizione non trovata.</p>
      <div class="text-center">
        <RouterLink class="btn btn-outline-secondary mt-1 mr-2 p-2" to="/positions">
          Torna alla lista
        </RouterLink>
      </div>
  </div>
</template>

<script setup>

import { useStore } from 'vuex'                    // per accedere allo store globale
import { computed } from 'vue'                     // per creare proprietà reattive calcolate
import { useRoute, RouterLink } from 'vue-router'  // importo anche RouterLink
import ButtonRow from '@/components/ButtonRow.vue'
import JobApplicationForm from '@/components/JobApplicationForm.vue'


const store = useStore()
const route = useRoute()
const position = computed(() => store.getters['position/getPositionBySlug'](route.params.slug))

</script>
