<template>
  <!--contenitore + griglia 
  container py4 è il container bootstrap con padding verticale
  row g4 è la spaziatura tra le colonne-->
  <div class="container py-4">
    <div class="row g-4">
      <!--colonna sx: form contattisu mobile prende tutta la larghezza; da lg in su metà pagina-->
      <div class="col-12 col-lg-6">
        <h1 class="h4 mb-3">Contattaci</h1> <!--titolo del form-->
        <!--form: monta il componente e ascolta l'evento "sent" che emette il figlio-->
        <ContactForm @sent="onSent" /> 
        <!--qui il fiflio contactfrom emette l'evento personalizzato sent quando l'invio
        è andato a buon fine; il padre lo intercetta e chiama onset()-->
      </div>

      <!--colonna dx: recapiti + mappa sopra, inbox sotto-->
      <div class="col-12 col-lg-6">
        <div class="card shadow-sm mb-4"> <!--card con recapiti e mappa-->
          <div class="card-body">
            <h2 class="h6">I nostri recapiti</h2>
            <p class="mb-1"><strong>Email:</strong> info@basedigital.test</p>
            <p class="mb-3"><strong>Tel:</strong> +39 011 123456</p>
            <p class="mb-3">Vienici a trovare in <strong>Via Sant'Ottavio 23 - Torino</strong></p>
            <!--mappa responsive con openstreetmap-->
            <div class="ratio ratio-16x9 rounded overflow-hidden">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=7.694799%2C45.069566%2C7.696799%2C45.070566&layer=mapnik&marker=45.070066%2C7.695799"
                style="border:0"
                allowfullscreen
                loading="lazy">
              </iframe>
            </div>
          </div>
        </div>

        <!--inbox demo dei messaggi (sotto alla mappa)
        mostra i messaggi "salvati nello store; è la simulazione del db"-->
        <ContactInbox />
      </div>
    </div>

    <!-- toast di successo 
     il toast è condizionale; appare solo quando showtoast ===true
     è posizionato in basso a destra con position-fixed-->
    <div v-if="showToast" class="toast-container position-fixed bottom-0 end-0 p-3">
      <div class="toast show text-bg-success">
        <div class="toast-body">Messaggio inviato correttamente 🎉</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue' //reattività di base: ref crea variabili osservabili 
import ContactForm from '@/components/ContactForm.vue' //componente figlio con il form 
import ContactInbox from '@/components/ContactInbox.vue' //componente figlio con la lista messaggi

// stato reattivo locale per mostrare/nascondere il toast 
//showtoast è un booleano reattivo; false non è visibile; true è visibile 
const showToast = ref(false)

// callback quando ContactForm emette "sent"
//appena arriva l'evento il toast diventa true, quindi visibile
//il toast è visibile per due secondi, poi torna a false e scompare 
function onSent(){
  showToast.value = true
  setTimeout(() => showToast.value = false, 2000)
}
</script>

<style scoped>
/* Stile base per la inbox */
.contact-inbox {
  max-height: 300px;   /* evita che cresca troppo */
  overflow-y: auto;    /* scroll verticale se piena */
}

/* Media query: miglioramenti mobile */
@media (max-width: 767.98px) {
  h1.h4 {
    font-size: 1.2rem;   /* titolo più piccolo */
    text-align: center;  /* centrato su mobile */
  }

  .card {
    margin-bottom: 1rem; /* più spazio tra blocchi */
  }

  .contact-inbox {
    max-height: 200px;   /* inbox più compatta su mobile */
  }
}

/* Media query: tablet in giù */
@media (max-width: 991.98px) {
  .contact-inbox {
    margin-top: 1rem; /* inbox separata dalla mappa */
  }
}
</style>
