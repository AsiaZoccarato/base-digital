<template>
  <div class="about-page">
    <!-- Sezione introduttiva -->
    <section class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <h1 class="text-center display-4 mb-5">La nostra storia</h1>
          <p class="fs-5 text-justify lh-lg">
            Nel 2019 ci siamo incontrate tra i libri e abbiamo deciso di iniziare un'avventura insieme. Nel 2020, unendo le nostre forze, abbiamo fondato l'agenzia che sognavamo da tempo con il desiderio di fare delle nostre più grandi passioni il nostro lavoro quotidiano.<br>
            Con tanta fatica ma ancora più soddisfazioni, l'agenzia è cresciuta e il team si è allargato. Dopo qualche anno e tanti progetti, il nostro obiettivo rimane lo stesso: aiutare piccole e grandi attività a migliorare la propria comunicazione a 360 gradi.
            Copriamo diversi ambiti di interesse e lavoro, con uno sguardo particolare al mondo della produzione industriale.<br>
            Dal branding alla gestione dei social media, dal web design alla SEO, offriamo soluzioni su misura per aziende che vogliono distinguersi e lasciare il segno.<br>
            Dopo cinque anni, il nostro lavoro è ancora la nostra passione, abbiamo sempre più idee in testa e ancora più sogni nel cassetto.
          </p>
        </div>
      </div>
    </section>

    <!-- Sezione Team -->
    <section class="container-fluid py-5 bg-light">
      <div class="container">
        <h1 class="text-center display-4 mb-5">Il Team</h1>
        <div class="row g-4">
          <!-- Usiamo il componente TeamMemberCard. Usiamo la direttiva v-for per iterare sui membri del team. I dati dei membri sono nell'array teamMembers -->
          <TeamMemberCard 
            v-for="member in teamMembers"  
            :key="member.id"
            :member="member"
          />
          <!-- Ogni ciclo di for passa un oggetto (member) al componente attraverso :member="member" -->
        </div>
      </div>
    </section>

    <!-- CTA finale -->
    <section class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-6 text-center">
          <h3 class="mb-4">Vuoi saperne di più?</h3>
          <RouterLink 
            to="/contatti" 
            class="btn btn-primary btn-lg" 
          > <!-- btn = classe Bootstrap per il bottone. RouterLink per la navigazione interna -->
            Contattaci
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TeamMemberCard from '@/components/TeamMemberCard.vue'

export default {
  name: 'AboutView',
  components: {
    TeamMemberCard
  }, 
  data() { /*  inserisco i membri del team nell'array teamMembers nell'oggetto data () */
    return {
      teamMembers: [
        {
          id: 1,
          name: 'Beatrice Toresi',
          role: 'Project Manager',
          image: '/immagini/team1.jpg'
        },
        {
          id: 2,
          name: 'Asia Francesca Zoccarato',
          role: 'Responsabile Team Marketing',
          image: '/immagini/team2.jpg'
        },
        {
          id: 3,
          name: 'Aliaksandra Zaneuskaya',
          role: 'Responsabile Team Tecnico',
          image: '/immagini/team3.jpg'
        },
        {
          id: 4,
          name: 'Erica Trenta',
          role: 'Responsabile Team Creativo',
          image: '/immagini/team4.jpg'
        },
        {
          id: 5,
          name: 'Marco Belli',
          role: 'Amministrazione',
          image: '/immagini/team5.jpg'
        },
        {
          id: 6,
          name: 'Gaia Bianchi',
          role: 'Team Creativo',
          image: '/immagini/team6.jpg'
        },
        {
          id: 7,
          name: 'Filippo Rossi',
          role: 'Team Marketing',
          image: '/immagini/team7.jpg'
        },
        {
          id: 8,
          name: 'Sveva Schmidt',
          role: 'Team Tecnico',
          image: '/immagini/team8.jpg'
        }
      ]
    }
  }
}
</script>