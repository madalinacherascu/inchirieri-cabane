<template>
  <div class="auth-page">
    <div class="auth-form-container">
      <h2>Autentificare</h2>

      <form class="auth-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="form.email" required />
        </div>

        <div class="form-group">
          <label for="password">Parolă</label>
          <input id="password" type="password" v-model="form.password" required />
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="form.rememberMe" />
            Ține-mă minte
          </label>
          <router-link to="/ResetareParola" class="forgot-password">Ați uitat parola?</router-link>
        </div>

        <button type="submit" class="btn btn-full">Autentificare</button>
      </form>

      <p v-if="formSubmitted" class="success-message">Autentificare reușită!</p>
      <p v-if="loginError" class="error-message">Email sau parolă incorectă.</p>

      <div class="register-prompt">
        <span>Nu aveți cont?</span>
        <router-link to="/registration" class="btn-link">Înregistrați-vă</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios from 'axios';

const form = reactive({
  id:'',
  email: '',
  password: '',
  rememberMe: false
});

const formSubmitted = ref(false);
const loginError = ref(false);

const submitForm = async () => {
  try {
    const response = await axios.post('http://172.20.10.3:5046/api/auth/login', {
      id: form.id,
      email: form.email,
      password: form.password,
      rememberMe: form.rememberMe
    });

    const user = response.data;
localStorage.setItem('user', JSON.stringify(user));

window.location.href = '/';


    formSubmitted.value = true;
    loginError.value = false;
  } catch (error) {
    console.error('Eroare autentificare:', error);
    formSubmitted.value = false;
    loginError.value = true;
  }
};

</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 5rem;
  background-color: #f6f8f5;
}


.auth-form-container {
  background-color: var(--color-white);
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  padding: 2rem 2.5rem;
  box-shadow: var(--shadow);
}



.auth-form-container h2 {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.forgot-password {
  font-size: 0.875rem;
  color: var(--color-accent);
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.btn-full {
  width: 100%;
}

.success-message {
  margin-top: 1rem;
  color: green;
  font-weight: 500;
}

.error-message {
  margin-top: 1rem;
  color: red;
  font-weight: 500;
}

.register-prompt {
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

</style>