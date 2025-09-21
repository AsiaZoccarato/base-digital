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
  const allLevels = positions.value.map(p => p.seniority).filter(Boolean);
  const uniqueLevels = [...new Set(allLevels)];
  return ['Tutti i livelli', ...uniqueLevels];
});

const areaOptions = computed(() => {
  const allAreas = positions.value.map(p => p.area);
  const uniqueAreas = [...new Set(allAreas)];
  return ['Tutte le aree', ...uniqueAreas];
});

const cityOptions = computed(() => {
  const allCities = positions.value.map(p => p.city);
  const uniqueCities = [...new Set(allCities)].filter(Boolean);
  return ['Tutte le località', ...uniqueCities];
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
    <form id="searchPositionQuery" class="mb-4 align-items-center ">
    Ricerca la tua posizione:
    <input name="query" v-model="searchPositionQuery" type="text" class="form-control" placeholder="Posizione" aria-label="Posizione"></input>
  </form>
  <form id="searchCityQuery" class="mb-4 align-items-center">
    <label for="city-select">
    Località: </label>
    <select id="city-select" v-model="searchCityQuery" class="form-select">
      <option v-for="city in cityOptions" :key="city" :value="city">
        {{ city }}
      </option>
    </select>
  </form>
  <form id="searchAreaQuery" class="mb-4 align-items-center">
    <label for="area-select">Aree:</label>
    <select id="area-select" v-model="searchAreaQuery" class="form-select">
      <option v-for="area in areaOptions" :key="area" :value="area">
        {{ area }}
      </option>
    </select>
  </form>
   <form id="searchSeniorityQuery" class="mb-4 align-items-center">
    <label for="seniority-select">Livelli di esperienza:</label>
    <select id="seniority-select" v-model="searchSeniorityQuery" class="form-select">
    <option v-for="level in seniorityOptions" :key="level" :value="level">
      {{ level }}
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
