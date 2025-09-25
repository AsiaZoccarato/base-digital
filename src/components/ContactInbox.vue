<template>
  <!--card contenitore con ombra leggera-->
  <div class="card shadow-sm">
    <div class="card-body">
      <!--titolo della sezione inbox-->
      <h2 class="h6 mb-3">Messaggi ricevuti (demo)</h2>

      <!-- se non ci sono messaggi mostro un placeholder-->
      <div v-if="list.length === 0" class="text-muted">Nessun messaggio.</div>

      <!--altrimenti mostro la lista dei messaggi-->
      <div v-else class="list-group">

        <!--v for un pulsante per ogni messaggio m
        key usa l'id univoco per aiutare vue a tracciare gli elementi
        click seleziona il messaggio e mostra il dettaglio sotto-->
        <button v-for="m in list" :key="m.id"
                class="list-group-item list-group-item-action"
                @click="select(m)">
          <div class="d-flex justify-content-between">

           <!--riga nome a sinistra e data a destra -->
            <strong>{{ m.name }}</strong>

           <!--newsate ecc formatta la data in modo leggibile -->

            <small class="text-muted">{{ new Date(m.createdAt).toLocaleString() }}</small>
          </div>

          <!--anteprima del messaggio-->
          <div class="small text-truncate">{{ m.message }}</div>
        </button>
      </div>

      <!--pannello dettaglio: compare solo se ho selezionato un messaggio -->
      <div v-if="selected" class="mt-3">
        <hr>
        <h3 class="h6 mb-2">Dettaglio</h3>

        <!--mittente nome + email -->
        <p class="mb-1"><strong>Da:</strong> {{ selected.name }} — {{ selected.email }}</p>

       <!--telefono mostrato solo se inserito -->
        <p class="mb-1" v-if="selected.channel==='phone'"><strong>Telefono:</strong> {{ selected.phone }}</p>

        <!--canale di ricnotatto scelto dall'utente -->
        <p class="mb-2"><strong>Canale:</strong> {{ selected.channel }}</p>

        <!--corpo del messaggio-->
        <p class="mb-2" style="white-space:pre-wrap">{{ selected.message }}</p>

        <!--eventuale nome dell'allegato-->
        <p v-if="selected.attachmentName" class="small text-muted">Allegato: {{ selected.attachmentName }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// API Vue
import { computed, ref } from 'vue'

import { useStore } from 'vuex'

//ottengo l'istanza dallo store 
const store = useStore()


// lista contatti dallo store
const list = computed(() => store.getters['contact/all'])

// messaggio selezionato
const selected = ref(null)

// aggiorna la selezione
function select(m){ selected.value = m }
</script>
