<script setup>

import { ref,computed } from 'vue';   // per creare proprietà reattive calcolate
import { useStore } from 'vuex';   // per accedere allo store globale
import PositionsTable from "@/components/PositionsTable.vue";


const store = useStore();
const positions = computed(() => store.getters['position/getAllPositions']);

const searchPositionQuery = ref('');
const searchCityQuery = ref('');
const searchAreaQuery = ref('');  
const searchSeniorityQuery = ref('');

const seniorityOptions = computed(() => {
  const allLevels = positions.value.map(p => p.seniority);
  return [...new Set(allLevels)].filter(Boolean);
});

const areaOptions = computed(() => {
  const allAreas = positions.value.map(p => p.area);
  return [...new Set(allAreas)].filter(Boolean);
});

const cityOptions = computed(() => {
  const allCities = positions.value.map(p => p.city);
  return  [...new Set(allCities)].filter(Boolean);
})

const gridColumns = ['title', 'area', 'seniority','country', 'city'];
const gridColumnsLabels = [
  {title: 'Titolo'},
  {area: 'Area'},
  {seniority: 'Seniority'},
  {country: 'Nazione'},
  {city: 'Città'}
];

const gridData = positions;

</script>
<template>
  <main class="container py-4">
    <h1 class="h3 mb-4">Stai cercando tra le posizioni aperte pubblicate da Base Digital: </h1>
    <form id="searchPositionQuery" class="mb-4 align-items-center">
    Ricerca la tua posizione <input name="query" v-model="searchPositionQuery">
  </form>
  <form id="searchCityQuery" class="mb-4 align-items-center">
    <label for="city-select">
    Tutte le località: </label>
    <select id="city-select" v-model="searchCityQuery" class="form-select">
      <option v-for="city in cityOptions" :key="city" :value="city">
        {{ city === '' ? 'Tutte' : city }}
      </option>
    </select>
  </form>
  <form id="searchAreaQuery" class="mb-4 align-items-center">
    <label for="area-select">Tutte le aree:</label>
    <select id="area-select" v-model="searchAreaQuery" class="form-select">
      <option v-for="area in areaOptions" :key="area" :value="area">
        {{ area === '' ? 'Tutte' : area }}
      </option>
    </select>
  </form>
   <form id="searchSeniorityQuery" class="mb-4 align-items-center">
    <label for="seniority-select">Tutti i livelli di esperienza:</label>
    <select id="seniority-select" v-model="searchSeniorityQuery" class="form-select">
    <option v-for="level in seniorityOptions" :key="level" :value="level">
      {{ level === '' ? 'Tutti' : level }}
    </option>
  </select>
  </form>
  <PositionsTable
    :data="gridData"
    :columns="gridColumns"
    :columns-labels="gridColumnsLabels"
    :filter-position="searchPositionQuery"
    :filter-city="searchCityQuery"
    :filter-area="searchAreaQuery"
    :filter-seniority="searchSeniorityQuery">
  </PositionsTable>

  </main>
  
</template>

<!-- 1.La lista degli posizioni
2. Aggiungere 
3. Cancellare
4. Order, sort by -->