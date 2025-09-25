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
// N elementi casuali senza ripetizioni
export function pickRandom(list, n = 3) {
 
  const arr = [...list];
  //mescola l'array con l'algoritmo fisher yates 
  
  for (let i = arr.length - 1; i > 0; i--) {
    //j è un indice casuale tra 0 e i (inclusi)
    const j = Math.floor(Math.random() * (i + 1));
  
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

// ritorna i primi n
  return arr.slice(0, Math.max(0, Math.min(n, arr.length)));
}
