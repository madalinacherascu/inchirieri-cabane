<template>
  <div class="confirmation-page">
    <div class="container">
      <h1>Rezervarea a fost confirmată!</h1>

      <div v-if="reservation" class="reservation-details">
  <h2>Detalii cabană</h2>
  <ul>
    <li><strong>Nume cabană:</strong> {{ reservation.CabinName }}</li>
    <li><strong>Locație:</strong> {{ reservation.CabinLocation }}</li>
    <li><strong>Capacitate:</strong> {{ reservation.CabinCapacity }} persoane</li>
    <li><strong>Dormitoare:</strong> {{ reservation.CabinBedrooms }}</li>
    <li><strong>Preț/noapte:</strong> {{ reservation.CabinPrice }} lei</li>
    <li><strong>Preț total:</strong> {{ reservation.TotalPrice }} lei</li>
    <li v-if="reservation.checkIn"><strong>Check-in:</strong> {{ reservation.checkIn }}</li>
    <li v-if="reservation.checkOut"><strong>Check-out:</strong> {{ reservation.checkOut }}</li>
  </ul>

  <div class="pin-code">
    <h2>PIN de acces</h2>
    <p class="pin">{{ reservation.AccessPin }}</p>
  </div>



  <router-link to="/" class="btn btn-primary">Înapoi la pagina principală</router-link>
</div>


      <div v-else>
        <p>Nu există informații despre rezervare.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';



interface Reservation {
  CabinId: number;
  CabinName: string;
  CabinLocation: string;
  CabinCapacity: number;
  CabinBedrooms: number;
  CabinPrice: number;
  CabinDescription?: string;
  AccessPin: string;
  TotalPrice:number;
  checkIn?: string;
  checkOut?: string;
}


const reservation = ref<Reservation | null>(null);

onMounted(() => {
  const storedReservation = localStorage.getItem("reservation");
  if (storedReservation) {
    reservation.value = JSON.parse(storedReservation);
  }

});
</script>


<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.reservation-details ul {
  list-style: none;
  padding: 0;
}
.reservation-details li strong {
  color: #025204;
}

.total-label {
  font-weight: bold;
  color: #004502;
}
.qr-code-box {
  text-align: center;
  margin-top: 2rem;
}

.qr-code-box h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #004502;
}



.reservation-details li {
  margin-bottom: 0.5rem;
}

.pin-code {
  margin-top: 2rem;
  text-align: center;
}

.pin {
  font-size: 2rem;
  font-weight: bold;
  color: #4caf50;
}

.btn-primary {
  display: inline-block;
  margin-top: 2rem;
  padding: 0.5rem 1rem;
  background: #025204;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}
</style>