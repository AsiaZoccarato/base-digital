// Importo la factory di Vuex per creare lo store
import { createStore } from "vuex";

// Esporto lo store così l'app può .use(store) in main.js
export default createStore({
  // ----------------------
  // DATI GLOBALI (state)
  // ----------------------
  state: {
    // array di servizi mostrati nella griglia e nel dettaglio
    services: [
      {
        // servizio: SOCIAL
        slug: "social", // identificatore leggibile nell'URL (es: /servizi/social)
        title: "Social Media Marketing", // titolo che appare nelle card/lista
        subtitle: "Strategia, contenuti e performance", // (opzionale) strapline
        desc: "Piani editoriali, adv e community.", // descrizione breve per l’anteprima (card)
        body:
          "Gestiamo i tuoi social media con strategie mirate, creatività e pianificazione editoriale per aumentare visibilità e interazioni.",
        // immagini free (link stabili)
        img: "/immagini/agenzia1.jpg", // immagine principale
        gallery: [
          "https://picsum.photos/id/1012/600/400",
          "https://picsum.photos/id/1015/600/400",
          "https://picsum.photos/id/1025/600/400",
        ],
        // punti chiave (bullets)
        features: [
          "Calendario editoriale mensile",
          "Report performance con KPI",
          "Gestione community",
        ],
        // consegne tangibili
        deliverables: [
          "Piano editoriale",
          "Set up tracciamenti",
          "Report mensile",
        ],
        // info rapide
        price: "da 499€/mese",
        duration: "3–6 mesi",
        level: "Pro",
        tags: ["social", "adv", "content"],
        // collegamenti ad altri servizi (slug)
        related: ["webmarketing"],
        // testo CTA personalizzabile
        ctaText: "Richiedi un preventivo gratuito",
      },

      {
        // servizio: WEB MARKETING
        slug: "webmarketing",
        title: "Web Marketing",
        subtitle: "SEO, SEM e funnel di conversione",
        desc: "Campagne performance e analytics.",
        body:
          "Creiamo e ottimizziamo campagne Google Ads, SEO tecnico e contenuti per far crescere traffico qualificato e conversioni.",
        img: "/immagini/agenzia2.jpg", //immagine principale
        gallery: [
          "https://picsum.photos/id/1006/600/400",
          "https://picsum.photos/id/1008/600/400",
          "https://picsum.photos/id/1010/600/400",
        ],
        features: [
          "Keyword research e struttura SEO",
          "Campagne search & display",
          "Tracciamenti GA4 e dashboard",
        ],
        deliverables: ["Piano keyword", "Campagne impostate", "Report CRO"],
        price: "da 790€/mese",
        duration: "continuativa (mensile)",
        level: "Advanced",
        tags: ["seo", "sem", "analytics"],
        related: ["social", "ecommerce"],
        ctaText: "Richiedi un preventivo gratuito",
      },

      {
        // servizio: E-COMMERCE
        slug: "ecommerce",
        title: "E-commerce",
        subtitle: "UX, piattaforma e conversion rate",
        desc: "Store, funnels, ottimizzazione.",
        body:
          "Progettiamo e ottimizziamo e-commerce su misura, con attenzione a UX, prestazioni e tassi di conversione.",
        img: "/immagini/foto3.jpg", //immagine principale
        gallery: [
          "https://picsum.photos/id/1040/600/400",
          "https://picsum.photos/id/1041/600/400",
          "https://picsum.photos/id/1043/600/400",
        ],
        features: [
          "Architettura informazioni e UX",
          "Checkout e pagamenti ottimizzati",
          "Email marketing & automation",
        ],
        deliverables: ["Wireframe", "Setup piattaforma", "Test A/B iniziali"],
        price: "project-based (su preventivo)",
        duration: "4–10 settimane",
        level: "Enterprise",
        tags: ["shop", "ux", "cro"],
        related: ["webmarketing"],
        ctaText: "Richiedi un preventivo gratuito"
      },
    ],
  },

  // ----------------------
  // GETTERS: viste/computed globali
  // ----------------------
  getters: {
    // Restituisce tutti i servizi (usato da ServicesView / ServicesGrid)
    allServices: (state) => state.services,

    // Restituisce un singolo servizio dato lo slug (usato da ServiceDetailView)
    getService:
      (state) =>
      (slug) =>
        state.services.find((s) => s.slug === slug),

    // (facoltativo) Ricerca semplice per titolo/desc/tags
    searchServices:
      (state) =>
      (query) => {
        const q = (query || "").toLowerCase().trim();
        if (!q) return state.services;
        return state.services.filter((s) => {
          return (
            s.title.toLowerCase().includes(q) ||
            s.desc.toLowerCase().includes(q) ||
            (s.tags || []).some((t) => t.toLowerCase().includes(q))
          );
        });
      },
  },

  // ----------------------
  // MUTATIONS: modifiche sincrone allo state
  // ----------------------
  mutations: {
    // Aggiunge un nuovo servizio allo state
    // payload deve essere un oggetto con almeno { slug, title, desc, body, img }
    addService(state, payload) {
      state.services.push(payload);
    },

    // Aggiorna un servizio esistente (merge shallow per semplicità)
    updateService(state, { slug, patch }) {
      const idx = state.services.findIndex((s) => s.slug === slug);
      if (idx !== -1) {
        state.services[idx] = { ...state.services[idx], ...patch };
      }
    },

    // Rimuove un servizio per slug
    removeService(state, slug) {
      state.services = state.services.filter((s) => s.slug !== slug);
    },
  },

  // ----------------------
  // ACTIONS: logica (anche async) che chiama le mutations
  // ----------------------
  actions: {
    // Inoltra alla mutation di aggiunta
    add({ commit }, payload) {
      commit("addService", payload);
    },

    // Aggiornamento comodo
    update({ commit }, { slug, patch }) {
      commit("updateService", { slug, patch });
    },

    // Rimozione
    remove({ commit }, slug) {
      commit("removeService", slug);
    },
  },
});
