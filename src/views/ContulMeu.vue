<template>
  <div class="account-page" v-if="user">
    <div class="container">
      <h1>Contul meu</h1>

      <div class="user-info">
        <p><strong>Nume:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>

      <button class="btn" @click="showEdit = !showEdit">
        {{ showEdit ? 'Anulează' : 'Editează profilul' }}
      </button>

      <form v-if="showEdit" class="edit-form" @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="name">Nume</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>

        <div class="form-group">
          <label for="password">Parolă nouă</label>
          <input type="password" id="password" v-model="form.password" />
        </div>

        <button type="submit" class="btn btn-save">Salvează modificările</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const user = ref<User | null>(null);
const showEdit = ref(false);
const form = ref({ name: '', password: '' });

const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
const userId = storedUser.id;

onMounted(async () => {
  try {
    const { data } = await axios.get(`http://172.20.10.3:5046/api/users/${userId}`);
    user.value = data;
    form.value.name = data.name;
  } catch (err) {
    console.error("Eroare la obținerea datelor utilizatorului:", err);
  }
});


const updateProfile = async () => {
  try {
    await axios.put(`http://172.20.10.3:5046/api/users/${userId}`, {
      name: form.value.name,
      password: form.value.password || null
    });
    user.value!.name = form.value.name;
    alert('Profil actualizat cu succes!');
    showEdit.value = false;
  } catch (err) {
    console.error('Eroare actualizare:', err);
  }
};
</script>

<style scoped>
.account-page {
  padding: 2rem;
}
.container {
  max-width: 600px;
  margin: auto;
}
.user-info p {
  font-size: 1.2rem;
}
.btn {
  background-color: #004502;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  margin-top: 1rem;
  cursor: pointer;
}
.btn-save {
  background-color: #025204;
}
.edit-form {
  margin-top: 1.5rem;
}
.form-group {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
}
</style>
