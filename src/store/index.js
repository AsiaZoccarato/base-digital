// Importo la factory di Vuex per creare lo store
import { createStore } from "vuex";

// Esporto lo store così l'app può .use(store) in main.js
export default createStore({
  // ----------------------
  // STATE: dati globali
  // ----------------------
  state: {
    // "DB" simulato: array di servizi mostrati nella griglia e nel dettaglio
    services: [
      {
        // identificatore leggibile nell'URL (es: /servizi/social)
        slug: "social",
        // titolo che appare nelle card/lista
        title: "Social Media Marketing",
        // descrizione breve per l’anteprima (card)
        desc: "Piani editoriali, adv e community.",
        // testo più lungo per la pagina di dettaglio
        body:
          "Gestiamo i tuoi social media con strategie mirate, creatività e pianificazione editoriale per aumentare visibilità e interazioni.",
        // percorso dell’immagine (in public/immagini/…)
        img: "/immagini/agenzia1.jpg",
      },
      {
        slug: "webmarketing",
        title: "Web Marketing",
        desc: "Campagne performance e analytics.",
        body:
          "Creiamo campagne Google Ads, SEO e content marketing con focus su ROI e crescita del traffico.",
        img: "/immagini/agenzia2.jpg",
      },
      {
        slug: "ecommerce",
        title: "E-commerce",
        desc: "Store, funnels, ottimizzazione.",
        body:
          "Progettiamo e ottimizziamo e-commerce su misura, con attenzione a UX e conversioni.",
        img: "/immagini/foto3.jpg",
      },
    ],
  },

  // ----------------------
  // GETTERS: viste/computed globali
  // ----------------------
  getters: {
    // Restituisce tutti i servizi (usato da ServicesGrid)
    allServices: (state) => state.services,

    // Restituisce un singolo servizio dato lo slug (usato da ServiceDetailView)
    getService:
      (state) =>
      (slug) =>
        state.services.find((s) => s.slug === slug),
  },

  // ----------------------
  // MUTATIONS: modifiche sincrone allo state
  // ----------------------
  mutations: {
    // Aggiunge un nuovo servizio allo state
    // payload deve essere un oggetto con { slug, title, desc, body, img }
    addService(state, payload) {
      state.services.push(payload);
    },
    // (opzionali, se ti servono in futuro)
    // updateService(state, payload) { ... }
    // removeService(state, slug) { ... }
  },

  // ----------------------
  // ACTIONS: logica (anche async) che chiama le mutations
  // ----------------------
  actions: {
    // Esempio di action che inoltra alla mutation di aggiunta
    add({ commit }, payload) {
      commit("addService", payload);
    },
  },
});
