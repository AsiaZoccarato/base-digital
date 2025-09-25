// src/store/modules/shop.js

export default {
  namespaced: true,

state: () => ({
  products: [
    {
      slug: 'white-code',
      name: 'Magliatta “White Code”',
      image: '/immagini/MagliettaBianca.png',
      description: 'La Maglietta “clean design”: minimal, elegante e ottimizzata per proteggerti dai bug… ops, dai raggi del sole ;)',
      detailedDescription: `
        <p>Maglietta 100% cotone, leggera e traspirante, ideale per ogni occasione.</p>
        <ul>
            <li>Materiale: cotone organico di alta qualità</li>
            <li>Taglia disponibile: S, M, L, XL</li>
            <li>Colore: bianco pulito con stampa minimal</li>
        </ul>
  `,
      price: '€20'
    },
    {
      slug: 'blue-screen',
      name: 'Cappello “Blue Screen”',
      image: '/immagini/CappelloBlu.png',
      description: 'Versione blu: come il colore del tuo editor di codice preferito. Ti tiene fresco mentre compili idee geniali.',
      detailedDescription: `
        <p>Porta lo stile blu con questo cappello “Blue Screen”. Comfort e design che si distinguono.</p>
        <ul>
          <li>Materiale morbido e traspirante</li>
          <li>Design moderno e accattivante</li>
          <li>Perfetto per ogni occasione</li>
        </ul>
      `,
      price: '€12'
    },
    {
      slug: 'big-data-bottle',
      name: 'Borraccia “Big Data” (75cl)',
      image: '/immagini/Borraccia75cl.png',
      description: 'La “cloud storage” delle borracce: tanta capienza, zero downtime. Perfetta per lunghe call e sessioni di brainstorming.',
      detailedDescription: `
        <p>Borraccia capiente da 75 cl per mantenerti idratato durante tutto il giorno.</p>
        <ul>
          <li>Materiale: plastica BPA free</li>
          <li>Design ergonomico</li>
          <li>Facile da pulire</li>
        </ul>
      `,
      price: '€15'
    },
    {
      slug: 'responsive-bottle',
      name: 'Borraccia “Responsive” (50cl)',
      image: '/immagini/Borraccia50cl.png',
      description: 'La versione “responsive”: compatta, smart e sempre pronta all’uso. Sta bene in borsa come un layout ben fatto.',
      detailedDescription: `
        <p>Borraccia compatta da 50 cl, ideale per portarla sempre con te.</p>
        <ul>
          <li>Design compatto e leggero</li>
          <li>Facile da trasportare</li>
          <li>Perfetta per attività outdoor</li>
        </ul>
      `,
      price: '€15'
    },
    {
      slug: 'link-builder-keychain',
      name: 'Portachiavi “Link Builder”',
      image: '/immagini/Portachiavi.png',
      description: 'Il “link building” della tua giornata: tiene insieme tutte le tue chiavi e aggiunge un tocco di brand awareness',
      detailedDescription: `
      <p>Un portachiavi solido e stiloso per tenere tutto sotto controllo.</p>
        <ul>
          <li>Materiale resistente in metallo</li>
          <li>Design elegante</li>
          <li>Idea regalo perfetta</li>
        </ul>
      `,
      price: '€8'
    },
    {
      slug: 'dark-mode-hoodie',
      name: 'Felpa “Dark Mode”',
      image: '/immagini/FelpaBluScuro.png',
      description: 'La felpa dark mode: calda, confortevole e con lo stile sobrio che ogni developer ama durante le nottate di coding',
      detailedDescription: `
        <p>Felpa comoda e calda con design sobrio in tonalità scure.</p>
        <ul>
          <li>Tessuto morbido e resistente</li>
          <li>Taglie disponibili dalla S alla XL</li>
          <li>Perfetta per il lavoro o il tempo libero</li>
        </ul>
      `,
      price: '€35'
    },
    {
      slug: 'electric-boost-hoodie',
      name: 'Felpa “Electric Boost”',
      image: '/immagini/FelpaBluElettrico.png',
      description: 'La felpa in modalità “boost”: energica, creativa e impossibile da ignorare, proprio come una buona campagna ADV',
      detailedDescription: `
        <p>Felpa energica e vivace che si fa notare ovunque tu vada.</p>
        <ul>
          <li>Colori luminosi e accattivanti</li>
          <li>Perfetta per esprimere la tua creatività</li>
          <li>Tessuto di qualità</li>
        </ul>
      `,
      price: '€35'
    },
    {
      slug: 'ux-smooth-mousepad',
      name: 'Tappetino “UX Smooth”',
      image: '/immagini/TappetinoDelMouse.png',
      description: 'Smooth scrolling assicurato! Un tappetino che rende fluida ogni tua mossa, come una UX fatta a regola d’arte.',
      detailedDescription: `
        <p>Tappetino con superficie ottimizzata per scorrimento fluido del mouse.</p>
        <ul>
          <li>Dimensioni ampie</li>
          <li>Base antiscivolo</li>
          <li>Ideale per lunghe sessioni di lavoro</li>
        </ul>
      `,
      price: '€8'
    },
    {
      slug: 'focus-dark-mousepad',
      name: 'Tappetino “Focus Dark”',
      image: '/immagini/TappetinoDelMouseScuro.png',
      description: 'Versione dark: elegante, stabile e con grip perfetto. Ideale per i gamer e per chi lavora meglio in modalità focus.',
      detailedDescription: `
        <p>Tappetino elegante con base antiscivolo e grip perfetto per sessioni di concentrazione.</p>
        <ul>
          <li>Materiale resistente</li>
          <li>Design minimal e dark</li>
          <li>Perfetto per gamer e professionisti</li>
        </ul>
      `,
      price: '€8'
    },
  ]
}),

  getters: {
    allProducts: (state) => state.products,
  },
}
