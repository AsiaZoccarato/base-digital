<!-- Sezione Area riservata, con login (email e passwors) e gestione errori di inserimento-->
<template>
  <div class="login-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <!-- Card di Login: componente v-card di Vuetify per il contenitore del form-->
          <v-card class="pa-6" elevation="8">
            <v-card-title class="text-center mb-4">
              <h2 class="text-primary">{{ isRegistering ? 'Registrati' : 'Accedi' }}</h2>
              <p class="text-muted">{{ isRegistering ? 'Crea il tuo account' : 'Benvenuto in Base Digital' }}</p>
            </v-card-title>

            <v-card-text>
              <!-- Form di Login/Registrazione. Componente v-form con validazione automatica (Vuetify) -->
              <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
                
                <!-- Nome (solo per registrazione). Componente v-text-field per campi con regole (Vuetify) -->
                <v-text-field
                  v-if="isRegistering"
                  v-model="form.nome"
                  label="Nome e Cognome"
                  :rules="nameRules"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  class="mb-3"
                ></v-text-field>

                <!-- Email -->
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  type="email"
                  :rules="emailRules"
                  prepend-inner-icon="mdi-email"
                  variant="outlined"
                  class="mb-3"
                ></v-text-field>

                <!-- Password -->
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="passwordRules"
                  prepend-inner-icon="mdi-lock"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
                  variant="outlined"
                  class="mb-4"
                ></v-text-field>

                <!-- Pulsante Submit -->
                <v-btn
                  type="submit"
                  :disabled="!valid || loading"
                  :loading="loading"
                  color="primary"
                  size="large"
                  block
                  class="mb-3"
                >
                  {{ isRegistering ? 'Registrati' : 'Accedi' }}
                </v-btn>

                <!-- Alert per errori -->
                <v-alert
                  v-if="error"
                  type="error"
                  variant="tonal"
                  class="mb-3"
                >
                  {{ error }}
                </v-alert>

                <!-- Switch tra Login e Registrazione -->
                <div class="text-center">
                  <p class="text-muted mb-2">
                    {{ isRegistering ? 'Hai già un account?' : 'Non hai un account?' }}
                  </p>
                  <v-btn
                    variant="text"
                    color="primary"
                    @click="toggleMode"
                  >
                    {{ isRegistering ? 'Accedi qui' : 'Registrati qui' }}
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      valid: false,
      loading: false,
      error: '',
      showPassword: false,
      isRegistering: false,
      form: {
        nome: '',
        email: '',
        password: ''
      },
      // Regole di validazione
      nameRules: [
        v => !!v || 'Il nome è obbligatorio',
        v => v.length >= 2 || 'Il nome deve avere almeno 2 caratteri'
      ],
      emailRules: [
        v => !!v || 'Email obbligatoria',
        v => /.+@.+\..+/.test(v) || 'Email non valida'
      ],
      passwordRules: [
        v => !!v || 'Password obbligatoria',
        v => v.length >= 6 || 'La password deve avere almeno 6 caratteri'
      ]
    }
  },
  methods: {
    toggleMode() {
      this.isRegistering = !this.isRegistering
      this.error = ''
      this.resetForm()
    },
    
    resetForm() {
      this.form = {
        nome: '',
        email: '',
        password: ''
      }
    },

    async handleSubmit() {
      if (!this.valid) return

      this.loading = true
      this.error = ''

      try {
        if (this.isRegistering) {
          await this.register()
        } else {
          await this.login()
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

      // Simulazione registrazione: in realtà salviamo tutto nel localStorage
    async register() {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // prendiamo la lista di utenti presente nel localStorage. getItem legge i dati. JSON.parse() converte il testo in oggetto JS
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Controlliamo se email già esistente
      if (users.find(u => u.email === this.form.email)) {
        throw new Error('Email già registrata')
      }
      
      // Aggiungiamo nuovo utente (nel localStorage)
      const newUser = {
        id: Date.now(),
        nome: this.form.nome,
        email: this.form.email,
        password: this.form.password,
        appuntamenti: []
      }
      // Salviamo nuovo utente (nel localStorage). SetItem salva i dati. JSON.stringify converte oggetto in testo
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      
      // Login automatico dopo registrazione
      this.loginUser(newUser)
    },

    async login() {
      // Simulazione login (cerca l'utente nel localStorage)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => 
        u.email === this.form.email && 
        u.password === this.form.password
      )
      
      if (!user) {
        throw new Error('Email o password non corretti')
      }
      
      this.loginUser(user)
    },

    loginUser(user) {
      // Se trova l'utente nel localStorage lo ricordiamo come utente corrente
      localStorage.setItem('currentUser', JSON.stringify(user))
      
      // Reindirizza alla dashboard
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.v-card {
  border-radius: 12px;
}
</style>