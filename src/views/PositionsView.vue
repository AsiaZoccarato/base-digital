<script setup>

import { ref,computed } from 'vue';   // per creare proprietà reattive calcolate
import { useStore } from 'vuex';   // per accedere allo store globale
import { RouterLink } from 'vue-router'; // per link interni senza ricaricare la pagina
import PositionsTable from "@/components/PositionsTable.vue";


// accedo allo store
const store = useStore();
const positions = computed(() => store.getters['position/getAllPositions']);

const searchQuery = ref('');
const gridColumns = ['title', 'area', 'seniority','country', 'city']
const gridData = positions;

</script>
<template>
  <main class="container py-4">
    <h1 class="h3 mb-4">Stai cercando tra le posizioni aperte pubblicate da Base Digital</h1>
<form id="search" >
    Search <input name="query" v-model="searchQuery">
  </form>
  <PositionsTable
    :data="gridData"
    :columns="gridColumns"
    :filter-key="searchQuery">
  </PositionsTable>

  </main>
</template>

<!-- 1.La lista degli posizioni
2. Aggiungere 
3. Cancellare
4. Order, sort by -->