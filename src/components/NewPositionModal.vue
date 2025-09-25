<template>
  <v-dialog v-model="dialogVisible" max-width="600">
    <v-card
      class="mx-auto px-5 py-4"
      max-width="600"
      title="Aggiungi posizione"
      rounded-xl
    >
      <v-form>
        <v-text-field
          v-model="form.title"
          label="Titolo"
          :rules="[rules.required]"
          color="primary"
          clearable
          placeholder="Inserisci il titolo della posizione"
        />
        <v-text-field
          v-model="form.city"
          label="Città"
          :rules="[rules.required]"
          color="primary"
          clearable
          placeholder="Inserisci la città"
        />
        <v-text-field
          v-model="form.area"
          label="Area"
          color="primary"
          clearable
          placeholder="Inserisci il dipartimento"
        />
        <v-select
          v-model="form.seniority"
          label="Livello"
          :items="seniorityOptions"
          color="primary"
          placeholder="Inserisci il livello di seniority"
        ></v-select>
        <v-textarea
          v-model="form.description"
          label="Descrizione"
          color="primary"
          clearable
          placeholder="Descrivi la posizione"
        />

        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="submit"
          class="text-none mb-4"
          size="large"
          variant="flat"
          block
        >
          Salva la posizione</v-btn
        >
        <v-btn
          text
          @click="close"
          class="text-none"
          color="grey-lighten-3"
          size="large"
          variant="flat"
          block
          >Cancella</v-btn
        >
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  show: Boolean,
});

const rules = {
  required: (value) => !!value || "Campo obbligatorio",
};

const emit = defineEmits(["update:show"]);

const dialogVisible = computed({
  get: () => props.show,
  set: (val) => emit("update:show", val),
});

const store = useStore();

const positions = computed(() => {
  return store.getters["position/getAllPositions"];
});

const seniorityOptions = computed(() => {
  const allLevels = positions.value.map((p) => p.seniority).filter(Boolean);
  return [...new Set(allLevels)];
});

const form = ref({
  title: "",
  city: "",
  area: "",
  seniority: "",
  description: "",
});

function close() {
  dialogVisible.value = false;
  resetForm();
}

function resetForm() {
  form.value = {
    title: "",
    city: "",
    area: "",
    seniority: "",
    description: "",
  };
}

function submit() {
  if (!form.value.title || !form.value.city) {
    alert("Titolo e città sono obbligatori");
    return;
  }

  // Crea lo slug dal titolo
  const slug = form.value.title.toLowerCase().replace(/\s+/g, "_");

  // Dispatch dell'azione passandogli il nuovo oggetto posizione
  store.dispatch(
    "position/addPositionAndPersist",
    {
      slug,
      title: form.value.title,
      city: form.value.city,
      area: form.value.area,
      seniority: form.value.seniority,
      description: form.value.description,
      country: "Italia",
    },
    { root: true }
  );

  close();
}
</script>
