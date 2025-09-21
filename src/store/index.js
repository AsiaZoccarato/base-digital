// Importo la factory di Vuex per creare lo store
import { createStore } from "vuex";

// Importo i moduli esterni (ognuno in /modules)

import position from "./modules/position"; //gestisce le posizioni lavorative 
import contact from "./modules/contact"; //gestisce i messaggi inviati dal form contatti 
import { themedImages, pickRandom } from '@/utils/images' //immgini tematiche per i servizi

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
  
      gallery: pickRandom(themedImages.content, 3),
 // immagini pescate casualmente per la gallery più piccola 
        // punti chiave (bullets)
        features: [
          "Calendario editoriale mensile",
          "Report performance con KPI",
          "Gestione community",
        ],

        // consegne 
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
        // testo CTA 
        ctaText: "Contattaci per saperne di più",
      },

      {
        // servizio: WEB MARKETING
        slug: "webmarketing",
        title: "Web Marketing",
        subtitle: "SEO, SEM e funnel di conversione",
        desc: "Campagne performance e analytics.",
        body: "Creiamo e ottimizziamo campagne Google Ads, SEO tecnico e contenuti per far crescere traffico qualificato e conversioni.",
        img: "/immagini/agenzia2.jpg", // immagine principale

        gallery: pickRandom(themedImages.marketing, 3), 
        // immagini pescate casualmente per la gallery più piccola 
        features: [
          "Keyword research e struttura SEO",
          "Campagne search & display",
          "Tracciamenti GA4 e dashboard",
        ],
        //consegne
        deliverables: [
          "Piano keyword", 
          "Campagne impostate", 
          "Report CRO"
        ],
        //informazioni rapide 
        price: "da 790€/mese",
        duration: "continuativa (mensile)",
        level: "Advanced",

        tags: [
          "seo", 
          "sem", 
          "analytics"
        ],
        //servizi collegati 
        related: [
          "social", 
          "ecommerce"
        ],

        //cta 
        ctaText: "Contattaci per saperne di più",
      },

      {
        // servizio: E-COMMERCE
        slug: "ecommerce",
        title: "E-commerce",
        subtitle: "UX, piattaforma e conversion rate",
        desc: "Store, funnels, ottimizzazione.",
        body: "Progettiamo e ottimizziamo e-commerce su misura, con attenzione a UX, prestazioni e tassi di conversione.",
        img: "/immagini/foto3.jpg", // immagine principale
        gallery: pickRandom(themedImages.ecommerce, 3),

      //caratteristiche principali  
        features: [
          "Architettura informazioni e UX",
          "Checkout e pagamenti ottimizzati",
          "Email marketing & automation",
        ],

        deliverables: [
          "Wireframe",
           "Setup piattaforma", 
           "Test A/B iniziali"
          ],

        price: "project-based (su preventivo)",
        duration: "4–10 settimane",
        level: "Enterprise",

        tags: [
          "shop", 
          "ux", 
          "cro"],

        related: ["webmarketing"],

        ctaText: "Contattaci per saperne di più",
      },

      {
        // servizio: BRANDING
        slug: "branding",
        title: "Branding & Identità",
        subtitle: "Logo, brandbook e tone of voice",
        desc: "Costruiamo brand memorabili e coerenti.",
        body: "Dallo studio del posizionamento alla definizione di naming, logo, palette e linee guida: creiamo un’identità forte e riconoscibile su tutti i canali.",
        img: "/immagini/brand.jpg", // immagine principale (puoi sostituirla con un file tuo)
        gallery: pickRandom(themedImages.communication, 3), // immagini pescate casualmente per la gallery più piccola 
       
        features: [
          "Analisi posizionamento",
          "Sistema visivo coordinato",
          "Tone of voice e linee guida",
        ],

        deliverables: [
          "Logo kit", 
          "Brandbook PDF",
           "Template social"
          ],

        price: "da 1.200€ una tantum",
        duration: "2–5 settimane",
        level: "Pro",
        
        tags: [
          "branding",
           "design", 
           "identity"
          ],

        related: ["social",
           "webmarketing"
          ],
        
        ctaText: "Contattaci per saperne di più",
      },

      {
        // servizio: CONTENT CREATION
        slug: "content",
        title: "Content Creation",
        subtitle: "Copy, visual e short video",
        desc: "Contenuti che parlano alle persone giuste.",
        body: "Produciamo contenuti editoriali e visual su misura per blog, newsletter e canali social, con attenzione a tono di voce, formati e obiettivi.",
        img: "/immagini/content.webp", // immagine principale
        gallery: pickRandom(themedImages.content, 3), // immagini pescate casualmente per la gallery più piccola 
        
        features: [
          "Piano contenuti multi-canale",
          "Produzione grafiche e video",
          "Ottimizzazione SEO on-page",
        ],

        deliverables: [
          "Calendario editoriale", 
          "Pacchetto grafiche", 
          "Articoli ottimizzati"],

        price: "da 650€/mese",
        duration: "mensile",
        level: "Pro",

        tags: [
          "content", 
          "copy", 
          "video"
        ],

        related: [
          "social",
           "webmarketing", 
           "branding"
          ],

        ctaText: "Contattaci per saperne di più",
      },

      {
        // servizio: DATA & ANALYTICS
        slug: "analytics",
        title: "Data & Analytics",
        subtitle: "Dashboard, tracciamenti e insight",
        desc: "Misuriamo ciò che conta, non tutto.",
        body: "Impostiamo tracciamenti GA4, eventi e conversioni; progettiamo dashboard su misura per leggere i dati e prendere decisioni rapide e informate.",
        img: "/immagini/dati.jpg", // immagine principale
        gallery: pickRandom(themedImages.social, 3), // puoi creare anche un tema "analytics" se vuoi
       
        features: [
          "Setup GA4 e GTM",
          "Dashboard KPI real-time",
          "Analisi funnel e CRO",
        ],
        
        deliverables: [
          "Piano di tracking", 
          "Dashboard Data Studio",
           "Report insight mensile"
          ],

        price: "da 890€ (setup) + report",
        duration: "2–4 settimane (setup)",
        level: "Advanced",

        tags: [
          "analytics", 
          "ga4", 
          "dashboard"
        ],

        related: ["webmarketing", 
          "ecommerce"
        ],
        
        ctaText: "Contattaci per saperne di più",
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
      //1) normalizzazione input: se null/undefined -> "", minuscole, senza spazi ai lati 
      const q = (query || "").toLowerCase().trim(); //case insenstivi, cioè non fa differenze tra maiscuole e minuscole e ignora gli spazi

      //2) caso vuoto: se l'utente non ha digitato nulla restituisci tutti i servizi 
      if (!q) return state.services;

      //3) filtro: tieni solo i servizi che corrispondono alla ricerca 
      return state.services.filter((s) => {
        return (
          //match sul titolo 
          s.title.toLowerCase().includes(q) ||
          //match su descrizione breve 
          s.desc.toLowerCase().includes(q) ||
          //match su almeno un tag
          (s.tags || []).some((t) => t.toLowerCase().includes(q))
        );
      });
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
