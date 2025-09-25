<template>
  <!--sezione con padding verticale. titolo centrato sopra-->
  <section class="py-4">
    <h2 class="h5 mb-3 text-center">Cosa dicono di noi</h2>

    <!-- wrapper centrato e più stretto -->
    <div class="container">
      <!--uso la griglia boostrap per centrare e restringere la larghezza da 12 a 8 a seconda del breakpoint-->
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <!--carosello nativo di boostrap
          cambia slide ogni 5 secondi
          consente swipe su mobile touch true -->
          <div
            id="testiCarousel"
            class="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="5000"
            data-bs-touch="true"
          >
            <div class="carousel-inner">
              <!--slide generate con v-for
              creo le slide leggendo i dati dall'array testi
              la prima i === 0 viene marcata come active, altrimenti il carousel non parte
              -->
              <div v-for="(t,i) in testi" :key="i" class="carousel-item" :class="{ active: i===0 }">
                <div class="card border-0 shadow-sm text-center">
                  <div class="card-body px-4 py-4">
                    <p class="mb-2 lead">“{{ t.quote }}”</p>
                    <small class="text-secondary">— {{ t.author }}, {{ t.role }}</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- frecce dx e sx  -->
            <button class="carousel-control-prev ctrl-dark" type="button" data-bs-target="#testiCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Precedente</span>
            </button>
            <button class="carousel-control-next ctrl-dark" type="button" data-bs-target="#testiCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Successiva</span>
            </button>
          </div>

          <!-- indicatori sotto, centrati 
           sono i pallini sotto il carousel, anche questi generati con v-for sull'array testo
           hanno la :data - bs-slide-to= 1 per dire a quale slide saltare-->
          <div class="carousel-indicators mt-3 position-static">
            <button v-for="(t,i) in testi" :key="'ind-'+i"
              type="button" data-bs-target="#testiCarousel" :data-bs-slide-to="i"
              :class="{ active: i===0 }" :aria-label="`Slide ${i+1}`">
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testi = [ //array statico con soli tre oggetti
//ogni oggetto ha tre proprietà: quote, author, role
  { quote:'Strategia chiara e risultati misurabili.', author:'Marco R.', role:'CMO, Retail' },
  { quote:'Team veloce e super disponibile.', author:'Sara P.', role:'Founder, Startup' },
  { quote:'Campagne social che finalmente convertono.', author:'Luca D.', role:'E-commerce Manager' },
]
</script>

<style scoped>
/* frecce nere: i default Bootstrap sono bianchi, li invertiamo */
.ctrl-dark .carousel-control-prev-icon,
.ctrl-dark .carousel-control-next-icon {
  filter: invert(1) grayscale(100%) brightness(0.2);
}

/* serve per rednere i pallini un po piu grandi e rotondi */
.carousel-indicators [data-bs-target]{
  width: 10px; height: 10px; border-radius: 50%;
}
</style>
