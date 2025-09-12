import { createRouter, createWebHistory } from 'vue-router'

// viste principali
import HomeView from '@/views/HomeView.vue'
import ServicesView from '@/views/ServicesView.vue'
import ServiceDetailView from '@/views/ServiceDetailView.vue'
 
//collegamenti con le varie pagine come se fossero link
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/chi-siamo', component: () => import('@/views/Stub.vue') },
  { path: '/servizi', name: 'services', component: ServicesView },
  { path: '/servizi/:slug', name: 'service-detail', component: ServiceDetailView, props: true },
  { path: '/clienti', component: () => import('@/views/Stub.vue') },
  { path: '/news', component: () => import('@/views/Stub.vue') },
  { path: '/contatti', component: () => import('@/views/Stub.vue') },
  { path: '/lavora-con-noi', component: () => import('@/views/Stub.vue') },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
