<template>
  <!--contenitore + griglia 
  container py4 è il container boostrap con padding verticale
  row g4 è la spaziatura tra le colonne-->
  <div class="container py-4">
    <div class="row g-4">
      <!--due colonne-->
      <div class="col-12 col-lg-6"> <!--colonna sx a tutta larghezza su mobile, metà su >-992px-->
        <h1 class="h4 mb-3">Contattaci</h1> <!--titolo del form-->
        <ContactForm @sent="onSent" /> <!--monti il componente del form e ascolti l'evento personalizzato sent
        che il form emette quando l'invio va a buon fine. quando arriva l'evento il parent chiama onSet-->
      </div>

<!--colonna destra con i recapiti-->
      <div class="col-12 col-lg-6">
        <div class="card shadow-sm"> <!--card di boostrap con shaodwo-->
          <div class="card-body">
            <h2 class="h6">I nostri recapiti</h2>
            <p class="mb-1"><strong>Email:</strong> info@basedigital.test</p>
            <p class="mb-3"><strong>Tel:</strong> +39 011 123456</p>
               <p class="mb-3">Vienici a trovare in <strong >Via Sant'Ottavio 23 - Torino </strong></p>
            <!--mappa: wrapper mantiene il rapporto 16:9 (utility boostrap)
            dentro c'è iframe openstreetmap con style per togliere il bordo
            effetto: la mappa resta sempre responsiva con angoli arrotondati e senza overflow-->
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

       
      </div>
    </div>

    <!-- toast di successo 
     il messaggio appare quando è stato inviato correttamente
     if showtoast appare solo quando showtoast === true
     position fixed lo posiziona in basso a destra con padding
     toast show è lo stile boostrap "toast" già forzato in sgìhow-->
    <div v-if="showToast" class="toast-container position-fixed bottom-0 end-0 p-3">
      <div class="toast show text-bg-success">
        <div class="toast-body">Messaggio inviato correttamente 🎉</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue' //reattività di base
import ContactForm from '@/components/ContactForm.vue' //monta il form


const showToast = ref(false) //stato reattivo locale: controlla la notifica 
function onSent(){ // callback chiamata quando il form emette sent
  showToast.value = true //mostra toast
  setTimeout(() => showToast.value = false, 2000) //nasconde il messaggio dopo due secondi
}
</script>

<!--come parlano tra di loro
il figlio contactform fa emit (sent) dopo aver inviato con successo i dati (via vuex)
il padre contactview ascolta con @sent on sent e accende il toast -->
