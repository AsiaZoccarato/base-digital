<template>
  <table v-if="filteredData.length" class="table table-striped">
    <thead>
      <tr>
        <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
          {{ getLabel(key) }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData" :key="entry.slug" @click="goToPosition(entry.slug)" style="cursor: pointer;">
        <td v-for="key in columns" class="align-middle m-2 p-2">
          {{ entry[key] }}
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="filteredData.length" class="card "> 
    <h4 class="card-text w-75 m-2 ">Posizioni trovate : {{ filteredData.length }}</h4>
</div>
  
  <p v-else>No matches found.</p>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter();

const props = defineProps({
  data: Array,
  columns: Array,
  columnsLabels: Array,
  filterPosition: String,
  filterCity: String,
  filterArea: String, 
  filterSeniority: String,
});

const sortKey = ref('');
const sortOrders = ref(
  props.columns.reduce((o, key) => ((o[key] = 1), o), {})
);

const filteredData = computed(() => {
  let { data, filterPosition, filterCity, filterArea, filterSeniority } = props
  if (filterPosition) {
    filterPosition = filterPosition.toLowerCase()
    data = data.filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().indexOf(filterPosition) > -1
      })
    })
  }
  if (filterCity && filterCity !== 'Tutte le località') {
    filterCity = filterCity.toLowerCase()
    data = data.filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().indexOf(filterCity) > -1
      })
    })
  }
  if (filterArea && filterArea !== 'Tutte le aree') {
    filterArea = filterArea.toLowerCase()
    data = data.filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().indexOf(filterArea) > -1
      })
    })
  }

  if (filterSeniority && filterSeniority !== 'Tutti i livelli') {
    filterSeniority = filterSeniority.toLowerCase()
    data = data.filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().indexOf(filterSeniority) > -1
      })
    })
  }
  const key = sortKey.value
  if (key) {
    const order = sortOrders.value[key]
    data = data.slice().sort((a, b) => {
      a = a[key]
      b = b[key]
      return (a === b ? 0 : a > b ? 1 : -1) * order
    })
  }
  return data
})

function sortBy(key) {
  sortKey.value = key
  sortOrders.value[key] *= -1
}

function getLabel(str) {
  return props.columnsLabels[str];
}

function goToPosition(slug) {
  router.push(`/positions/${slug}`)
}
</script>