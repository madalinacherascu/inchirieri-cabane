<template>
  <div class="cabin-details-page">
    <div v-if="cabin" class="container">
      <div v-if="cabin.images?.length" class="carousel">
        <img
          v-for="(img, index) in cabin.images"
          :key="index"
          :src="img"
          :alt="`Imagine ${index + 1}`"
          class="carousel-img"
        />
      </div>

      <div v-else class="image-wrapper">
        <img :src="cabin.image || '/fallback.jpg'" :alt="cabin.name" />
      </div>

      <div class="details-content">
        <h1>{{ cabin.name }}</h1>
        <p class="location">
          <font-awesome-icon icon="map-marker-alt" />
          {{ cabin.location }}
        </p>

        <div class="info-grid">
          <div class="info-item">
            <font-awesome-icon icon="users" />
            <span>{{ cabin.capacity }} persoane</span>
          </div>
          <div class="info-item">
            <font-awesome-icon icon="bed" />
            <span>{{ cabin.bedrooms }} dormitoare</span>
          </div>
          <div class="info-item">
            <font-awesome-icon :icon="['fas', 'money-bill-wave']" />
            <span>{{ cabin.price }} lei / noapte</span>
          </div>
        </div>

        <section class="cabin-info" >
          <p class="description">
            {{ cabin.description || 'Această cabană nu are o descriere disponibilă momentan.' }}
          </p>

          <div v-if="cabin.amenities" class="amenities-box">
            <h2>Facilități disponibile</h2>
            <ul class="amenities-list">
              <li v-for="(item, index) in String(cabin.amenities).split(',')" :key="index">
                <font-awesome-icon :icon="getAmenityIcon(item.trim())" class="amenity-icon" />
                {{ item.trim() }}
              </li>
            </ul>
          </div>
        </section>

        <div class="actions">
          <router-link class="reserve-btn" :to="`/rezervareCabane/${cabin.id}`">
            Rezervă acum
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      Se încarcă detaliile cabanei...
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Cabin {
  id: number;
  name: string;
  location: string;
  image: string;
  images?: string[];
  capacity: number;
  bedrooms: number;
  price: number;
  description?: string;
  amenities?: string;
}

const route = useRoute();
const cabin = ref<Cabin | null>(null);

const amenityIcons: Record<string, IconProp> = {
  WiFi: 'wifi',
  Parcare: 'car',
  Grătar: 'fire',
  Piscină: 'swimming-pool',
  Ciubăr: 'hot-tub',
  Încălzire: 'temperature-high',
  Televizor: 'tv',
  Frigider: 'snowflake',
  Bucătărie: 'utensils',
  Âncălzire: 'fire',
  Animale: 'paw',
};

function getAmenityIcon(label: string): IconProp {
  const normalized = label.trim().toLowerCase();
  const found = Object.keys(amenityIcons).find((key) => normalized.includes(key.toLowerCase()));
  return found ? amenityIcons[found] : 'check-circle';
}

onMounted(async () => {
  try {
    const { data } = await axios.get(`http://172.20.10.3:5046/api/cabins/${route.params.id}`);
    cabin.value = {
      id: data.Id,
      name: data.Name,
      location: data.Location,
      image: data.Image,
      images: data.Images,
      capacity: data.Capacity,
      bedrooms: data.Bedrooms,
      price: data.Price,
      description: data.Description,
      amenities: data.Amenities,
    };
  } catch (error) {
    console.error('Eroare la încărcarea detaliilor cabanei:', error);
  }
});
</script>

<style scoped>
.cabin-details-page {
  padding: 2rem 0;
  background-color: #f9f9f9;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
}
.carousel {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem 0;
}
.description {
  max-width: 1000px;
  font-size: 1.1rem;
  color: #444;
  line-height: 1.8;
  margin: 2rem auto;
  text-align: justify;
  white-space: pre-line;
  font-family: 'Georgia', serif;
}

.carousel-img {
  height: 300px;
  flex-shrink: 0;
  border-radius: 8px;
  object-fit: cover;
}
.image-wrapper img {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
}
.details-content {
  padding: 2rem;
}
h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.location {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.info-grid {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #444;
}
.description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.6;
}
.amenities-box {
  background-color: #f1f6f4;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
}
.amenities-box h2 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #1a3e2f;
}
.amenities-list {
  list-style: none;
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem 1.5rem;
}
.amenity-icon {
  color: #2a7f4f;
  margin-right: 0.5rem;
}
.actions {
  display: flex;
  justify-content: center;
}
.reserve-btn {
  background-color: #004502;
  color: white;
  padding: 0.9rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background 0.3s ease;
}
.reserve-btn:hover {
  background-color: #034e06;
}
.loading {
  text-align: center;
  font-size: 1.5rem;
  padding: 3rem;
}
</style>
