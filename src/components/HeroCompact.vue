<template>
  <!--sezione hero principale-->
  <section class="hero bg-light border rounded-4 p-4 p-lg-5 mb-4 position-relative overflow-hidden">
   <!--è la griglia boostrap-->
    <div class="row align-items-center g-4">
      <!--prima colonna (su mobile prende tutta la larghezza, su dekstop 7/12)-->
      <div class="col-12 col-lg-7">
        <!---->
        <h1 class="display-6 fw-semibold mb-2">Facciamo crescere il tuo brand nel digitale</h1>
        <!--paragrafo di supporto-->
        <p class="text-secondary mb-3">
          Strategia, creatività e dati: costruisci con noi una presenza online che converte.
        </p>
        <!--pulsanti call to action-->
        <div class="d-flex gap-2">
          <!--primo pulsante principale-->
          <RouterLink to="/contatti" class="btn btn-primary px-4">Parla con noi</RouterLink>
          <!--secondo pulsante, secondario e con bordi-->
          <RouterLink to="/servizi" class="btn btn-outline-primary">Scopri i servizi</RouterLink>
        </div>
      </div>
      <!--seconda colonna con l'immagine a destra e centrata
      img fluid è l'immagine responsive -->
      <div class="col-12 col-lg-5 text-center">
        <img src="/immagini/team.png" alt="Team Base Digital" class="img-fluid rounded-3 shadow-sm hero-illust">
      </div>
    </div>
  </section>
</template>

<style scoped>
/* effetto estetico leggero sulla sezione hero che aumenta la saturazione colori e applica un blur moltolieve
scoped perchè si applica solo a questa pagina*/
.hero { backdrop-filter: saturate(120%) blur(0px); }

/* regola l'immagine di destra con altezza max a 200px e object fit contain serve per ridimensionare mantendendo proprozioni*/
.hero-illust { max-height: 280px; object-fit: contain; }
</style>


