<template>
  <footer class="bg-dark text-white mt-5"> <!--footer sfondo scuro, testo bianco, margine sopra-->
    <div class="container py-4 text-center"> <!--contenitore boostrap: padding verticale e testo centrato-->
      <h3 class="h5 mb-2">BASE DIGITAL S.R.L. — CONTATTACI</h3> <!--titolo principale del footer-->
      <p class="mb-3">011 67543412 · infobasedigital@gmail.com</p> <!--recapiti aziendali-->

      <!--sezione con icone social
      d-flex è flexbox orizzontale con contenuto centrato
      gap è lo spazio tra gli elementi 
      mb3 è il margine inferiore-->
      <div class="d-flex justify-content-center gap-3 mb-3">
        <!--link a facebook; il link eredita il colore bianco del testo
        aria-label serve per gli screen reader, indica che è un link a facebook-->
        <a class="text-white" href="https://www.facebook.com/" aria-label="Facebook">
          <img src="/immagini/facebook.png" alt="Facebook" height="24" />
        </a>
            <!--blocco con link a instagram con le stesse caratteristiche-->
        <a class="text-white" href="https://www.instagram.com/" aria-label="Instagram">
          <img src="/immagini/instagram.png" alt="Instagram" height="24" />
        </a>
        <!--blocco con link a linkein con le stesse caratteristiche-->
        <a class="text-white" href="https://www.linkedin.com/" aria-label="LinkedIn">
          <img src="/immagini/linkedin.png" alt="LinkedIn" height="24" />
        </a>
        <!--blocco con link a youtube con le stesse caratteristiche-->
        <a class="text-white" href="https://www.youtube.com/" aria-label="YouTube">
          <img src="/immagini/youtube.png" alt="YouTube" height="24" />
        </a>
      </div>
<!--sezione partner; mt3 è il margine superiore-->
      <div class="mt-3">
        <p class="mb-1">I nostri partner</p> <!--titolo della sezione-->
        <!--logo google partner-->
        <img src="/immagini/google.png" alt="Google Partner" height="28" class="me-2" />
        <!--logo neta business partner-->
        <img src="/immagini/meta.png" alt="Meta Business Partner" height="28" />
      </div>
    </div>
  </footer>
</template>



