<template>
    <div class="register-page">
      <div class="register-form-container">
        <h2>Înregistrare</h2>
  
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nume complet</label>
            <input id="name" type="text" v-model="form.name" required />
          </div>
  
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" v-model="form.email" required />
          </div>
  
          <div class="form-group">
            <label for="password">Parolă</label>
            <input id="password" type="password" v-model="form.password" required />
          </div>
  
          <div class="form-group">
            <label for="confirmPassword">Confirmă parola</label>
            <input id="confirmPassword" type="password" v-model="form.confirmPassword" required />
          </div>
  
          <button type="submit" class="btn btn-full">Creează cont</button>
        </form>
  
        <p v-if="formSubmitted" class="success-message">Cont creat cu succes!</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  
        <div class="login-prompt">
          <span>Aveți deja cont?</span>
          <router-link to="/authentification" class="btn-link">Autentificați-vă</router-link>
        </div>
      </div>
    </div>
  </template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios from 'axios';

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const formSubmitted = ref(false);
const errorMessage = ref('');

const submitForm = async () => {
  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Parolele nu se potrivesc.';
    return;
  }

  try {
    const response = await axios.post('http://172.20.10.3:5046/api/auth/register', {
      name: form.name,
      email: form.email,
      password: form.password
    });

    const { user } = response.data;

    localStorage.setItem('user', JSON.stringify(user));

    window.location.href = '/';

    formSubmitted.value = true;
    errorMessage.value = '';
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Eroare la înregistrare. Verificați datele.';
  }
};

</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 4rem;
  background-color: #f6f8f5;
  min-height: 100vh;
}

.register-form-container {
  background-color: var(--color-white);
  border-radius: 10px;
  max-width: 450px;
  width: 100%;
  padding: 2rem 2.5rem;
  box-shadow: var(--shadow);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
}

.btn-full {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--color-accent);
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.success-message {
  margin-top: 1rem;
  color: green;
}

.error-message {
  margin-top: 1rem;
  color: red;
}

.login-prompt {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.95rem;
}

.btn-link {
  margin-left: 0.5rem;
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}
</style>
