import { createRouter, createWebHistory } from "vue-router";
//importiamo la factory per creare il router e lo storico in modalità HTML5

// viste principali import statico incluso nel bundle iniziale
import HomeView from "@/views/HomeView.vue";
import ServicesView from "@/views/ServicesView.vue";
import ServiceDetailView from "@/views/ServiceDetailView.vue";
import PositionsView from "@/views/PositionsView.vue";
import PositionDetailView from "@/views/PositionDetailView.vue";

//collegamenti con le varie pagine come se fossero link
const routes = [
  { path: "/", name: "home", component: HomeView },
  //path di root --> home. do anche un name alla rotta (utile per navigare by name )
 
  { path: "/chi-siamo", component: () => import("@/views/Stub.vue") },
  //import dinamico (lazy loading): crea uno split-chunck e scarica la vista solo quando serve 
  
  { path: "/servizi", name: "services", component: ServicesView }, //lista di servizi

  {
    path: "/servizi/:slug", //slug = parametro dinamico nell'url es. /servizi/seo
    name: "service-detail", //nome rottaa per push/routerlink by name 
    component: ServiceDetailView, //vista di dettaglio servizio 
    props: true, //passa i parametri di rotta (slug ) come prop al component
  },

  { path: "/clienti", component: () => import("@/views/Stub.vue") },
  // pagina placeholder caricata in lazy si potrà poi togliere alla fine 
  { path: "/contatti", component: () => import("@/views/ContactView.vue") },
  //pagina contatti in lazy loading, quindi caricata quando serve 

  { //altra pagina chi siamo caricata in lazy loading 
    path: "/about",
    name: "About",
    component: () => import("@/views/AboutView.vue"),
  },

  { path: "/news", name: "News", component: () => import("@/views/NewsView") },
//rotta per la pagina news con import dinamico 

  { path: "/positions", name: "positions", component: PositionsView },
//lista poosizioni con import statico 


  {
    path: "/positions/:slug",
    name: "position-detail",
    component: PositionDetailView, //dettaglio posizione con param dinamico:slug 
  },

  { path: '/login', name: 'Login', component: () => import('@/views/LoginView.vue')},
  //rotta per la pagina di login
  
  {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/views/DashboardView.vue'),
  meta: { requiresAuth: true } // Richiede login
}
  //rotta per la dashboard interna all'area di login

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), //tipo di history: html5
  routes, //registro l'array di rotte 
  
  

  //forza lo scroll in alto quando cambi pagina
  scrollBehavior(to, from, savedPosition) {
    // se usi i bottoni del browser torna alla posizione salvata 
    if (savedPosition) return savedPosition

    // se navigo verso un'ancora (id) allora scrolla li 
    if (to.hash) {
      return { el: to.hash, top: 0, behavior: 'smooth' }
    }

    // altrimenti di default torna in alto alla pagina 
    return { left: 0, top: 0 }
   
  },
})


export default router;

//COME FUNZIONA UNA ROTTA IN VUE ROUTER
//Ogni riga del routes array ha 3 concetti chiave:
// 1. path che è l'URL che l'utente digita o clicca (es. /servizi) e questo è quello che vedi nella barra el browser
// 2. name, facoltativo ma utile, è un alias interno che diamo alla rotta.
// possiamo usarlo nei router link o con router.push (name); non influisce sull'URL ma serve solo in fase di sviluppo
// 3. Component è il file vue che vue router deve mostrare quando l'utente visita quella rotta.
