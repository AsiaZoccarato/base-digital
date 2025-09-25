<!-- Dashboard interna all'area riservata in cui l'utente può prenotare un appuntamento e vedere quelli già prenotati (creata con libreria esterna Vuetify)-->
<template>
  <div class="dashboard-page">
    <!-- Header Dashboard: v-app-bar è un componente Vuetify-->
    <v-app-bar color="primary" dark>
      <v-app-bar-title>
        <v-icon class="me-2">mdi-view-dashboard</v-icon>
        Dashboard - {{ user.nome }}
      </v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <div class="container py-5">
      <div class="row">
        <!-- Colonna sinistra: Info utente -->
        <div class="col-md-4">
          <v-card class="mb-4" elevation="4">
            <v-card-text class="text-center">
              <v-avatar size="80" color="primary" class="mb-3">
                <v-icon size="40">mdi-account</v-icon>
              </v-avatar>
              <h4>{{ user.nome }}</h4>
              <p class="text-muted">{{ user.email }}</p>
              <!--Bootstrap per il badge-->
              <span class="badge bg-success-subtle text-success">
                <i class="bi bi-check-circle me-1"></i>
                Account Attivo
              </span>

               <!-- Bottone Logout (Bootstrap)-->
              <button class="btn btn-outline-danger w-100 mt-2" @click="logout">
                <i class="bi bi-box-arrow-right me-1"></i>
                Esci
              </button>
            </v-card-text>
          </v-card>


          <!-- Statistiche -->
          <v-card elevation="4">
            <v-card-title>
              <v-icon class="me-2">mdi-chart-line</v-icon>
              Le tue statistiche
            </v-card-title>
            <v-card-text>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span>Appuntamenti totali:</span>
                <span class="badge bg-primary">{{ user.appuntamenti?.length || 0 }}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span>Prossimo appuntamento:</span>
                <span class="badge bg-success" v-if="prossimoAppuntamento">
                  {{ prossimoAppuntamento }}
                </span>
                <span class="badge bg-secondary" v-else>Nessuno</span>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <!-- Colonna destra: Booking e appuntamenti -->
        <div class="col-md-8">
          <!-- Sezione Prenota Appuntamento -->
          <v-card class="mb-4" elevation="4">
            <v-card-title class="bg-primary text-white">
              <v-icon class="me-2">mdi-calendar-plus</v-icon>
              Prenota un Appuntamento
            </v-card-title>
            <v-card-text class="pa-4">
              <v-form ref="bookingForm" v-model="validBooking" @submit.prevent="prenotaAppuntamento">
                <div class="row">
                  <!-- Selezione Data -->
                  <div class="col-md-6">
                    <label class="text-subtitle-1 font-weight-medium mb-2 d-block">
                      <v-icon class="me-1">mdi-calendar</v-icon>
                      Seleziona Data
                    </label>
                    <!-- v-date-picker è il componente Vuetify per scegliere la data -->
                    <v-date-picker
                      v-model="booking.data"
                      :min="today"
                      color="primary"
                      show-adjacent-months
                      width="100%"
                      class="mb-3"
                    ></v-date-picker>
                  </div>

                  <!-- Selezione Ora -->
                  <div class="col-md-6">
                    <label class="text-subtitle-1 font-weight-medium mb-2 d-block">
                      <v-icon class="me-1">mdi-clock</v-icon>
                      Seleziona Orario
                    </label>
                    <!-- v-time-picker è il componente Vuetify per scegliere l'ora (mezz'ore)-->
                    <v-time-picker
                      v-model="booking.ora"
                      :allowed-hours="allowedHours"
                      :allowed-minutes="allowedMinutes"
                      format="24hr"
                      color="primary"
                      width="100%"
                      class="mb-3"
                    ></v-time-picker>
                  </div>
                </div>

                <!-- Tipo di servizio. v-select = dropdown dei servizi (Vuetufy) -->
                <v-select
                  v-model="booking.servizio"
                  :items="servizi"
                  label="Tipo di Servizio"
                  :rules="[v => !!v || 'Seleziona un servizio']"
                  prepend-inner-icon="mdi-briefcase"
                  variant="outlined"
                  class="mb-3"
                ></v-select>

                <!-- Note aggiuntive -->
                <v-textarea
                  v-model="booking.note"
                  label="Note aggiuntive (opzionale)"
                  prepend-inner-icon="mdi-note-text"
                  variant="outlined"
                  rows="3"
                  class="mb-3"
                ></v-textarea>

                <!-- Pulsante prenota -->
                <v-btn
                  type="submit"
                  :disabled="!validBooking || !booking.data || !booking.ora"
                  :loading="loadingBooking"
                  color="success"
                  size="large"
                  block
                >
                  <v-icon start>mdi-calendar-check</v-icon>
                  Conferma Prenotazione
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>

          <!-- Lista Appuntamenti -->
          <v-card elevation="4">
            <v-card-title>
              <v-icon class="me-2">mdi-calendar-multiple</v-icon>
              I tuoi Appuntamenti
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="user.appuntamenti || []"
                :items-per-page="5"
                class="elevation-1"
              >
                <!-- v-chip è il componente Vuetify per le etichette colore (errore/confermato) -->
                <template #item.data="{ item }">
                  <v-chip color="primary" variant="tonal">
                    {{ formatData(item.data) }}
                  </v-chip>
                </template>
                <template #item.stato="{ item }">
                  <v-chip 
                    :color="item.stato === 'confermato' ? 'success' : 'warning'"
                    variant="tonal"
                  >
                    {{ item.stato }}
                  </v-chip>
                </template>
                <template #item.actions="{ item }">
                  <v-btn
                    icon="mdi-delete"
                    size="small"
                    color="error"
                    variant="text"
                    @click="cancellaAppuntamento(item.id)"
                  ></v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>

    <!-- Alert successo -->
    <v-snackbar
      v-model="showSuccess"
      color="success"
      timeout="3000"
    >
      {{ successMessage }}
      <template #actions>
        <v-btn variant="text" @click="showSuccess = false">Chiudi</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      user: {},
      validBooking: false,
      loadingBooking: false,
      showSuccess: false,
      successMessage: '',
      today: new Date().toISOString().split('T')[0],
      booking: {
        data: null,
        ora: null,
        servizio: '',
        note: ''
      },
      servizi: [
        'Social Media Marketing',
        'Web Marketing',
        'E-commerce',
        'Branding & Identità',
        'Content Creation',
        'Data & Analytics'
      ],
      headers: [
        { title: 'Data', key: 'data', sortable: true },
        { title: 'Ora', key: 'ora' },
        { title: 'Servizio', key: 'servizio' },
        { title: 'Stato', key: 'stato' },
        { title: 'Azioni', key: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    prossimoAppuntamento() {
      if (!this.user.appuntamenti?.length) return null
      
      // Trova il prossimo appuntamento
      const prossimi = this.user.appuntamenti
        .filter(app => new Date(app.data) >= new Date())
        .sort((a, b) => new Date(a.data) - new Date(b.data))
      
      return prossimi[0] ? this.formatData(prossimi[0].data) : null
    }
  },
   mounted() {
    this.loadUser()
  },
  // loadUser legge chi è loggato dal localStorage
  methods: {
    loadUser() {
      const currentUser = localStorage.getItem('currentUser')
      if (!currentUser) {
        this.$router.push('/login') // se non c'è nel localStorage, torna al login
        return
      }
      this.user = JSON.parse(currentUser) //altrimenti carica i suoi dati
    },

    allowedHours(hour) {
      return hour >= 9 && hour <= 18 // Orari di lavoro 9-18
    },

    allowedMinutes(minute) {
      return minute % 30 === 0 // Solo mezze ore
    },

    async prenotaAppuntamento() {
      if (!this.validBooking || !this.booking.data || !this.booking.ora) return

      this.loadingBooking = true

      try {
        // Simula chiamata API
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Crea nuovo appuntamento
        const nuovoAppuntamento = {
          id: Date.now(),
          data: this.booking.data,
          ora: this.booking.ora,
          servizio: this.booking.servizio,
          note: this.booking.note,
          stato: 'confermato'
        }

        // Aggiungi all'utente
        if (!this.user.appuntamenti) this.user.appuntamenti = []
        this.user.appuntamenti.push(nuovoAppuntamento)

        // Aggiorna localStorage
        this.updateUserInStorage()

        // Reset form
        this.booking = {
          data: null,
          ora: null,
          servizio: '',
          note: ''
        }

        // Mostra successo
        this.successMessage = 'Appuntamento prenotato con successo!'
        this.showSuccess = true

      } finally {
        this.loadingBooking = false
      }
    },

    cancellaAppuntamento(id) {
      this.user.appuntamenti = this.user.appuntamenti.filter(app => app.id !== id)
      this.updateUserInStorage()
      this.successMessage = 'Appuntamento cancellato'
      this.showSuccess = true
    },

    updateUserInStorage() {
      // Aggiorna l'appuntamento del currentUser
      localStorage.setItem('currentUser', JSON.stringify(this.user))
      
      // Aggiorna l'appuntamento anche nella lista users
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const index = users.findIndex(u => u.id === this.user.id)
      if (index !== -1) {
        users[index] = this.user
        localStorage.setItem('users', JSON.stringify(users))
      }
    },

    formatData(dataString) {
      return new Date(dataString).toLocaleDateString('it-IT')
    },

    logout() {
      localStorage.removeItem('currentUser')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.dashboard-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>