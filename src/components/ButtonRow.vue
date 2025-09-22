<template>
    <div class="text-center">
        <button class="btn btn-outline-secondary mt-1 mr-2 p-2" @click="scrollToForm"> Candidati </button>
        <RouterLink class="btn btn-outline-secondary mt-1 mr-2 p-2" to="/positions">
          Torna alla lista
        </RouterLink>
    </div>
</template>
<script setup>
function scrollToForm() {
  const el = document.getElementById("application-form");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
</script>