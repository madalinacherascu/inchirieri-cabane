<template>
  <div class="bookings-container">
    <h2>Rezervările mele</h2>

    <div v-if="bookings.length === 0" class="no-bookings">
      Nu ai nicio rezervare.
    </div>

    <div v-else class="booking-list">
      <div v-for="booking in bookings" :key="booking.id" class="booking-card">
        <p><strong>Cabină:</strong> {{ booking.cabinName }}</p>
        <p><strong>Data început:</strong> {{ formatDate(booking.startDate) }}</p>
        <p><strong>Data sfârșit:</strong> {{ formatDate(booking.endDate) }}</p>
        <p><strong>Status:</strong> {{ booking.status }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Booking {
  id: string
  cabinName: string
  startDate: string
  endDate: string
  status: string
}

const bookings = ref<Booking[]>([])

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Obține ID-ul utilizatorului din localStorage
let userId = ''
const storedUserRaw = localStorage.getItem('user')

if (storedUserRaw) {
  try {
    const storedUser = JSON.parse(storedUserRaw)
    userId = storedUser?.id || ''
  } catch (e) {
    console.error('Eroare la parsarea userului:', e)
  }
}

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    console.warn('Token lipsă – utilizator neautentificat.')
    return
  }

  try {
    const response = await fetch('http://172.20.10.3:5174/api/bookings/mine', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) throw new Error('Eroare la încărcarea rezervărilor')

    const data = await response.json()
    bookings.value = data
  } catch (error) {
    console.error('Eroare la fetch:', error)
  }
})

</script>

<style scoped>
.bookings-container {
  padding: 1.5rem;
}
.booking-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.booking-card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.no-bookings {
  font-style: italic;
}
</style>
