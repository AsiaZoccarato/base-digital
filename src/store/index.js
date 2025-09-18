// Importo la factory di Vuex per creare lo store
import { createStore } from "vuex";

// Importo i moduli esterni (ognuno in /modules)

import position from "./modules/position"; //gestisce le posizioni lavorative 
import contact from "./modules/contact"; //gestisce i messaggi inviati dal form contatti 

// Esporto lo store così l'app può .use(store) in main.js
export default createStore({

  // STATE: dati globali
  state: {
    // array di servizi mostrati nella griglia e nel dettaglio
    services: [
      {
        // servizio: SOCIAL
        slug: "social", // identificatore leggibile nell'URL (es: /servizi/social)
        title: "Social Media Marketing", // titolo che appare nelle card/lista
        subtitle: "Strategia, contenuti e performance", // (opzionale) strapline
        desc: "Piani editoriali, adv e community.", // descrizione breve per l’anteprima (card)
        body: "Gestiamo i tuoi social media con strategie mirate, creatività e pianificazione editoriale per aumentare visibilità e interazioni.",
        // immagini free (link stabili)
        img: "/immagini/agenzia1.jpg", // immagine principale
  
        gallery: [
          // immagini pescate casualmente per la gallery più piccola 
          "https://picsum.photos/id/1006/600/400",
          "https://picsum.photos/id/1008/600/400",
          "https://picsum.photos/id/1010/600/400",
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
        body: "Creiamo e ottimizziamo campagne Google Ads, SEO tecnico e contenuti per far crescere traffico qualificato e conversioni.",
        img: "/immagini/agenzia2.jpg", // immagine principale
        gallery: [
          // immagini pescate casualmente per la gallery più piccola 
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
        body: "Progettiamo e ottimizziamo e-commerce su misura, con attenzione a UX, prestazioni e tassi di conversione.",
        img: "/immagini/foto3.jpg", // immagine principale
        gallery: [
          "https://picsum.photos/id/1006/600/400",
          "https://picsum.photos/id/1008/600/400",
          "https://picsum.photos/id/1010/600/400",
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
        ctaText: "Richiedi un preventivo gratuito",
      },
    {
        // servizio: BRANDING
        slug: "branding",
        title: "Branding & Identità",
        subtitle: "Logo, brandbook e tone of voice",
        desc: "Costruiamo brand memorabili e coerenti.",
        body: "Dallo studio del posizionamento alla definizione di naming, logo, palette e linee guida: creiamo un’identità forte e riconoscibile su tutti i canali.",
        img: "/immagini/agenzia1.jpg", // immagine principale (puoi sostituirla con un file tuo)
        gallery: [
          // immagini pescate casualmente per la gallery più piccola 
          "https://picsum.photos/id/1006/600/400",
          "https://picsum.photos/id/1008/600/400",
          "https://picsum.photos/id/1010/600/400",
        ],
        features: [
          "Analisi posizionamento",
          "Sistema visivo coordinato",
          "Tone of voice e linee guida",
        ],
        deliverables: ["Logo kit", "Brandbook PDF", "Template social"],
        price: "da 1.200€ una tantum",
        duration: "2–5 settimane",
        level: "Pro",
        tags: ["branding", "design", "identity"],
        related: ["social", "webmarketing"],
        ctaText: "Definiamo la tua identità",
      },

      {
        // servizio: CONTENT CREATION
        slug: "content",
        title: "Content Creation",
        subtitle: "Copy, visual e short video",
        desc: "Contenuti che parlano alle persone giuste.",
        body: "Produciamo contenuti editoriali e visual su misura per blog, newsletter e canali social, con attenzione a tono di voce, formati e obiettivi.",
        img: "/immagini/agenzia2.jpg", // immagine principale
        gallery: [
          // immagini pescate casualmente per la gallery più piccola 
      "https://picsum.photos/id/1006/600/400",
          "https://picsum.photos/id/1008/600/400",
          "https://picsum.photos/id/1010/600/400"
        ],
        features: [
          "Piano contenuti multi-canale",
          "Produzione grafiche e video",
          "Ottimizzazione SEO on-page",
        ],
        deliverables: ["Calendario editoriale", "Pacchetto grafiche", "Articoli ottimizzati"],
        price: "da 650€/mese",
        duration: "mensile",
        level: "Pro",
        tags: ["content", "copy", "video"],
        related: ["social", "webmarketing", "branding"],
        ctaText: "Parliamo del tuo piano contenuti",
      },

      {
        // servizio: DATA & ANALYTICS
        slug: "analytics",
        title: "Data & Analytics",
        subtitle: "Dashboard, tracciamenti e insight",
        desc: "Misuriamo ciò che conta, non tutto.",
        body: "Impostiamo tracciamenti GA4, eventi e conversioni; progettiamo dashboard su misura per leggere i dati e prendere decisioni rapide e informate.",
        img: "/immagini/foto3.jpg", // immagine principale
        gallery: [
          // immagini pescate casualmente per la gallery più piccola 
         "https://picsum.photos/id/1006/600/400",
          "https://picsum.photos/id/1008/600/400",
          "https://picsum.photos/id/1010/600/400"
        ],
        features: [
          "Setup GA4 e GTM",
          "Dashboard KPI real-time",
          "Analisi funnel e CRO",
        ],
        deliverables: ["Piano di tracking", "Dashboard Data Studio", "Report insight mensile"],
        price: "da 890€ (setup) + report",
        duration: "2–4 settimane (setup)",
        level: "Advanced",
        tags: ["analytics", "ga4", "dashboard"],
        related: ["webmarketing", "ecommerce"],
        ctaText: "Misura e scala i risultati",
      },
    ],
  },

  
  // GETTERS: viste/computed globali

  getters: {
    // Restituisce tutti i servizi (usato da ServicesView / ServicesGrid)
    allServices: (state) => state.services,

    // Restituisce un singolo servizio dato lo slug (usato da ServiceDetailView)
    getService: (state) => (slug) =>
      state.services.find((s) => s.slug === slug),

    //  Ricerca semplice per titolo/desc/tags
    searchServices: (state) => (query) => {
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

  // ----------------------
  // MODULES: suddivisione logica dello store
  // ----------------------
  modules: {
    position, // modulo per posizioni lavorative
    contact,  // modulo per la sezione Contatti (gestione form e messaggi)
  },
});
