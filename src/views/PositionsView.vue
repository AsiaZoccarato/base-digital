<template>
  <main class="container py-4">
    <h1 class="h3 mb-4 text-center">
      Le posizioni aperte pubblicate da Base Digital
    </h1>
    <div class="row">
      <div class="col-md-3 card h-100 shadow-sm p-3 mb-4 mt-4">
        <div
          id="searchPositionQuery"
          class="mb-4 align-items-center position-relative"
        >
          <label for="position-input" class="form-label">
            Ricerca la tua posizione:
          </label>
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
              class="btn btn-link grey-bg text-decoration-none position-absolute top-50 end-0 translate-middle-y me-2 p-0"
              aria-label="Clear input"
            >
              <i class="bi bi-x-circle-fill fs-5 text-primary"></i>
            </button>
          </div>
        </div>
        <div id="searchCityQuery" class="mb-4 align-items-center">
          <v-select
            label="Località"
            :items="cityOptions"
            v-model="searchCityQuery"
          ></v-select>
        </div>
        <div id="searchAreaQuery" class="mb-4 align-items-center">
          <v-select
            label="Aree"
            :items="areaOptions"
            v-model="searchAreaQuery"
          ></v-select>
        </div>
        <div id="searchSeniorityQuery" class="mb-4 align-items-center">
          <v-select
            label="Livello"
            :items="seniorityOptions"
            v-model="searchSeniorityQuery"
          ></v-select>
        </div>
      </div>
      <div class="col-md-9 mb-4 mt-4">
        <NewPositionModal v-model:show="showNewPositionDialog" />

        <PositionsAccordion
          :data="gridData"
          :columns="gridColumns"
          :columns-labels="gridColumnsLabels"
          :filter-position="searchPositionQuery"
          :filter-city="searchCityQuery"
          :filter-area="searchAreaQuery"
          :filter-seniority="searchSeniorityQuery"
          :is-logged-in="isLoggedIn"
        >
        </PositionsAccordion>
        <div v-if="isLoggedIn" class="mb-4 mt-4 d-flex justify-content-end">
          <button class="btn btn-primary" @click="showNewPosition">
            Aggiungi Posizione
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, computed, onMounted } from "vue"; // per creare proprietà reattive calcolate
import { useStore } from "vuex"; // per accedere allo store globale
import PositionsAccordion from "@/components/PositionsAccordion.vue";
import NewPositionModal from "@/components/NewPositionModal.vue";

const store = useStore();
const positions = computed(() => {
  // Carica i dati da localStorage nello store Vuex all'avvio
  store.dispatch("position/loadPositionsFromStorage", null, { root: true });
  return store.getters["position/getAllPositions"];
});

const isLoggedIn = ref(false);
const showNewPositionDialog = ref(false);

const searchPositionQuery = ref("");
const seniorityOptions = computed(() => {
  const allLevels = positions.value.map((p) => p.seniority).filter(Boolean);
  const uniqueLevels = [...new Set(allLevels)];
  return ["Tutti i livelli", ...uniqueLevels];
});

const areaOptions = computed(() => {
  const allAreas = positions.value.map((p) => p.area);
  const uniqueAreas = [...new Set(allAreas)];
  return ["Tutte le aree", ...uniqueAreas];
});

const cityOptions = computed(() => {
  const allCities = positions.value.map((p) => p.city);
  const uniqueCities = [...new Set(allCities)].filter(Boolean);
  return ["Tutte le località", ...uniqueCities];
});

const searchCityQuery = ref(cityOptions.value[0] || "");
const searchAreaQuery = ref(areaOptions.value[0] || "");
const searchSeniorityQuery = ref(seniorityOptions.value[0] || "");

const gridColumns = ["title", "area", "seniority", "country", "city"];
const gridColumnsLabels = {
  title: "Titolo",
  area: "Area",
  seniority: "Seniority",
  country: "Nazione",
  city: "Città",
};

const gridData = positions;

function clearSearch() {
  searchPositionQuery.value = "";
}

if (localStorage.getItem("currentUser")) {
  isLoggedIn.value = true;
}
function showNewPosition() {
  showNewPositionDialog.value = !showNewPositionDialog.value;
}
</script>
