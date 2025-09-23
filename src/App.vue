<template>
  <v-app>
    <AppNavbar />
    <router-view />
    <AppFooter />
  </v-app>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

