<template>
  <v-dialog v-model="dialogVisible" max-width="600">
    <v-card>
      <v-card-title class="headline">Aggiungi nuova posizione</v-card-title>
      <v-card-text>
        <v-text-field v-model="form.title" label="Titolo" required />
        <v-text-field v-model="form.city" label="Città" required />
        <v-text-field v-model="form.area" label="Area" />
        <v-text-field v-model="form.seniority" label="Seniority" />
        <v-textarea v-model="form.description" label="Descrizione" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Annulla</v-btn>
        <v-btn color="primary" text @click="submit">Salva</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(['update:show']);

const dialogVisible = computed({
  get: () => props.show,
  set: val => emit('update:show', val),
});

const store = useStore();

const form = ref({
  title: '',
  city: '',
  area: '',
  seniority: '',
  description: '',
});

function close() {
  dialogVisible.value = false;
  resetForm();
}

function resetForm() {
  form.value = {
    title: '',
    city: '',
    area: '',
    seniority: '',
    description: '',
  };
}

function submit() {
  if (!form.value.title || !form.value.city) {
    alert('Titolo e città sono obbligatori');
    return;
  }

  // Crea lo slug dal titolo
  const slug = form.value.title.toLowerCase().replace(/\s+/g, '_');

  // Dispatch dell'azione passandogli il nuovo oggetto posizione
  store.dispatch('position/addPositionAndPersist', {
    slug,
    title: form.value.title,
    city: form.value.city,
    area: form.value.area,
    seniority: form.value.seniority,
    description: form.value.description,
    country: 'Italia',
  }, { root: true });

  close();
}

</script>
