<template> 
    <div class="container py-4">
        <h1>Base Digital Shop</h1>
        <p class="animated-text">
            Shop smart, shop Base Digital — gear up with our exclusive bottles, hats, tees, and more!
        </p>
    </div>

  <div class="row g-4">
    <div
      class="col-md-4"
      v-for="(product, index) in products"
      :key="index"
    >
      <div class="card h-100 text-center product-card">
        <img
          :src="product.image"
          class="card-img-top product-image"
          :alt="product.name"
        />
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{ product.description }}</p>
          <span class="fw-bold">{{ product.price }}</span>
        </div>
        <div class="card-footer bg-transparent border-top-0">
         <router-link 
            :to="`/shop/${product.slug}`" 
            class="btn btn-sm btn-outline-primary w-100"
         >
            Dettaglio prodotto
         </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const products = computed(() => store.getters['shop/allProducts'])
</script>


<style scoped>
.card-title {
  font-weight: 600;
}
.animated-text {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeSlideIn 1s forwards;
  animation-delay: 0.5s; /* parte subito dopo l'h1 */
}

@keyframes fadeSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* immagine che occupa tutta la larghezza della card */
.product-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s;
}

/* effetto hover: leggermente più grande */
.product-card:hover .product-image {
  transform: scale(1.05);
}
</style>