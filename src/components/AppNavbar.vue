<template>
    <!--barra di navigazione boostrap
    expang lg è il menù espanso da dekstop, che poi diventa burger suu mobile
    bg white è lo sfondo bianco
    border bottom è la riga sottile di separazione
    sticky top cioè la navbar rimane fissa durante lo scroll-->
  <nav class="navbar navbar-expand-lg bg-white border-bottom sticky-top">
    <div class="container">
        <!--logo con nome azienda 
        routerlink sono i link gestiti da router (non ricarica la pagina)
        d flex align items center gap 2 sono il logo e il testo affiancati con spazio-->
      <RouterLink class="navbar-brand d-flex align-items-center gap-2" to="/"> <!--"/" è la rotta principale, cioè la home definita in router-->
        <img src="/immagini/logo.png" alt="Logo" height="28" />
        <span class="fw-semibold">Base Digital</span>
      </RouterLink>

      <!--pulsante hamburger visibile solo su mobile
      data bs toggle collapse ecc. serve per aprire e chiudere il menu -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!--contenitore del menu, collassabile su mobile-->
      <div id="mainNav" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto align-items-lg-center"> <!--ul lista di voci di navigazione con ms auto che spinge le voci di menu verso dx e align items le allinea su dekstop-->
          <!--singole voci del menu-->
            <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">Chi siamo</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/servizi">Servizi</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/clienti">Clienti</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/positions">Lavora con noi</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/news">News</RouterLink>
          </li>
          <!--bottone evidenziato a dx (CTA)
          msg lg3 è il margine sx extra da dekstop in su
          btn btn è il bottone blu piccolo con bordi tondi e padding-->
          <li class="nav-item ms-lg-3">
            <RouterLink class="btn btn-sm btn-primary rounded-pill px-3" to="/contatti">
              Contattaci
            </RouterLink>
          <li class="nav-item ms-lg-3">
            <RouterLink class="btn btn-sm btn-outline-primary rounded-pill px-3 me-2" to="/login">
              <i class="bi bi-person-circle me-1"></i>
              Area riservata
            </RouterLink>
          </li>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue' //onmounted e onbeforeunmount sono hook del ciclo di vita per inizializzare e pulire
//quando il componente navbar si monta e smonta 
import { useRouter } from 'vue-router' //userouter da l'istanza del router per ascoltare i cambi pagina
import Collapse from 'bootstrap/js/dist/collapse' // collapse è il plugin js di boostrap
//serve per aprire/chiudere le aree collassabili (come il menu mobile)

const router = useRouter()
let collapse // istanza che serve per memorizzare il boostrap collapse 
let unreg // qui eventualmente salveremo la funzione di cleanup del router look  

onMounted(() => {
  const el = document.getElementById('mainNav') // prende il contenitore del menu collassabile 
  if (el) {
    // crea l'istanza del collapse senza triggerarlo subito (con toggle false)
    collapse = new Collapse(el, { toggle: false }) //crea il controller js per quel pannello
    //toggle:false non aprire/chiudere automaticamente all'init
  }

  // ad ogni cambio di rotta (quando l'utente fa click su una voce di menu)
  //chiude il pannello del burger menu se è aperto
  const off = router.afterEach(() => { //si attiva dopo ogni navigazione. qui richiamo hide
    //per chiudere il burger menu quando l'utente sceglie una voce 
    //try e catch evita errori se l'istanza non esiste piu per qualche motivo 
    try { collapse?.hide() } catch (_) {}
  })
  // salva la funzione di cleanup
  unreg = () => off()
})

onBeforeUnmount(() => { 
  //se avevamo una funzione di cleanup del router hook la richiamiamo 
  unreg?.()
  //rimuoviamo il riferimento all'istanza 
  collapse = null
})
</script>


<style scoped>
/* evidenzia la voce attiva 
scoped vuol dire che questo stile è applicato solo a questa pagina*/
.nav-link.router-link-active {
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>

