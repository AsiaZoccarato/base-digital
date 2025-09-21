// array di immagini tematiche per i servizi
export const themedImages = {
  marketing: [
    '/immagini/asset/webmarketing1.jpg',
    '/immagini/asset/webmarketing2.jpg',
    '/immagini/asset/webmarketing3.jpg',
  ],
  communication: [
    '/immagini/asset/comunicazione1.jpg',
    '/immagini/asset/comunicazione2.jpeg',
    '/immagini/asset/comunicazione3.jpg', 
    '/immagini/asset/comunicazione4.jpg',
    '/immagini/asset/comunicazione5.jpeg'
  ],
  social: [
    '/immagini/asset/smm1.jpg',
    '/immagini/asset/smm2.jpg',
    '/immagini/asset/smm3.webp',
  ],
  ecommerce: [
   '/immagini/asset/ecommerce1.webp',
    '/immagini/asset/ecommerce2.jpg',
    '/immagini/asset/ecommerce3.jpg',
  ],
  content: [
   '/immagini/asset/content1.jfif',
    '/immagini/asset/content2.png',
    '/immagini/asset/content3.webp',
  ],
};

// Pesca N immagini casuali senza ripetizioni da una lista
export function pickRandom(list, n = 3) {
  //copia superficiale dell'array originale 
  const arr = [...list];
  //mescola l'array con l'algoritmo fisher yates 
  //parte dall'ultimo indice e va indietro fino a 1; ogni passo estrae un indice casuale j tra 0 e i inclusi
  //scambia gli elementi in posizione i e j 
  //risultato l'array è mescolato in modo uniforme 
  for (let i = arr.length - 1; i > 0; i--) {
    //j è un indice casuale tra 0 e i (inclusi)
    const j = Math.floor(Math.random() * (i + 1));
    //scambia gli arr[i] e arr[j] usando la destrutturazione 
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  //ritagia i primi n elementi 
  //math.min per evitare di chiedere piu elementi di quanti ce ne siano 
  //mathmax per evitare n negativo 
  //arr.slice non modifica l'array originale 
  //effetto: ottieni n elementi distinti a caso, senza ripetizioni 
  return arr.slice(0, Math.max(0, Math.min(n, arr.length)));
}
