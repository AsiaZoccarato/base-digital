<template>
  <div class="container py-4" v-if="product">
    <h1>{{ product.name }}</h1>
    <div class="product-image-wrapper mb-4">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="img-fluid product-image"
        @click="zoomImage = !zoomImage"
        :class="{ zoomed: zoomImage }"
      />
    </div>

    <div v-html="product.detailedDescription" class="mb-4 product-description"></div>

    <form @submit.prevent="submitRequest">
      <h3>Richiedi disponibilità</h3>

      <div class="mb-3">
        <label for="name" class="form-label">Nome</label>
        <input v-model="form.name" id="name" required type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="form.email" id="email" required type="email" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">Messaggio</label>
        <textarea v-model="form.message" id="message" rows="3" class="form-control"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Invia richiesta</button>

      <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
    </form>
  </div>
  <div v-else class="container py-4">
    <p>Prodotto non trovato.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const slug = route.params.slug

const store = useStore()

const product = computed(() => store.state.shop.products.find(p => p.slug === slug))

const zoomImage = ref(false)

const form = ref({
  name: '',
  email: '',
  message: '',
})

const successMessage = ref('')

function submitRequest() {
  successMessage.value = `Grazie ${form.value.name}, la tua richiesta per "${product.value.name}" è stata inviata.`
  form.value = { name: '', email: '', message: '' }
}
</script>

<style scoped>
.product-image {
  max-width: 400px;
  cursor: zoom-in;
  transition: transform 0.3s ease;
}

.product-image.zoomed {
  transform: scale(2);
  cursor: zoom-out;
}

.product-description {
  font-size: 1rem;
  color: #444;
}
</style>
