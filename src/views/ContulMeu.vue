<template>
  <div class="account-container">
    <h2>Contul meu</h2>

    <div v-if="user" class="account-card">

      <div class="account-field">
        <label>Nume:</label>
        <span v-if="!editMode">{{ user.Name }}</span>
        <input v-else v-model="editableUser.Name" />
      </div>

      <div class="account-field">
        <label>Email:</label>
        <span v-if="!editMode">{{ user.Email }}</span>
        <input v-else v-model="editableUser.Email" />
      </div>

      <div class="account-field">
        <label>Telefon:</label>
        <span v-if="!editMode">{{ user.NumarTelefon || '–' }}</span>
        <input v-else v-model="editableUser.NumarTelefon" />
      </div>

      <div class="account-field">
        <label>Naționalitate:</label>
        <span v-if="!editMode">{{ user.Nationalitate || '–' }}</span>
        <input v-else v-model="editableUser.Nationalitate" />
      </div>

      <div class="account-field">
        <label>Adresă:</label>
        <span v-if="!editMode">{{ user.Adresa || '–' }}</span>
        <input v-else v-model="editableUser.Adresa" />
      </div>

      <div class="account-field">
        <label>Data nașterii:</label>
        <span v-if="!editMode">{{ formatDate(user.DataNasterii) }}</span>
        <input v-else type="date" v-model="editableUser.DataNasterii" />
      </div>
            <button @click="editMode = !editMode" class="edit-button">
        {{ editMode ? 'Anulează' : 'Modifică' }}
      </button>

      <button v-if="editMode" @click="saveChanges" class="save-button">Salvează</button>
    </div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else class="loading-message">
      Se încarcă datele...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

interface User {
  Name: string
  Email: string
  DataNasterii: string
  NumarTelefon: string
  Nationalitate: string
  Adresa: string
}

const user = ref<User | null>(null)
const editableUser = reactive<User>({
  Name: '',
  Email: '',
  DataNasterii: '',
  NumarTelefon: '',
  Nationalitate: '',
  Adresa: ''
})

const editMode = ref(false)
const error = ref<string | null>(null)

const formatDate = (date: string) => {
  if (!date) return '–'
  const d = new Date(date)
  return d.toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      error.value = 'Nu există token. Vă rugăm autentificați-vă.'
      return
    }

    const response = await axios.get('http://172.20.10.3:5046/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    user.value = response.data
    Object.assign(editableUser, response.data)
  } catch (err) {
    console.error('Eroare la încărcarea contului:', err)
    error.value = 'Nu s-au putut încărca datele contului.'
  }
})

const saveChanges = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      error.value = 'Token lipsă.';
      return;
    }

    await axios.put('http://172.20.10.3:5046/api/auth/update', editableUser, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // sincronizare locală
    if (user.value) {
      Object.assign(user.value, editableUser);
    }
    editMode.value = false;
  } catch (err) {
    console.error('Eroare la salvare:', err);
    error.value = 'Nu s-au putut salva modificările.';
  }
};

</script>

<style scoped>
.account-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
}

.account-card {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.account-field {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  display: inline-block;
  width: 140px;
}

input {
  padding: 0.4rem;
  width: calc(100% - 150px);
}

.edit-button,
.save-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #042311;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.edit-button:hover,
.save-button:hover {
  background-color: #2563eb;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

.loading-message {
  color: gray;
  margin-top: 1rem;
}
</style>
