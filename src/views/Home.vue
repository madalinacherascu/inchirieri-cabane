<template>
  <div>
    <section class="hero">
      <div class="hero-content">
        <h1>Evadează în natură</h1>
        <p>Descoperă cabane de vis în cele mai pitorești locații montane</p>
        
      </div>
    </section>

    <section>
      <div>
        <h2 class="section-title">De ce să alegi CabaneMontane?</h2>
        <div class="features grid grid-3">
          <div class="feature-card">
            <div class="feature-icon">
              <font-awesome-icon icon="mountain" />
            </div>
            <h3>Locații de vis</h3>
            <p>Cabane situate în cele mai pitorești zone montane din România, cu priveliști spectaculoase și aer curat.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <font-awesome-icon icon="check" />
            </div>
            <h3>Confort garantat</h3>
            <p>Toate cabanele noastre sunt echipate complet pentru a-ți oferi o experiență de neuitat în mijlocul
              naturii.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <font-awesome-icon icon="tree" />
            </div>
            <h3>Natură autentică</h3>
            <p>Conectează-te cu natura și bucură-te de liniște departe de aglomerația orașului.</p>
          </div>
        </div>
      </div>

    </section>
    <section class="section popular-cabins">
      <div class="container">
        <h2 class="section-title">Cabane populare</h2>

        <div class="cabins-grid grid grid-3">
          <div class="cabin-card" v-for="cabin in popularCabins.slice(0, 3)" :key="cabin.id">

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
              <router-link :to="`/cabaneDetails/${cabin.id}`" class="btn">Vezi detalii</router-link>

            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section popular-locations">
      <div class="container">
        <h2 class="section-title">Explorează locațiile noastre</h2>

        <div class="locations-grid grid grid-4">
          <div class="location-card" v-for="location in popularLocations" :key="location.id">
            <div class="location-image">
              <img :src="location.image" :alt="location.name" />
            </div>
            <div class="location-details">
              <h3>{{ location.name }}</h3>
              <p>{{ location.cabinCount }} cabane</p>
              <router-link :to="`/locatii/${location.id}`" class="location-link">
                Explorează <font-awesome-icon icon="chevron-right" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section testimonials">
      <div class="container">
        <h2 class="section-title">Ce spun clienții noștri</h2>

        <div class="testimonials-grid grid grid-3">
          <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial.id">
            <div class="testimonial-content">
              <p>"{{ testimonial.content }}"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-name">{{ testimonial.author }}</div>
              <div class="author-location">{{ testimonial.location }}</div>
              <div class="author-testimonials" v-if="testimonial.review">
                <i v-for="n in testimonial.review" :key="n" :class="'fas fa-star'"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section cta">
      <div class="container">
        <div class="cta-content">
          <h2>Pregătit pentru o experiență de neuitat?</h2>
          <p>Rezervă acum o cabană și bucură-te de frumusețea naturii!</p>
          <router-link to="/cabane" class="btn btn-lg">Rezervă o cabană</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';


const fetchData = async <T>(
  url: string,
  transformFn: (item: any) => T,
  targetArray: Ref<T[]>,
  params: Record<string, any> = {}
) => {
  try {
    const response = await axios.get(url, { params });
    targetArray.value = response.data.map(transformFn);
  } catch (error) {
    console.error('Eroare la fetch:', error);
  }
};

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
  amenities?: string;
  checkIn?: string | null;
  checkOut?: string | null;
  images?: string[];
}

interface Location {
  id: number;
  name: string;
  image: string;
  cabinCount: number;
}
interface Testimonial {
  id: number;
  content: string;
  location: string;
  author: string;
  review: number;
}

const popularCabins = ref<Cabin[]>([]);
const popularLocations = ref<Location[]>([]);
const testimonials = ref<Testimonial[]>([]);

onMounted(async () => {
  await fetchData('http://172.20.10.3:5046/api/cabins', (cabin) => ({
    id: cabin.Id,
    name: cabin.Name,
    location: cabin.Location,
    image: cabin.Image,
    capacity: cabin.Capacity,
    bedrooms: cabin.Bedrooms,
    price: cabin.Price
  }), popularCabins);

  await fetchData('http://172.20.10.3:5046/api/location', (location) => ({
    id: location.Id,
    name: location.Name,
    image: location.Image,
    cabinCount: location.CabinCount
  }), popularLocations);

  await fetchData('http://172.20.10.3:5046/api/testimonials', (testimonials) => ({
    id: testimonials.Id,
    content: testimonials.Content,
    author: testimonials.Author,
    location: testimonials.Location,
    review: testimonials.Review
  }), testimonials);

});

</script>

<style scoped>

.hero {
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
  z-index: 0;
}

.hero::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 50px;
  background: #f4f6f4; 
  border-top-left-radius: 100% 100px;
  border-top-right-radius: 100% 100px;
  z-index: -1; 
}
.cta {
  background-image: linear-gradient(rgba(10, 68, 68, 0.5), rgba(255, 255, 255, 0.5)), url('https://ext.same-assets.com/0/2960537118.png');
  background-size: cover;
  background-position: center;
  color: var(--color-white);
  text-align: center;
  padding: 6rem 0;
  position: relative;
  z-index: 0;
}

.cta::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 50px;
  background: #f4f6f4; 
  border-bottom-left-radius: 100% 100px;
  border-bottom-right-radius: 100% 100px;
  z-index: -1;
}

.hero-content {
  max-width: 800px;
  padding: 0 1rem;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: var(--color-white);
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.feature-card {
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
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

.location-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  height: 300px;
}

.location-image {
  height: 100%;
}

.location-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.location-card:hover .location-image img {
  transform: scale(1.05);
}

.location-details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: var(--color-white);
}

.location-details h3 {
  color: var(--color-white);
  margin-bottom: 0.5rem;
}

.location-link {
  margin-top: 0.5rem;
  display: inline-flex;
  align-items: center;
  color: var(--color-accent);
  gap: 0.5rem;
  font-weight: 600;
}

.testimonial-card {
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow);
}

.testimonial-content {
  margin-bottom: 1.5rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
}

.author-location {
  color: var(--color-gray);
  font-size: 0.875rem;
}

.author-testimonials i {
  color: gold;
  margin-right: 2px;
}

.cta h2 {
  color: var(--color-white);
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.cta p {
  margin-bottom: 2rem;
  font-size: 1.25rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.hero-divider {
  height: 80px;
  background-color: #e1e5e7; 
  border-top-left-radius: 100% 50px;
  border-top-right-radius: 100% 50px;
  margin-top: -20px;
}


.btn-lg {
  font-size: 1.125rem;
  padding: 1rem 2rem;
}

.btn-outline {
  background-color: transparent;
  border: 2px solid var(--color-accent);
  color: var(--color-accent);
}

.btn-outline:hover {
  background-color: var(--color-accent);
  color: var(--color-white);
}

</style>
