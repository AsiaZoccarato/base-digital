<template>
     <!--introduzione breve per spiegare chi è base digital-->
  <section class="container my-5">
    <!--griglia boostrap-->
    <div class="row g-4 align-items-center">
        <!--colonne testo -->
      <div class="col-12 col-lg-6">
        <!--titolo con stile h3 di boostrap-->
        <h2 class="h3 mb-3">Chi è Base Digital (in breve)</h2>
        <!--paragrafo introduttivo con router link interno alla pagina "chi siamo"-->
        <p class="mb-3">
          Siamo un team multidisciplinare che unisce strategia, creatività e dati per far crescere brand e progetti digitali.
          In questa pagina trovi una sintesi del nostro approccio: per la storia completa vai su <RouterLink to="/about">Chi siamo</RouterLink>.
        </p>
        <!--punti chiave sintetici-->
        <ul class="mb-0">
          <li>Approccio <strong>data-driven</strong> con obiettivi chiari.</li>
          <li>Creatività orientata alla <strong>performance</strong>.</li>
          <li>Processi trasparenti e collaborazione continua.</li>
        </ul>
      </div>
      <!--colonna media con video responsive 16:9 con bordi arrotondati-->
      <div class="col-12 col-lg-6">
        <div class="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm">
          <!--ratio ratio 16x9 è un utility di boostrap e serve per mantenere i 16:9 del video anche se la finestra 
          cambia dimensione -->
            <!--iframe di youtube responsivo, title per accessibilità e allowfullscreen per schermo intero-->
          <iframe
            src="https://www.youtube.com/embed/-tVUXcICwlw"
            title="Base Digital - Introduzione"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
//import del componente routerlink per i link interni gestiti da vue router 
import { RouterLink } from "vue-router";
</script>
