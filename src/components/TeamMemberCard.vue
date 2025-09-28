<!-- utilizzo un componente a parte per costruire la card del singolo membro del team che sarà ripetuta più volte nella vista (cfr. AboutView.vue)-->

<template>
  <div class="col-6 col-md-4 col-lg-3">   <!-- struttura griglia Bootstrap: 2 colonne su mobile (6/12); 3 su tablet (4/12); 4 su desktop (3/12) -->
    <div class="card h-100 border-0 shadow-sm"> <!-- Bootstrap: altezza della card = 100; ombra leggera -->
     <!-- esempio di attribute binding -->
      <img 
        :src="member.image" 
        :alt="member.name"
        class="card-img-top team-photo" 
      > <!-- card- sono tutte classi Bootstrap che definiscono la card -->
      <div class="card-body text-center">
        <h5 class="card-title mb-1">{{ member.name }}</h5> <!-- mb-1 = margin bottom piccolo es. di string interpolation -->
        <p class="card-text text-muted small">{{ member.role }}</p> <!-- text-muted = colore grigio tenue; small = testo piccolo -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamMemberCard',
  props: { /* TeamMemberCard riceve i dati tramite una prop chiamata "member", che contiene nome, ruolo e imamgine. Prop = modo attraverso cui vengono passati i dati da un componente padre (AboutView) a un figlio (TeamMemberCard) */
    member: {
      type: Object,
      required: true,
      validator(value) {
        // Controllo che l'oggetto abbia le proprietà necessarie
        return value.name && value.role && value.image
      }
    }
  }
}
</script>

<style scoped> /* CSS personalizzato (e limitato a questa componente) per l'altezza delle foto. Di conseguenza devo aggiungere la media query */
.team-photo {
  height: 450px;
  object-fit: cover; /* non deforma immagine*/
  border-radius: 0.5rem 0.5rem 0 0;
}

@media (max-width: 576px) {
  .team-photo {
    height: 250px;
  }
.card-body {
    padding: 1rem;  /* Su mobile padding normale */
  }
}
</style>