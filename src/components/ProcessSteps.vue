<template>
    <!--sezione dove spieghiamo il nostro approccio in 4 step-->
  <section class="container my-5"> 
    <!--intestazione centrata: titolo + sottotitolo-->
    <div class="text-center mb-4">
      <h2 class="h4 mb-2">Come lavoriamo (in breve)</h2>
      <!--testo secondario con colore attenuto rispetto al titolo-->
      <p class="text-muted mb-0">Quattro step chiari, dal brief al miglioramento continuo.</p>
    </div>

    <!--grigilia responsive con boostrap-->
    <div class="row g-4">
      
      <!--ogni setp è una colonna con classi responsive:-->

      <!--ogni setp è dentro una card h100 e border 0
      h100 fa -->

      <!--STEP 1-->
      <div class="col-12 col-md-6 col-lg-3">
        <!--card flat con border 0 e h-100 per avere tutte le card alla stessa altezza-->
        <div class="card h-100 border-0">
          <div class="card-body">
            <!--dentro card body abbiamo un numero grande + un titolo breve + descrizione concisa -->

            <!--numero grande come indicatore dello step-->
            <div class="display-6 mb-2">1</div>

            <!--titolo breve dello step-->
            <h3 class="h6">Brief & Obiettivi</h3>

            <!--descrizione concisa -->
            <p class="text-muted mb-0">Analisi iniziale, KPI condivisi, baseline e target.</p>
          </div>
        </div>
      </div>
     
      <!--STEP 2-->
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card h-100 border-0">
          <div class="card-body">
            <div class="display-6 mb-2">2</div>
            <h3 class="h6">Strategia & Piano</h3>
            <p class="text-muted mb-0">Roadmap canali, messaggi, budget e priorità.</p>
          </div>
        </div>
      </div>
     
      <!--STEP 3-->
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card h-100 border-0">
          <div class="card-body">
            <div class="display-6 mb-2">3</div>
            <h3 class="h6">Produzione & Go-live</h3>
            <p class="text-muted mb-0">Creatività, set-up tracking, lancio campagne.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="card h-100 border-0">
          <div class="card-body">
            <div class="display-6 mb-2">4</div>
            <h3 class="h6">Misura & Optimize</h3>
            <p class="text-muted mb-0">Report ciclici, A/B test, ottimizzazioni CRO.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


