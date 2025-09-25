<template>
  <div class="container py-4">
    <h1>Base Digital Shop</h1>
    <p>Shop smart, shop Base Digital — gear up with our exclusive bottles, hats, tees, and more!</p>
  </div>
  <div class="row g-4">
      <div
        class="col-md-4"
        v-for="(product, index) in products"
        :key="index"
      >
        <div class="card h-100 text-center">
          <img
            :src="product.image"
            class="card-img-top p-3"
            :alt="product.name"
            style="height: 200px; object-fit: contain;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <span class="fw-bold">{{ product.price }}</span>
          </div>
          <div class="card-footer bg-transparent border-top-0">
            <button class="btn btn-sm btn-outline-primary w-100">
              <i class="bi bi-cart-fill me-1"></i> Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
const products = [
  {
    name: 'Cappello Bianco',
    image: 'public\immagini\CappelloBianco.png',
    description: 'Cappello elegante in cotone bianco',
    price: '€12'
  },
  {
    name: 'Cappello Blu',
    image: "public\immagini\Cappello Blu.png",
    description: 'Cappello elegante in cotone blu',
    price: '€12'
  },
  {
    name: 'Borraccia 75 cl',
    image: 'public\immagini\Borraccia 75cl.png',
    description: 'Borraccia resistente da 75 cl',
    price: '€15'
  },
  {
    name: 'Borraccia 50 cl',
    image: 'public\immagini\Borraccia 50cl.png',
    description: 'Borraccia resistente da 50 cl',
    price: '€15'
  },
  {
    name: 'Portachiavi',
    image: 'public\immagini\Portachiavi.png',
    description: 'Portachiavi con logo Base Digital',
    price: '€8'
  },
  {
    name: 'Felpa Blu Scuro',
    image: 'public\immagini\Felpa  blu scuro.png',
    description: 'Felpa confortevole in cotone blu scuro',
    price: '€35'
  },
  {
    name: 'Felpa Blu Elettrico',
    image: 'public\immagini\Felpa  blu elettrico.png',
    description: 'Felpa confortevole in cotone blu elettrico',
    price: '€35'
  },
  {
    name: 'Tappetino del Mouse',
    image: 'public\immagini\Tappetino del mouse.png',
    description: 'Tappetino del mouse Base Digital chiaro',
    price: '€8'
  },
  {
    name: 'Tappetino del Mouse Scuro',
    image: 'public\immagini\tappetino del mouse scuro.png',
    description: 'Tappetino del mouse Base Digital scuro',
    price: '€8'
  }
]
</script>

<style scoped>
.card-title {
  font-weight: 600;
}
</style>

