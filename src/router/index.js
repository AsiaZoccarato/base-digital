import { createRouter, createWebHistory } from "vue-router";

// viste principali
import HomeView from "@/views/HomeView.vue";
import ServicesView from "@/views/ServicesView.vue";
import ServiceDetailView from "@/views/ServiceDetailView.vue";
import PositionsView from "@/views/PositionsView.vue";
import PositionDetailView from "@/views/PositionDetailView.vue";

//collegamenti con le varie pagine come se fossero link
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/chi-siamo', component: () => import('@/views/Stub.vue') },
  { path: '/servizi', name: 'services', component: ServicesView },
  { path: '/servizi/:slug', name: 'service-detail', component: ServiceDetailView, props: true },
  { path: '/clienti', component: () => import('@/views/Stub.vue') },
  { path: '/news', component: () => import('@/views/Stub.vue') },
  { path: '/contatti', component: () => import('@/views/Stub.vue') },
    { path: '/about', name: 'About', component: () => import('@/views/AboutView.vue')}

  { path: "/positions", name: "positions", component: PositionsView },

  {
    path: "/positions/:slug",
    name: "position-detail",
    component: PositionDetailView,
  },]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

//COME FUNZIONA UNA ROTTA IN VUE ROUTER
//Ogni riga del routes array ha 3 concetti chiave:
// 1. path che è l'URL che l'utente digita o clicca (es. /servizi) e questo è quello che vedi nella barra el browser
// 2. name, facoltativo ma utile, è un alias interno che diamo alla rotta.
// possiamo usarlo nei router link o con router.push (name); non influisce sull'URL ma serve solo in fase di sviluppo
// 3. Component è il file vue che vue router deve mostrare quando l'utente visita quella rotta.
