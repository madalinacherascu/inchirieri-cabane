<template>
  <div class="account-container">
    <h2>Contul meu</h2>

    <div class="account-card">
      <div v-if="user" class="account-field">
        <label>Nume:</label>
        <span>{{ user.Name }}</span>
      </div>

      <div v-if = "user" class="account-field">
        <label>Email:</label>
        <span>{{ user.Email }}</span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';

const user = ref<{ Name: string; Email: string; id: string, NumarTelefon: number } | null>(null);

onMounted(() => {
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      user.value = JSON.parse(stored); 
      console.log("User din localStorage:", user.value);
    } catch (e) {
      console.warn('Eroare la citirea user din localStorage:', e);
    }
  }
});
</script>


<style scoped>
.account-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.account-card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.account-field {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.account-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  gap: 1rem;
}

.edit-form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background-color:  #004502;;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}
</style>
