<template>
    <h4 class="text-align">Invia candidatura</h4>
    <form ref="form" @submit.prevent="sendEmail">
        <div class="row mb-3">
            <label for="role" class="col-sm-3 col-form-label">Ruolo:</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="role" disabled :value="role"/>
            </div>
        </div>
        <div class="mb-3 row">
            <label for="name" class="col-sm-3 col-form-label">Nome:</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="name" name="name" v-model="name" placeholder="Inserisci il tuo nome" required/>
            </div>
      </div>
      <div class="mb-3 row">
        <label for="surname" class="col-sm-3 col-form-label">Cognome:</label>
        <div class="col-sm-9">
            <input type="text"  class="form-control" id="surname" name="surname" v-model="surname" placeholder="Inserisci il tuo cognome"
        required/>
        </div>
    </div>
    <div class="mb-3 row">
        <label for="birthday" class="col-sm-3 col-form-label">Data di nascita:</label>
        <div class="col-sm-9">
            <input type="date"  class="form-control" id="birthday" name="birthday" v-model="birthday" />
        </div>
    </div>
    <div class="mb-3 row">
        <label for="email" class="col-sm-3 col-form-label">Email:</label>
        <div class="col-sm-9">
            <input type="email"  class="form-control" id="email" name="email" v-model="email"
        required/>
        </div>
    </div>
    <div class="mb-3 row">
        <label for="tel" class="col-sm-3 col-form-label">Telefono:</label>
        <div class="col-sm-9">
            <input type="tel"  class="form-control" id="tel" name="tel" v-model="tel"/>
        </div>
    </div>
    <div class="mb-3 row">
      <label for="cv" class="col-sm-3 col-form-label">CV:</label>
      <div class="col-sm-9">
        <input id="cv"  class="form-control" type="file" name="cv" ref="cv" accept=".pdf,.docx" required/>
      </div>
    </div>
    <div class="mb-3 row">
        <label for="letter" class="col-sm-3 col-form-label">Lettera di presentazione:</label>
        <div class="col-sm-9">
            <textarea id="letter"  class="form-control" name="letter" v-model="letter" placeholder=""></textarea>
        </div>
    </div>
    <div class="text-center">
        <span>
            <button type="submit" class="btn btn-outline-secondary mt-1 mr-2 p-2"> Invia</button>
        </span>
        <span>
            <button type="reset" class="btn btn-outline-secondary mt-1 mr-2 p-2" @click="resetForm"> Cancella dati</button>
        </span>
      </div>
    </form>
</template>

<script setup>
import { ref } from "vue";

const form = ref(null)

const props = defineProps({
  role: String
})

const name = ref('')
const surname = ref('')
const birthday = ref('')
const email = ref('')
const tel = ref('')
const letter = ref('')
const cv = ref(null)

function resetForm() {
  name.value = ''
  surname.value = ''
  birthday.value = ''
  email.value = ''
  tel.value = ''
  letter.value = ''
  if (form.value) form.value.reset()
}

function sendEmail() {
  if (!form.value) return;

  const formData = new FormData(form.value);
  formData.append("subject", `New Job Application for ${props.role}`);
  formData.append("from_name", `${name.value} ${surname.value}`);
  formData.append("reply_to", email.value);

  fetch("https://getform.io/f/bwnykgqa", {
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        alert("Candidatura inviata con successo!");
        resetForm();
      } else {
        alert(json.message);
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Si è verificato un errore durante l'invio della candidatura.");
    });
}

</script>