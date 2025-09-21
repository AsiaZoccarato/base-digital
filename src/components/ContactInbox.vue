<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h2 class="h6 mb-3">Messaggi ricevuti (demo)</h2>

      <div v-if="list.length === 0" class="text-muted">Nessun messaggio.</div>

      <div v-else class="list-group">
        <button v-for="m in list" :key="m.id"
                class="list-group-item list-group-item-action"
                @click="select(m)">
          <div class="d-flex justify-content-between">
            <strong>{{ m.name }}</strong>
            <small class="text-muted">{{ new Date(m.createdAt).toLocaleString() }}</small>
          </div>
          <div class="small text-truncate">{{ m.message }}</div>
        </button>
      </div>

      <div v-if="selected" class="mt-3">
        <hr>
        <h3 class="h6 mb-2">Dettaglio</h3>
        <p class="mb-1"><strong>Da:</strong> {{ selected.name }} — {{ selected.email }}</p>
        <p class="mb-1" v-if="selected.channel==='phone'"><strong>Telefono:</strong> {{ selected.phone }}</p>
        <p class="mb-2"><strong>Canale:</strong> {{ selected.channel }}</p>
        <p class="mb-2" style="white-space:pre-wrap">{{ selected.message }}</p>
        <p v-if="selected.attachmentName" class="small text-muted">Allegato: {{ selected.attachmentName }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
// prende i messaggi dal modulo contact (getter 'all')
const list = computed(() => store.getters['contact/all'])
const selected = ref(null)
function select(m){ selected.value = m }
</script>
