<template>
    <div class="logout-message">
      <h2>Ai fost delogat cu succes!</h2>
      <p>Veți fi redirecționat în câteva secunde...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  
  onMounted(() => {
    setTimeout(() => {
      window.location.href = '/';
    }, 2000); 
  });
  </script>
  
  <style scoped>
  .logout-message {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    text-align: center;
  }
  </style>
  