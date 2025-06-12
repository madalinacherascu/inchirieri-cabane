<template>
  <section class="results-section">

    <div class="cabins-grid grid grid-3" v-if="results.length">
      <div class="cabin-card" v-for="cabin in results" :key="cabin.id">
  <div class="cabin-image">
    <img :src="cabin.image" :alt="cabin.name" />
    <div class="cabin-location">
      <font-awesome-icon icon="map-marker-alt" />
      <span>{{ cabin.location }}</span>
    </div>
  </div>
  <div class="cabin-details">
    <h3>{{ cabin.name }}</h3>

    <div class="cabin-amenities-row">
      <span><font-awesome-icon icon="users" /> {{ cabin.capacity }} persoane</span>
      <span><font-awesome-icon icon="bed" /> {{ cabin.bedrooms }} dormitoare</span>
    </div>

    <div class="cabin-price-row">
      <span class="price">{{ cabin.price }} lei</span>
      <span class="duration">/ noapte</span>
    </div>

    <div class="cabin-bottom">
      <router-link :to="`/cabaneDetails/${cabin.id}`" class="btn">Vezi detalii</router-link>
    </div>
  </div>
</div>

    </div>

    <div v-else class="no-results-message">
      <font-awesome-icon icon="bed" class="empty-icon" />
      <h2>Nu am găsit nicio cabană</h2>
      <p>Încearcă să modifici criteriile de căutare.</p>
    </div>

    <div v-else class="no-results-message">
      <div class="empty-card">
        <font-awesome-icon icon="bed" class="empty-icon" />
        <h2>Nu am găsit nicio cabană</h2>
        <p>Încearcă să modifici criteriile de căutare și încearcă din nou.</p>
      </div>
    </div>

  </section>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

interface Cabin {
  id: number
  name: string
  location: string
  image: string
  capacity: number
  bedrooms: number
  price: number
  availabelfrom: string | null
  availableto: string | null
}


const route = useRoute()
const results = ref<Cabin[]>([])

onMounted(async () => {
  try {
    const response = await axios.get('http://172.20.10.3:5046/api/cabins/search', {
      params: {
        location: route.query.location,
        checkIn: route.query.checkIn,
        checkOut: route.query.checkOut,
        guests: parseInt(route.query.guests as string)
      }
    })

    results.value = response.data.map((cabin: any) => ({
      id: cabin.Id,
      name: cabin.Name,
      location: cabin.Location,
      image: cabin.Image,
      capacity: cabin.Capacity,
      bedrooms: cabin.Bedrooms,
      price: cabin.Price,
      availabelfrom: cabin.AvailableFrom,
      availableto: cabin.AvailableTo
    }))

    console.log(results.value)
  } catch (err) {
    console.error('Eroare la încărcarea rezultatelor:', err)
  }
})


</script>

<style scoped>

.cabin-amenities-row,
.cabin-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  color: var(--color-gray);
  font-size: 0.95rem;
}

.cabin-price-row .price {
  font-weight: bold;
  font-size: 1.05rem;
  color: #b68948;
}

.cabin-price-row .duration {
  font-size: 0.9rem;
  color: #888;
}

.cabin-card:hover {
  transform: translateY(-5px);
}

.cabin-image {
  position: relative;
  height: 250px;
}

.cabin-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cabin-location {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--color-white);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}



.cabin-details h3 {
  margin-bottom: 0.5rem;
}

.cabin-amenities {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  color: var(--color-gray);
}

.cabin-price {
  margin-bottom: 1rem;
}

.no-results-message {
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.empty-card {
  background-color: #f9f9f9;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 500px;
}

.empty-icon {
  font-size: 3rem;
  color: #7d7d7d;
  margin-bottom: 1rem;
}

.empty-card h2 {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.empty-card p {
  font-size: 1rem;
  color: #666;
}

.cabin-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  height: 100%;
}

.cabin-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 1.5rem;
}

.cabin-image {
  position: relative;
  height: 250px;
}

.cabin-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.results-section {
  padding: 2rem;
}

.no-results-message {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  text-align: center;
  color: #333;
}

.no-results-message h2 {
  font-weight: 500;
}
.cabin-bottom {
  margin-top: auto; 
}
</style>
