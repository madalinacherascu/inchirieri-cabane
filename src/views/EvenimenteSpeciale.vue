<template>
  <div class="events-page">
    <div class="container">
      <h1>Evenimente speciale</h1>
      <p class="intro">
        Cabanele noastre sunt locația ideală pentru a organiza evenimente unice într-un cadru natural spectaculos.
        Oferim suport complet pentru organizare și cazare, indiferent de ocazie.
      </p>

      <div class="event-grid">
        <div v-for="event in events" :key="event.id" class="event-card">
          <img :src="event.image" :alt="event.title" class="event-image" />
          <div class="event-content">
            <h2>{{ event.title }}</h2>
            <p>{{ event.description }}</p>
            <p class="tagline">{{ event.tagline }}</p>
          </div>
        </div>
      </div>

      <div class="cta">
        <router-link to="/contact" class="btn btn-primary">Solicită ofertă personalizată</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface EventType {
  id: number
  title: string
  description: string
  image: string
  tagline: string
}

const events: EventType[] = [
  {
    id: 1,
    title: 'Petreceri private',
    description: 'Cabane izolate perfect amenajate pentru aniversări, reuniuni sau petreceri restrânse.',
    tagline: 'Intimitate și relaxare într-un peisaj montan liniștit.',
    image: 'https://newsbucuresti.ro/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-28-at-16.11.03-1068x712.jpeg'
  },
  {
    id: 2,
    title: 'Evenimente corporate',
    description: 'Team building-uri, workshopuri sau conferințe într-un mediu natural care inspiră și relaxează.',
    tagline: 'Motivație, conectare și productivitate în aer liber.',
    image: 'https://www.fotoiustin.ro/wp-content/uploads/2019/01/evenimente_35.jpg'
  },
  {
    id: 3,
    title: 'Nunti și botezuri',
    description: 'Creează amintiri de neuitat în mijlocul naturii. Locații pentru ceremonie și petrecere.',
    tagline: 'Un cadru magic pentru un moment special.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGpqneJLN8K28jKSzIffwQ4V9dCtdPU_1cJA&s'
  },
  {
    id: 4,
    title: 'Retreat-uri și tabere',
    description: 'Organizează sesiuni de yoga, meditație, dezvoltare personală sau detox digital.',
    tagline: 'Reîncarcă-ți mintea și corpul într-un loc aparte.',
    image: 'https://spiritmap.ro/wp-content/uploads/2023/03/Retreat-Romania.webp'
  }
]
</script>

<style scoped>
.events-page {
  padding: 2rem 0;
  background-color: #f9f9f9;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 2.4rem;
  color: #004502;
  margin-bottom: 1rem;
}

.intro {
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.event-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.event-card {
  border: 1px solid #d8eeda;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f6fef6;
  display: flex;
  flex-direction: column;
}

.event-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.event-content {
  padding: 1.5rem;
}

h2 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.tagline {
  margin-top: 0.75rem;
  color: #2c6e49;
  font-weight: 500;
}

.cta {
  margin-top: 3rem;
  text-align: center;
}

.btn-primary {
  background-color: #004502;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
}
.btn-primary:hover {
  background-color: #05620a;
}
</style>
