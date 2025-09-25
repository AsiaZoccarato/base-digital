// src/store/modules/shop.js

export default {
  namespaced: true,

state: () => ({
  products: [
    {
      slug: 'white-code',
      name: 'Magliatta “White Code”',
      image: '/immagini/MagliettaBianca.png',
      description: 'La Maglietta “clean design”: minimal, elegante e ottimizzato per proteggerti dai bug… ops, dai raggi del sole ;)',
      price: '€12'
    },
    {
      slug: 'blue-screen',
      name: 'Cappello “Blue Screen”',
      image: '/immagini/CappelloBlu.png',
      description: 'Versione blu: come il colore del tuo editor di codice preferito. Ti tiene fresco mentre compili idee geniali.',
      price: '€12'
    },
    {
      slug: 'big-data-bottle',
      name: 'Borraccia “Big Data” (75cl)',
      image: '/immagini/Borraccia75cl.png',
      description: 'La “cloud storage” delle borracce: tanta capienza, zero downtime. Perfetta per lunghe call e sessioni di brainstorming.',
      price: '€15'
    },
    {
      slug: 'responsive-bottle',
      name: 'Borraccia “Responsive” (50cl)',
      image: '/immagini/Borraccia50cl.png',
      description: 'La versione “responsive”: compatta, smart e sempre pronta all’uso. Sta bene in borsa come un layout ben fatto.',
      price: '€15'
    },
    {
      slug: 'link-builder-keychain',
      name: 'Portachiavi “Link Builder”',
      image: '/immagini/Portachiavi.png',
      description: 'Il “link building” della tua giornata: tiene insieme tutte le tue chiavi e aggiunge un tocco di brand awareness',
      price: '€8'
    },
    {
      slug: 'dark-mode-hoodie',
      name: 'Felpa “Dark Mode”',
      image: '/immagini/FelpaBluScuro.png',
      description: 'La felpa dark mode: calda, confortevole e con lo stile sobrio che ogni developer ama durante le nottate di coding',
      price: '€35'
    },
    {
      slug: 'electric-boost-hoodie',
      name: 'Felpa “Electric Boost”',
      image: '/immagini/FelpaBluElettrico.png',
      description: 'La felpa in modalità “boost”: energica, creativa e impossibile da ignorare, proprio come una buona campagna ADV',
      price: '€35'
    },
    {
      slug: 'ux-smooth-mousepad',
      name: 'Tappetino “UX Smooth”',
      image: '/immagini/TappetinoDelMouse.png',
      description: 'Smooth scrolling assicurato! Un tappetino che rende fluida ogni tua mossa, come una UX fatta a regola d’arte.',
      price: '€8'
    },
    {
      slug: 'focus-dark-mousepad',
      name: 'Tappetino “Focus Dark”',
      image: '/immagini/TappetinoDelMouseScuro.png',
      description: 'Versione dark: elegante, stabile e con grip perfetto. Ideale per i gamer e per chi lavora meglio in modalità focus.',
      price: '€8'
    },
  ]
}),

  getters: {
    allProducts: (state) => state.products,
  },
}
