<template>
  <main class="container py-4">
     <h1 class="h3 mb-4 text-center">Le posizioni aperte pubblicate da Base Digital </h1>
       <div class="row">
    <div class="col-md-3 card h-100 shadow-sm p-3 mb-4 mt-4">
  <div id="searchPositionQuery" class="mb-4 align-items-center position-relative">
      <label for="position-input" class="form-label"> Ricerca la tua posizione: </label>
    <div class="position-relative">
    <input
      id="position-input"
      name="query"
      v-model="searchPositionQuery"
      type="search"
      class="form-control pe-5"
      placeholder="Posizione"
      aria-label="Posizione"
      autocomplete="on"
    />
    <button
      @click="clearSearch"
      type="button"
      class="btn btn-link text-decoration-none position-absolute top-50 end-0 translate-middle-y me-2 p-0"
      aria-label="Clear input"
      
    >
      <i class="bi bi-x-circle-fill fs-5"></i>
    </button>
  </div>
     
  </div>
  <div id="searchCityQuery" class="mb-4 align-items-center">
    <label for="city-select" class="form-label">
    Località: </label>
    <select id="city-select" v-model="searchCityQuery" class="form-select">
      <option v-for="city in cityOptions" :key="city" :value="city">
        {{ city }}
      </option>
    </select>
  </div>
  <div id="searchAreaQuery" class="mb-4 align-items-center">
    <label for="area-select" class="form-label">Aree:</label>
    <select id="area-select" v-model="searchAreaQuery" class="form-select">
      <option v-for="area in areaOptions" :key="area" :value="area">
        {{ area }}
      </option>
    </select>
  </div>
   <div id="searchSeniorityQuery" class="mb-4 align-items-center">
    <label for="seniority-select" class="form-label">Livelli di esperienza:</label>
    <select id="seniority-select" v-model="searchSeniorityQuery" class="form-select">
    <option v-for="level in seniorityOptions" :key="level" :value="level">
      {{ level }}
    </option>
  </select>
</div>
  </div>
  <div class="col-md-9 mb-4 mt-4 ">
  <PositionsAccordion
    :data="gridData"
    :columns="gridColumns"
    :columns-labels="gridColumnsLabels"
    :filter-position="searchPositionQuery"
    :filter-city="searchCityQuery"
    :filter-area="searchAreaQuery"
    :filter-seniority="searchSeniorityQuery">
  </PositionsAccordion>
  </div>
</div>
  </main>
  
</template>
<script setup>

import { ref,computed } from 'vue';   // per creare proprietà reattive calcolate
import { useStore } from 'vuex';   // per accedere allo store globale
import PositionsAccordion from '@/components/PositionsAccordion.vue';


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
const gridColumnsLabels = {
  title: 'Titolo',
  area: 'Area',
  seniority: 'Seniority',
  country: 'Nazione',
  city: 'Città'
};

const gridData = positions;

function clearSearch() {
  searchPositionQuery.value = ''
}

</script>
