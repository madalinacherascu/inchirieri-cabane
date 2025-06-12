<template>
  <div class="trails-page">
    <div class="container">
      <h1>Trasee montane</h1>
      <p class="intro">
        Descoperă cele mai spectaculoase trasee montane din România, recomandate turiștilor cazați în
        cabanele noastre. Indiferent dacă ești începător sau montaniard experimentat, avem un traseu potrivit pentru tine.
      </p>

      <div class="trail-list">
        <div class="trail-card" v-for="trail in trails" :key="trail.id">
          <img :src="trail.image" :alt="trail.name" class="trail-image" />
          <div class="trail-content">
            <h2>{{ trail.name }}</h2>
            <p>{{ trail.description }}</p>
            <ul>
              <li><strong>Durată:</strong> {{ trail.duration }}</li>
              <li><strong>Dificultate:</strong> {{ trail.difficulty }}</li>
              <li><strong>Altitudine maximă:</strong> {{ trail.altitude }} m</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Trail {
  id: number
  name: string
  description: string
  duration: string
  difficulty: string
  altitude: number
  image: string
}

const trails: Trail[] = [
  {
    id: 1,
    name: "Traseul Cabana Babele  Crucea Eroilor  Caraiman",
    description:
      "Un traseu popular în Munții Bucegi, potrivit pentru turiști cu experiență medie. Peisaje spectaculoase și panorame de neuitat.",
    duration: "3-4 ore",
    difficulty: "Medie",
    altitude: 2291,
    image:
      "https://www.mountlift.com/uploads/2021/07/8bac0c7126c30ba9-original.jpg"
  },
  {
    id: 2,
    name: "Traseul Poiana Brașov  Postăvaru",
    description:
      "Un traseu ușor, ideal pentru familii și iubitori ai naturii. Se poate urca pe jos sau cu telecabina.",
    duration: "1.5 ore",
    difficulty: "Ușoară",
    altitude: 1799,
    image:
      "https://suspemunte.com/uploads/images/thumbs/1136--0/poiana-brasov-vf-postavaru_1.webp"
  },
  {
    id: 3,
    name: "Traseul Râșnov  Cabana Mălăiești  Vârful Omu",
    description:
      "Un traseu complex și spectaculos pentru pasionații de drumeții montane. Necesită echipament adecvat.",
    duration: "6-7 ore",
    difficulty: "Dificil",
    altitude: 2507,
    image:
      "https://suspemunte.com/uploads/images/thumbs/1136--0/rasnov-cabana-malaiesti.webp"
  }
]
</script>

<style scoped>
.trails-page {
  padding: 2rem 0;
  background-color: #f9f9f9;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
h1 {
  font-size: 2.2rem;
  color: #004502;
  margin-bottom: 1rem;
}
.intro {
  margin-bottom: 2rem;
  color: #555;
  line-height: 1.6;
}
.trail-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.trail-card {
  display: flex;
  flex-direction: column;
  background: #f6fef6;
  border: 1px solid #d8eeda;
  border-radius: 10px;
  overflow: hidden;
}
.trail-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}
.trail-content {
  padding: 1.5rem;
}
h2 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}
ul {
  list-style: none;
  padding: 0;
  margin-top: 0.75rem;
}
li {
  margin-bottom: 0.4rem;
}
</style>
