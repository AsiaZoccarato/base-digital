<template>
  <div class="accordion" id="positionsAccordion" v-if="filteredData.length">
    <div class="accordion-item" v-for="(entry, index) in filteredData" :key="entry.slug">
      <h2 class="accordion-header" :id="`heading-${index}`">
        <!--esempio di evento-->
        <button
          class="accordion-button"
          type="button"
          @click="toggleAccordion(index)"
          :class="{ collapsed: !isOpen[index] }"
          aria-expanded="isOpen[index]"
          :aria-controls="`collapse-${index}`"
        >
          {{ entry.seniority }} {{ entry.title }}
        </button>
      </h2>
       <div
        :id="`collapse-${index}`"
        class="accordion-collapse collapse"
        :class="{ show: isOpen[index] }"
        :aria-labelledby="`heading-${index}`"
        data-bs-parent="#positionsAccordion">
        <div class="accordion-body">
          <dl class="row mb-0">
            <template v-for="key in columns" :key="key">
              <dt class="col-sm-4 fw-semibold">{{ columnsLabels[key] }}</dt>
              <dd class="col-sm-8">{{ entry[key] }}</dd>
            </template>
          </dl>
          <button class="btn btn-primary mt-3 mr-5" @click="goToPosition(entry.slug)">
            Visualizza Dettagli
          </button>
           <button class="btn btn-primary mt-3" @click="deletePosition(entry.slug)">
            Cancella Posizione
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <div v-if="filteredData.length" class="card mt-3"> 
    <h4 class="card-text w-75 m-2 ">Posizioni trovate : {{ filteredData.length }}</h4>
</div>
  
  <div v-else="filteredData.length" class="card mt-3"> 
    <h4 class="card-text w-75 m-2 ">Posizioni trovate : 0</h4>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


const router = useRouter();
const store = useStore();

const props = defineProps({
  data: Array,
  columns: Array,
  columnsLabels: Object,
  filterPosition: String,
  filterCity: String,
  filterArea: String, 
  filterSeniority: String,
});

const filteredData = computed(() => {
  let { data, filterPosition, filterCity, filterArea, filterSeniority } = props
  if (filterPosition) {
    filterPosition = filterPosition.toLowerCase()
    data = data.filter((row) => {
    
        return String(row['title']).toLowerCase().indexOf(filterPosition) > -1
      
    })
  }
  if (filterCity && filterCity !== 'Tutte le località') {
    filterCity = filterCity.toLowerCase()
    data = data.filter((row) => {
        return String(row['city']).toLowerCase().indexOf(filterCity) > -1
    })
  }
  if (filterArea && filterArea !== 'Tutte le aree') {
    filterArea = filterArea.toLowerCase()
    data = data.filter((row) => {
        return String(row['area']).toLowerCase().indexOf(filterArea) > -1
    })
  }

  if (filterSeniority && filterSeniority !== 'Tutti i livelli') {
    filterSeniority = filterSeniority.toLowerCase()
    data = data.filter((row) => {
        return String(row['seniority']).toLowerCase().indexOf(filterSeniority) > -1;
    })
  }
  return data
})

const isOpen = ref({});
function toggleAccordion(index) {
  isOpen.value[index] = !isOpen.value[index];
}

function goToPosition(slug) {
  router.push(`/positions/${slug}`)
}

function deletePosition(slug) {
    store.dispatch('position/deletePositionAndPersist', slug, { root: true });
}
</script>