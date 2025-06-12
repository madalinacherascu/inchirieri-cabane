<template>
  <div class="cabane-page">
    <div class="page-header">
      <div class="container">
        <h1>Cabane disponibile</h1>
        <p>Explorează selecția noastră de cabane montane și alege-o pe cea perfectă pentru tine</p>
      </div>
    </div>

    <div class="container">
      <section class="section">
        <div class="filters">
          <div class="filter-group">
            <label for="location-filter">Locație</label>
            <select id="location-filter" v-model="filters.location">
              <option value="">Toate locațiile</option>
              <option value="brasov">Brașov</option>
              <option value="predeal">Predeal</option>
              <option value="sinaia">Sinaia</option>
              <option value="busteni">Bușteni</option>
              <option value="rasnov">Râșnov</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="capacity-filter">Capacitate</label>
            <select id="capacity-filter" v-model="filters.capacity">
              <option value="">Toate capacitățile</option>
              <option value="2">2 persoane</option>
              <option value="4">4 persoane</option>
              <option value="6">6 persoane</option>
              <option value="8">8+ persoane</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="sort-filter">Sortare</label>
            <select id="sort-filter" v-model="filters.sort">
              <option value="popular">Popularitate</option>
              <option value="price-asc">Preț (crescător)</option>
              <option value="price-desc">Preț (descrescător)</option>
              <option value="capacity-asc">Capacitate (crescător)</option>
              <option value="capacity-desc">Capacitate (descrescător)</option>
            </select>
          </div>
        </div>

        <div class="cabins-grid grid grid-3">
          <div class="cabin-card" v-for="cabin in cabins" :key="cabin.id">
            <div class="cabin-image">
              <img :src="cabin.image" :alt="cabin.name" />
              <div class="cabin-location">
                <font-awesome-icon icon="map-marker-alt" />
                <span>{{ cabin.location }}</span>
              </div>
            </div>
            <div class="cabin-details">
              <h3>{{ cabin.name }}</h3>
              <div class="cabin-amenities">
                <span>
                  <font-awesome-icon icon="users" />
                  {{ cabin.capacity }} persoane
                </span>
                <span>
                  <font-awesome-icon icon="bed" />
                  {{ cabin.bedrooms }} dormitoare
                  
                </span>
              </div>
              <div class="cabin-price">
                <span class="price">{{ cabin.price }} lei</span>
                <span class="duration">/ noapte</span>
              </div>
               <div class="cabin-bottom">
            <router-link :to="`/cabaneDetails/${cabin.id}`" class="btn">Vezi detalii</router-link>
          </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, reactive, onMounted } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';
const fetchData = async (url: string, transformer: (item: any) => any, target: Ref<any[]>) => {
  try {
    const { data } = await axios.get(url);
    target.value = data.map(transformer);
  } catch (error) {
    console.error(`Eroare la încărcarea de la ${url}:`, error);
  }
};
const cabins = ref<Cabin[]>([]);

const filters = reactive({
  location: '',
  capacity: '',
  sort: 'popular'
});

interface Cabin {
  id: number;
  name: string;
  location: string;
  image: string;
  capacity: number;
  bedrooms: number;
  price: number;
}

onMounted(async () => {
  await fetchData('http://172.20.10.3:5046/api/cabins', (cabin) => ({
    id: cabin.Id,
    name: cabin.Name,
    location: cabin.Location,
    image: cabin.Image,
    capacity: cabin.Capacity,
    bedrooms: cabin.Bedrooms,
    price: cabin.Price
  }), cabins);
});

</script>

<style scoped>
.page-header {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 4rem 0;
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  color: var(--color-white);
  margin-bottom: 1rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  background-color: var(--color-white);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.filter-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
}

.cabin-card {
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
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

.cabin-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 1.5rem;
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

.cabin-price .price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
}

.cabin-price .duration {
  font-size: 0.875rem;
  color: var(--color-gray);
}
.cabin-bottom {
  margin-top: auto; 
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    gap: 1rem;
  }

  .filter-group {
    width: 100%;
  }
}
</style>
