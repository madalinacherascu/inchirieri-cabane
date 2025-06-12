<template>
    <div class="reset-password-page">
      <div class="reset-form-container">
        <h2>Resetare parolă</h2>
        <p>Introduceți adresa de email asociată contului dumneavoastră.</p>
  
        <form @submit.prevent="submitForm" class="reset-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" v-model="email" required />
          </div>
  
          <button type="submit" class="btn btn-full">Trimite linkul de resetare</button>
        </form>
  
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  const email = ref('');
  const successMessage = ref('');
  const errorMessage = ref('');
  
  const submitForm = async () => {
    try {
      await axios.post('http://172.20.10.3:5046/api/auth/forgot-password', { email: email.value });
  
      successMessage.value = 'Dacă adresa există în sistem, veți primi un email cu instrucțiuni.';
      errorMessage.value = '';
    } catch (error) {
      console.error(error);
      errorMessage.value = 'A apărut o eroare. Încercați din nou mai târziu.';
      successMessage.value = '';
    }
  };
  </script>
  
  <style scoped>
  .reset-password-page {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5rem;
    min-height: 70vh;
    background-color: #f9f9f9;
  }
  
  .reset-form-container {
    background-color: var(--color-white);
    padding: 2rem 2.5rem;
    border-radius: 10px;
    box-shadow: var(--shadow);
    max-width: 450px;
    width: 100%;
  }
  
  .reset-form .form-group {
    margin-bottom: 1.5rem;
  }
  
  .reset-form input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  
  .success-message {
    margin-top: 1rem;
    color: green;
  }
  
  .error-message {
    margin-top: 1rem;
    color: red;
  }
  
  .btn-full {
    width: 100%;
  }
  </style>
  