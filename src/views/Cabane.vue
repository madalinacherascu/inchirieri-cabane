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
        <h2 class="section-title">Alege CabaneMontane</h2>
        <div class="filters">
          <div class="filter-group">
            <label for="location-filter">
              <font-awesome-icon icon="map-markerk-alt" />
              <span>Locație</span>
            </label>
            <select id="location-filter" v-model="filters.location">
              <option value="">Toate locațiile</option>
              <option value="Râșnov">Râșnov</option>
              <option value="Fundata">Fundata</option>
              <option value="Predeal">Predeal</option>
              <option value="Moieciu">Moieciu</option>
              <option value="Bușteni">Bușteni</option>
              <option value="Bran">Bran</option>
              <option value="Azuga">Azuga</option>
              <option value="Zărnești">Zărnești</option>
            </select>

          </div>
          <div class="filter-group">
            <label for="check-in">
              <font-awesome-icon icon="calendar-alt" />
              <span>Check-in</span>
            </label>
            <input id="check-in" type="date" v-model="checkIn" />
          </div>
          <div class="filter-group">
            <label for="check-out">
              <font-awesome-icon icon="calendar-alt" />
              <span>Check-out</span>
            </label>
            <input id="check-out" type="date" v-model="checkOut" />
          </div>

          <div class="filter-group">
            <label for="capacity-filter">
              <font-awesome-icon icon="users" />
              <span>
                Oaspeți
              </span>
            </label>
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
          <div class="cabin-card" v-for="cabin in filteredCabins" :key="cabin.id">

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
              <div class="cabin-availability" v-if="cabin.availableFrom || cabin.availableTo">
                <span class="label">Disponibilitate:</span>
                <span class="dates">
                  <template v-if="cabin.availableFrom">
                    {{ new Date(cabin.availableFrom).toLocaleDateString('ro-RO') }}
                  </template>
                  <span v-if="cabin.availableFrom && cabin.availableTo"> – </span>
                  <template v-if="cabin.availableTo">
                    {{ new Date(cabin.availableTo).toLocaleDateString('ro-RO') }}
                  </template>
                </span>
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
import { computed } from 'vue';

const checkIn = ref('')
const checkOut = ref('')

const filteredCabins = computed(() => {
  let result = cabins.value;

  if (filters.location) {
    result = result.filter(cabin =>
      cabin.location.toLowerCase().startsWith(filters.location.toLowerCase())
    );
  }


  console.log('Filtru:', filters.location, '| Valori:', result.map(r => r.location));


  if (filters.capacity) {
    const capacity = parseInt(filters.capacity);
    if (filters.capacity === '8') {
      result = result.filter(cabin => cabin.capacity >= 8);
    } else {
      result = result.filter(cabin => cabin.capacity === capacity);
    }
  }

  switch (filters.sort) {
    case 'price-asc':
      result = result.slice().sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result = result.slice().sort((a, b) => b.price - a.price);
      break;
    case 'capacity-asc':
      result = result.slice().sort((a, b) => a.capacity - b.capacity);
      break;
    case 'capacity-desc':
      result = result.slice().sort((a, b) => b.capacity - a.capacity);
      break;
  }

  return result;
});

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
  availableFrom: string | null;
  availableTo: string | null;
  checkIn?: string | null;
  checkOut?: string | null;
  
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
  height: 40vh;
  min-height: 300px;
  background-image: linear-gradient(rgba(10, 68, 68, 0.5), rgba(255, 255, 255, 0.5)), url('https://ext.same-assets.com/0/2960537118.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-white);
  position: relative;
  z-index: 0; /* pentru referință */
  
}

.page-header::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 50px;
  background: #f4f6f4; /* sau #f8fafc dacă ai alta culoare mai deschisă jos */
  border-top-left-radius: 100% 100px;
  border-top-right-radius: 100% 100px;
  z-index: -1; /* 🟢 esențial: trimite curbura sub conținut */
}


.page-header-content {
  max-width: 800px;
  padding: 0 1rem;
}

.page-header h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: var(--color-white);
}

.page-header p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
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
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #2f3e46;
  min-width: 140px;
}

.filter-group label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.filter-group input,
.filter-group select {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #fff;
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
.section-title {
  margin-top: -4rem; /* ridică titlul cu ~16px */
  margin-bottom: 2rem; /* păstrează spațiu sub el */
  font-size: 2rem;
  font-weight: bold;
  color: #2f3e46;
  text-align: center;
}

</style>
