<template>
  <div>
    <section class="hero">
      <div class="hero-content">
        <h1>Evadează în natură</h1>
        <p>Descoperă cabane de vis în cele mai pitorești locații montane</p>
        <router-link to="/cabane" class="btn">Explorează cabane</router-link>
      </div>
    </section>
    <section class="search-section">
      <div class="search-box">
        <div class="search-field">
          <label for="location">
            <font-awesome-icon icon="map-marker-alt" />
            <span>Locație</span>
          </label>
          <select id="location" v-model="location">
            <option value="">Toate locațiile</option>
            <option value="brașov">Brașov</option>
            <option value="predeal">Predeal</option>
            <option value="sinaia">Sinaia</option>
            <option value="busteni">Bușteni</option>
            <option value="râșnov">Râșnov</option>
            <option valie="fundata">Fundata</option>
          </select>
        </div>

        <div class="search-field">
          <label for="check-in">
            <font-awesome-icon icon="calendar-alt" />
            <span>Check-in</span>
          </label>
          <input id="check-in" type="date" v-model="checkIn" />
        </div>

        <div class="search-field">
          <label for="check-out">
            <font-awesome-icon icon="calendar-alt" />
            <span>Check-out</span>
          </label>
          <input id="check-out" type="date" v-model="checkOut" />

        </div>

        <div class="search-field">
          <label for="guests">
            <font-awesome-icon icon="users" />
            <span>Oaspeți</span>
          </label>
          <select id="guests" v-model="guests">
            <option value="1">1 oaspete</option>
            <option value="2" selected>2 oaspeți</option>
            <option value="3">3 oaspeți</option>
            <option value="4">4 oaspeți</option>
            <option value="5">5 oaspeți</option>
            <option value="6">6+ oaspeți</option>
          </select>
        </div>

        <button class="search-btn" @click="handleSearch">
          <font-awesome-icon icon="search" />
          <span>Caută</span>
        </button>
      </div>

     <div class="results" v-if="searchResults.length">
  <h3 class="results-title">Rezultate găsite:</h3>
  <div class="cabin-grid">
    <div v-for="cabin in searchResults" :key="cabin.id" class="cabin-card">
      
      <!-- Imagine + Locație -->
      <div class="cabin-image">
        <img :src="cabin.image" :alt="`Imagine ${cabin.name}`" />
        <div class="cabin-location">
          <i class="fas fa-map-marker-alt"></i>
          {{ cabin.location }}
        </div>
      </div>

      <!-- Detalii -->
      <div class="cabin-details">
        <h4 class="cabin-name">{{ cabin.name }}</h4>

        <!-- Preț -->
        <div class="cabin-price">
          <div class="price">{{ cabin.price }} RON</div>
          <div class="duration">/ noapte</div>
        </div>

        <!-- Capacitate și Dormitoare -->
        <div class="cabin-amenities">
          <span>{{ cabin.capacity }} persoane</span>
          <span>{{ cabin.bedrooms }} dormitoare</span>
        </div>

        <!-- Disponibilitate -->
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

      </div>
    </div>
  </div>
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

        <div class="text-center mt-4">
          <router-link to="/cabane" class="btn btn-outline">Vezi toate cabanele</router-link>
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
          <router-link to="/rezervare" class="btn btn-lg">Rezervă o cabană</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router'

const fetchData = async <T>(
  url: string,
  transformFn: (item: any) => T,
  targetArray: Ref<T[]>,
  params: Record<string, any> = {} // al patrulea parametru
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
  description?: string;
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

const location = ref('')
const checkIn = ref('')
const checkOut = ref('')
const guests = ref('2')

const searchResults = ref<Cabin[]>([]);


const handleSearch = async () => {
  await fetchData(
    'http://172.20.10.3:5046/api/cabins/search',
    (cabin) => ({
      id: cabin.Id,
      name: cabin.Name,
      location: cabin.Location,
      image: cabin.Image,
      capacity: cabin.Capacity,
      bedrooms: cabin.Bedrooms,
      price: cabin.Price,
      availableFrom: cabin.AvailableFrom,
      availableTo: cabin.AvailableTo,
      checkIn: cabin.CheckIn,
      checkOut: cabin.CheckOut
    }),
    searchResults,
    {
      location: location.value,
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      guests: guests.value
    }
  )
}

</script>

<style scoped>
.results-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.cabin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.results-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.no-results {
  text-align: center;
  color: var(--color-gray);
  padding: 2rem 0;
  font-style: italic;
}
.cabin-availability {
  background-color: rgba(39, 174, 96, 0.1); /* verde deschis */
  color: #27ae60; /* verde accent */
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  display: inline-block;
  margin-top: 0.75rem;
}

.cabin-availability .label {
  font-weight: 600;
  margin-right: 0.25rem;
}

.cabin-availability .dates {
  font-style: italic;
}


.hero {
  height: 80vh;
  min-height: 600px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://ext.same-assets.com/0/2960537118.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-white);
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

.hero .btn {
  font-size: 1.125rem;
  padding: 1rem 2rem;
}

.search-section {
  margin-top: -50px;
  margin-bottom: 2rem;
  position: relative;
  z-index: 10;
}

.search-box {
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 1.5rem;
  gap: 1rem;
}

.search-field {
  flex: 1;
  min-width: 0;
}

.search-field label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.search-field select,
.search-field input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
}

.search-btn {
  align-self: flex-end;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-accent);
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: var(--color-secondary);
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


.cta {
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://ext.same-assets.com/0/3795016732.png');
  background-size: cover;
  background-position: center;
  color: var(--color-white);
  text-align: center;
  padding: 6rem 0;
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

.mt-4 {
  margin-top: 2.5rem;
}

@media (max-width: 992px) {
  .search-box {
    flex-wrap: wrap;
  }

  .search-field {
    min-width: calc(50% - 0.5rem);
  }

  .search-btn {
    min-width: 150px;
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1.25rem;
  }

  .search-field {
    min-width: 100%;
  }

  .search-btn {
    width: 100%;
  }

  .cta h2 {
    font-size: 2rem;
  }

  .cta p {
    font-size: 1rem;
  }
}
</style>
