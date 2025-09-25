<template>
  <!--form -->
  <form @submit.prevent="submit" novalidate>
    <div class="mb-3">
      <!--campo nome e cognome-->
      <label class="form-label">Nome e cognome</label>
      <!--vmode trim: bind bidirezionale con trim
      :class applica valid o invalid calcolata -->
      <input v-model.trim="form.name" type="text" class="form-control" :class="v('name')" required>
      <!--messaggio di errore boostrap mostrato quando la classe è "is invalid"-->
      <div class="invalid-feedback">Inserisci almeno 3 caratteri.</div>
    </div>

    <!--campo email-->
    <div class="mb-3">
      <label class="form-label">Email</label>
          <input v-model.trim="form.email" type="email" class="form-control" :class="v('email')" required>
      <div class="invalid-feedback">Inserisci un’email valida.</div>
    </div>

    <!--campo: messaggio con contatore di caratteri-->
    <div class="mb-3">
      <!--intestazione + contatore live-->
      <label class="form-label d-flex justify-content-between">
        <span>Messaggio</span>
        <small class="text-muted">{{ form.message.length }}/500</small> 
      </label>
      <!--textarea vincolata a 500 char; classi dinamiche; rows= 4-->
      <textarea v-model="form.message" class="form-control" :class="v('message')" rows="4" maxlength="500" required />
      <div class="invalid-feedback">Scrivi almeno 10 caratteri.</div>
    </div>

    <!--scelta canale di ricontatto-->
    <div class="mb-3">
      <label class="form-label">Come preferisci essere ricontattatə?</label>

      <!--toggle radio stile btngorup di bootstrap-->
      <div class="btn-group w-100">

        <!--radio nascota che setta channel='email'-->
        <input class="btn-check" type="radio" id="c1" value="email" v-model="form.channel">
        <label class="btn btn-outline-primary" for="c1">Email</label>
       <!--radio per channel phone-->
        <input class="btn-check" type="radio" id="c2" value="phone" v-model="form.channel">
        <label class="btn btn-outline-primary" for="c2">Telefono</label>
      </div>
    </div>

    <!--campo telefono visibile solo se l'utente ha scelto phone-->
    <div class="mb-3" v-if="form.channel==='phone'">
      <label class="form-label">Telefono</label>
     <!--validazione: minimo 7 cifre (implementata nella computed isvalid)-->
      <input v-model.trim="form.phone" type="tel" class="form-control" :class="v('phone')">
      <div class="invalid-feedback">Inserisci un numero valido (min 7 cifre).</div>
    </div>

    <!--upload allegati (solo preview, è demo)-->
    <div class="mb-3">
      <label class="form-label">Allegati (opzionale)</label>
      <input type="file" class="form-control" @change="onFile">
      <!--preview del nome del file caricato-->
      <div v-if="previewName" class="form-text">Selezionato: {{ previewName }}</div>
    </div>

    <!--checkbox privacy obbligatoria-->
    <div class="form-check mb-3">
      <input class="form-check-input" type="checkbox" id="privacy" v-model="form.privacy" :class="v('privacy')">
      <label class="form-check-label" for="privacy">Acconsento al trattamento dei dati.</label>
      <div class="invalid-feedback">Devi accettare la privacy.</div>
    </div>

    <!--pulsante di invio: disabilitato durante l'invio -->
    <button class="btn btn-primary" :disabled="sending">
      <span v-if="sending" class="spinner-border spinner-border-sm me-2"></span>
      Invia
    </button>
  </form>
</template>

<script setup>
//import basici vue + vuex 
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'


//accesso allo store vuex 
const store = useStore()

//sending è letta dallo stato del modulo contact 
const sending = computed(() => store.state.contact.sending)

//stato locale del form (reactive per avere reattività su tutte le chiavi)
//form è un oggetto reattivo grazie a reactive di vue; 
//ogni campo del form è legato a una proprietà di form tramite v-model
const form = reactive({
  name: '', email: '', message: '', channel: 'email',
  phone: '', privacy: false, attachment: null
})

//stato locale per mostrare il nome del file 
const previewName = ref('')
//handel input file: salva il file nello state e mostra il nome
function onFile(e){
  const f = e.target.files?.[0]
  form.attachment = f || null
  previewName.value = f ? f.name : ''
}

// validazioni di base centralizzate (computed cosi si aggiorna in tempo reale )
const isValid = computed(() => {
  const nameOk = form.name.length >= 3 //nome minimo 3 caratteri
  const emailOk = /\S+@\S+\.\S+/.test(form.email) //regex semplice per email
  const msgOk = form.message.length >= 10 //messaggio minimo 10 cratteri 
  const phoneOk = form.channel === 'email' || (form.phone.replace(/\D/g,'').length >= 7) //se email, telefono non richiesto
  const privacyOk = form.privacy === true //privacy deve essere spuntata 
  return nameOk && emailOk && msgOk && phoneOk && privacyOk
})

//funzione helper per restituire classi boostrap di validazione campo per campo 
function v(field){
  // mappa del boolean (true è valido, false è non valido e null è non valutare )
  const map = {
    name: form.name ? (form.name.length>=3) : null,
    email: form.email ? /\S+@\S+\.\S+/.test(form.email) : null,
    message: form.message ? (form.message.length>=10) : null,
    //se canale email: consideriamo il telefono valido, non richiesto; se phone allora controlliamo le cifre
    phone: form.channel==='email' ? true : (form.phone.replace(/\D/g,'').length>=7 ? true : (form.phone ? false : null)),
   //checkbox: true valido, false non valido; null se non selezionato (gestito come false true diretto)
    privacy: form.privacy ? true : (form.privacy===false ? false : null),
  }
  //ritorna stringa vuota se null; altrimenti is valid o is invaid
  return map[field] === null ? '' : (map[field] ? 'is-valid' : 'is-invalid')
}

//submit del form
async function submit(){
  //se le valifazioni falliscono, non fare nulla
  if (!isValid.value) return
 //dispatch all'azione vuex del modulo contact: invia i dati 
  await store.dispatch('contact/send', { ...form, attachmentName: previewName.value })
  //reset soft di alcuni campi dopo invio 
  form.message = ''
  form.attachment = null
  previewName.value = ''
  // notifica al genitore contactview per mostrare il messaggio di successo
  emit('sent')
}

//dichiarazione dell'evento emesso verso il parent
const emit = defineEmits(['sent'])
</script>
