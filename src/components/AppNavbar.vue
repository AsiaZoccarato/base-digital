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
      <RouterLink class="navbar-brand d-flex align-items-center gap-2" to="/">
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
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Collapse from 'bootstrap/js/dist/collapse' // <-- import ESM, NO globale

const router = useRouter()
let collapse // istanza di Bootstrap Collapse
let unreg // per deregistrare l'hook del router quando il componente si smonta

onMounted(() => {
  const el = document.getElementById('mainNav') // deve combaciare con l'id nel template
  if (el) {
    // crea l'istanza SENZA aprire/chiudere automaticamente
    collapse = new Collapse(el, { toggle: false })
  }

  // chiudi il menu ad ogni cambio rotta (solo se è aperto)
  const off = router.afterEach(() => {
    try { collapse?.hide() } catch (_) {}
  })
  // salva la funzione di cleanup
  unreg = () => off()
})

onBeforeUnmount(() => {
  unreg?.()
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

<!--IN SINTESI
è una navbar responsive
il logo e il nome di base digital sono a sinistra, le voci di menu a dx
l'ultima voce contattaci è un bottone con call to action 
ogni voce attiva ha uno stile personalizzato-->
