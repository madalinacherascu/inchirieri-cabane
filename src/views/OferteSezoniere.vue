<template>
  <div class="seasonal-page">
    <div class="container">
      <h1>Oferte sezoniere</h1>
      <p class="intro">
        Profită de cele mai bune oferte la cabanele noastre în diferite perioade ale anului. 
        Reduceri speciale, pachete all-inclusive și cadouri de bun venit pentru oaspeți.
      </p>

      <div class="offers-grid">
        <div class="offer-card" v-for="offer in offers" :key="offer.id">
          <img :src="offer.image" :alt="offer.title" />
          <div class="offer-content">
            <h2>{{ offer.title }}</h2>
            <p class="description">{{ offer.description }}</p>
            <p class="validity">Valabil: {{ offer.validity }}</p>
          </div>
        </div>
      </div>

      <div class="cta">
        <router-link to="/cabane" class="btn">Vezi cabanele disponibile</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Offer {
  id: number
  title: string
  description: string
  validity: string
  image: string
}

const offers: Offer[] = [
  {
    id: 1,
    title: 'Pachet de iarnă - 20% reducere',
    description: 'Rezervă o cabană în perioada 1 decembrie - 15 februarie și beneficiezi de 20% reducere la sejururi de minim 3 nopți.',
    validity: '01.12.2024 - 15.02.2025',
    image: 'https://static4.depositphotos.com/1021974/355/i/450/depositphotos_3554750-stock-photo-20-percent-discount.jpg'
  },
  {
    id: 2,
    title: 'Oferta de primăvară',
    description: '2 nopți + 1 noapte gratuită pentru rezervări făcute în martie și aprilie. Ideal pentru relaxare în natură!',
    validity: '01.03.2025 - 30.04.2025',
    image: 'https://cdn.pixabay.com/photo/2020/03/01/13/52/flowers-4895689_1280.jpg'
  },
  {
    id: 3,
    title: 'Early booking vară 2025',
    description: 'Rezervă acum pentru perioada de vară și obții mic dejun gratuit și un voucher de activități în aer liber.',
    validity: '01.06.2025 - 31.08.2025',
    image: 'https://cdn.pixabay.com/photo/2020/06/03/09/06/mountains-5254745_1280.jpg'
  }
]
</script>

<style scoped>
.seasonal-page {
  background-color: #f8f9f8;
  padding: 2rem 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #004502;
}

.intro {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #555;
}

.offers-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.offer-card {
  background: #f6fef6;
  border: 1px solid #cbe8c6;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.offer-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.offer-content {
  padding: 1.2rem;
}

.offer-content h2 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.description {
  color: #444;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.validity {
  font-size: 0.9rem;
  color: #2c6e49;
  font-weight: 500;
}

.cta {
  text-align: center;
  margin-top: 2.5rem;
}

.btn {
  background-color: #004502;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
}

.btn:hover {
  background-color: #05620a;
}
</style>
